import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './App.css'

const App = () => {
  const [item, setItem] = useState()
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState()
  const [quant, setQuant] = useState()
  const [change, setChange] = useState()

  useEffect(() => {
    const store = localStorage.getItem('main')
    if (store) {
      const real = JSON.parse(store)
      if (products.length < 1) {
        setProducts(real)
      }
    } else {
      setProducts([])
    }
  }, []);

  const babe = [...products]
  const id = products.length > 0 ? babe[0].id : 0

  const addItem = () => {
    if (item) {
      const temp = {
        id: id + 1,
        itemName: item,
        quantity: 1,
        isVisible: false,
        price: 500,
        bill: 500,
      }
      const newProduct = [...products];
      newProduct.unshift(temp)
      setProducts(newProduct);
      storage(temp);
    }
  }

  const storage = (temp) => {
    const store = localStorage.getItem('store');
    const main = localStorage.getItem('main');
    if (store) {
      const myStore = JSON.parse(store);
      myStore.unshift(temp);
      localStorage.setItem('store', JSON.stringify(myStore));
    } else {
      const myStore = [];
      myStore.unshift(temp);
      localStorage.setItem('store', JSON.stringify(myStore));
    }
    if (main) {
      const myStore = JSON.parse(main);
      myStore.unshift(temp);
      localStorage.setItem('main', JSON.stringify(myStore));
    } else {
      const myStore = [];
      myStore.unshift(temp);
      localStorage.setItem('main', JSON.stringify(myStore));
    }
    setItem('')
  }

  const add = (e) => {
    setItem(e.target.value)
  }

  const pressed = (e) => {
    if (e.key === 'Enter' || e.key === 'Done') {
      addItem();
    }
  }

  const edit = (product) => {
    setChange()
    let meme = [...products];
    meme.forEach(item => {
      if (item.id === product.id) {
        item.isVisible = !item.isVisible
      }
    })
    setProducts(meme)
  }

  const deleted = (product, index) => {
    if (product.isVisible) {
      let meme = [...products]
      if (price) {
        meme[index].price = price;
        meme[index].bill = price * meme[index].quantity
        setPrice('')
      }
      if (quant) {
        meme[index].quantity = quant;
        meme[index].bill = quant * meme[index].price
        setQuant('')
      }
      meme[index].isVisible = !meme[index].isVisible
      const myData = localStorage.getItem('store');
      const data = JSON.parse(myData)
      let newData = data.filter(element => {
        return element.itemName !== product.itemName
      })
      newData.push(meme[index])
      localStorage.setItem('store', JSON.stringify(newData))
      setProducts(meme)
      localStorage.setItem('main', JSON.stringify(meme))
    } else {
      const finder = products.filter(element => {
        return element !== product
      })
      setProducts(finder);
      localStorage.setItem('main', JSON.stringify(finder))
    }
  }

  const total = products.reduce((a, c) => {
    return a + parseInt(c.bill)
  }, 0)

  const totalItems = products.reduce((a, c) => {
    return a + parseInt(c.quantity)
  }, 0)

  const clear = () => {
    localStorage.removeItem('main')
    setProducts([])
  }

  return (
    <div className='app'>
      <div className='first'>
        <div className='container'>
          <h1 className='h1'>MY SHOPPER APP</h1>
          <div className='right'>
            <input className='input' value={item} onKeyDown={pressed} onChange={add} type='text' placeholder='Enter Item here' required></input>
            <button onClick={addItem} className='btn5'>Enter</button>
          </div>
        </div>
      </div>
      <div className='container1'>
        <div className='mark'>
          <div className='container'>
            <div className='flex'>
              {products.length > 0 ? products.map((product, index) => <div className='diver' key={index}>
                <div className='div'>
                  <p className='p' >{product.itemName}</p>
                  <p className='p'><span className='span'>N</span>{product.price}</p>
                  <p className='p'>{product.quantity}</p>
                  <p> <span className='span'>N</span>{product.bill}</p>
                </div>
                {product.isVisible ? <div className='inputFlex'>
                  <input onFocus={() => setChange(product.id)} value={change === product.id && price} type='number' onChange={(e) => setPrice(e.target.value)} placeholder='edit price' className='input1'></input>
                  <input onFocus={() => setChange(product.id)} value={change === product.id && quant} type='number' onChange={(e) => setQuant(e.target.value)} placeholder=' edit quantity' className='input1'></input>
                </div> : null}
                <div className='btnDiv'>
                  <button onClick={() => edit(product)} className='edit'>edit</button>
                  <button onClick={() => deleted(product, index)} className='delete'>{product.isVisible ? 'update' : 'delete'}</button>
                </div>
              </div>) : <h4>No items yet , start adding items above</h4>}
            </div>
          </div>
        </div>
        <div className='empty'></div>
        <div className='btn'>
          <div className='container'>
            <h3 className='h3'>Total items : {totalItems}</h3>
            <h3 className='h4'>Total Bill : <span className='span'>N</span>{total}</h3>
            <div className='footer'>
              <button className='btn3' onClick={clear}>Clear</button>
              <Link to='/history'>
                <button className='btn4'>History</button>
              </Link>
            </div>
            <p>About the developer <a target='blank' href='https://www.mwprofile.com/'> Mark Williams</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;