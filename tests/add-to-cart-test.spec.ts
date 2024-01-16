import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { ApiCalls } from '../logic/api/api-calls';
import { CheckOutPage } from '../logic/pages/checkout-page';
import userDataJson from '../configfiles/userDataConfig.json';
import { setCartBodyRequest } from '../logic/api/request-body/cart-body-request';
import {wrapApiResponse } from '../utils/utils';
import { CartResponse } from '../logic/api/response-body/cart-response-body';

test.describe.serial('test for adding an cart', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page
    let checkOutPage:CheckOutPage
    let apiCalls: ApiCalls ;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        checkOutPage = new CheckOutPage(page);
        apiCalls = new ApiCalls();
    });
    test.afterEach(async () => {
        await checkOutPage.removeItem();
        await browserWrapper.closeBrowser();
    })
    test("check items is successfully added", async () => {
        //ARRANGE
        let item=setCartBodyRequest(userDataJson.polo)
        
        //ACT
        const newPost = await apiCalls.addToCart((item))
        const data=await wrapApiResponse<CartResponse>(newPost)
        const quantity=data?.data.addAnyProductsToAnyCart.total_quantity
        await checkOutPage.navigateTo(configJson.cartUrl)
        
        //ASSERT
        expect(await checkOutPage.getItemCount()).toBe(quantity)
    })

    test("check items prices", async () => {
        //ARRANGE
    
        let item1=setCartBodyRequest(userDataJson.polo)
        let item2=setCartBodyRequest(userDataJson.reebokShows)

        //ACT
        await apiCalls.addToCart(item1)
        await apiCalls.addToCart(item2)
        await checkOutPage.navigateTo(configJson.cartUrl)

        //ASSERT
        expect(await checkOutPage.getpricesList()).toBe(await checkOutPage.getCartPrice())
    })
})
