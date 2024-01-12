import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class AddressPage extends BasePage {
    // LOCATORS
    private readonly AddressTable: Locator

    constructor(page: Page) {
        super(page);
        this.AddressTable = this.page.locator('//tbody[@class="table-wrap-body_3QCY rtl_1cnX"]')
        this.initPage();
    }

    async getCityName(){
        const cityLocator = await this.AddressTable.locator('//tr/td[4]');
        await waitForElementToBeVisible(cityLocator,1000,5);
        const cityName = await cityLocator.innerText();
        return cityName;
    }

}