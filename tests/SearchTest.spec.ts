import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";
import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { SearchPage } from "../logic/pages/SearchPage";

const testData = [
  { searchInput: "MANGO" },
  { searchInput: "RALPH LAUREN" },
  { searchInput: "LACOSTE"},
];

test.describe('Test of search functionality', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page;
    let mainPage: MainPage;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        mainPage = new MainPage(page)
        await mainPage.clickOnSearch();
    });

    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })

    testData.forEach((data, index) => {
        test(`test search results - Test Case ${index + 1}`, async () => {
            //ACT
            let searchPage = new SearchPage(page)

            //ASSERT
            expect(await searchPage.searchInput(data.searchInput)).toBe(data.searchInput);
        });
    });
});
