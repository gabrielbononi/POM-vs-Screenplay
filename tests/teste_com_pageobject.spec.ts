import { test } from "@playwright/test";
import { CartPage } from "./pages/cart.page";
import { CheckoutPage } from "./pages/checkout.page";
import { InventoryPage } from "./pages/inventory.page";
import { LoginPage } from "./pages/login.page";

test("complete shopping flow using page objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");

  await inventoryPage.verifyCartLinkVisible();
  await inventoryPage.selectProduct("Sauce Labs Backpackcarry.");
  await inventoryPage.addProductToCart("sauce-labs-backpack");
  await inventoryPage.verifyRemoveButtonVisible("sauce-labs-backpack");
  await inventoryPage.verifyCartBadgeCount("1");

  await inventoryPage.goToCart();
  await cartPage.verifyProductInCart("Sauce Labs Backpack");
  await cartPage.removeProduct("sauce-labs-backpack");
  await cartPage.goToCheckout();

  await checkoutPage.verifyCheckoutForm();
});
