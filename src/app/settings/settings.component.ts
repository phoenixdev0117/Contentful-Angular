import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContentfulService } from '../contentful.service';

class ErrorMessages {
  space: boolean|undefined
  accessToken: boolean|undefined
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  config: {
    space: string,
    accessToken: string
  };
  errorMessages: ErrorMessages;
  deepLink: string|false;

  constructor(
    private ContentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.errorMessages = { space: null, accessToken: null };
    this.config = this.ContentfulService.getConfig();
    this.deepLink = false;

    if (
      this.route.snapshot.queryParams.spaceId &&
      this.route.snapshot.queryParams.apiKey
    ) {
      console.log('joooo');
      this.config.space = this.route.snapshot.queryParams.spaceId;
      this.config.accessToken = this.route.snapshot.queryParams.apiKey
      this.saveConfig();
    }
  }

  saveConfig() {
    this.errorMessages = this.getValidationErrors();

    if (!this.errorMessages.space && !this.errorMessages.accessToken) {
      this.ContentfulService.setConfig(this.config);
      this.deepLink = `${window.location.href}?spaceId=${this.config.space}&apiKey=${this.config.accessToken}`;
    }
  }

  resetConfig() {
    this.errorMessages = { space: null, accessToken: null };
    this.config = this.ContentfulService.resetConfig();
  }

  private getValidationErrors() : ErrorMessages {
    const messages = { space: null, accessToken: null};

    if (!/^[a-z0-9]{12}$/.test(this.config.space)) {
      messages.space = true;
    }

    if(!/^[a-z0-9]{64}$/.test(this.config.accessToken)) {
      messages.accessToken = true;
    }

    return messages;
  }
}
