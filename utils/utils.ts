import { WishlistResponse } from "../logic/api/response-body/wishlist-response-body";

export const parseBodyToJSON = (object: Object)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}

export async function wrapWishlistResponse(responseJson: any): Promise<WishlistResponse | null> {
        return await responseJson.json()
}

export function flipBirthDate(birthday: string): string {
    const [year, month, day] = birthday.split('-');
    const flippedBirthdate = `${day}/${month}/${year}`;
    return flippedBirthdate;
}