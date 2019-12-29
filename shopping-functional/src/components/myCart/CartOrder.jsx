import React from 'react'

export default function CartOrder(props) {
    return (
        <div>
            <div className="card mt-3">
                <div className="card-header"><strong>PRICE DETAILS</strong></div>
                <div className="card-body row">
                    <div className="col-sm-6"> Price ({props.action} items):</div>
                    <div className="col-sm-6">{props.a}</div>

                    <div className="col-sm-6 pt-3"> Delivery Fee:</div>
                    <div className="col-sm-6 pt-3">0</div>
                </div>
                <div className="card-footer"><strong>Total Payable:</strong> {props.b}</div>
            </div>


        </div>
    )
}
