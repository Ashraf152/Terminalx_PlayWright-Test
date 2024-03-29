import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../infra/base-page";
import { waitForElementToBeVisible } from "../../utils/wait-for-elements";

export class WishList extends BasePage {


    private WISHLIST_ITEMS: Locator

    constructor(page: Page) {
        super(page)
        this.WISHLIST_ITEMS = this.page.locator('//div[@class="listing_2tNy"]//li')
    }
    async getWishlistCountItems() {
        await waitForElementToBeVisible(this.WISHLIST_ITEMS, 2000, 7);
        return await this.WISHLIST_ITEMS.count();
    }

}