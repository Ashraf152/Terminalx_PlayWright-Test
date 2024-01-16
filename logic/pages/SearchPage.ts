import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../infra/base-page";
import { waitForElementToBeVisible } from "../../utils/wait-for-elements";

export class SearchPage extends BasePage{

    private SEARCH_INPUT : Locator
    private SEARCH_SUBMIT : Locator
    private SEARCH_RESULT : Locator

    constructor(page:Page){
        super(page)                            
        this.SEARCH_INPUT = this.page.locator('//input[@data-test="search-input"]')
        this.SEARCH_SUBMIT = this.page.locator('//button[@data-test-id="qa-search-box-submit-button"]')
        this.SEARCH_RESULT = this.page.locator('//div[@class="right_1o65"]/span');
        this.initPage();
    }

    async searchInput(input:string){
        await this.SEARCH_INPUT.fill(input)
        await waitForElementToBeVisible(this.SEARCH_SUBMIT,1000,5)
        await this.SEARCH_SUBMIT.click()
        await this.page.waitForLoadState("load")
        return await this.SEARCH_RESULT.first().textContent()
    
    }
  
}