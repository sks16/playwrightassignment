const { test, expect } = require('@playwright/test');

test('Validate Input Form Submit functionality', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByRole('link', { name: 'Input Form Submit' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Submit' }).click();
  const nameField = page.locator('input[name="name"]');
  const validationMessage = await nameField.evaluate((el) => el.validationMessage);
  console.log(validationMessage);
  expect(validationMessage).toBe('Please fill out this field.');
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[placeholder="Email"]', 'johndoe@example.com');
  await page.fill('input[placeholder="Password"]', 'Password123');
  await page.fill('input[placeholder="Company"]', 'Example Corp');
  await page.fill('input[placeholder="Website"]', 'https://example.com');
  await page.fill('input[placeholder="City"]', 'New York');
  await page.fill('input[placeholder="Address 1"]', '123 Main Street');
  await page.fill('input[placeholder="Address 2"]', 'Suite 100');
  await page.fill('input[placeholder="State"]', 'NY');
  await page.fill('input[placeholder="Zip code"]', '10001');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.getByRole('button', { name: 'Submit' }).click();
  const successMessage = page.locator('text=Thanks for contacting us, we will get back to you shortly.');
  await expect(successMessage).toBeVisible();
});