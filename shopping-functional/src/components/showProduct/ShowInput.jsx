import React from 'react'

export default function ShowInput(props) {
    return (
        <div>
            <div className="container my-4">
                        <input type="text" placeholder="Search..." className="form-control" onChange={(e)=> props.getInput(e.target.value)}/>
                    </div>
            </div>
       
    )
}
