import React, { useRef, useState, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HtmlReactParser from 'html-react-parser';
import Dropzone from 'react-dropzone';

const Manager = () => {
  const [adminFormState , setAdminFormState] = useState("EMPTY")
  const [adminDualFormState, setAdminDualFormState] = useState("EMPTY")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsloading]= useState(true)

  /*
  
  -----------------------------------------------------------------------------------
  Blogs Code Starts Here
  -----------------------------------------------------------------------------------
  
  */
  const editorRef = useRef(null);
  const editorRefTwo = useRef(null);
  const [blogTitle , setBlogTitle] = useState("")
  const [editorContentOne, setEditorContentOne] = useState("")
  const [editorContentTwo, setEditorContentTwo] = useState("")
  const [blogs, setBlogs] = useState([])
  const [selectedOption, setSelectedOption] = useState("")
  const [blogId, setblogId]= useState("")
  const [editBlogStateChange, setEditBlogStateChange]= useState("")

  const handleEditorChangeOne = (e, editor) => {
    setEditorContentOne(editor.getData());
  }

  const handleEditorChangeTwo = (e, editor) => {
    setEditorContentTwo(editor.getData());
  }

  const toBlogAdd = () => {
    setAdminFormState("BLOG_ADD")
  }


  const handleBlogAdd = (e) => {
    e.preventDefault();

    const editorData = editorRef.current.editor;
    const content = editorData.getData();
    const option = document.getElementById("category").value;
    const data = {
      name: blogTitle,
      description: content,
      category: option
    }

    //console.log(option)
    if (blogTitle === "" || content === "" || option === "") {
      setError(true);
      setErrorMessage("can not post empty blogs try again, check the blog title, content, and category");
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

              <div className="Inputs-Wrapper-WS">
                <label htmlFor="blogtitle">Title of Blog:</label>
                <input
                type="text"
                placeholder="Title"
                className="Title"
                value={blogTitle}
                name="blogtitle"
                onChange={(e) => setBlogTitle(e.target.value)}
                />

                <label htmlFor="category">Category of Blog:</label>
                <select id="category">
                  <option value="Normal Blog">Normal Blog</option>
                  <option value="Code Blog">Code Blog</option>
                  <option value="Update Blog">Update Blog</option>
                  <option value="News Blog">News Blog</option>
                  <option value="Opinon Blog">Opinon Blog</option>
                  <option value="Error Blog">Error Blog</option>
                  <option value="Job Blog">Job Blog</option>
                  <option value="Personal Blog">Personal Blog</option>
                  <option value="Test Blog">Test Blog</option>
                </select>
              </div>

              
              <div className="RTE-WRAPPER">
                <div className="Editor-Wrapper">
                  <CKEditor
                    ref={editorRef}
                    name="descriptionone"
                    editor={ClassicEditor}
                    data={editorContentOne}
                    onChange={handleEditorChangeOne}
                  />
                </div>
              </div>

              <button type="submit" className="Add-Button">
                Add Blog
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const toBlogEdit = () => {
    setAdminDualFormState("BLOG_EDIT")
  }

  const editBlog = (Id, title, category, description) => {
    toBlogEdit();
    setblogId(Id);
    setBlogTitle(title);
    setSelectedOption(category);

    //console.log(parsedDescription)

    const eek = JSON.stringify(description)

    //console.log(JSON.stringify(description))

    const looasa= JSON.parse(eek)

    //console.log(looasa)

    setTimeout(() => {editorRefTwo.current.editor.setData(looasa.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>'));}, 500)

  };

  const handleBlogEdit = (e) => {
    e.preventDefault();

    const editorData = editorRefTwo.current.editor;
    const content = editorData.getData();
    const option = document.getElementById("category").value;
    const data = {
      name: blogTitle,
      description: content,
      category: option
    }

    console.log(blogTitle)
    console.log(content)
    console.log(option)

    fetch(`http://127.0.0.1:5000/updateblog/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setEditBlogStateChange("CHANGE");
        setTimeout(() => {setEditBlogStateChange("")}, 500)
        })
      .catch(error => console.error(error));

  }

  const blogEditForm = () => {
    const customConfig = {
      extraAllowedContent: 'h1 h2 h3 p strong em'
    };
    
    return [
      <React.Fragment key="Blog_Edit">
        <div className="Form">
          <div className="Form-Title">
            <h1>BLOG EDIT</h1>
          </div>
          
          <div className="Form-Wrapper">
            <form className="Form-Box" onSubmit={(e) => handleBlogEdit(e)}>

              <div className="Inputs-Wrapper-WS">
                <label htmlFor="blogid">Blog Id:</label>
                <input
                type="text"
                className='Blog-Id-holder'
                value={blogId}
                name="blogId"
                disabled={true}
                />

                <label htmlFor="blogtitle">Title of Blog:</label>
                <input
                type="text"
                placeholder="Title"
                className="Title"
                value={blogTitle}
                name="blogTitle"
                onChange={(e) => setBlogTitle(e.target.value)}
                disabled={true}
                />
                

                <label htmlFor="category">Category of Blog:</label>
                <select id="category" value={selectedOption} disabled={true}>
                  <option value="Normal Blog">Normal Blog</option>
                  <option value="Code Blog">Code Blog</option>
                  <option value="Update Blog">Update Blog</option>
                  <option value="News Blog">News Blog</option>
                  <option value="Opinon Blog">Opinon Blog</option>
                  <option value="Error Blog">Error Blog</option>
                  <option value="Job Blog">Job Blog</option>
                  <option value="Personal Blog">Personal Blog</option>
                  <option value="Test Blog">Test Blog</option>
                </select>
              </div>
              <div className="RTE-WRAPPER">
                <div className="Editor-Wrapper">
                  <CKEditor
                    ref={editorRefTwo}
                    name="descriptionone"
                    editor={ClassicEditor}
                    data={editorContentTwo}
                    onChange={handleEditorChangeTwo}
                    config={customConfig}
                  />
                </div>
              </div>

              <button type="submit" className="Add-Button">
                Edit Blog
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const getAllBlogsForDelete = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://127.0.0.1:5000/blog/getblogs");
        const data = await response.json();
        setBlogs(data);
        setIsloading(false)
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/blog/getblogs");
        const data = await response.json();
        setBlogs(data);
        setIsloading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/blog/getblogs");
        const data = await response.json();
        setBlogs(data);
        setIsloading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, [editBlogStateChange, setEditBlogStateChange]);

  const deleteBlog = async (e, blogId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/blog/${blogId}`, {
        method: 'DELETE',
      });
      const data= await response.json();
      console.log(data);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }catch (error){
      console.error(error)
    }
  }

  const toBlogDelete = () => {
    setAdminFormState("BLOG_DELETE")
  }

  const handleBlogSearchTBCB = (e) => {
    e.preventDefault();

    const category = document.getElementById("category-delete").value;
    const filteredBlogs = blogs.filter(blog => {
      return (
        blog.title.toLowerCase().includes(blogTitle.toLowerCase()) &&
        blog.category === category
      );
    });
    setBlogs(filteredBlogs);
  }

  const getAllBlogsWithCertainCategory = (e) => {
    e.preventDefault();
   
    const category = document.getElementById("category-delete").value;
    const filteredBlogs = blogs.filter(blog => {
      return(
        blog.category === category
      );
    });
    setBlogs(filteredBlogs);
  }

  const blogRecords = blogs.map(blog => {
    // let parsedDescription = HtmlReactParser(blog.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>'));
    const PlainText = blog.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>');
    const splitText = PlainText.split(' ').slice(0, 15);
    if (splitText[0].startsWith("<p>") && splitText[splitText.length - 1] !== "</p>") {
      splitText.push('</p>')
    }
    if (splitText[splitText.length - 1].includes("<p>")){
      splitText.push('</p>')
    }
    if (splitText[0].startsWith("<h3>")) {
      splitText.push('</p>')
      splitText.unshift('<p>')
    }

    const combinedText = splitText.join(' ')
    let newlyparsedDescription = HtmlReactParser(combinedText)

    // console.log(`${blog.id}`,PlainText);
    //console.log(`${blog.id}`,splitText);
    //console.log(combinedText)
    return (
      <div key={blog.id} className="Blog-Item">
        <div className="title-and-category-wrapper">
          <div className="title">
            <h2>{blog.title}</h2>
          </div>
        
          <div className="category-name">
            <p>{blog.category}</p>
          </div>
        </div>
        <div className="description-wrapper" >
          {newlyparsedDescription}
        </div>

        <div className="invisible-text" style={{display : "None"}}>
          {blog.description}
        </div>

        <div className="buttons">
          <button onClick={(e) => deleteBlog(e, blog.id)}>Delete</button>
          <button className="editbutton" onClick={() => editBlog(blog.id, blog.title, blog.category, blog.description)}>Edit</button>
        </div>
      </div>
    )
  })

  const dataRenderForBlogDelete = () => {
    return (
      <React.Fragment key="Delete-the-blogs">
        <div className="grid-wrapper-for-blogs">
          {isLoading ? <p>Loading...</p> : blogRecords}
        </div>
      </React.Fragment>
    )
  }

  const blogDeleteSortForm = () => {
    return [
      <React.Fragment key="Delete-Sort-Form">
        <div className="Form">
          <div className="Form-Title">
            <h1>BLOG EDITS</h1>
          </div>

          <div className="Form-Wrapper">
            <form className="Form-Box" onSubmit={(e) => handleBlogSearchTBCB(e)}>
              <label htmlFor="blogtitle">Title of Blog:</label>
              
              <input
              type="text"
              placeholder="Title"
              className="Title"
              value={blogTitle}
              name="blogtitle"
              onChange={(e) => setBlogTitle(e.target.value)}
              />

              <label htmlFor="category">Category of Blog:</label>
              <select id="category-delete">
                <option className="Option" value="Normal Blog">Normal Blog</option>
                <option className="Option" value="Code Blog">Code Blog</option>
                <option className="Option" value="Update Blog">Update Blog</option>
                <option className="Option" value="News Blog">News Blog</option>
                <option className="Option" value="Opinon Blog">Opinon Blog</option>
                <option className="Option" value="Error Blog">Error Blog</option>
                <option className="Option" value="Job Blog">Job Blog</option>
                <option className="Option" value="Personal Blog">Personal Blog</option>
                <option className="Option" value="Test Blog">Test Blog</option>
              </select>

              <button className="search-button" type="submit">Search</button>
            </form>

            <button type="button" id="Reverse" onClick={(e) => getAllBlogsForDelete(e)}>Revert to all</button>

            <button type="button" onClick={(e) => getAllBlogsWithCertainCategory(e)}>Get By Category</button>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const deleteBlogComp = () => {
    return [
      <React.Fragment key="DeleteBlogComp">
        <div className="delete-wrapper">
          <div className="delete-form-wrapper">
            {blogDeleteSortForm()}
          </div>

          <div className="blog-edit-delete-wrapper">

            <div className="delete-blog-wrapper">
              {dataRenderForBlogDelete()}
            </div>

            <div className="edit-form-wrapper">
              {adminDualFormState === "BLOG_EDIT"? blogEditForm(): null}
            </div>

          </div>
          
        </div>
        
      </React.Fragment>
    ]
  }
  /*
  
  -----------------------------------------------------------------------------------
  Blogs Code End Here
  -----------------------------------------------------------------------------------
  
  */


  /*
  
  -----------------------------------------------------------------------------------
  Projects Code Starts Here
  -----------------------------------------------------------------------------------
  
  */
  const editorRefThree = useRef(null);
  const [projectTitle, setProjectTitle] = useState("");
  //const [projectCategory, setProjectCategory] = useState("");
  const [projectLink, setProjectLink] = useState("");
  //const [files, setFiles] = useState([]);
  const [droppedFile, setDroppedFile] = useState(null);
  const [editorContentThree, setEditorContentThree] = useState("")
  const { FileReaderSync } = window;

  const toProjectAdd = () => {
    setAdminFormState("PROJECT_ADD")
  }

  const handleEditorChangeThree = (e, editor) => {
    setEditorContentThree(editor.getData());
  }

  const handleDrop = (acceptedFiles) => {
    //setFiles([...files, ...acceptedFiles]);
    setDroppedFile(acceptedFiles[0])
    console.log(URL.createObjectURL(acceptedFiles[0]))
  }

  const handleProjectAdd = (e) => {
    e.preventDefault();

    const editorData = editorRefThree.current.editor;
    const content = editorData.getData();
    const option = document.getElementById("project-category-add").value;
    const reader = new FileReaderSync();
    const data = {
      name: projectTitle,
      link: projectLink,
      category: option,
      image: reader.readAsDataURL(droppedFile),
      description: content
    }

    console.log(data.image)

    if (projectTitle === "" || content === ""){
      console.log("Null data failure to run")
    } else {
      fetch(`http://127.0.0.1:5000/project/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const projectAddForm = () => {
    const customConfig = {
      extraAllowedContent: 'h1 h2 h3 p strong em'
    };

    return [
      <React.Fragment key="project-add-form">
        <div className="Form">
          <div className="Form-Title">
            <h1>Project Add Form</h1>
          </div>

          <div className="Form-Wrapper">
            <form className='Form-Box' onSubmit={(e) => handleProjectAdd(e)}>

              <div className="Inputs-Wrapper-WS">
                <input
                  type="text"
                  placeholder="Title"
                  className="Title"
                  value={projectTitle}
                  name="projecttitle"
                  onChange={(e) => setProjectTitle(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Link"
                  className="Link"
                  value={projectLink}
                  name="projectlink"
                  onChange={(e) => setProjectLink(e.target.value)}
                />

                <select id="project-category-add">
                  <option className="Option" value="Blog Website">Blog Website</option>
                  <option className="Option" value="Buisness Website">Buisness Website</option>
                  <option className="Option" value="E-commerce Website">E-commerce Website</option>
                  <option className="Option" value="Portfolio Website">Portfolio Website</option>
                  <option className="Option" value="Educational Website">Educational Website</option>
                  <option className="Option" value="Social Network Website">Social Network Website</option>
                  <option className="Option" value="News Website">News Website</option>
                  <option className="Option" value="Magazine Website">Magazine Website</option>
                  <option className="Option" value="Forum Website">Forum Website</option>
                  <option className="Option" value="Community Website">Community Website</option>
                  <option className="Option" value="Gaming Website">Gaming Website</option>
                  <option className="Option" value="Humor Website">Humor Website</option>
                  <option className="Option" value="Music Website">Music Website</option>
                  <option className="Option" value="Art Website">Art Website</option>
                  <option className="Option" value="Photography Website">Photography Website</option>
                  <option className="Option" value="Travel Website">Travel Website</option>
                  <option className="Option" value="Food Website">Food Website</option>
                </select>
              </div>

              <div className="dropzone-wrapper">
                <Dropzone onDrop={handleDrop}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()}/>
                      {droppedFile ? (
                        <img src={URL.createObjectURL(droppedFile)} alt="" />
                      ) : (
                        <p>Add Image Here</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="RTE-WRAPPER">
                <div className="Editor-Wrapper">
                  <CKEditor
                    ref={editorRefThree}
                    name="descriptionone"
                    editor={ClassicEditor}
                    data={editorContentThree}
                    onChange={handleEditorChangeThree}
                    config={customConfig}
                  />
                </div>
              </div>

              <button type="submit" className='Add-Button'>Add Project</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const toProjectEdits = () => {
    setAdminFormState("PROJECT_DELETE")
    setAdminFormState("PROJECT_EDIT")
  }

  /*
  
  -----------------------------------------------------------------------------------
  Projects Code Ends Here
  -----------------------------------------------------------------------------------
  
  */

  /*
  
  -----------------------------------------------------------------------------------
  In-Progress Projects Code Starts Here
  -----------------------------------------------------------------------------------
  
  */

  const toInProgressAdd = () => {
    setAdminFormState("IN_PROJRESS_ADD")
  }

  const toInProgressDelete = () => {
    setAdminFormState("IN_PROJRESS_DELETE")
  }

  const toInProgressEdit = () => {
    setAdminFormState("IN_PROJRESS_EDIT")
  }

  /*
  
  -----------------------------------------------------------------------------------
  In-Progress Projects Code Ends Here
  -----------------------------------------------------------------------------------
  
  */

  /*
  
  -----------------------------------------------------------------------------------
  Certificates Code Starts Here
  -----------------------------------------------------------------------------------
  
  */

  const toCertificatesAdd = () => {
    setAdminFormState("CERTIFICATES_ADD")
  }

  const toCertificatesDelete = () => {
    setAdminFormState("CERTIFICATES_DELETE")
  }

  const toCertificatesEdit = () => {
    setAdminFormState("CERTIFICATES_EDIT")
  }

  /*
  
  -----------------------------------------------------------------------------------
  Certificates Code Ends Here
  -----------------------------------------------------------------------------------
  
  */

  /*
  
  -----------------------------------------------------------------------------------
  Hacker Ranks Code Starts Here
  -----------------------------------------------------------------------------------
  
  */

  const toHackerRanksAdd = () => {
    setAdminFormState("HACKER_RANKS_ADD")
  }

  const toHackerRanksDelete = () => {
    setAdminFormState("HACKER_RANKS_DELETE")
  }

  const toHackerRanksEdit = () => {
    setAdminFormState("HACKER_RANKS_EDIT")
  }

  /*
  
  -----------------------------------------------------------------------------------
  Hacker Ranks Code Ends Here
  -----------------------------------------------------------------------------------
  
  */

  /*
  
  -----------------------------------------------------------------------------------
  Testimonials Code Starts Here
  -----------------------------------------------------------------------------------
  
  */

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

  /*
  
  -----------------------------------------------------------------------------------
  Testimonials Code Ends Here
  -----------------------------------------------------------------------------------
  
  */
  
  return (
    <div className="Page-Wrapper">
      <div className="Manager-Container">

        <div className="Form-Wrapper">
          {adminFormState === "BLOG_ADD" ? formForBlogAdd() : adminFormState === "BLOG_DELETE" ? deleteBlogComp() : adminFormState === "PROJECT_ADD" ? projectAddForm(): null}
        </div>

        <div className="Manager-Buttons-Wrapper">
          <div className="Buttons-Wrapper">
            <h2>Blogs</h2>
            <div className="buttons">
              <div className="button-item">
                <button type="button" onClick={() => toBlogAdd()}>Blog Add</button>
              </div>
              <div className="button-item">
                <button type="button" onClick={() => toBlogDelete()}>Blog Edits</button>
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
                <button type="button" onClick={() => toProjectEdits()}>Project Edits</button>
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
        <div className="messageloader">
          <p>{error ? errorMessage : message}</p>
        </div>
      </div>
    </div>
  )
}

export default Manager