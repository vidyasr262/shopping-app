import React, { useState } from 'react'
import Axios from 'axios';


export default function Register(props) {
    const [userName, setUserName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passWord, setPassWord] = useState('')
    const [cPassWord, setCpassWord] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')

    

    const allData = {
        userName: userName,
        emailId: emailId,
        phoneNumber: phoneNumber,
        passWord: passWord,
        cPassWord: cPassWord,
        gender: gender,
        role: role

    }

    const saveData = (event) => {
        event.preventDefault();
        console.log("Form data ", allData)

        const formData = allData;
        const url = 'https://shopping-22a16.firebaseio.com/register.json'

        Axios.post(url, formData)
            .then((response) => {
                console.log("Success ", response)

                if (response.status === 200) {
                    //Navigate propgramatically
                    props.history.push('/login')
                }
            }).catch((err) => {
                console.log("Error message ", err)
            })
    }


    return (

        <div>
            <div className="col-md-4 offset-md-4 mt-4 p-3 rounded" style={{ backgroundColor: "#27273c30" }}>
                <h2 className="text-center pb-3">Register</h2>
                <form onSubmit={saveData}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter username" name="userName" value={userName} onChange={(e) => { setUserName(e.target.value) }} />


                    </div>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter email" name="emailId" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />


                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control inputbox" placeholder="Enter password" name="passWord" value={passWord} onChange={(e) => { setPassWord(e.target.value) }} />


                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control inputbox" placeholder="Enter confirm password" name="cPassWord" value={cPassWord} onChange={(e) => { setCpassWord(e.target.value) }} />


                    </div>
                    <div className="form-group">
                        <label>Phone number:</label>
                        <input type="number" className="form-control inputbox" placeholder="Enter phone number" name="phoneNumber" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />


                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select name="select" onChange={(e)=>setRole(e.target.value)} className="form-control inputbox">
                            <option value="">---Select One Role ---</option>
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select>

                    </div>

                    

                    <div className="form-group">
                        <label>Gender:</label>
                        <input type="radio" name="gender" className="ml-4"  value="male" onChange={(e)=>setGender(e.target.value)} /> Male
                        <input type="radio" name="gender" className="ml-4" value="female" onChange={(e)=>setGender(e.target.value)}  /> Female
                        <input type="radio" name="gender" className="ml-4" value="other" onChange={(e)=>setGender(e.target.value)}  /> Other

                   </div>
                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}
