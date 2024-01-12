interface AddressBodyRequest {
    firstname: string;
    lastname: string;
    postcode: string;
    telephone: string;
    city: string;
    country_id: string;
    street: string[];
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
        firstname: firstname,
        lastname: lastname,
        postcode: postcode,
        telephone: telephone,
        city: city,
        country_id: country_id,
        street: street
    };
};

export { AddressBodyRequest , setAddressBodyRequest };
