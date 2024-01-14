import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class PersonalInfoPage extends BasePage {
    // LOCATORS
    private readonly firstName:Locator;
    private readonly lastName:Locator 
    private readonly birthDate:Locator

    constructor(page: Page) {
        super(page);
        this.firstName=this.page.locator('//input[@name="firstname"]')
        this.lastName=this.page.locator('//input[@name="lastname"]')
        this.birthDate=this.page.locator('//input[@name="date_of_birth"]')
        this.initPage();
    }

    async getfirstName(){
        await waitForElementToBeVisible(this.firstName,1000,5);
        return await this.firstName.inputValue();
    }
    async getLastName(){
        await waitForElementToBeVisible(this.lastName,1000,5);
        return await this.lastName.inputValue();
    }
    async getBirthDate(){
        await waitForElementToBeVisible(this.birthDate,1000,5);
        return await this.birthDate.inputValue();
    }

}