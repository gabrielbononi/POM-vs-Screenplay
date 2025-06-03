import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  private readonly selectors = {
    productName: '[data-test="inventory-item-name"]',
    removeButton: (productId: string) => `[data-test="remove-${productId}"]`,
    checkoutButton: '[data-test="checkout"]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.locator(this.selectors.productName)).toContainText(
      productName
    );
  }

  async removeProduct(productId: string) {
    await this.page.locator(this.selectors.removeButton(productId)).click();
  }

  async goToCheckout() {
    await this.page.locator(this.selectors.checkoutButton).click();
  }
}
