import { combineLatest, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StackbitEvent, StackbitService } from '../stackbit.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Entry<any>;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {    
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) => this.contentfulService.getProduct(params.get('slug'))))
    .subscribe(value => value.then(product => this.product = product));
  }
}