import {addressCollection} from "../db";
import {WithId} from "mongodb";

export type AddressType = {
    id: number
    value: string
}

export const addressesRepository = {
    async findProducts(address: string | null): Promise<AddressType[]> {
        let filter: any = {}
        if (address) {
            filter.value = {$regex: address}
        }
        return addressCollection.find(filter).toArray()

    },
    async createProduct(newAddress: AddressType):Promise<AddressType> {

        await addressCollection.insertOne(newAddress)
        return newAddress

    },
    async getCurrentAddress(id: number):Promise<WithId<AddressType> | null> {

        return addressCollection.findOne({id})

    },
    async removeAddress(id: number) {
        return addressCollection.deleteOne({id})
    },
    async updateAddress(id: number, value: string) {

const address= await addressCollection.updateOne({id},{$set:{value}})

        return address.matchedCount===1
    }
}
