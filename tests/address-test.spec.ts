import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import  {parseBodyToJSON}  from '../utils/utils';
import { AddressBodyRequest, setAddressBodyRequest } from '../logic/api/request-body/address-body-request';
import { AddressPage } from '../logic/pages/address-page';
import userDataJson from '../configfiles/userDataConfig.json'

test.describe('test for adding an address',()=>{
  let browserWrapper:BrowserWrapper;
  let page: Page
  let mainPage:MainPage
  let id :Number
  let apiCalls = new ApiCalls();

  test.beforeEach(async()=>{
    browserWrapper = new BrowserWrapper()
    page = await browserWrapper.getPage(configJson.url)
    mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnAddressManagementButton();
    
  });
  test.afterEach(async()=>{
    const dataObject={
      "id":id
    };
    const newPost = await apiCalls.deleteAddress(parseBodyToJSON(dataObject))
    await browserWrapper.closeBrowser();
  })
  test("check address is successfully added",async()=>{

    apiCalls = new ApiCalls();
    const dataObject: { input: AddressBodyRequest } = {
        input: setAddressBodyRequest(
          userDataJson.username,
          userDataJson.lastname,
            "12",
            "0524563894",
            "חיפה",
            "IL",
            ["בית הדסה", "12", "12"]
        )
    };
    const newPost = await apiCalls.addNewAddress(parseBodyToJSON(dataObject))
    const body = await newPost.json();
    const cityName = body.data.createCustomerAddress.city;
    id= body.data.createCustomerAddress.id;
    const addressPage = new AddressPage(page)
    await addressPage.refreshPage();
    expect(await addressPage.getCityName()).toBe(cityName)
  })
})