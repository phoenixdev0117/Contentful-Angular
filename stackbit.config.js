import "drupal-content-connector/0.9810097649035752-index.js"
import { defineStackbitConfig } from "@stackbit/types";
import { ContentfulContentSource } from '@stackbit/cms-contentful';
import DrupalContentSource from "drupal-content-connector/netlify-create.js";

const config = defineStackbitConfig({
    stackbitVersion: "0.6.0",
    nodeVersion: "18",
    useESM: true,
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        }),
        new DrupalContentSource({
            options: {
                instanceID: 'drupal-content-connector',
                siteUrl: process.env.DRUPAL_BASE_URL,
                pathPrefix: process.env.DRUPAL_API_BASE,
                basicAuthUsername: process.env.DRUPAL_BASIC_AUTH_USERNAME,
                basicAuthPassword: process.env.DRUPAL_BASIC_AUTH_PASSWORD,
            },
        }),
    ],
});

export default config;