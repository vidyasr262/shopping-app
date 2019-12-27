import React, { useContext } from 'react'
import UserContext from '../../context/userContext'
import ProductContext from '../../context/productContext'


export default function MyProfile(props) {
    const context = useContext(UserContext)
    const con = useContext(ProductContext)
    
        console.log(props.action)

    
    return (
        <div>
<h1>My Profile {props.action}</h1>


        </div>
    )
}
