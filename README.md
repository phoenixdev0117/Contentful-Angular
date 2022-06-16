# Product catalogue web application

This is an example application built in [Angular](https://angular.io/). In the default setup the app gets content from the Contentful read-only [Product Catalogue Space Template](https://www.contentful.com/blog/2015/01/30/introducing-space-templates/). Our example applications for [iOS](https://github.com/contentful/product-catalogue-ios) and [Android](https://github.com/contentful/product-catalogue-android) happen to use the same space template as well.

This repository is the base for the [Using Contentful in an Angular project](https://www.contentful.com/developers/docs/javascript/tutorials/using-contentful-in-an-angular-project/) tutorial.

## What is Contentful

[Contentful](https://www.contentful.com) is a content management platform for web applications, mobile apps and connected devices. It allows you to create, edit & manage content in the cloud and publish it anywhere via powerful API. Contentful offers tools for managing editorial teams and enabling cooperation between organizations.

![Screenshots of Product Catalogue Web demo App](./screenshot.png?raw=true "Screenshots")

## Live Demo

The real benefit of the app is the capability to connect it to any space which uses the [Product Catalogue Space Template](https://www.contentful.com/blog/2015/01/30/introducing-space-templates/). Once the app is connected to a user-controlled version of the [Product Catalogue Space Template](https://www.contentful.com/blog/2015/01/30/introducing-space-templates/), all changes to the space in [the Contentful UI](https://app.contentful.com) will be reflected in the app.

1. Prepare a Contentful demo space
    - Create a new space in https://app.contentful.com
    - **IMPORTANT**: make sure to create it from the [Product Catalogue Space Template](https://www.contentful.com/blog/2015/01/30/introducing-space-templates/)
2. Connect the space to the demo application
    - Open the hosted version of the demo application [https://contentful-labs.github.io/product-catalogue-web.ts](https://contentful-labs.github.io/product-catalogue-web.ts)
    - Open settings
    - Paste in your API key and space ID
    - Save session and/or save the deep link for your convenience
    - **Optional**: bookmark the deep link for later usage

## Getting started

- Clone or fork this repository
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to `http://localhost:4200`

### Links

This repository is the base for the [Using Contentful in an Angular project](https://www.contentful.com/developers/docs/javascript/tutorials/using-contentful-in-an-angular-project/).

There are also other implementations of the product catalogue demo available for iOS and Android

- [Product Catalogue for iOS](https://github.com/contentful/product-catalogue-ios)
- [Product Catalogue for Android](https://github.com/contentful/product-catalogue-android)

This is a project created for tutorial purposes and not officially supported. Report problems via the issues page but please don't expect a quick and prompt response.
