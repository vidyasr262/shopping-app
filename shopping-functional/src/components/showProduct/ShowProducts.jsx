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

    // let comments = JSON.parse(localStorage.getItem('document'));
    // console.log("localStorage", comments.phoneNumber)

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
                // console.log("account ", account)
                // console.log("Fetch account ", fetchAccount)
                setProducts(fetchAccount)
                // console.log("account alllll ", products)
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
        // console.log("data ", filterData)
        let newData = []
        for (let key in filterData) {
            newData.push({
                ...filterData[key],
                click: !wish
            })
            // console.log("dataaaa ", newData)

            if (filterData) {

                setSelected({
                    allselect: newData
                })
                // console.log("data selected ", selectedData)
            } else {
                setSelected({ allselect: [] })
            }


        }
    }

    // Add Cart
    const addCart = (val) => {
        let userId = JSON.parse(localStorage.getItem('userid'));
        console.log("user id...", userId)
        console.log("addcart val ", val)
        const id = val.id
       
        let formData = {
        ...val,
            userId: userId
        }
        console.log("data object ", formData)
         const url = 'https://shopping-22a16.firebaseio.com/addcart.json'
        // const url = `https://shopping-22a16.firebaseio.com/addcart${comments.phoneNumber}.json`

        Axios.post(url, formData)
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

        let userId = JSON.parse(localStorage.getItem('userid'));
        console.log("user id...", userId)
        const id = val.id
       
        let formData = {
        ...val,
            userId: userId
        }

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


        const url = 'https://shopping-22a16.firebaseio.com/addwishlist.json'
        // const url = `https://shopping-22a16.firebaseio.com/addwishlist${comments.phoneNumber}.json`

        Axios.post(url, formData)
            .then((response) => {
                console.log("Success wishlist", response)

                if (response.status === 200) {
                    console.log("Successfully added ", response)
                    
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
                                            : <i className="fa fa-heart" onClick={() => addWish(val)}></i>}

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
