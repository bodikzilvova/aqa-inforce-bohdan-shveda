const { test, expect } = require("@playwright/test");

test.describe("Cart Page", () => {
  test("Automate placing an order", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");
    await page.click("text=Cart");
    await page.waitForURL("https://www.demoblaze.com/cart.html");

    const placeOrderButtonSelector = ".btn.btn-success";

    await page.click(placeOrderButtonSelector);

    await page.fill("#name", "Test User");
    await page.fill("#country", "USA");
    await page.fill("#city", "New York");
    await page.fill("#card", "1234567890123456");
    await page.fill("#month", "12");
    await page.fill("#year", "2024");
    await page.click("text=Purchase");

    const orderConfirmation = await page.waitForSelector(".sweet-alert", {
      timeout: 10000,
    });
    expect(orderConfirmation).toBeTruthy();
  });
});
