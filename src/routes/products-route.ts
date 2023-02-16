import {Request, Response, Router} from "express";
import {products} from "../repositories/products-repository";


export const productsRoute=Router({})


//get all
productsRoute.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }
})
//get current product
productsRoute.get('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
//delete
productsRoute.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
//post
productsRoute.post('/', (req: Request, res: Response) => {
    if(req.body.title){
    const product={id:+(new Date), title:req.body.title}
    products.push(product)
            res.send(product)
    }
    res.send(404)
})
//put
productsRoute.put('/:id', (req: Request, res: Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if(product) {
        product.title=req.body.title
        res.send(product)
    }
    res.send(404)
})
