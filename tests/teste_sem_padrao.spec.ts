import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page
    .locator('[data-test="inventory-list"] div')
    .filter({ hasText: "Sauce Labs Backpackcarry." })
    .nth(1)
    .click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]')
  ).toContainText("Remove");
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    "1"
  );
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
    "Sauce Labs Backpack"
  );
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="checkout-info-container"]'))
    .toMatchAriaSnapshot(`
    - textbox "First Name"
    - textbox "Last Name"
    - textbox "Zip/Postal Code"
    - button "Go back Cancel":
      - img "Go back"
    - button "Continue"
    `);
});
