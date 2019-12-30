import React, { useState } from 'react'
import Axios from 'axios'

export default function AddProducts(props) {

    const [productName, setProductName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')

    const [productNameErr, setProductNameErr] = useState(false)
    const [brandErr, setBrandErr] = useState(false)
    const [priceErr, setPriceErr] = useState(false)
    const [quantityErr, setQuantityErr] = useState(false)
    const [imageErr, setImageErr] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = true

        if (productName.trim().match(/^[a-zA-Z ]*$/) && productName !== '') {
            setProductNameErr(false)
        }
        else {
            setProductNameErr(true)
            return isValid

        }
        if (brand.trim().match(/^[a-zA-Z ]*$/) && brand !== '') {
            setBrandErr(false)
        }
        else {
            setBrandErr(true)
            return isValid

        }


        if (price.trim().length >0 && price !== '') {
            setPriceErr(false)
        }
        else {
            setPriceErr(true)
            return isValid

        }

        if (quantity.trim()>0 && quantity !== '') {
            setQuantityErr(false)
        }
        else {
            setQuantityErr(true)
            return isValid

        }


        if (image !== '') {
            setImageErr(false)
        }
        else {
            setImageErr(true)
            return isValid

        }

        sendCorrect(isValid)
    }

    const sendCorrect = (isValid) => {
        if (productNameErr !== true && brandErr !== true && priceErr !== true && quantityErr !== true && imageErr !== true) {
            saveData()
        }
    }

    const productData = {
        productName: productName,
        brand: brand,
        price: price,
        quantity: quantity,
        image: image,
        wishList: false,
        myOrder: false,
        myCart: false
    }

    const saveData = (event) => {

        // console.log("Props ", this.props)

        // event.preventDefault();
        console.log("Form product data ", productData)
        const formData = productData;
        console.log("Form data ", formData)

        const url = 'https://shopping-22a16.firebaseio.com/accounts.json'
        Axios.post(url, formData)
            .then((response) => {
                console.log("Success ", response)

                if (response.status === 200) {
                    console.log("Successfully added ", response)
                    //Navigate propgramatically
                    props.history.push('/showproducts')
                }
            }).catch((err) => {
                console.log("Error message ", err)
            })
    }


    return (
        <div>
            <div className="col-md-4 offset-md-4 mt-4 p-3 rounded shadow" style={{ backgroundColor: "#fff" }}>
                <h2 className="text-center pb-3">Add Products</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter product name" name="productName" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                        {productNameErr ? <p style={{ color: 'red', fontSize: '12px' }}>invalid!!!</p> : null}

                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter brand" name="brand" value={brand} onChange={(e) => { setBrand(e.target.value) }} />
                        {brandErr ? <p style={{ color: 'red', fontSize: '12px' }}>invalid!!!</p> : null}

                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" className="form-control inputbox" placeholder="Enter price" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        {priceErr ? <p style={{ color: 'red', fontSize: '12px' }}>invalid!!!</p> : null}

                    </div>
                    <div className="form-group">
                        <label>No. of Quantity:</label>
                        <input type="number" className="form-control inputbox" placeholder="Enter quantity" name="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                        {quantityErr ? <p style={{ color: 'red', fontSize: '12px' }}>invalid!!!</p> : null}

                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input type="text" className="form-control inputbox" placeholder="Add image URL" name="image" value={image} onChange={(e) => { setImage(e.target.value) }} />
                        {imageErr ? <p style={{ color: 'red', fontSize: '12px' }}>invalid!!!</p> : null}

                    </div>

                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    )
}
