import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import  {parseBodyToJSON}  from '../utils/utils';
import { AddressBodyRequest, setAddressBodyRequest } from '../logic/api/request-body/address-body-request';
import { AddressPage } from '../logic/pages/address-page';

test.describe('test for loging out',()=>{
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
    console.log(await mainPage.getTextInLoginButton())
    
  });
  test.afterEach(async()=>{
    await browserWrapper.closeBrowser();
  })
  test("check user successfully loged out",async()=>{
    await mainPage.clickLogout();
    expect((await mainPage.getTextInLoginButton()).includes(configJson.username)).toBeFalsy()
  })
})