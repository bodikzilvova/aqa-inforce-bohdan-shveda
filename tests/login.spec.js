const { test, expect } = require("@playwright/test");

test.describe("Login", () => {
  test("Automate valid login", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");
    await page.click("#login2");
    await page.fill("#loginusername", "Bohdan12345");
    await page.fill("#loginpassword", "12345");
    await page.click('button.btn.btn-primary[onclick="logIn()"]');

    await page.waitForSelector("text=Welcome Bohdan12345", { timeout: 10000 });

    const user = await page.locator("text=Welcome Bohdan12345").innerText();
    expect(user).toContain("Welcome Bohdan12345");
  });

  test("Automate invalid login", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");
    await page.click("#login2");
    await page.fill("#loginusername", "Bohdan12345");
    await page.fill("#loginpassword", "1234");
    await page.click('button.btn.btn-primary[onclick="logIn()"]');

    const [dialog] = await Promise.all([
      page.waitForEvent("dialog", { timeout: 10000 }),
    ]);

    expect(dialog.message()).toContain("Wrong password.");
    await dialog.dismiss();
  });
});
