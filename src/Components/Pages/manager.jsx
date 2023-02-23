import React, { useRef, useState, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HtmlReactParser from 'html-react-parser';
import Dropzone from 'react-dropzone';
import { Buffer } from 'buffer';

const Manager = () => {
  const [adminFormState , setAdminFormState] = useState("EMPTY")
  const [adminDualFormState, setAdminDualFormState] = useState("EMPTY")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsloading]= useState(true)

  /*
  ----------------------------------------------------------------------------------
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
  const editorRefFour = useRef(null);
  const [projectTitle, setProjectTitle] = useState("");
  //const [projectCategory, setProjectCategory] = useState("");
  const [projectLink, setProjectLink] = useState("");
  //const [files, setFiles] = useState([]);
  const [droppedFile, setDroppedFile] = useState(null);
  const [editorContentThree, setEditorContentThree] = useState("");
  const [editorContentFour, setEditorContentFour] = useState("");
  const { FileReader } = window;
  const [bytesImageData, setBytesImageData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [change, setChange] = useState(true);
  const [imageUrls, setImageUrls] = useState({});
  const [projectId, setProjectID] = useState("")
  const [projectCategory, setProjectCategory] = useState("")
  const [editProjectStateChange,setEditProjectStateChange] = useState("")

  const toProjectAdd = () => {
    setAdminFormState("PROJECT_ADD")
  }

  const handleEditorChangeThree = (e, editor) => {
    setEditorContentThree(editor.getData());
  }

  const handleEditorChangeFour = (e, editor) => {
    setEditorContentFour(editor.getData());
  }

  const handleDrop = (acceptedFiles) => {
    //setFiles([...files, ...acceptedFiles]);
    setDroppedFile(null)
    setDroppedFile(acceptedFiles[0]);
    //console.log(droppedFile)
    const file = acceptedFiles[0];
    //console.log(acceptedFiles[0])
    const reader = new FileReader();
    reader.onload = (event) => {
      const bytes = new Uint8Array(event.target.result)
      setBytesImageData(bytes)
      //console.log(bytes)
    }
    reader.readAsArrayBuffer(file);
    //console.log(URL.createObjectURL(acceptedFiles[0]))
    //console.log(bytesImageData)
  }

  const handleProjectAdd = (e) => {
    e.preventDefault();

    const editorData = editorRefThree.current.editor;
    const content = editorData.getData();
    const option = document.getElementById("project-category-add").value;
    const data = {
      name: projectTitle,
      link: projectLink,
      category: option,
      image: bytesImageData ? Array.from(bytesImageData): null,
      description: content
    }

    // console.log(bytesImageData)
    //console.log(data.image)

    
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
        setChange(true)
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

              <button type="button" className='Add-Button' onClick={() => setDroppedFile(null)}>Clear Image</button>

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
    // setAdminFormState("PROJECT_EDIT")
  }

  useEffect(() => {
    if (change) {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/project/GetAll");
        const data = await response.json();
        //console.log(data)
        setProjects(data);
        setIsloading(false);
        //console.log("data varaible", data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
    //console.log(projects)
    setChange(false)
    }
  }, [change])

  useEffect(() => {
    //console.log("state call" ,projects.map(project => {return project.image}));
  },[projects, setProjects])

  const editProject = (id, title, link, category, imagefile, description) => {
    setAdminDualFormState("PROJECT_EDIT");
    setProjectID(id)
    setProjectTitle(title);
    setProjectLink(link);
    setProjectCategory(category);
    //console.log("this is the imagefile", imagefile);
    const imageData = Buffer.from(imagefile, 'base64');
    //console.log(imageData)
    const bytes = new Uint8Array(imageData);
    //console.log(bytes)
    const blob = new Blob([bytes], {type: 'image/jpeg,image/png,image/svg+xml'});
    const file = new File([blob], `${id}image.jpg`, {type: 'image/jpeg'});
    handleDrop([file]);

    const eek = JSON.stringify(description)

    //console.log(JSON.stringify(description))

    const looasa= JSON.parse(eek)

    //console.log(looasa)

    setTimeout(() => {editorRefFour.current.editor.setData(looasa.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>'));}, 500)

    
  }

  const deleteProject = async (e, projectId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/project/${projectId}`, {
        method: 'DELETE',
      });
      const data= await response.json();
      console.log(data);
      setProjects(projects.filter(project => project.id !== projectId));
    }catch (error){
      console.error(error)
    }
  }

  const handleProjectEdit = (e) => {
    e.preventDefault();

    const editorData = editorRefFour.current.editor;
    const content = editorData.getData();
    const option = projectCategory;
    const data = {
      name: blogTitle,
      link: projectLink,
      category: option,
      image: bytesImageData ? Array.from(bytesImageData): null,
      description: content
    }

    console.log(blogTitle)
    console.log(content)
    console.log(option)

    fetch(`http://127.0.0.1:5000/projectsupdate/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setEditProjectStateChange("CHANGE");
        if (editProjectStateChange === "CHANGE"){
          setTimeout(() => {setEditProjectStateChange("")}, 500)
          setChange(true)
        }
        })
      .catch(error => console.error(error));
  }

  const projectRecords = projects.map(project => {
    //console.log(count)
    const PlainText = project.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>');
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

    let imageurl = '';

    // Check if the image URL is already in state, and use it if it is.
    if (imageUrls[project.id]) {
      imageurl = imageUrls[project.id];
    } else {
      const base64Data = String(project.image);
      //console.log(base64Data)
      const imageData = Buffer.from(base64Data, 'base64');
      //console.log(imageData)
      const bytes = new Uint8Array(imageData);
      //console.log(bytes)
      const blob = new Blob([bytes], {type: 'image/jpeg,image/png,image/svg+xml'});
      const file = new File([blob], `${project.id}image.jpg`, {type: 'image/jpeg'});
      imageurl = URL.createObjectURL(file);
      //console.log(imageurl)
      setImageUrls(prevState => ({
        ...prevState,
        [project.id]: imageurl
      }));
    }
    
    //console.log(imageurl)

    //console.log(project.image)

    return (
      <div key={project.id} className="Project-Object">
        <div className="Project-Title-Link-Category-Wrapper">
          <div className="Project-Title">
            <h1>{project.title}</h1>
          </div>

          <div className="Project-Link">
            <p>{project.link}</p>
          </div>

          <div className="Project-Category">
            <p>{project.category}</p>
          </div>
        </div>

        <div className="Project-Img-Wrapper">
          <img src={imageurl} alt=""/>
        </div>

        <div className="Project-Description-Wrapper">
          <div className="Description">
            {newlyparsedDescription}
          </div>
        </div>

        <div className="Buttons-For-Project">
          <button type="button" onClick={(e) => deleteProject(e, project.id)}>Delete</button>
          <button type="button" className="edit-project-button" onClick={() => editProject(project.id ,project.title, project.link, project.category, String(project.image), project.description)}>Edit</button>
        </div>
      </div>
    )
  })

  const projectEditForm = () => {

    const customConfig = {
      extraAllowedContent: 'h1 h2 h3 p strong em'
    };

    return [
      <React.Fragment key="project-add-form">
        <div className="Form">
          <div className="Form-Title">
            <h1>Project Edit Form</h1>
          </div>

          <div className="Form-Wrapper">
            <form className='Form-Box' onSubmit={(e) => handleProjectEdit(e)}>

              <div className="Inputs-Wrapper-WS">

                <input 
                 type="text"
                 placeholder="ID"
                 className="ProjectIDfef"
                 value={projectId}
                 name="proejctId"
                 onChange={(e) => setProjectID(e.target.value)}
                />

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
                        <img src={URL.createObjectURL(droppedFile)} alt="" style={{height: '400px', width: '400px'}}/>
                      ) : (
                        <p>Add Image Here</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <button type="button" className='Add-Button' onClick={() => setDroppedFile(null)}>Clear Image</button>

              <div className="RTE-WRAPPER">
                <div className="Editor-Wrapper">
                  <CKEditor
                    ref={editorRefFour}
                    name="descriptionone"
                    editor={ClassicEditor}
                    data={editorContentFour}
                    onChange={handleEditorChangeFour}
                    config={customConfig}
                  />
                </div>
              </div>

              <button type="submit" className='Add-Button'>Edit Project</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  const projectsEditsFormComp = () => {
    return [
      <React.Fragment key="Project-Edits-Form">
        <div className="Wrapper-For-Project-Edits">
          <div className="Title">
            <h1>Project Edits</h1>
          </div>

          <div className="TheProjects-Wrapper">
            <div className="RenderForProjects">
              {projectRecords}
            </div>
            
            <div className="EditFormForProjects">
              {adminDualFormState === "PROJECT_EDIT" ? projectEditForm() : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    ]
  }

  /*
  
  -----------------------------------------------------------------------------------
  Projects Code Ends Here
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

  const toTestimonialsEdits = () => {
    setAdminFormState("TESTIMONIALS_DELETE")
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
          {adminFormState === "BLOG_ADD" ? formForBlogAdd() : adminFormState === "BLOG_DELETE" ? deleteBlogComp() : adminFormState === "PROJECT_ADD" ? projectAddForm(): adminFormState === "PROJECT_DELETE" ? projectsEditsFormComp() :null}
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
                <button type="button" onClick={() => toTestimonialsEdits()}>Testimonials Edits</button>
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