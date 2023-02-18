import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRoute} from "./routes/products-route";
import {addressesRouter} from "./routes/addresses-routes";

//create express app
const app = express()
const port = process.env.PORT || 5000

const blablaMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = "hello"
    next()
})
const authGuardMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.send(401)
    }
})
let requestCounter = 0
const requestCounterMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    requestCounter++;
    next();
})
// app.use(requestCounterMiddleware)
// app.use(blablaMiddleware)
// app.use(authGuardMiddleware)


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use('/products', productsRoute)
app.use('/addresses', addressesRouter)
//get
app.get('/users', (req: Request, res: Response) => {
// @ts-ignore
    const blabla = req.blabla

    res.send({value: blabla + '!!!!!',count:requestCounter})
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
