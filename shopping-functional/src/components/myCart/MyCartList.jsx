import React, { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios';


export default function MyCartList() {

    const [products, setProducts] = useState([])
const [accounts, setAccounts] = useState([])

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
                console.log("Fetch account ", fetchAccount)
                setProducts(fetchAccount)
                console.log("account alllll ", products)
            }

        })
            .catch((err) => {
                console.log('Error ', err)
            })

    }

    const  deleAccount = async (accToDelete) => {
        console.log("delete data", accToDelete)
        const id = accToDelete.id;
        const url = 'https://shopping-22a16.firebaseio.com/addcart/' + id + '/.json'

        try {
            const response = await Axios.delete(url)

            const myAccounts = [...accounts]           // In UI for deleting
            const index = myAccounts.indexOf(accToDelete)
            myAccounts.splice(index, 1)
            setAccounts({
                accounts: myAccounts
            })
        

            //Unless, until it is required to do make unnecessary calls to server  // for deleting
            //this.getAllAccount()

            console.log("Response ", response)
        } catch (error) {
            console.log('Error ', error)
        }
    }



    return (
        <div>
            <div className="container my-4">

                <h2 className="p-4 text-primary text-center">MyCart</h2>



                <div className="row">
                    {products.map((val) => {
                        // {products.allproducts.map((val) => {
                        return (

                            <div className="col-sm-6 col-md-3 ">
                                <div className="card my-3" >
                                    <div key={val.id} >
                                        {/* <i class="fa fa-heart-o"></i> */}
                                        <div className="card-header text-center"><img src={val.image} className="p" max-width="200px" height="170px" /></div>
                                        <div className="card-body">
                                            <div>{val.productName}</div>
                                            <div className="">Brand: {val.brand}</div>
                                            <div className="float-left mr-4">₹ {val.price}</div>
                                            <div className="ml-4">Quantity: {val.quantity}</div>
                                            <div><button className="btn bg-danger" onClick={() => deleAccount(val)}>Delete</button></div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
