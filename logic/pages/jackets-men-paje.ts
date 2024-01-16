import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { areListsEqual, pricesplit } from '../../utils/utils';

export class JacketsMenPage extends BasePage {
    // LOCATORS
    private readonly saleOption: Locator
    private readonly seventyPercent: Locator
    private readonly oldprices: Locator
    private readonly newprices: Locator

    constructor(page: Page) {
        super(page);
        this.saleOption = this.page.locator('//h4[@class="title_ramR" and contains(text(), "מבצע")]')
        this.seventyPercent = this.page.locator('//li[@class="filter-item_wzYv"]/a[@class="tx-link-a filter-link_3AD7 tx-link_29YD" and @href="/men/jackets-coats/jackets?stampa_sale=2911"]');
        this.oldprices = this.page.locator('//div[@class="row_2tcG strikethrough_t2Ab regular-price_35Lt"]')
        this.newprices = this.page.locator('//div[@class="row_2tcG bold_2wBM final-price_8CiX"]')
        this.initPage();
    }

    async selectSeventyPercent() {
        await waitForElementToBeVisible(this.saleOption, 1000, 5)
        await this.saleOption.click()
        await waitForElementToBeVisible(this.seventyPercent, 1000, 5)
        await this.seventyPercent.click();
        await this.refreshPage();
    }

    async getAllJacketsAreInSale() {

        const stateOld = (await this.oldprices.first())
        await waitForElementToBeVisible(stateOld, 3000, 7)
        const stateNew = (await this.newprices.first())
        await waitForElementToBeVisible(stateNew, 3000, 7)

        const listOldPrices = await this.oldprices.all()
        const promiseListOldPrices = listOldPrices.map(async item => {
            await this.page.waitForLoadState('load')
            await waitForElementToBeVisible(item, 1000, 5);
            return await item.innerText()
        })

        const listNewPrices = await this.newprices.all()
        const promiseListNewPrices = listNewPrices.map(async item => {
            await this.page.waitForLoadState('load')
            await waitForElementToBeVisible(item, 1000, 5);
            return await item.innerText()
        })

        const listOldPricesString = await Promise.all(promiseListOldPrices);
        const listNewPricesString = await Promise.all(promiseListNewPrices);

        const listOldprices = listOldPricesString.map<number>(price => { return Number(pricesplit(price).toFixed(2)); })
        const listNewprices = listNewPricesString.map<number>(price => { return Number(pricesplit(price).toFixed(2)); })

        const newList: number[] = listOldprices.map((value) => Number((value * 0.30).toFixed(2)));
        return areListsEqual<number>(listNewprices, newList)

    }

}