import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import { parseBodyToJSON, wrapCartResponse } from '../utils/utils';
import { CheckOutPage } from '../logic/pages/checkout-page';
import userDataJson from '../configfiles/userDataConfig.json';

test.describe.serial('test for adding an cart', () => {
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
    })
    test("check items is successfully added", async () => {
        apiCalls = new ApiCalls();
        let item=cart_item_object(userDataJson.polo)
        const newPost = await apiCalls.addToCart(parseBodyToJSON(item))
        const data=await wrapCartResponse(newPost)
        quantity=data?.data.addAnyProductsToAnyCart.total_quantity
        page = await browserWrapper.getPage(configJson.cartUrl)
        expect(await checkOutPage.getItemCount()).toBe(quantity)
    })

    test("check items prices", async () => {
        apiCalls = new ApiCalls();
        let item1=cart_item_object(userDataJson.polo)
        await apiCalls.addToCart(parseBodyToJSON(item1))
        let item2=cart_item_object(userDataJson.reebokShows)
        await apiCalls.addToCart(parseBodyToJSON(item2))
        page = await browserWrapper.getPage(configJson.cartUrl)
        expect(await checkOutPage.getpricesList()).toBe(await checkOutPage.getCartPrice())
    })
})


function cart_item_object(sku:string){
    const dataObject = {
        "cart_items": [
            {
                "data": {
                    "quantity": 1,
                    "any_sku": sku
                }
            }
        ],
        "skip_collect": 1
    };
    return dataObject
}