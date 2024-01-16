import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { areListsEqual, pricesplit } from '../../utils/utils';

export class SportItemsPage extends BasePage {
    // LOCATORS
    private readonly productsPrices: Locator
    private readonly viewbyselector: Locator

    constructor(page: Page) {
        super(page);
        this.productsPrices = this.page.locator('//div[@class="row_2tcG bold_2wBM final-price_8CiX"]')
        this.viewbyselector = this.page.locator('//select[@class="select_zdc5 rtl_62yk"]')
        this.initPage();
    }

    async sortbyprice() {
        await waitForElementToBeVisible(this.viewbyselector, 1000, 5)
        await this.viewbyselector.selectOption("price_asc")
    }

    async getItemsPrices() {
        const state = (await this.productsPrices.first())
        await waitForElementToBeVisible(state, 3000, 7)

        const list = await this.productsPrices.all()
        const promiseListPrices = list.map(async item => {
            await waitForElementToBeVisible(item, 1000, 5);
            return await item.innerText()
        })
        const listPricesString = await Promise.all(promiseListPrices);
        const listprices = listPricesString.map<number>(price => { return pricesplit(price); })
        const copylistprice = listprices.sort((a, b) => a - b)
        return areListsEqual<number>(listprices, copylistprice)

    }

}

