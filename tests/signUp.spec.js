const { test, expect } = require("@playwright/test");

test.describe("Sign Up", () => {
  test.describe("Sign Up", () => {
    test("Automate valid sign-up", async ({ page }) => {
      await page.goto("https://www.demoblaze.com/index.html");
      await page.click("#signin2");
      await page.fill("#sign-username", "Bohdan1234567890");
      await page.fill("#sign-password", "newPassword");
      await page.click('button.btn.btn-primary[onclick="register()"]');

      const [dialog] = await Promise.all([
        page.waitForEvent("dialog", { timeout: 10000 }),
      ]);

      expect(dialog.message()).toContain("Sign up successful.");
      await dialog.dismiss();
    }, 15000);

    test("Automate invalid sign-up", async ({ page }) => {
      await page.goto("https://www.demoblaze.com/index.html");
      await page.click("#signin2");
      await page.fill("#sign-username", "Bohda12345");
      await page.fill("#sign-password", "12345");
      await page.click('button.btn.btn-primary[onclick="register()"]');

      const [dialog] = await Promise.all([
        page.waitForEvent("dialog", { timeout: 10000 }),
      ]);

      expect(dialog.message()).toContain("This user already exist.");
      await dialog.dismiss();
    }, 15000);
  });
});
