import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import { parseBodyToJSON, wrapCartResponse } from '../utils/utils';
import { AddressBodyRequest, setAddressBodyRequest } from '../logic/api/request-body/address-body-request';
import { AddressPage } from '../logic/pages/address-page';
import { CheckOutPage } from '../logic/pages/checkout-page';

test.describe('test for adding an cart', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page
    let mainPage: MainPage
    let apiCalls = new ApiCalls();
    let quantity :Number | undefined
    let checkOutPage:CheckOutPage

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        mainPage = new MainPage(page)
        checkOutPage = new CheckOutPage(page);
    });
    test.afterEach(async () => {
        await checkOutPage.removeItem();
        await browserWrapper.closeBrowser();
        //await page.close();
    })
    test("check items is successfully added", async () => {

        apiCalls = new ApiCalls();
        const dataObject = {
            "cart_items": [
                {
                    "data": {
                        "quantity": 1,
                        "any_sku": "W25438000105"
                    }
                }
            ],
            "skip_collect": 1
        };
        

        const newPost = await apiCalls.addToCart(parseBodyToJSON(dataObject))
        const data=await wrapCartResponse(newPost)
        quantity=data?.data.addAnyProductsToAnyCart.total_quantity
        page = await browserWrapper.getPage(configJson.cartUrl)
        expect(await checkOutPage.getItemCount()).toBe(quantity)
    })
})