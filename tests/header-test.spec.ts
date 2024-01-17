import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { Header } from "../logic/pages/header-page";
test.describe('Test of clicked on header buttons', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page;
    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })
    const headerData = [
        { headerTittle: "JUST LANDED" },
        { headerTittle: "ON SALE"},
    ];
    const categoriesData = [
        {category:"justlanded"},
        {category:"on-sale"},
        {category:"baby"},
        {category:"brands"},
        {category:"sports"},
        {category:"beauty"},
        {category:"home-lifestyle"},
        {category:"premium"},
    ]
    headerData.forEach((data, index) => {
        test(`Test Case ${index + 1} - click on - ${data.headerTittle} `, async () => {
            //ACT
            let header = new Header(page)
            await header.clickOnHeaderButtonByText(data.headerTittle);
            //ASSERT
            expect(await header.getTittle()).toBe(data.headerTittle);
        });
    });
    categoriesData.forEach((data) => {
        test(`Test Case  - hover on  - ${data.category} `, async () => {
            //ACT
            let header = new Header(page)
            await header.hoverOnHeaderButtonByText(data.category);
            //ASSERT
           expect(await header.getHoverAction(data.category)).toBeTruthy()
        });
    });
})







