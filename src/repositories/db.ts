import {MongoClient} from "mongodb";
import { ProductType } from "./products/products-repository-db";
import {AddressType} from "./address/addresses-repository";

const mongoUrl=process.env.mongoUrl||'mongodb+srv://askerko50:64vzJmdTGUSyVKiL@cluster0.byzwxqv.mongodb.net/?retryWrites=true&w=majority'
export const client=new MongoClient(mongoUrl)

const db=client.db('shop')


export const productsCollection=db.collection<ProductType>('products')
export const addressCollection=db.collection<AddressType>('addresses')
export async function runDb(){
    try{
     await client.connect()
     await client.db('products').command({ping:1})
        console.log('mongoDb connected')
    }
    catch (e){
        await client.close()
    }
}
