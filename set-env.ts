import { writeFile } from 'fs';
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   contentfulSpaceId: '${process.env.CONTENTFUL_SPACE_ID}',
   contentfulPreviewToken: '${process.env.CONTENTFUL_PREVIEW_TOKEN}',
   contentfulDeliveryToken: '${process.env.CONTENTFUL_DELIVERY_TOKEN}',
   production: '${process.env.PRODUCTION}'
};
`;

console.log('HELLO FROM THE SET ENV');
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
});
