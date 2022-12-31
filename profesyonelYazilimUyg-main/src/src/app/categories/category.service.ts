import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment, mongoEnvironment } from 'src/environments/environment';
import { Category } from './category.model';
import { MongoClient } from 'mongodb';

@Injectable()
export class CategoryService {

  private url = environment.database_url;

  constructor(private http: HttpClient) { }

  /*

  Category Model
  export interface Category {
    id: any;
    name: string;
}

  */

async connect() {
  const client = new MongoClient(mongoEnvironment.connectionString);
  await client.connect();
  return client;
}


  async getCategories(): Promise<Category[]> {
      //get categories from mongodb
  const client = await this.connect();
  const db = client.db('angular');
  const collection = db.collection('categories');
  var categories: Category[] = [];
  const categoriesCursor = await collection.find().toArray().then((result) => {
      console.log(result);
      if(result)
      {
          result.forEach((category) => {
              categories.push({
                  id: category['id'],
                  name: category['name']
              })
          })
      }});

  client.close();
  return categories;

  }

async createCategory(category: Category): Promise<Category> {
    //create category in mongodb
    const cName = category.name;
    const client = await this.connect();
    const db = client.db('angular');
    const collection = db.collection('categories');
    var categoryObject: Category ={
        id: '',
        name: ''
    }
    const result = await collection.insertOne({name: cName}).then((result) => {
      if(result)
      {
        categoryObject = {
          id: result['insertedId'],
          name: cName
        }
      }
    });

    client.close();
    return categoryObject;
}

}
