import {addressesRepository, AddressType} from "../repositories/address/addresses-repository";
import {FindCursor, WithId} from "mongodb";


export const addressesService = {
    async findProducts(address: string | null):Promise<AddressType[]> {

        return addressesRepository.findProducts(address)
    },
    async createProduct(address: string) {
        const newAddress = {id: +(new Date()), value: address}

        return await addressesRepository.createProduct(newAddress)
    },
    async getCurrentAddress(id: number ):Promise<FindCursor<WithId<AddressType>>>{

        return addressesRepository.getCurrentAddress(id)
    },
    async removeAddress(id: number) {

       return  await addressesRepository.removeAddress(id)

    },
    //
    async updateAddress(id: number, value: string) {
        return  await addressesRepository.updateAddress(id, value)
    }
}
