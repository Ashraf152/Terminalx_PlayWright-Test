import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class AddressPage extends BasePage {
    // LOCATORS
    private readonly addressTable: Locator

    constructor(page: Page) {
        super(page);
        this.addressTable = this.page.locator('//tbody[@class="table-wrap-body_3QCY rtl_1cnX"]//tr/td[4]')
        this.initPage();
    }

    async getCityName(){
        await waitForElementToBeVisible(this.addressTable,1000,5);
        const cityName = await this.addressTable.innerText();
        return cityName;
    }

}