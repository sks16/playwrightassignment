// @ts-check
const { test, expect } = require('@playwright/test');

test('Open LambdaTest’s Selenium Playground from', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByRole('link', { name: 'Simple Form Demo' }).click();
  const currentUrl = page.url();
  expect(currentUrl).toContain('simple-form-demo');
  const message = "Welcome to LambdaTest";
  await page.fill('#user-message', message);
  await page.click('#showInput');
  await expect(page.locator("#message")).toHaveText(message);
});
