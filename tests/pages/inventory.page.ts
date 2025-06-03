import { Page, expect } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  private readonly selectors = {
    cartLink: '[data-test="shopping-cart-link"]',
    inventoryList: '[data-test="inventory-list"] div',
    addToCart: (productId: string) => `[data-test="add-to-cart-${productId}"]`,
    removeButton: (productId: string) => `[data-test="remove-${productId}"]`,
    cartBadge: '[data-test="shopping-cart-badge"]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartLinkVisible() {
    await expect(this.page.locator(this.selectors.cartLink)).toBeVisible();
  }

  async selectProduct(productName: string) {
    await this.page
      .locator(this.selectors.inventoryList)
      .filter({ hasText: productName })
      .nth(1)
      .click();
  }

  async addProductToCart(productId: string) {
    await this.page.locator(this.selectors.addToCart(productId)).click();
  }

  async verifyRemoveButtonVisible(productId: string) {
    await expect(
      this.page.locator(this.selectors.removeButton(productId))
    ).toContainText("Remove");
  }

  async verifyCartBadgeCount(count: string) {
    await expect(this.page.locator(this.selectors.cartBadge)).toContainText(
      count
    );
  }

  async goToCart() {
    await this.page.locator(this.selectors.cartLink).click();
  }
}
