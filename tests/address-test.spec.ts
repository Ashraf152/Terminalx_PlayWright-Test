import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import  { wrapApiResponse}  from '../utils/utils';
import { AddressBodyRequest, setAddressBodyRequest, setAddressId } from '../logic/api/request-body/address-body-request';
import { AddressPage } from '../logic/pages/address-page';
import userDataJson from '../configfiles/userDataConfig.json'
import { addressbodyrespone } from '../logic/api/response-body/addressbodyresponse';

test.describe('test for adding an address',()=>{
  let browserWrapper:BrowserWrapper;
  let page: Page
  let id :number | undefined
  let apiCalls : ApiCalls;

  test.beforeEach(async()=>{
    browserWrapper = new BrowserWrapper()
    page = await browserWrapper.getPage(configJson.url)
    let mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnAddressManagementButton();
    apiCalls= new ApiCalls();
    
  });
  test.afterEach(async()=>{
    await apiCalls.deleteAddress(setAddressId(id))
    await browserWrapper.closeBrowser();
  })
  test("check address is successfully added",async()=>{
    //ARRANGE
    
    const dataObject:  AddressBodyRequest  = 
        setAddressBodyRequest(
          userDataJson.username,
          userDataJson.lastname,
            "12",
            "0524563894",
            "חיפה",
            "IL",
            ["בית הדסה", "12", "12"]
        );

    //ACT
    const newPost = await apiCalls.addNewAddress(dataObject)
    const body =await wrapApiResponse<addressbodyrespone>(newPost)
    const cityName = body?.data.createCustomerAddress.city
    id= body?.data.createCustomerAddress.id;
    const addressPage = new AddressPage(page)
    await addressPage.refreshPage();

    //ASSERT
    expect(await addressPage.getCityName()).toBe(cityName)
  })
})