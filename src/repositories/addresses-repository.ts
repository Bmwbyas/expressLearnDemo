const addresses = [{id: 1, value: 'nemiga str'}, {id: 2, value: '8March'}]

export const addressesRepository = {
    findProducts(address: string | null) {
        if (address) {

            return addresses.filter(p => p.value.indexOf(address) > -1)
        } else {
            return addresses
        }

    },
    createProduct(address: string) {
        const newAddress = {id: +(new Date()), value: address}
        addresses.push(newAddress)
        return newAddress
    },
    getCurrentAddress(id: string) {
        return  addresses.find(p => p.id === +id)

    },
    removeAddress(id: string) {
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === +id) {
                addresses.splice(i, 1);
                return '1'
            }

        }
        return 'not found'
    },
    updateAddress(id: string, value: string) {
        const address = addresses.find(p => p.id === +id)
        if (address) {
            address.value = value
            return true
        }
        return false

    }
}
