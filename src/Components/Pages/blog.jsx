import React, {useEffect, useState} from 'react';
import HtmlReactParser from 'html-react-parser';

const Blog = () => {

  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  // <figure class="table"> == &lt;figure class="table"&gt; == .replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>")
  // </figure> == &lt;/figure&gt; == .replaceAll('&lt;/figure&gt;', '</figure>')

  // <table> == &lt;table&gt; == .replaceAll('&lt;table&gt;', '<table>')
  // </table> == &lt;/table&gt; == .replaceAll('&lt;/table&gt;', '</table>')

  // <tbody> == &lt;tbody&gt; == .replaceAll('&lt;tbody&gt;', '<tbody>')
  // </tbody> == &lt;/tbody&gt; == .replaceAll('&lt;/tbody&gt;', '</tbody>')

  // <tr> == &lt;tr&gt; == .replaceAll('&lt;tr&gt;', '<tr>')
  // </tr> == &lt;/tr&gt; == .replaceAll('&lt;/tr&gt;', '</tr>')
  
  // <td> == &lt;td&gt; == .replaceAll('&lt;td&gt;', '<td>')
  // </td> == &lt;/td&gt; == .replaceAll('&lt;/td&gt;', '</td>')
  const blogRecords = blogs.map(blog => {
    console.log(blog.description)
    let parsedDescription = HtmlReactParser(blog.description.replaceAll('&lt;/p&gt;', '</p>').replaceAll('&lt;p&gt;','<p>').replaceAll('&lt;h4&gt;',"<h3>").replaceAll('&lt;/h4&gt;',"</h3>").replaceAll('&lt;figure class="table"&gt;', "<figure class='table'>").replaceAll('&lt;/figure&gt;', '</figure>').replaceAll('&lt;table&gt;', '<table>').replaceAll('&lt;/table&gt;', '</table>').replaceAll('&lt;tbody&gt;', '<tbody>').replaceAll('&lt;/tbody&gt;', '</tbody>').replaceAll('&lt;tr&gt;', '<tr>').replaceAll('&lt;/tr&gt;', '</tr>').replaceAll('&lt;td&gt;', '<td>').replaceAll('&lt;/td&gt;', '</td>'));
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
        <div className="Blogs-Here">
          {dataRenderForBlogs()}
        </div>
      </div>
    </div>
  )
}

export default Blog