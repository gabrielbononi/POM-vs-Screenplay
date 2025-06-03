import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  private page: Page;

  private readonly selectors = {
    checkoutForm: '[data-test="checkout-info-container"]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCheckoutForm() {
    await expect(this.page.locator(this.selectors.checkoutForm))
      .toMatchAriaSnapshot(`
            - textbox "First Name"
            - textbox "Last Name"
            - textbox "Zip/Postal Code"
            - button "Go back Cancel":
              - img "Go back"
            - button "Continue"
            `);
  }
}
