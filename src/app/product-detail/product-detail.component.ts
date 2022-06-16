import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Entry } from 'contentful';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Entry<any>;

  constructor(
    private ContentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) => this.ContentfulService.getProduct(params.get('slug'))))
    .subscribe(product => this.product = product);
  }
}
