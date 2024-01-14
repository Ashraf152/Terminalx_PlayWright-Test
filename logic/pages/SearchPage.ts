import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../infra/base-page";
import { waitForElementToBeVisible } from "../../utils/wait-for-elements";

export class SearchPage extends BasePage{

    private SEARCH_INPUT : Locator
    private SEARCH_SUBMIT : Locator
    private SEARCH_RESULT : Locator

    constructor(page:Page){
        super(page)                            
        this.SEARCH_INPUT = this.page.locator('//*[@id="app-root"]/div[2]/header/div[2]/div[4]/nav/ul/li[1]/div/form/input')
        this.SEARCH_SUBMIT = this.page.locator('//*[@id="app-root"]/div[2]/header/div[2]/div[4]/nav/ul/li[1]/div/form/button[3]')
        this.SEARCH_RESULT = this.page.locator('//*[@id="app-root"]/div[2]/main/div[2]/div/div[3]/div[3]/div[2]/ol/li[1]/div[3]/div[1]/div[2]/span');
    
    }

    async searchInput(input:string){
        await this.SEARCH_INPUT.fill(input)
        await waitForElementToBeVisible(this.SEARCH_SUBMIT,1000,5)
        await this.SEARCH_SUBMIT.click()
        await waitForElementToBeVisible(this.SEARCH_RESULT,1000,5)
        return await this.SEARCH_RESULT.textContent()
    
    }
  
}