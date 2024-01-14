import {test as teardown} from '@playwright/test';
import userDataJson from '../configfiles/userDataConfig.json';
import configJson from '../configfiles/config.json'
import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { MainPage } from '../logic/pages/main-page';

teardown.describe('logOut', async () => {

    let browserWrapper:BrowserWrapper;
    let page: Page
    let mainPage:MainPage
    let userName:string
  
    test.beforeEach(async()=>{
      browserWrapper = new BrowserWrapper()
      page = await browserWrapper.getPage(configJson.url)
      mainPage = new MainPage(page)
      await mainPage.clickOnUserProfileButton();
      userName = await mainPage.getTextInLoginButton();
    });
    
    test.afterEach(async()=>{
      await browserWrapper.closeBrowser();
    })
    test("check user successfully loged out",async()=>{
      await mainPage.clickLogout();
      await mainPage.refreshPage()
      expect((await mainPage.getTextInLoginButton()).includes(userName)).toBeFalsy()
    })

});