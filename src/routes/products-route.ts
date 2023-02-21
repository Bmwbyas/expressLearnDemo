import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsService} from "../domain/products-servise";


export const productsRoute = Router({})


//get filtred products
productsRoute.get('/', async (req: Request, res: Response) => {
    const result = await productsService.findproducts(req.query.title ? req.query.title.toString() : null)
    res.send(result)
})
// get current product
productsRoute.get('/:id', async (req: Request, res: Response) => {
    const product = await productsService.findCurrentProduct( +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
//delete
productsRoute.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsService.removeProduct(+req.params.id)
    if (isDeleted) {
        res.status(200).send('this product deleted')
    } else {
        res.status(401).send('this product not found')
    }
})
const titleValidation = body('title').rtrim().isLength({
    min: 3,
    max: 10
}).withMessage('title length should be from 3 to 10 symbol')

//post
productsRoute.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const product = await productsService.createProduct(req.body.title)
        if (product) {
            res.send(product)
        } else {
            res.send(404)
        }
    })
// //put
productsRoute.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const isUpdate = await productsService.updateProduct(+req.params.id, req.body.title)
        if (isUpdate) {
            res.status(200).send( await productsService.findCurrentProduct(+req.params.id))
        } else {
            res.send(404)
        }
    })
