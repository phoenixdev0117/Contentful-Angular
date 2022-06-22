import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createClient, Entry, Space, ContentfulClientApi } from 'contentful';

// change these to include your own settings
const DEFAULT_CONFIG = {
  credentials: {
    space: '5u403xny70b7',
    accessToken: isDevMode ? 'kkQ9luy61vXX90CQrIMGH3sU_w6dmwZo7-4dxkQ1Lf4' : 'CYQDNUgaBV4fdePBW8MGMJT32iE-Tcubo823Q0Gtu9w'
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
  public changedObjectIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
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
  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.product
    }, query))
      .then(res => res.items);
  }

  // fetch products with a given slug
  // and return one of them
  getProduct(slug: string): Promise<Entry<any>> {
    return this.getProducts({ 'fields.slug': slug })
      .then(items => items[0])
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
