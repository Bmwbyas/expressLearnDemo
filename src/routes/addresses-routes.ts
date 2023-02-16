import {Request, Response, Router} from "express";

const addresses = [{id: 1, value: 'nemiga str'}, {id: 2, value: '8March'}]

export const addressesRouter=Router({})

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addresses.find(p => p.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})
//delete
addressesRouter.delete('/:id', (req: Request, res: Response) => {

    for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].id === +req.params.id) {
            addresses.splice(i, 1);
            res.send(204);
            return;
        }

    }


    res.send(404)

})

//post
addressesRouter.post('/', (req: Request, res: Response) => {
    const newAddress={id:+(new Date()),value:req.body.address}
    addresses.push(newAddress)
    res.status(201).send(newAddress)
})
//put
addressesRouter.put('/:id', (req: Request, res: Response) => {
    const address = addresses.find(p => p.id === +req.params.id)
    if (address) {
        address.value=req.body.value
        res.status(201).send(address)
    } else {
        res.send(404)
    }
})
