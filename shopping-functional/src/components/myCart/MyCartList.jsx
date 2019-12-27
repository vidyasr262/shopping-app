import React, { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios';
import CartOrder from './CartOrder';


export default function MyCartList() {

    const [products, setProducts] = useState({ all: [] })
    const [accounts, setAccounts] = useState([])
    const [quantity, setQuntity] = useState('')

    useEffect(() => {

        getAllAccounts();

    }, [])


    const getAllAccounts = () => {
        const url = 'https://shopping-22a16.firebaseio.com/addcart.json'

        Axios.get(url).then((response) => {
            console.log("Response ", response)

            let fetchAccount = []
            for (let key in response.data) {
                let account = response.data[key]
                fetchAccount.push({
                    ...account,
                    id: key

                }
                )
                console.log("account ", account)
                console.log("Fetch account ", fetchAccount.length)
                setProducts({
                    all: fetchAccount
                })
                console.log("account alllll ", products.all)
            }

        })
            .catch((err) => {
                console.log('Error ', err)
            })

    }

    const deleAccount = async (accToDelete) => {
        console.log("delete data", accToDelete)
        const id = accToDelete.id;
        console.log("my id ", id)
        const url = 'https://shopping-22a16.firebaseio.com/addcart/' + id + '/.json'

        try {
            const response = await Axios.delete(url)

            const myAccounts = [...products.all]           // In UI for deleting
            console.log("myaccounts ", myAccounts)

            const index = myAccounts.indexOf(accToDelete)
            myAccounts.splice(index, 1)
            setProducts({
                all: myAccounts
            })


            //Unless, until it is required to do make unnecessary calls to server  // for deleting
            //this.getAllAccount()

            console.log("Response ", response)
        } catch (error) {
            console.log('Error ', error)
        }
    }


let total = 0;
    return (
        <div>
            <div className="container my-4">

                <h2 className="p-4 text-primary text-center">MyCart</h2>



                <div className="row">
                    {products.all.map((val) => {
                        // {products.allproducts.map((val) => {
                        return (

                            <div className="col-sm-6 col-md-6 ">
                                <div className="card my-3" >
                                    <div key={val.id} >
                                        {/* <i class="fa fa-heart-o"></i> */}
                                        <div className="card-header text-center"><img src={val.image} className="p" max-width="200px" height="170px" /></div>
                                        <div className="card-body">
                                            <div>{val.productName}</div>
                                            <div className="">Brand: {val.brand}</div>
                                            <div className="">₹ {val.price}</div>
                                            {/* <div className="">Quantity: {val.quantity}</div> */}
                                            <div>Quantity:</div>
                                            <select name="select" onChange={(e)=>setQuntity(e.target.value)} className="my-3">
                                                <option value="">--Select--</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                          <p style={{display: "block"}}>  {total = Number(val.price)*Number(quantity) }</p>
                                            <div><button className="btn bg-danger" onClick={() => deleAccount(val)}>Delete</button></div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    })}
                    <div className="col-sm-6 col-md-6 ">
                        <CartOrder action={products.all.length} a={total}/>
                    </div>
                </div>

                <button className="btn btn-success">Place order</button>
            </div>
        </div>
    )
}
