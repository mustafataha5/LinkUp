import React, { useState } from 'react';
import '../css/ContactUs.css'; 

function ContactUsForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setAcknowledgmentMessage(
      `Dear ${formData.name},\n\nThank you for contacting us! We have received your message and are reviewing your inquiry. One of our team members will get back to you as soon as possible.\n\nThank you for your patience and for reaching out to us!\n\nBest regards,\nYour Company Name`
    );

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {acknowledgmentMessage && (
        <div className="acknowledgment-message">
          {acknowledgmentMessage}
        </div>
      )}
    </div>
  );
}

export default ContactUsForm;