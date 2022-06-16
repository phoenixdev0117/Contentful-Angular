import { CfAngularTutorialPage } from './app.po';

describe('cf-angular-tutorial App', () => {
  let page: CfAngularTutorialPage;

  beforeEach(() => {
    page = new CfAngularTutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
