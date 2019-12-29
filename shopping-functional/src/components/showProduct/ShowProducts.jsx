import React, { useState, useEffect } from 'react'
import Axios from 'axios'
// import { Button, Modal } from 'react-bootstrap'
import './ShowProduct.css'
import ShowInput from './ShowInput'


export default function ShowProducts() {

    const [products, setProducts] = useState([])
    const [selectedData, setSelected] = useState({ allselect: [] })

    const [wish, setWish] = useState(true)

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
                    id: key,


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
                ...filterData[key],
                click: !wish
            })
            console.log("dataaaa ", newData)

            if (filterData) {

                setSelected({
                    allselect: newData
                })
                console.log("data selected ", selectedData)
            } else {
                setSelected({ allselect: [] })
            }


        }
    }

    // Add Cart
    const addCart = (val) => {
        console.log("addcart val ", val.id)
        const id = val.id
        let filter = products.filter(value => value.id.includes(val.id))
        console.log("addcart filter ", filter)

        const url = 'https://shopping-22a16.firebaseio.com/addcart/.json'
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


    // Add Wishlist
    const addWish = (val) => {
        console.log("addwish val ", val.id)

        let w = selectedData.allselect;
        w.map((e) => {
            if (e.id === val.id) {
                return val.click = !val.wish
            }
            return val
        })
        setSelected({
            allselect: w
        })


        let filter = products.filter(value => value.id.includes(val.id))
        console.log("addwish filter ", filter)

        const url = 'https://shopping-22a16.firebaseio.com/addwishlist.json'
        Axios.post(url, val)
            .then((response) => {
                console.log("Success wishlist", response)

                if (response.status === 200) {
                    console.log("Successfully added ", response)
                    //                     setWish({
                    //                         wish: true
                    //                     })
                    // console.log("wish", wish)
                }
            }).catch((err) => {
                console.log("Error message ", err)
            })

    }

    // remove wish
    const removeWish = async (accToDelete) => {
        console.log("delete data", accToDelete)
        const id = accToDelete.id;
        console.log("my id ", id)
        const url = 'https://shopping-22a16.firebaseio.com/addwishlist/' + id + '/.json'

        try {
            const response = await Axios.delete(url)

            const myAccounts = [...products]           // In UI for deleting
            console.log("myaccounts ", myAccounts)

            const index = myAccounts.indexOf(accToDelete)
            myAccounts.splice(index, 1)
            setProducts(myAccounts)
            setWish({
                wish: false
            })
            console.log("wish", wish)
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

                <h2 className="p-4 text-center">Product Lists</h2>

                <ShowInput getInput={inputData} />

                <div className="row">
                    {selectedData.allselect.map((val) => {
                        // {products.allproducts.map((val) => {
                        return (

                            <div className="col-sm-6 col-md-3 ">
                                <div className="card my-3" >
                                    <div key={val.id} >
                                        {!val.click ? <i className="fa fa-heart-o" onClick={() => addWish(val)}></i>
                                            : <i className="fa fa-heart" onClick={() => removeWish(val)}></i>}

                                        <div className="card-header text-center"><img src={val.image} className="p" max-width="200px" height="170px" /></div>
                                        <div className="card-body">
                                            {/* <i class="fa fa-heart"></i> */}
                                            <div>{val.productName}</div>
                                            <div className="">Brand: {val.brand}</div>
                                            <div className="">₹ {val.price}</div>
                                            <div className="text-center py-3"><button className="btn btn-outline-success" onClick={() => addCart(val)}>Add Cart</button></div>
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
