import React, { useRef, useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Manager = () => {
  const [adminFormState , setAdminFormState] = useState("EMPTY")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  //blogs start
  const editorRef = useRef(null);
  const [blogTitle , setBlogTitle] = useState("")
  const [editorContentOne, setEditorContentOne] = useState("")

  const handleEditorChangeOne = (e, editor) => {
    setEditorContentOne(editor.getData());
  }

  const toBlogAdd = () => {
    setAdminFormState("BLOG_ADD")
  }


  const handleBlogAdd = (e) => {
    e.preventDefault();

    const editorData = editorRef.current.editor;
    const content = editorData.getData();
    const data = {
      name: blogTitle,
      description: content
    }

    if (blogTitle === "" || content === "") {
      setError(true);
      setErrorMessage("can not post empty blogs try again");
    } else {
      fetch('http://127.0.0.1:5000/blog/postblog', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
      })
        .then ((res) => res.json())
        .then((res) => {
          if(res === "Blog already exists"){
            setError(true)
            setErrorMessage(`This blog already exists try adding part one or part two or go to edit and find ${blogTitle}, ${error}`)
          }else {
            setError(false);
            setErrorMessage("");
            setMessage(`succesfully created blog titled ${blogTitle}`)
          }
        })
        .catch((error) => {
          console.log("Error with adding blog", error);
          setError(true);
          setErrorMessage("Error with adding blog, please try again")
        })
    }
  }

  const formForBlogAdd = () => {
    return [
      <React.Fragment key="Blog_Add">
        <div className="Form">
          <div className="Form-Title">
            <h1>BLOG ADD</h1>
          </div>
          
          <div className="Form-Wrapper">
            <form className="Form-Box" onSubmit={(e) => handleBlogAdd(e)}>

              <label htmlFor="blogtitle">Title of Blog:</label>
              <input
              type="text"
              placeholder="Title"
              className="Title"
              value={blogTitle}
              name="blogtitle"
              onChange={(e) => setBlogTitle(e.target.value)}
              />
              
              <label>Text:</label>
              <CKEditor
                ref={editorRef}
                name="descriptionone"
                editor={ClassicEditor}
                data={editorContentOne}
                onChange={handleEditorChangeOne}
              />

              <button type="submit" className="Add-Button">
                Add Blog
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const toBlogDelete = () => {
    setAdminFormState("BLOG_DELETE")
  }

  const toBlogEdit = () => {
    setAdminFormState("BLOG_EDIT")
  }

  //Blogs End

  //Projects Start

  const toProjectAdd = () => {
    setAdminFormState("PROJECT_ADD")
  }

  const toProjectDelete = () => {
    setAdminFormState("PROJECT_DELETE")
  }

  const toProjectEdit = () => {
    setAdminFormState("PROJECT_EDIT")
  }

  //Projects End

  //In-Progress Start

  const toInProgressAdd = () => {
    setAdminFormState("IN_PROJRESS_ADD")
  }

  const toInProgressDelete = () => {
    setAdminFormState("IN_PROJRESS_DELETE")
  }

  const toInProgressEdit = () => {
    setAdminFormState("IN_PROJRESS_EDIT")
  }

  //In-Progress End

  //Certificates Start

  const toCertificatesAdd = () => {
    setAdminFormState("CERTIFICATES_ADD")
  }

  const toCertificatesDelete = () => {
    setAdminFormState("CERTIFICATES_DELETE")
  }

  const toCertificatesEdit = () => {
    setAdminFormState("CERTIFICATES_EDIT")
  }

  //Cerificates End

  //Hacker Ranks Start

  const toHackerRanksAdd = () => {
    setAdminFormState("HACKER_RANKS_ADD")
  }

  const toHackerRanksDelete = () => {
    setAdminFormState("HACKER_RANKS_DELETE")
  }

  const toHackerRanksEdit = () => {
    setAdminFormState("HACKER_RANKS_EDIT")
  }

  //Hacker Ranks End

  //Testimonials Start

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

  //Testimonials End
  
  return (
    <div className="Page-Wrapper">
      <div className="Manager-Container">

        <div className="Form-Wrapper">
          {adminFormState === "BLOG_ADD" ? formForBlogAdd() : null}
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