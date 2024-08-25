import React, { useEffect, useRef } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

const Chat = ({ reciver, owner, messages, createMessage }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (newMessage) =>{
        createMessage(owner._id,reciver._id,newMessage)
    }
    return (
        <div style={{ height: '90%', position: 'fixed', right: 0, bottom: 0, width: '66.666%' }}>
            <div className="m-3 mt-5  p-3 border border-1 border-dark overflow-auto" 
            style={{ height: 'calc(90% - 120px)', borderRadius:"10px ",backgroundColor: 'white' }}>
                {messages.length > 0 &&
                    messages.map((message, i) => (
                        owner._id !== message.sender ? (
                            <Message
                                key={i}
                                name={reciver.firstName}
                                mflex={'start'}
                                message={message.content}
                                color={'info'}
                            />
                        ) : (
                            <Message
                                key={i}
                                name={owner.firstName}
                                mflex={'end'}
                                message={message.content}
                                color={'primary'}
                            />
                        )
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className='w-80 px-3 mx-5'>
                <MessageForm onFromSubmit={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;
