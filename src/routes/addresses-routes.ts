import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";


export const addressesRouter = Router({})

addressesRouter.get('/', (req: Request, res: Response) => {

    const foundProducts = addressesRepository.findProducts(req.query.address ? req.query.address.toString() : null)
    res.send(foundProducts)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addressesRepository.getCurrentAddress(req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})
//delete
addressesRouter.delete('/:id', (req: Request, res: Response) => {
    const remove = addressesRepository.removeAddress(req.params.id)
    if (remove === '1') {

        res.send(204)
    } else res.send(404)


})

//post
addressesRouter.post('/', (req: Request, res: Response) => {
    const newAddress = addressesRepository.createProduct(req.body.address)
    res.status(201).send(newAddress)
})
//put
addressesRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdateAddress = addressesRepository.updateAddress(req.params.id, req.body.address)
    if (isUpdateAddress) {
        res.send(addressesRepository.getCurrentAddress(req.params.id))
    } else res.send(404)


})
