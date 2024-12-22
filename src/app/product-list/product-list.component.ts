import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { DrupalService } from '../drupal.service'
import { Entry } from 'contentful';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Entry<any>[];
  page: any;

  constructor(private contentfulService: ContentfulService, private drupalService: DrupalService) { }

  ngOnInit() {
    let pageSubject = this.drupalService.getPage('blog');
    let productsSubject = this.contentfulService.getProducts();

    productsSubject.subscribe({
      next: (value) => value.then(products => this.products = products)
    });

    pageSubject.subscribe(
      (response) => { console.log(response); this.page = response; },
      (error) => { console.log(error); });
  }
}
