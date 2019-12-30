import React, { useState, useEffect } from 'react'
import Axios from 'axios';


export default function MyWishList() {

    const [products, setProducts] = useState({all:[]})
    useEffect(() => {

        getAllAccounts();

    }, [])

    let comments = JSON.parse(localStorage.getItem('document'));

    const getAllAccounts = () => {
        const url = 'https://shopping-22a16.firebaseio.com/addwishlist.json'
        // const url = `https://shopping-22a16.firebaseio.com/addwishlist${comments.phoneNumber}.json`

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
                setProducts({
                    all: fetchAccount})
                console.log("account alllll ", products)
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
        const url = 'https://shopping-22a16.firebaseio.com/addwishlist/' + id + '/.json'
        // const url = `https://shopping-22a16.firebaseio.com/addwishlist${comments.phoneNumber}/${id}.json`

        try {
            const response = await Axios.delete(url)

            const myAccounts = [...products.all]           // In UI for deleting
            console.log("myaccounts ", myAccounts)

            const index = myAccounts.indexOf(accToDelete)
            myAccounts.splice(index, 1)
            setProducts({
                all: myAccounts})


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

                <h2 className="p-4  text-center">MyWish List</h2>

                <div className="row">
                    {products.all.map((val) => {
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
                                            <div className="">₹ {val.price}</div>
                                        
                                            <div><button className="btn bg-danger my-3" onClick={() => deleAccount(val)}>Remove</button></div>
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
