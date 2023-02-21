export const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
   async findproducts(title: string | null) {
        if (title) {
            return products.filter(p => p.title.includes(title))
        } else {
            return products
        }
    },
    async findCurrentProduct(id: number | null) {
        const product = products.find(p => p.id === id)
        if (product) {
            return product
        } else {
            return null
        }
    },
   async removeProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)

                return true
            }
        }
        return false
    },
   async createProduct(title: string) {

        const product = {id: +(new Date), title: title}
        products.push(product)
        return product

    },
    async updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        }
        return false
    }
}
