interface CartBodyRequest {
    cart_items:datacartitem[],
    skip_collect:number
    
}
interface datacartitem{
    data:{
        quantity:number,
        any_sku:string
    }

}

const setCartBodyRequest = (sky:string): CartBodyRequest => {
    return {
        cart_items: [{ data: {  quantity: 1,any_sku: sky } }],
        skip_collect: 1
    };
};



export { CartBodyRequest , setCartBodyRequest };