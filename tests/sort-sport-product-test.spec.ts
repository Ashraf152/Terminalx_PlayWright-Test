import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import  {flipBirthDate, parseBodyToJSON}  from '../utils/utils';
import { setPersonalInfoObject } from '../logic/api/request-body/personal-info-body-request';
import { PersonalInfoPage } from '../logic/pages/personal-info-page';
import userDateJson from '../configfiles/userDataConfig.json'
import { SportItemsPage } from '../logic/pages/sport-items-page';

test.describe('test for sorted prices',()=>{
  let browserWrapper:BrowserWrapper;
  let page: Page

  test.beforeEach(async()=>{
    browserWrapper = new BrowserWrapper()
    page = await browserWrapper.getPage(configJson.sportpageurl)
    
  });
  test.afterEach(async()=>{
    await browserWrapper.closeBrowser();
  })

  test("check sorted prices",async()=>{
    let sportpage=new SportItemsPage(page)
    await sportpage.sortbyprice()
    expect(await sportpage.getItemsPrices()).toBeTruthy()
  })
})