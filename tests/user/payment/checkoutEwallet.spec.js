'use strict';

const { test, expect } = require('@playwright/test');
const { loginUser } = require('../../../helpers/loginUser');

test.describe('Checkout From Catalog All Payment', () => {

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
  })

  test('Checkout payment with ewallet', async ({ page }) => {

        const buttonKatalog = '#mobile-top-nav > div > div:nth-child(2)';
    await page.locator(buttonKatalog).click();

    const iconKeranjang = '[data-icon="akar-icons:cart"]';
    await page.locator(iconKeranjang).click();

    const checkboxes = page.locator('[id^="chk-pilih-principle-"]');
    
    // Tunggu sampai minimal 1 checkbox muncul
    await checkboxes.first().waitFor({
      state: 'visible',
      timeout: 15000, // 10 detik
});

    const total = await checkboxes.count();

    for (let i = 0; i < total; i++) {
    if (!(await checkboxes.nth(i).isChecked())) {
        await checkboxes.nth(i).check();
    }
}


    const buttonCheckout = '[data-testid="keranjang-belanja-btn-checkout"]';
    await page.locator(buttonCheckout).click();


    
  })


});