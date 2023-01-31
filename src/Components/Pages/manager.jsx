import React, { useState } from 'react'

const Manager = () => {
  const [adminFormState , setAdminFormState] = useState("EMPTY")

  const toBlogAdd = () => {
    setAdminFormState("BLOG_ADD")
  }

  const toBlogDelete = () => {
    setAdminFormState("BLOG_DELETE")
  }

  const toBlogEdit = () => {
    setAdminFormState("BLOG_EDIT")
  }

  const toProjectAdd = () => {
    setAdminFormState("PROJECT_ADD")
  }

  const toProjectDelete = () => {
    setAdminFormState("PROJECT_DELETE")
  }

  const toProjectEdit = () => {
    setAdminFormState("PROJECT_EDIT")
  }

  const toInProgressAdd = () => {
    setAdminFormState("IN_PROJRESS_ADD")
  }

  const toInProgressDelete = () => {
    setAdminFormState("IN_PROJRESS_DELETE")
  }

  const toInProgressEdit = () => {
    setAdminFormState("IN_PROJRESS_EDIT")
  }

  const toCertificatesAdd = () => {
    setAdminFormState("CERTIFICATES_ADD")
  }

  const toCertificatesDelete = () => {
    setAdminFormState("CERTIFICATES_DELETE")
  }

  const toCertificatesEdit = () => {
    setAdminFormState("CERTIFICATES_EDIT")
  }

  const toHackerRanksAdd = () => {
    setAdminFormState("HACKER_RANKS_ADD")
  }

  const toHackerRanksDelete = () => {
    setAdminFormState("HACKER_RANKS_DELETE")
  }

  const toHackerRanksEdit = () => {
    setAdminFormState("HACKER_RANKS_EDIT")
  }

  const toTestimonialsAdd = () => {
    setAdminFormState("TESTIMONIALS_ADD")
  }

  const toTestimonialsDelete = () => {
    setAdminFormState("TESTIMONIALS_DELETE")
  }

  const toTestimonialsEdit = () => {
    setAdminFormState("TESTIMONIALS_EDIT")
  }

  const toTestimonialsUserKeyAdd = () => {
    setAdminFormState("TESTIMONIALS_USER_KEY_ADD")
  }
  
  return (
    <div className="Page-Wrapper">
      <div className="Manager-Container">

        <div className="Form-Wrapper">
          {adminFormState}
        </div>

        <div className="Manager-Buttons-Wrapper">
          <div className="Buttons-Wrapper">
            <h2>Blogs</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toBlogAdd()}>Blog Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toBlogDelete()}>Blog Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toBlogEdit()}>Blog Edit</button>
              </div>
            </div>
          </div>

          <div className="Buttons-Wrapper">
            <h2>Projects</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toProjectAdd()}>Project Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toProjectDelete()}>Project Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toProjectEdit()}>Project Edit</button>
              </div>
            </div>
          </div>

          <div className="Buttons-Wrapper">
            <h2>In-Progress Projects</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toInProgressAdd()}>In-Progress Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toInProgressDelete()}>In-Progress Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toInProgressEdit()}>In-Progress Edit</button>
              </div>
            </div>
          </div>

          <div className="Buttons-Wrapper">
            <h2>Certificates</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toCertificatesAdd()}>Certificates Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toCertificatesDelete()}>Certificates Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toCertificatesEdit()}>Certificates Edit</button>
              </div>
            </div>
          </div>

          <div className="Buttons-Wrapper">
            <h2>Hacker Ranks</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toHackerRanksAdd()}>Hacker Ranks Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toHackerRanksDelete()}>Hacker Ranks Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toHackerRanksEdit()}>Hacker Ranks Edit</button>
              </div>
            </div>
          </div>

          <div className="Buttons-Wrapper">
            <h2>Testimonials</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toTestimonialsAdd()}>Testimonials Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toTestimonialsDelete()}>Testimonials Delete</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toTestimonialsEdit()}>Testimonials Edit</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toTestimonialsUserKeyAdd()}>Testimonials Create User Key</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Manager