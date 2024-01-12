import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class MainPage extends BasePage {
    // LOCATORS
    private readonly userLoginButton:Locator

    constructor(page: Page) {
        super(page);
        this.userLoginButton = this.page.locator('//span[@class="greet_Yfio profile-button-new-menu_2voE"]');
        this.initPage();
    }

    async getUserLogedIn(){
        const state = await waitForElementToBeVisible(this.userLoginButton,1000,5)
        return await this.userLoginButton.isVisible();
    }
}