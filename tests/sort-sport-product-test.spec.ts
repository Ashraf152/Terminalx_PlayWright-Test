import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
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
    //ARRANGE
    let sportpage=new SportItemsPage(page)
    //ACT
    await sportpage.sortbyprice()
    //ASSERT
    expect(await sportpage.getItemsPrices()).toBeTruthy()
  })
})