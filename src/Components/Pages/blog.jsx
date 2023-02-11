import React, {useEffect, useState} from 'react';
import HtmlReactParser from 'html-react-parser';

const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

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
  }, []);

  const blogRecords = blogs.map((blog) => {
    // console.log(blog.description)
    let parsedDescription = HtmlReactParser(blog.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>').replaceAll('.&lt;br&gt;','<br>'));
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
        <div className="description-wrapper">
          {parsedDescription}
        </div>
      </div>
    )
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

  return (
    <div className="Page-Wrapper">
      <div className="Blog-Page-Wrapper">
        <div className="Filter-Buttons">
          <button className="Filter-Button">Normal</button>
          <button className="Filter-Button">Code</button>
          <button className="Filter-Button">Update</button>
          <button className="Filter-Button">News</button>
          <button className="Filter-Button">Opinion</button>
          <button className="Filter-Button">Error</button>
          <button className="Filter-Button">Job</button>
          <button className="Filter-Button">Personal</button>
          <button className="Filter-Button">Test</button>
        </div>
        <div className="Blogs-Here">
          {dataRenderForBlogs()}
        </div>
      </div>
    </div>
  )
}

export default Blog