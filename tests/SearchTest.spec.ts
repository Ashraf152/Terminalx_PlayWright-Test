import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";
import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { SearchPage } from "../logic/pages/SearchPage";


test.describe('Test of search functionality', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        let mainPage = new MainPage(page)
        await mainPage.clickOnSearch();
    });

    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })

    const testData = [
        { searchInput: "MANGO" },
        { searchInput: "RALPH LAUREN" },
        { searchInput: "LACOSTE"},
      ];
      
    testData.forEach((data, index) => {
        test(`Test Case ${index + 1} - searching for - ${data.searchInput} `, async () => {
            //ACT
            let searchPage = new SearchPage(page)

            //ASSERT
            expect(await searchPage.searchInput(data.searchInput)).toBe(data.searchInput);
        });
    });
});
