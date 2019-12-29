import React from 'react'

export default function ShowInput(props) {
    return (
        <div>
            <div className="container my-4 w-50">
                        <input type="text" placeholder="Search..." className="form-control p-3" onChange={(e)=> props.getInput(e.target.value)}/>
           </div>
           {/* <div className="row"> <img src="https://i.pinimg.com/originals/39/5c/bd/395cbdc769cbbc96a8d123a5f1f16e80.jpg" className="img-fluid" />
                    </div> */}
                    </div>
          
       
    )
}
