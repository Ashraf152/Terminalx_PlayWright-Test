export interface WishlistResponse {
    data: {
        addProductsToWishlist: {
            changed: number;
            anyWishlist: {
                items_count: number;
                items: WishlistItem[];
            };
        };
    };
}
export interface WishlistItem {
    id: number;
}
