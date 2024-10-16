/**
 * Rules the aXe uses:
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 * 
 * 
 */

describe('accessibilty tests for nightwatch website', function () {

  before(async function () {
    browser.navigateTo('https://nightwatchjs.org');
    await browser.axeInject();
  });

  after(function () {
    browser.end();
  });

  it('Nightwatch website page has accessible headers', function (browser) {
    browser.axeRun('body', {
      runOnly: ['empty-heading', 'page-has-heading-one', 'p-as-heading']
    });
  });

  it('Nightwatch website page has accessible images', function (browser) {
    browser.axeRun('body', {
      runOnly: ['image-alt']
    });
  });

  it('Nightwatch website page has sufficient color contrast', function (browser) {
    browser.axeRun('body', {
      runOnly: ['color-contrast']
    });
  });

  it('Nightwatch website page has accessible links', function (browser) {
    browser.axeRun('body', {
      runOnly: ['link-name']
    });
  });

  it('Nightwatch website page has accessible forms', function (browser) {
    browser.axeRun('body', {
      runOnly: ['form-label']
    });
  });

  it('Nightwatch website page uses ARIA attributes correctly', function (browser) {
    browser.axeRun('body', {
      runOnly: ['aria-attributes']
    });
  });
});