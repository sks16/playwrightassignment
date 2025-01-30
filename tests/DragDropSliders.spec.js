// @ts-check
const { test, expect, chromium } = require('@playwright/test');

const capabilities = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright Sample Build',
    'name': 'Playwright Sample Test',
    'user': "sanjeev_sen",
    'accessKey':"fKXvAHBssLMs14PkoTQV4g5335Dtsg1dfkZ3cNdADkCTLLw8L9",
    'network': true,
    'video': true,
    'console': true
  },
};
test('Drag slider to make value 95 and validate', async () => {
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  });

  const page = await browser.newPage(); // No need to redefine 'page' here as it's already defined by Playwright's context

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
  
  await browser.close(); // Make sure to close the browser after the test
});
