import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap, delay, take, exhaustMap } from "rxjs";
import { Product } from "./product.model";
import { AuthService } from "../authentication/auth.service";
import { environment, mongoEnvironment } from "src/environments/environment";
import { MongoClient } from 'mongodb';
// local service
@Injectable()
export class ProductService {
    private url = environment.database_url;

    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ) {}

    async connect() {
        const client = new MongoClient(mongoEnvironment.connectionString);
        await client.connect();
        return client;
      }

      /*
 Product Model
      export interface Product {
    id: any;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    isActive: boolean;
    categoryId: number
}

      */

    async getProducts(categoryId: number){

        //get products from mongodb
        const client = await this.connect();
        const db = client.db('angular');
        const collection = db.collection('products');
        var products: Product[] = [];
        const productsCursor = await collection.find({categoryId: categoryId}).toArray().then((result) => {
            console.log(result);
            if(result)
            {
                result.forEach((product) => {
                    products.push({
                        id: product['id'],
                        name: product['name'],
                        price: product['price'],
                        imageUrl: product['imageUrl'],
                        description: product['description'],
                        isActive: product['isActive'],
                        categoryId: product['categoryId']
                    })
                })
            }

        });

        client.close();
        return products;
        
        
    }

    async getProductById(id: string) : Promise<Product>
    {
        //get products from mongodb
        const client = await this.connect();
        const db = client.db('angular');
        const collection = db.collection('products');
        var productObject: Product ={
            id: '',
            name: '',
            price: 0,
            imageUrl: '',
            description: '',
            isActive: false,
            categoryId: 0
        }
        const product = await collection.findOne({id: id}).then((result) => {
            console.log(result);
            if(result)
            {
                productObject = {
                    id: result['id'],
                    name: result['name'],
                    price: result['price'],
                    imageUrl: result['imageUrl'],
                    description: result['description'],
                    isActive: result['isActive'],
                    categoryId: result['categoryId']
                }

            }

        });

        client.close();
        return productObject;
        
        
    }

    async createProduct(product: Product): Promise<Product> {
        //create product in mongodb
        const pName = product.name;
        const pPrice = product.price;
        const pImageUrl = product.imageUrl;
        const  pDescription = product.description;
        const pIsActive = product.isActive;
        const pCategoryId = product.categoryId;
        const client = await this.connect();
        const db = client.db('angular');
        const collection = db.collection('products');
        var productObject: Product ={
            id: '',
            name: '',
            price: 0,
            imageUrl: '',
            description: '',
            isActive: false,
            categoryId: 0
        }
        const result = await collection.insertOne({name: pName, price: pPrice, imageUrl: pImageUrl, description: pDescription, isActive: pIsActive, categoryId: pCategoryId}).then((result) => {
            console.log(result);
            if(result)
            {
                productObject = {
                    id: result['insertedId'],
                    name: pName,
                    price: pPrice,
                    imageUrl: pImageUrl,
                    description: pDescription,
                    isActive: pIsActive,
                    categoryId: pCategoryId
                } 
            }

        });

        client.close();
        return productObject;
        

    }
}