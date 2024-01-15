import { BrowserWrapper } from "../infra/browser-wrapper";
import { test, Page, expect } from '@playwright/test';
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";

test.describe('test for logIn', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)

    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })
    test("check successfully loged in  ", async () => {
        
        //ACT
        const mainPage = new MainPage(page)
        
        //ASSERT
        expect(await mainPage.getUserLogedIn()).toBe(true);

    })
})