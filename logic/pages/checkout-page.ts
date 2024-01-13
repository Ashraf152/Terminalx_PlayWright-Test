import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class CheckOutPage extends BasePage {
    // LOCATORS
    private readonly listOfProductInCart:Locator
    private readonly removeItemFromCart:Locator

    constructor(page: Page) {
        super(page);
        this.listOfProductInCart=this.page.locator('//div[@class="cart-items-list_wmqo"]/div[@class="container_1XqK"]/div/div[@class="cart-item_3yl1 rtl_3YUG"]')
        this.removeItemFromCart=this.page.locator('//button[@class="tx-link-a icon_u36n remove_wqPe tx-link_29YD"]')
        this.initPage();
    }

    async getItemCount(){
        await waitForElementToBeVisible(this.listOfProductInCart,1000,5);
        return await this.listOfProductInCart.count();
    }
    async removeItem(){
        await waitForElementToBeVisible(this.removeItemFromCart,1000,5);
        return await this.removeItemFromCart.click();
    }

}