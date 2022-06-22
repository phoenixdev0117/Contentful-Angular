import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { StackbitEvent, StackbitService } from '../stackbit.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Entry<any>[];

  constructor(private contentfulService: ContentfulService, private stackbitService: StackbitService) { }

  ngOnInit() {
    this.contentfulService.getProducts()
    .then(products => this.products = products)

    this.stackbitService.onChange.subscribe({
      next: (event: StackbitEvent) => {
          if(event.changedContentTypes.includes('product')) {
            this.contentfulService.getProducts()
              .then(products => this.products = products)
          }
      }
    })
  }
}
