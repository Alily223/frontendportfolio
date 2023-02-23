import React, {useState, useEffect} from 'react'

const Testimonials = () => {
  const [formCode, useFormCode] = useState("");

  return (
    <div className="Page-Wrapper">
      <div className="Testimonial-Page-Wrapper">
        <div className="Form-For-Users-To-Add-A-Review">
          <p>Contractor Review</p>
          <p>Peer Review</p>
          <p>User Review</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonials