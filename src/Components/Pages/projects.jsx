import React, {useState, useEffect} from 'react';
import HtmlReactParser from 'html-react-parser';
import { Buffer } from 'buffer';


const Projects = () => {
  const [projects,setProjects] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [imageUrls, setImageUrls] = useState({});
  const [change, setChange] = useState(true);

  useEffect(() => {
    if (change) {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://backend-for-lilygrenportfolio.herokuapp.com/project/GetAll");
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
    if (imageUrls[project.project_id]) {
      imageurl = imageUrls[project.project_id];
    } else {
      const projectObject = JSON.parse(project.image)
      const base64Data = projectObject.ImageBytes;
      console.log(base64Data)
      const imageData = Buffer.from(base64Data, 'base64');
      //console.log(imageData)
      const bytes = new Uint8Array(imageData);
      //console.log(bytes)
      const blob = new Blob([bytes], {type: 'image/jpeg,image/png,image/svg+xml'});
      const file = new File([blob], `${project.project_id}image.jpg`, {type: 'image/jpeg'});
      imageurl = URL.createObjectURL(file);
      //console.log(imageurl)
      setImageUrls(prevState => ({
        ...prevState,
        [project.project_id]: imageurl
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
            <a href={project.link}>{project.link}</a>
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
      </div>
    )
  })

  return (
    <div className="Page-Wrapper">
      <div className="Projects-Page-Wrapper">
        {isLoading ? <h1>Loading...</h1> : projectRecords}
      </div>
    </div>
  )
}

export default Projects