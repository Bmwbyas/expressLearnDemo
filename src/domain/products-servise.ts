import {productsRepository, ProductType} from "../repositories/products-repository-db";


export const productsService = {
    async findproducts(title: string | null):Promise<ProductType[]> {

        return productsRepository.findproducts(title)
    },
    async findCurrentProduct(id: number ): Promise<ProductType|null>{

        return productsRepository.findCurrentProduct(id)
    },
    async removeProduct(id: number) {

       return  await productsRepository.removeProduct(id)

    },
    async createProduct(title: string) {
        const product = {id: +(new Date), title: title}

        return await productsRepository.createProduct(product)
    },
    async updateProduct(id: number, title: string) {
        return await productsRepository.updateProduct(id, title)

        // const product = products.find(p => p.id === id)
        // if (product) {
        //     product.title = title
        //     return true
        // }
        // return false

    }
}
