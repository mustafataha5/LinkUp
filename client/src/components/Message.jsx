import React from 'react'

const Message = ({ name, message, color, mflex }) => {
    return (
        <div className={'m-2  text-white   d-flex justify-content-' + mflex}>
            <div className={'rounded-4 p-3 m-3 w-50 bg-'+color} >
                <small>{name} said</small>
                <h6>{message}</h6>
            </div>
        </div>
    )
}

export default Message
