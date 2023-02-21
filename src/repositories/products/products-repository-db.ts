import {productsCollection} from "../db";


export type ProductType = { id: number, title: string }


export const productsRepository = {
    async findproducts(title: string | null): Promise<ProductType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
            // return products.filter(p => p.title.includes(title))
        }
        return productsCollection.find(filter).toArray()
    },
    async findCurrentProduct(id: number): Promise<ProductType | null> {
        return await productsCollection.findOne({id})
    },
    async removeProduct(id: number) {
        const product = await productsCollection.deleteOne({id})
        return product.deletedCount === 1

    },
    async createProduct(product: ProductType): Promise<ProductType> {

        await productsCollection.insertOne(product)
        return product
    },
    async updateProduct(id: number, title: string) {
        const product = await productsCollection.updateOne({id}, {$set: {title}})
        // const product = products.find(p => p.id === id)
        // if (product) {
        //     product.title = title
        //     return true
        // }
        // return false
        return product.matchedCount === 1
    }
}
