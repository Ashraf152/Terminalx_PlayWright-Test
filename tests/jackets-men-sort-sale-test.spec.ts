import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { JacketsMenPage } from '../logic/pages/jackets-men-paje';

test.describe('test for sorted men jackets ',()=>{
  let browserWrapper:BrowserWrapper;
  let page: Page

  test.beforeEach(async()=>{
    browserWrapper = new BrowserWrapper()
    page = await browserWrapper.getPage(configJson.jacketsMenUrl)
    
  });
  test.afterEach(async()=>{
    await browserWrapper.closeBrowser();
  })

  test("check sorted sale 70%",async()=>{
    test.setTimeout(100000);
    let jacketMenPage=new JacketsMenPage(page)
    await jacketMenPage.selectSeventyPercent();
    expect(await jacketMenPage.getAllJacketsAreInSale()).toBeTruthy()
  })
})