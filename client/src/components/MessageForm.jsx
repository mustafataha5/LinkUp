import React, { useState } from 'react'

const MessageForm = ({onFromSubmit}) => {
    const [value,setValue] = useState('') ;
    // const[Error,setErro] = useState('') ; 
    const submitHandle = (e) => {
        e.preventDefault() ; 
        if(value.length<1){
            return ; 
        }
        onFromSubmit(value)
       // renderMessage(value) ; 
        setValue('');
    }      
  return (
    <div>
      <form className='d-flex flex-row justify-contents-start ' onSubmit={submitHandle}>
        <input className='flex-fill p-2 mx-3' type="text" value={value} required onChange={(e)=>setValue(e.target.value)} placeholder='Enter Message' />
        <button className='btn btn-primary '>Send</button>
      </form>
    </div>
  )
}

export default MessageForm
