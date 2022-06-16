import { Component, OnInit } from '@angular/core';
import { ContentfulService } from './contentful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    private ContentfulService: ContentfulService
  ) {}

  ngOnInit() {
    this.ContentfulService.onTitleChange(title => this.title = title)
  }
}
