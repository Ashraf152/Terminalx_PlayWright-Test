import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";
import {test, expect } from "@playwright/test";
import { Page } from "playwright";
import { SearchPage, } from "../logic/pages/SearchPage";

test.describe('Test of search functionality', () => {
    let browserWrapper: BrowserWrapper;
    let page:Page
    let mainPage:MainPage

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        mainPage = new MainPage(page)
        mainPage.clickOnSearch()

    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })

    test("test search results", async () =>{
        let searchPage = new SearchPage(page)
        expect(await searchPage.searchInput("MANGO")).toBe("MANGO")

    })
    
})