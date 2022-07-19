import { Injectable, isDevMode, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createClient, Entry, Space, ContentfulClientApi } from 'contentful';
import { StackbitEvent, StackbitService } from './stackbit.service';
import { environment } from './../environments/environment';

// change these to include your own settings
const DEFAULT_CONFIG = {
  credentials: {
    space: environment.contentfulSpaceId,
    accessToken: isDevMode ? environment.contentfulPreviewToken : environment.contentfulDeliveryToken
  },

  contentTypeIds: {
    product: 'product',
    category: 'category'
  }
}

@Injectable()
export class ContentfulService {
  cdaClient: ContentfulClientApi;
  config: {
    space: string,
    accessToken: string,
  };
  titleHandlers: Function[];
  constructor(private stackbitService: StackbitService) {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = DEFAULT_CONFIG.credentials;
    }

    this.titleHandlers = [];
    this._createClient();
    this.getSpace();
  }

  onTitleChange(fn): void {
    this.titleHandlers.push(fn)
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace()
      .then(space => {
        this.titleHandlers.forEach(handler => handler(space.name))

        return space;
      })
  }

  // fetch products
  getProductsFromContentful(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.product
    }, query))
      .then(res => res.items);
  }

  getProducts(query?: object): BehaviorSubject<Promise<Entry<any>[]>> {
    const productsSubject = new BehaviorSubject(this.getProductsFromContentful(query));
    this.stackbitService.contentChanged.subscribe({
      next: (event: StackbitEvent) => {
        if (event.changedContentTypes.includes(DEFAULT_CONFIG.contentTypeIds.product)) {
          productsSubject.next(this.getProductsFromContentful(query));
        }
      }
    })
    
    return productsSubject;
  }

  // fetch products with a given slug
  // and return one of them
  getProductFromContentful(slug: string): Promise<Entry<any>> {
    return this.getProductsFromContentful({ 'fields.slug': slug })
      .then(items => items[0])
  }

  getProduct(slug: string): BehaviorSubject<Promise<Entry<any>>> {
    const productSubject = new BehaviorSubject(this.getProductFromContentful(slug));
    this.stackbitService.contentChanged.subscribe({
      next: (event: StackbitEvent) => {
        if (event.changedContentTypes.includes(DEFAULT_CONFIG.contentTypeIds.product)) {
          productSubject.next(this.getProductFromContentful(slug));
        }
      }
    })
    return productSubject;
  }
  
  // fetch categories
  getCategories(): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries({
      content_type: DEFAULT_CONFIG.contentTypeIds.category
    })
      .then(res => res.items);
  }

  // return a custom config if available
  getConfig(): { space: string, accessToken: string } {
    return this.config !== DEFAULT_CONFIG.credentials ?
      Object.assign({}, this.config) :
      { space: '', accessToken: '' };
  }

  // set a new config and store it in localStorage
  setConfig(config: { space: string, accessToken: string }) {
    localStorage.setItem('catalogConfig', JSON.stringify(config));
    this.config = config;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  // set config back to default values
  resetConfig() {
    localStorage.removeItem('catalogConfig');
    this.config = DEFAULT_CONFIG.credentials;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  _createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken,
      host: isDevMode ? 'preview.contentful.com' : 'cdn.contentful.com'
    });
  }
}
