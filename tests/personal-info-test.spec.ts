import { test,Page ,expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import  {flipBirthDate, parseBodyToJSON}  from '../utils/utils';
import { AddressPage } from '../logic/pages/address-page';
import { setPersonalInfoObject } from '../logic/api/request-body/personal-info-body-request';
import { PersonalInfoPage } from '../logic/pages/personal-info-page';

test.describe('test for udpate personal info',()=>{
  let browserWrapper:BrowserWrapper;
  let page: Page
  let mainPage:MainPage
  let apiCalls = new ApiCalls();

  test.beforeEach(async()=>{
    browserWrapper = new BrowserWrapper()
    page = await browserWrapper.getPage(configJson.url)
    mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnPersonalInfoButton();
    
  });
  test.afterEach(async()=>{
    await browserWrapper.closeBrowser();
    //await page.close();
  })

  test("check address is successfully added",async()=>{
    let firstname = "Ashraf"
    let lastname="Egbaria"
    let birthDate="1992-02-15"
    apiCalls = new ApiCalls();
    const dataObject = setPersonalInfoObject(
        firstname,
        lastname,
        "0524563894",
        false,
        false,
        "ashraf.egbaria@gmail.com",
        1,
        birthDate
    );

    
    await apiCalls.updatePersonalInfo(parseBodyToJSON(dataObject))
    const personalInfo = new PersonalInfoPage(page)
    await personalInfo.refreshPage();
    expect(await personalInfo.getfirstName()).toBe(firstname)
    expect(await personalInfo.getLastName()).toBe(lastname)
    expect(await personalInfo.getBirthDate()).toBe(flipBirthDate(birthDate))
  })
})