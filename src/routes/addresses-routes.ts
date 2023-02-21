import {Request, Response, Router} from "express";
import {addressesService} from "../domain/addresses-servise";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {body} from "express-validator";


export const addressesRouter = Router({})

addressesRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts = await addressesService.findProducts(req.query.address ? req.query.address.toString() : null)
    res.send(foundProducts)
})
//post
const adressValidation = body('address').rtrim().isLength({
    min: 3,
    max: 10
}).withMessage('title length should be from 3 to 10 symbol')
addressesRouter.post('/',

    adressValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const newAddress = await addressesService.createProduct(req.body.address)
    res.status(200).send(newAddress)
})
addressesRouter.get('/:id', async (req: Request, res: Response) => {
    const address = await addressesService.getCurrentAddress(+req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})
// //delete
addressesRouter.delete('/:id', async (req: Request, res: Response) => {
    const remove =await addressesService.removeAddress(+req.params.id)
    if (remove.deletedCount === 1) {
        res.status(201).send('deleted')
    } else res.status(404).send('not found')
})
// //put
addressesRouter.put('/:id',

    adressValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const isUpdateAddress = await addressesService.updateAddress(+req.params.id, req.body.address)
    if (isUpdateAddress) {
        res.status(200).send(await addressesService.getCurrentAddress(+req.params.id))
    } else res.send(404)


})
