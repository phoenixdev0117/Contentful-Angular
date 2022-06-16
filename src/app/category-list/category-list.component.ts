import { Component, OnInit } from '@angular/core';
// import { MdList } from '@angular/material';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  // entryComponents: [ MdList ]
})
export class CategoryListComponent implements OnInit {
  categories: Entry<any>[];
  productsForCategories: {} = {};

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getCategories()
    .then(categories => {
      this.categories = categories;

      return Promise.all(this.categories.map(
        category => this.contentfulService.getProducts({
          'fields.categories.sys.id': category.sys.id
        })
      ))
    })
    .then(productListings => {
      this.categories.forEach((cat, i) => {
        this.productsForCategories[cat.sys.id] = productListings[i];
      });
    })
  }
}
