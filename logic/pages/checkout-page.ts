import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { pricesplit } from '../../utils/utils';

export class CheckOutPage extends BasePage {
    // LOCATORS
    private readonly listOfProductInCart:Locator
    private readonly removeItemFromCart:Locator
    private readonly itemPrice:Locator
    private readonly cartitemsprices:Locator

    constructor(page: Page) {
        super(page);
        this.listOfProductInCart=this.page.locator('//div[@class="cart-items-list_wmqo"]/div[@class="container_1XqK"]/div/div[@class="cart-item_3yl1 rtl_3YUG"]')
        this.removeItemFromCart=this.page.locator('//button[@class="tx-link-a icon_u36n remove_wqPe tx-link_29YD"]')
        this.itemPrice=this.page.locator('//div[@class="column_34Ze total-price_rLA-"]')
        this.cartitemsprices=this.page.locator('//div[@data-test-id="qa-order-totals-total-order"]')
        this.initPage();
    }

    async getItemCount(){
        await waitForElementToBeVisible(this.listOfProductInCart,1000,5);
        return await this.listOfProductInCart.count();
    }
    async removeItem(){
        await this.page.waitForLoadState("load")
        let i =await this.removeItemFromCart.count()
        for( i ; i>0 ; i=i-1 ){
            await this.removeItemFromCart.first().click()
        }
    }

    async getpricesList(){
        await this.page.waitForLoadState("networkidle")
        const list=await this.listOfProductInCart.all()

        const promiseListPrices=list.map( async item=>{
            await waitForElementToBeVisible(item,1000,5);
            return await item.locator('//div[@class="column_34Ze total-price_rLA-"]').innerText()
        })
        const listPrices=await Promise.all(promiseListPrices);
        let sum:number =0
        listPrices.forEach( (price)=>{
            sum += pricesplit(price)
        })
        return Number(sum.toFixed(2))
    }
    async getCartPrice(){
         const i=pricesplit(await this.cartitemsprices.innerText())
         return i
    }



}