// @ts-check
const { test, expect } = require('@playwright/test');

test('Drag slider to make value 95 and validate', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.click('text=Drag & Drop Sliders');
  const slider = page.locator("input[value='15']"); // Assuming it's the first slider
  const sliderBox = await slider.boundingBox();
  if (sliderBox) {
    const sliderStartX = sliderBox.x;
    const sliderWidth = sliderBox.width;
    const offset = (95 - 2) / (100 - 0) * sliderWidth; // Assuming range is 0 to 100
    await page.mouse.move(sliderStartX, sliderBox.y + sliderBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(sliderStartX + offset, sliderBox.y + sliderBox.height / 2);
    await page.mouse.up();
  }
  const rangeValue = page.locator("div[class='sp__range sp__range-success'] output");
  await expect(rangeValue).toHaveText('95');
});
