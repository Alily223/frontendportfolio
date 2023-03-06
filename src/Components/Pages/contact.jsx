import React, {useState} from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { name, email, subject, message } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const mailtoLink = `mailto:a.lilygren@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="Page-Wrapper">
      <div className="Contact-Page-Wrapper">
        <h2>Contact Me From Here</h2>
        <div className="Email-Form-Wrapper">
        <form onSubmit={handleSubmit}>

          <div className="Name-Wrapper">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={handleChange} />
          </div>

          <div className="Email-Wrapper">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleChange} />
          </div>

          <div className="Subject-Wrapper">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={subject} onChange={handleChange} />
          </div>

          <div className="Message-Wrapper">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={message} onChange={handleChange}></textarea>
          </div>
          
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Contact