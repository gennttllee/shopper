import './App.css';
import { useState } from 'react';
import './Todo.css';
import { isVisible } from '@testing-library/user-event/dist/utils';


function App() {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState();
    const [total, setTotal] = useState();
    const [edit1, setEdit1] = useState(null);
    const [newNumb, setNewNumb] = useState(null);
    const [amount, setAmount] = useState();

    const changes = (e) => {
        setShow(e.target.value);
    }

    const changes1 = (e) => {
        setEdit1(e.target.value);
    }

    const changes2 = (e) => {
        setNewNumb(e.target.value);
    }

    const clicker = () => {
        const newItem = {
            itemName: show,
            quantity: 1,
            isSelected: false,
            isVisible: false,
            price: 1,
            bill: 1,
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        let amos = 0;
        let harry = 0;
        newItems.forEach(element => {
            amos += element.bill;
            harry += element.price;
        });
        setAmount(amos);
        setTotal(harry);
        save();
        setShow('');
    }


    const quantityCounter = (index) => {
        const newItems = [...items];
        let quant = newItems[index].quantity;
        const para = newItems[index].price;
        if (newItems[index].isSelected) {
            const mama = calcBill(para, 0);
            newItems[index].bill = mama;
            calculateAmount();
            let totalQuantity = 0;
            newItems.forEach(element => {
                totalQuantity += element.quantity;
            });
            setTotal(totalQuantity - quant);
            setItems(newItems);
        } else {
            const mama = calcBill(para, quant);
            newItems[index].bill = mama;
            setItems(newItems);
            calculateAmount();
            let totalQuantity = 0;
            newItems.forEach(element => {
                totalQuantity += element.quantity;
            });
            setTotal(totalQuantity);
            setItems(newItems);
        };
    };

    const toggle = (index) => {
        const newItems = [...items];
        newItems[index].isSelected = !newItems[index].isSelected;
        quantityCounter(index);
        setItems(newItems);
    };


    const increase = (index) => {
        const newItems = [...items];
        newItems[index].quantity++;
        let x = newItems[index].quantity
        let y = newItems[index].price
        const mama = calcBill(x, y);
        newItems[index].bill = mama;
        setItems(newItems);
        calculateTotal();
        calculateAmount()
    }

    const calcBill = (a, b) => {
        return a * b
    };

    const decrease = (index) => {
        const newItems = [...items];
        newItems[index].quantity--;
        let x = newItems[index].quantity
        let y = newItems[index].price
        const mama = calcBill(x, y);
        newItems[index].bill = mama;
        setItems(newItems);
        calculateTotal();
        calculateAmount();
    }

    const edit = (index) => {
        const newItems = [...items];
        newItems[index].isVisible = !newItems[index].isVisible;
        setItems(newItems);
    }

    function updater(index) {
        const newItems = [...items];
        if (edit1 !== null && newNumb !== null) {
            newItems[index].price = newNumb;
            newItems[index].itemName = edit1;
            setItems(newItems);
            setEdit1(null);
            setNewNumb(null)
        } else if (edit1 !== null && newNumb === null) {
            newItems[index].itemName = edit1;
            setItems(newItems);
            setEdit1(null);
        } else if (edit1 === null && newNumb !== null) {
            newItems[index].price = newNumb;
            setItems(newItems);
            setNewNumb(null)
        }
        let x = newItems[index].quantity
        let y = newItems[index].price
        const mama = calcBill(x, y);
        newItems[index].bill = mama;
        setItems(newItems);
    }

    const update = (index) => {
        const newItems = [...items];
        updater(index)
        calculateTotal();
        calculateAmount();
        save();
        newItems[index].isVisible = !newItems[index].isVisible;
    }

    const calculateTotal = () => {
        let totalQuantity = 0;
        const newItems = [...items];
        newItems.forEach(element => {
            totalQuantity += element.quantity;
        });
        setTotal(totalQuantity)
    };

    const calculateAmount = () => {
        let amos = 0;
        const newItems = [...items];
        newItems.forEach(element => {
            amos += element.bill;
        });
        setAmount(amos);
    }

    function clearAll() {
        if (window.confirm('Do you want to clear your history as well ? if yes: ok else: cancel')) {
            setItems([]);
            setTotal();
            setAmount();
            format();
        } else {
            setItems([]);
            setTotal();
            setAmount();
            alert('Screen cleared successfully')
        }
    };

    function save() {
        if (localStorage.getItem('my data') === null) {
            localStorage.setItem('my data', JSON.stringify(items))
            alert('database created successfully')
        } else {
            const data = localStorage.getItem('my data');
            const myData = JSON.parse(data);
            items.forEach(element => {
                myData.push(element)
            });
            localStorage.setItem('my data', JSON.stringify(myData))
        }
    };

    function load() {
        if (localStorage.getItem('my data') === null) {
            alert('error no history available')
        } else {
            const data1 = localStorage.getItem('my data');
            const myData1 = JSON.parse(data1);
            setItems(myData1);
            let baby = 0;
            let dammy = 0;
            myData1.forEach(element => {
                baby += element.bill;
                dammy += element.quantity;
            });
            setTotal(dammy);
            setAmount(baby);
        }
    };

    function format() {
        if (window.confirm('Are you really sure you want to wipe your history ?')) {
            localStorage.clear();
            alert('Screen and history cleared successfully')
        } else {
            setItems([]);
            setTotal();
            setAmount();
            alert('Screen cleared successfully')
        }
    }

    let d = new Date();
    const year = d.getFullYear();

    return (
        <div className='app'>
            <div className='container1'>
                <h1 className='tester'>MY SHOPPER APP</h1>
                <input className='input1' placeholder='Enter product name...' type='text' name='text' onChange={changes} value={show}></input>
                <button className='btn1' onClick={clicker} > Add</button>
                <div className='empty1'></div>
            </div>
            <div className='empty'></div>
            <div className="container2">
                <div className='container3'>
                    {items.map((item, index) => (
                        <div className='ife'>
                            <div id="chisom" className='chisom' >
                                <div className='blessing'>
                                    <div className='cover' onClick={() => toggle(index)}>
                                        {item.isSelected ? (
                                            <li className='completed'>{item.itemName}</li>
                                        ) : (
                                            <li className='item'> <input className='radio' type='radio'></input>{item.itemName}</li>
                                        )}
                                    </div>
                                    {item.isSelected ? (
                                        <div className='opposite'></div>
                                    ) : (
                                        <div className='div1'>
                                            <button className='btn5' onClick={() => edit(index)}>
                                                <span className='price'> <span className='naira'>N</span>{item.price}</span>
                                            </button>
                                            <div className='divb'>
                                                <button className='btn2'>
                                                    <span onClick={() => decrease(index)} class="material-icons clone "> arrow_back_ios </span>
                                                </button>
                                                <span className='span1'>{item.quantity}</span>
                                                <button className='btn2'>
                                                    <span onClick={() => increase(index)} class="material-icons clone"> arrow_forward_ios </span>
                                                </button>
                                            </div>
                                            <span className='bill'> <span className='naira'>N</span>{item.bill}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={isVisible && 'diver'}>
                                    <span className='amount'>
                                    </span>
                                    {item.isVisible && (
                                        <div className='visible' >
                                            <input className='input2' placeholder='Update product name...' type='text' name='newname' onChange={changes1} value={edit1}></input>
                                            <input className='input2' placeholder='Update product price...' type='number' name='number' onChange={changes2} value={newNumb}></input>
                                            <button className='btn3' onClick={() => update(index)}>update</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='empty3'></div>
                <div className='footer'>
                    <div className='vera'>
                        <h2 className='h2'> {total} Items<span className='alison'> <span className='naira'>N</span>{amount}</span></h2>
                        <button className='clear' onClick={clearAll}>Clear</button>
                        <button className='clear' onClick={load}>History</button>
                    </div>
                    <div className="realf">
                        <a className='link' target='blank' href='https://www.mwprofile.com/' alt='my portfolio' >Visit my portfolio with a a click</a>
                        <p className='para2'>
                            <span className='material-icons'> copyright </span>
                            <span>{year} All rights reserved by Mark Williams</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
