import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class Header extends BasePage {
    // LOCATORS
    private  globalButton:Locator | undefined
    private readonly tittlePages:Locator
     categoriesData = {
        justLanded:'//a[@href="/justlanded"]',
        onSale:'//a[@href="/on-sale"]'
    }
    constructor(page: Page) {
        super(page);
        this.tittlePages=this.page.locator('//h1[@class="h1-title_2hq_"]')
        this.initPage();
    }
    async clickOnHeaderButtonByText(li :string) {
        if(li == 'JUST LANDED'){
            this.globalButton = this.page.locator(`//li[@class="item_1lit"]${this.categoriesData.justLanded}`);
        }else{
            this.globalButton = this.page.locator(`//li[@class="item_1lit"]${this.categoriesData.onSale}`);
        }
        await waitForElementToBeVisible(this.globalButton, 1000, 5)
        await this.globalButton.click();
    }
    async getTittle(){
        await waitForElementToBeVisible(this.tittlePages, 1000, 5)
        return await this.tittlePages.textContent()
    }
    async hoverOnHeaderButtonByText(category: string | undefined){
        let catregoryButton : Locator
        catregoryButton = this.page.locator(`//a[@href='/${category}']`)
        await waitForElementToBeVisible(catregoryButton,1000,5)
        await catregoryButton.hover()
        await this.page.waitForLoadState('load')
    }
    async getHoverAction(category :string|undefined){
        let catregoryButton : Locator
        catregoryButton = this.page.locator(`//li[contains(@class,"item_1lit") and a[@href='/${category}']]`)
        await waitForElementToBeVisible(catregoryButton,1000,5)
        await this.page.waitForLoadState("networkidle")
        let className = await catregoryButton.getAttribute('class')
        return  className?.includes('open_1RdF')
    }
}







