import React, {useEffect, useState} from 'react';
import HtmlReactParser from 'html-react-parser';

const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset]= useState(0);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/blog/getblogs");
        const data = await response.json();
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, [offset]);

  const AddStyleToBlogObj = (identity) => {
    const id = "B-I-" + identity;
    const element = document.getElementById(id);

    //console.log(identity)

    const filterButtonNameArray = ["Normal", "Code", "Update", "News", "Opinon","Error","Job","Personal","Test","All"]

    filterButtonNameArray.forEach(item => {
      console.log(item);
      const elementId = item + "-Blog";
      const element = document.getElementById(elementId);
      if(element.className.includes(" Unfocused-Filter-Button")){
        element.className = element.className.replace(" Unfocused-Filter-Button", "")
      }else {
        element.className += " Unfocused-Filter-Button"
      }
    })

    const blogIdArray = blogs.filter(blog => blog.id !== identity).slice(0, 9 + offset).map(blog => blog.id)

    //console.log(blogIdArray)

    if (element.className.includes(" Focused-Item")){
    element.className = element.className.replace(" Focused-Item", "");
    } else {
      element.className += " Focused-Item";
    }

    blogIdArray.forEach(id => {
      const elementId = "B-I-" + id;
      const element = document.getElementById(elementId);
      if(element.className.includes(" UnFocused-Item")){
        element.className = element.className.replace(" UnFocused-Item", "")
      }else {
        element.className += " UnFocused-Item"
      }

    })

    const elementlbb = document.getElementById("Load-More-Button-Blogs")

    if(elementlbb.className.includes(" Unfocused-Button")){
      elementlbb.className = elementlbb.className.replace(" Unfocused-Button", "")
    }else {
      elementlbb.className += " Unfocused-Button"
    }
    
    
  }

  const blogRecords = blogs.slice(0, 9 + offset).map((blog) => {
    // console.log(blog.description)
    let parsedDescription = HtmlReactParser(blog.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>'));
    if (blog.id === 120302){
      return (
        <div key={blog.id} className="Blog-Item-None">
          <h1>ERROR NO MATCH</h1>
          <p>Please Click "All" Button To Return</p>
        </div>
      )
    } else {
      return (
        <div key={blog.id} className="Blog-Item" id={"B-I-"+blog.id} onClick={() => AddStyleToBlogObj(blog.id)}>
          <div className="title-and-category-wrapper">
            <div className="title">
              <h2>{blog.title}</h2>
            </div>

            <div className="category-name">
              <p>{blog.category}</p>
            </div>
          </div>
          <div className="description-wrapper">
            {parsedDescription}
          </div>
        </div>
      )
    }
  })

  const dataRenderForBlogs = () => {
    return (
      <React.Fragment key="Blogs">
        <div className="wrapper-for-blogs">
          {isLoading ? <p>Loading...</p>: blogRecords}
        </div>
      </React.Fragment>
    )
  }

  const filterForBlogs = (category) => {
    if (category !== "All"){


      const blogIdArray = blogs.slice(0, 9 + offset).map(blog => blog.id)
      
      blogIdArray.forEach(id => {
        const elementId = "B-I-" + id;
        const element = document.getElementById(elementId);
        if (element.className.includes(" UnFocused-Item")){
          element.className = element.className.replace(" UnFocused-Item", "")
        }else if (element.className.includes(" Focused-Item")) {
          element.className = element.className.replace(" Focused-Item", "")
        }else {
          console.log("Free-of-unwanted-styles")
        }
        
      })

      const filteredBlogs = blogs.filter(blog => {
        return(
          blog.category === category
        );
      });

      if (filteredBlogs.length !== 0){
        setBlogs(filteredBlogs);
        //console.log(filteredBlogs)
      } else {
        setBlogs([
          {category: 'NO BLOGS', description: "&lt;p&gt;NO BLOGS WITH CATEGORY.&lt;/p&gt;", id: 120302, title: 'NO BLOGS'}])
      }
      
      
    } else {
      const fetchBlogs = async () => {
        try {
          const response = await fetch("https://backendforlilygrenportfolio.herokuapp.com/blog/getblogs");
          const data = await response.json();
          setBlogs(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBlogs();
    }
  }

  return (
    <div className="Page-Wrapper">
      <div className="Blog-Page-Wrapper">
        <div className="Filter-Buttons">
          <button className="Filter-Button" id="Normal-Blog" onClick={() => filterForBlogs("Normal Blog")}>Normal</button>
          <button className="Filter-Button" id="Code-Blog" onClick={() => filterForBlogs("Code Blog")}>Code</button>
          <button className="Filter-Button" id="Update-Blog" onClick={() => filterForBlogs("Update Blog")}>Update</button>
          <button className="Filter-Button" id="News-Blog" onClick={() => filterForBlogs("News Blog")}>News</button>
          <button className="Filter-Button" id="Opinon-Blog" onClick={() => filterForBlogs("Opinon Blog")}>Opinion</button>
          <button className="Filter-Button" id="Error-Blog" onClick={() => filterForBlogs("Error Blog")}>Error</button>
          <button className="Filter-Button" id="Job-Blog" onClick={() => filterForBlogs("Job Blog")}>Job</button>
          <button className="Filter-Button" id="Personal-Blog" onClick={() => filterForBlogs("Personal Blog")}>Personal</button>
          <button className="Filter-Button" id="Test-Blog" onClick={() => filterForBlogs("Test Blog")}>Test</button>
          <button className="Filter-Button" id="All-Blog" onClick={() => filterForBlogs("All")}>All</button>
        </div>
        <div className="Blogs-Here" id="Blogs-Here">
          {dataRenderForBlogs()}
        </div>
        <div className="Page-Load-Buttons">
          {blogs.length === offset + 9 ? <button type="button" className="Load-Button" id="Load-More-Button-Blogs" onClick={() => setOffset(offset - 9)}>Load Less</button>: <button type="button" className="Load-Button" id="Load-More-Button-Blogs" onClick={() => setOffset(offset + 9)}>Load More</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog