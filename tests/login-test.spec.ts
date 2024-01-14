import { BrowserWrapper } from "../infra/browser-wrapper";
import { test, Page, expect } from '@playwright/test';
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";

test.describe('test for adding an address', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)

    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })
    test("check address is successfully added", async () => {
        const mainPage = new MainPage(page)
        expect(await mainPage.getUserLogedIn()).toBe(true);

    })
})