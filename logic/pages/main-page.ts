import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class MainPage extends BasePage {
    
    
    // LOCATORS
    private readonly userLoginButton:Locator;
    private readonly addressManagementButton:Locator;
    private readonly wishlistbutton:Locator;
    private readonly personalInfoButton:Locator;
    private readonly logoutButton:Locator
    private readonly userbutton:Locator

    constructor(page: Page) {
        super(page);
        this.userLoginButton = this.page.locator('//span[@class="greet_Yfio profile-button-new-menu_2voE"]');
        this.addressManagementButton=this.page.locator('//a[@href="/customer/address/?limit=10" and @class="tx-link-a links-item_3GWv tx-link_29YD underline_1zpu underline-hover_3GkV"]')
        this.wishlistbutton=this.page.locator('//a[@class="tx-link-a link_2L32 link-wishlist_1lmB tx-link_29YD"]')
        this.personalInfoButton=this.page.locator('//a[@href="/customer/account/edit" and @class="tx-link-a list-link_323s tx-link_29YD"]')
        this.logoutButton=this.page.locator('//li[@class="list-item_2A1s logout_3ZNa"]//button')
        this.userbutton=this.page.locator('//div[@class="profile_3CiC rtl_6mEj"]')
        this.initPage();
    }

    async getUserLogedIn(){
        const state = await waitForElementToBeVisible(this.userLoginButton,1000,5)
        return await this.userLoginButton.isVisible();
    }
    async clickOnUserProfileButton() {
        const state = await waitForElementToBeVisible(this.userLoginButton,1000,5);
        await this.userLoginButton.click();
    }
    async clickOnAddressManagementButton(){
        const state = await waitForElementToBeVisible(this.addressManagementButton,1000,5);
        await this.addressManagementButton.click();
    }
    async clickOnWishList() {
        await this.wishlistbutton.click();
    }
    async clickOnPersonalInfoButton() {
        const state = await waitForElementToBeVisible(this.personalInfoButton,1000,5);
        await this.personalInfoButton.click();
    }
    async clickLogout(){
        await waitForElementToBeVisible(this.logoutButton,1000,5);
        await this.logoutButton.click()
        
    }
    async getTextInLoginButton(){
        await waitForElementToBeVisible(this.userLoginButton,1000,5);
        return (await this.userbutton.allInnerTexts())[0]
    }
    
}