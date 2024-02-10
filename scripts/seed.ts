import * as dotenv from "dotenv"
import { watchUpdates } from './utility';
import { MeiliSearch } from 'meilisearch';
import path from "path";
import data from './data.json';

dotenv.config({
  path: path.resolve(path.dirname(__dirname), ".env.local")
})

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST_NAME || "http://localhost:7700",
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})

const INDEX_NAME = 'products'
const index = client.index(INDEX_NAME)

const setup = async () => {
  try {
    console.log(`Adding Filterable and Sortable Attributes to "${INDEX_NAME}"`)
    await index.updateFilterableAttributes([
      'brand',
      'category',
      'tag',
      'rating',
      'reviews_count',
      'price',
    ])
    await index.updateSortableAttributes(['reviews_count', 'rating', 'price'])
  
    console.log(`Adding Documents to "${INDEX_NAME}"`)
    await index.updateDocuments(data)
    console.log('=============')
  
    await watchUpdates(client, INDEX_NAME)
  }
  catch(e: any){
    console.error(e)
  }
}

setup();
