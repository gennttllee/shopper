import { useState, useEffect } from 'react'
import './history.css'
import { Link } from 'react-router-dom';

export default function History() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const store = localStorage.getItem('store')
        if (store) {
            const real = JSON.parse(store)
            setHistory(real)
        } else {
            setHistory([])
        }
    }, [history]);

    const format = () => {
        if (window.confirm('are you sure you want to format your history ?')) {
            localStorage.clear('store')
            window.alert("Done");
        } else {
            window.alert('cancelled')
        }
    }

    const total = history.reduce((a, c) => {
        return a + c.bill
    }, 0)

    const totalItems = history.reduce((a, c) => {
        return a + c.quantity
    }, 0)

    return (
        <div className='history'>
            <div className='contain'>
                <h1>History</h1>
                <div className='float'>
                    {history.length > 0 ? history.map((data, index) => <div className='child' key={index}>
                        <hp className='p'>{data.itemName}</hp>
                        <p className='p'>  <span className='span'>N</span>{data.price}</p>
                        <p className='p'>{data.quantity}</p>
                        <p ><span className='span'>N</span>{data.bill}</p>
                    </div>) : <h3>No history saved</h3>}
                </div>
                <div className='foot'>
                    <h4 className='h3'>Total items : {totalItems}</h4>
                    <h3 className='h4'>Total Bill : <span className='span'>N</span>{total}</h3>
                    <Link to='/'>
                        <button className='btn3'> Back</button>
                    </Link>
                    <button className='btn4' onClick={format}>Format</button>
                </div>
            </div>
        </div>
    )
}
