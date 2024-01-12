import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../infra/base-page";

export class WishList extends BasePage{


    private WISHLIST_ITEMS:Locator


    constructor(page:Page){
        super(page)
        this.WISHLIST_ITEMS=this.page.locator('//div[@class="listing_2tNy"]//li')
    }

    async getWishlistCountItems(){
        return this.WISHLIST_ITEMS.count()
    }

}