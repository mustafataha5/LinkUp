import React, { useEffect, useRef } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

const Chat = ({ name, messages, renderMessage }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div style={{ height: '90%', position: 'fixed', right: 0, bottom: 0, width: '66.666%' }}>
            <div className="m-5 p-3 border border-1 border-dark overflow-auto" style={{ height: 'calc(90% - 100px)' }}>
                {messages.length > 0 &&
                    messages.map((message, i) => (
                        name !== message.name ? (
                            <Message
                                key={i}
                                name={message.name}
                                mflex={'start'}
                                message={message.message}
                                color={'primary'}
                            />
                        ) : (
                            <Message
                                key={i}
                                name={'You'}
                                mflex={'end'}
                                message={message.message}
                                color={'info'}
                            />
                        )
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className='w-80 px-3 mx-5'>
                <MessageForm renderMessage={renderMessage} />
            </div>
        </div>
    );
};

export default Chat;
