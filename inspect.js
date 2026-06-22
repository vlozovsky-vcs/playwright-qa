const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  // Try the root URL instead
  await page.goto('https://dev3.vcssoftware.com');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());

  const inputs = await page.$$eval('input', els => els.map(el => ({
    type: el.type,
    name: el.name,
    id: el.id,
    placeholder: el.placeholder,
    ariaLabel: el.getAttribute('aria-label'),
  })));

  console.log('INPUTS:', JSON.stringify(inputs, null, 2));

  await browser.close();
})();
