import express, {Request, Response} from 'express'

//create express app
const app = express()
const port = process.env.PORT || 5000

const products = [{id:1, title: 'tomato'}, {id:2, title: 'orange'}]
const addresses = [{id: 1, value: 'nemiga str'}, {id: 2, value: '8March'}]

app.get('/', (req: Request, res: Response) => {

    res.send('Hello World')
})

app.get('/products', (req: Request, res: Response) => {
    if(req.query.title){
        let searchString=req.query.title.toString()
        res.send(products.filter(p=>p.title.includes(searchString)))}
    else{res.send(products)}
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    const product = products.find(p => p.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(p => p.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
