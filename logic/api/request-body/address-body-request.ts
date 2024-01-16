interface AddressBodyRequest {
    input: {
        firstname: string;
        lastname: string;
        postcode: string;
        telephone: string;
        city: string;
        country_id: string;
        street: string[];
    }
}

export interface AddressId{
    id:number | undefined
}

const setAddressId=(ID:number | undefined):AddressId=>{
    return {id:ID}
}

const setAddressBodyRequest = (
    firstname: string,
    lastname: string,
    postcode: string,
    telephone: string,
    city: string,
    country_id: string,
    street: string[]
): AddressBodyRequest => {
    return {
        input: {
            firstname: firstname,
            lastname: lastname,
            postcode: postcode,
            telephone: telephone,
            city: city,
            country_id: country_id,
            street: street
        }
    };
};

export { AddressBodyRequest, setAddressBodyRequest,setAddressId };
