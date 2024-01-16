export interface WishListBodyRequest {
    sku: string[];
}
export const setWishListItem =(skuId:string): WishListBodyRequest=>{
    return {
        sku: [skuId]
    }
}