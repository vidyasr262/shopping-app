import React, { useState, useEffect } from 'react'
import Axios from 'axios'
// import { Button, Modal } from 'react-bootstrap'
import './ShowProduct.css'
import ShowInput from './ShowInput'


export default function ShowProducts() {

    const [products, setProducts] = useState([])
    const [selectedData, setSelected] = useState([])

    useEffect(() => {

        getAllAccounts();

    }, [])


    const getAllAccounts = () => {
        const url = 'https://shopping-22a16.firebaseio.com/accounts.json'
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

    // Search
    const inputData = (e) => {
        let data = e;
        let filterData = products.filter(value => value.productName.toLowerCase().match(data))
        console.log("data ", filterData)
        let newData = []
        for (let key in filterData) {
            newData.push({
                ...filterData[key]
            })
            console.log("dataaaa ", newData)

            if (filterData) {

                setSelected(newData)
                console.log("data selected ", selectedData)
            } else {
                setSelected([])
            }


        }
    }

    // Add Cart
    const addCart = (val) => {
        const url = 'https://shopping-22a16.firebaseio.com/addcart.json'
        Axios.post(url, val)
        .then((response) => {
            console.log("Success cart", response)

            if (response.status === 200) {
                console.log("Successfully added ", response)
                
            }
        }).catch((err) => {
            console.log("Error message ", err)
        })

    }



    return (
        <div>
            <div className="container my-4">

                <h2 className="p-4 text-primary text-center">Product Lists</h2>

                <ShowInput getInput={inputData} />

                <div className="row">
                    {selectedData.map((val) => {
                        // {products.allproducts.map((val) => {
                        return (

                            <div className="col-sm-6 col-md-3 ">
                                <div className="card my-3" >
                                    <div key={val.id} >
                                        <i class="fa fa-heart-o"></i>
                                        <div className="card-header text-center"><img src={val.image} className="p" max-width="200px" height="170px" /></div>
                                        <div className="card-body">
                                            {/* <i class="fa fa-heart"></i> */}
                                            <div>{val.productName}</div>
                                            <div className="">Brand: {val.brand}</div>
                                            <div className="float-left mr-4">₹ {val.price}</div>
                                            <div className="ml-4">Quantity: {val.quantity}</div>
                                            <div className="text-center py-3"><button className="btn btn-primary" onClick={() => addCart(val)}>Add Cart</button></div>
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
