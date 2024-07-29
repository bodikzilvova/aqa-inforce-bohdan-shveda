const { test, expect } = require("@playwright/test");

test.describe("Home Page", () => {
  test("Verify categories and product cards", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");

    await page.waitForSelector(".list-group");
    const categories = await page.$$(".list-group");
    expect(categories.length).toBeGreaterThan(0);

    await page.waitForSelector(".col-lg-4.col-md-6.mb-4");
    const productCards = await page.$$(".col-lg-4.col-md-6.mb-4");
    expect(productCards.length).toBeGreaterThan(0);
  });

  test("Validate actions and verify API responses", async ({ page }) => {
    await page.route("**/entries", (route) => route.continue());
    await page.goto("https://www.demoblaze.com/index.html");

    const response = await page.waitForResponse("**/entries");
    const data = await response.json();
    expect(data.Items.length).toBeGreaterThan(0);
  });
});
