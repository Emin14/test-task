import { useEffect, useState } from 'react'
import md5 from 'md5';
import Catalog from './catalog/Catalog';
import './App.css'


function App() {

  const [products, setProducts] = useState(null)
  const [pagination, setPagination] = useState(1)

  const apiURL = 'http://api.valantis.store:40000/';
  const apiKey = 'Valantis';


  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');

  const authString = md5(`${apiKey}_${timestamp}`);
  
  useEffect(() => {
    fetch(`${apiURL}`, {
      method: 'POST',
      headers: {
        'X-Auth': authString,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "action": "get_ids",
        "params": {
          "offset": 0,
          "limit": 50
        }
      })
    })
    .then(data => data.json())
    // .then(data => console.log(data))
    .then(data => {

      fetch(`${apiURL}`, {
        method: 'POST',
        headers: {
          'X-Auth': authString,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          	"action": "get_items",
          	"params": {"ids": [...data.result]}
          })
      })
      .then(data => data.json())
      .then(data => {
        const results = []
        data.result.forEach(item => {
          let cityId = results.find(result => result.id === item.id)
          if(!cityId) {
            results.push(item)
          }
        })
        return results
      })
      .then(data => setProducts(data))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }, [])

  console.log(products)

    return (
      <div>
        <Catalog products={products}/>
      </div>
    )
}

export default App
