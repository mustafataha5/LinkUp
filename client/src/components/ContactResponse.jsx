import React from 'react';
import ContactUsForm from './ContactUsForm';


function ContactResponse({ acknowledgmentMessage }) {
  return (
    <div className="acknowledgment-message">
      {acknowledgmentMessage ? acknowledgmentMessage : "No message to display."}
    </div>
  );
}
export default ContactResponse;
