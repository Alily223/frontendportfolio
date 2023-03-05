import React, {useState, useEffect, useRef} from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HtmlReactParser from 'html-react-parser';
import he from 'he';
import { Buffer } from 'buffer';

const Createtestimonial = ({username, twelvedigitcode, settwelvedigitcode}) => {
  const editorRefSeven = useRef(null)
  const editorRefEight = useRef(null)
  const [sumbittedacode, setSumbittedACode] = useState(false);
  const [testimonial, setTestimonials] = useState([]);
  const [testimonialTitle , setTestimonialTitle] = useState("");
  const [testimonialProjectId, setTestimonialProjectId] = useState(0);
  const [testimonialUsername ,setTestimonialUsername] = useState("");
  const [testimonialStars, setTestimonialStars] = useState(0);
  const [testimonialTwelveDigitCode,setTestimonialTwelveDigitCode] = useState("");
  const [editorContentSeven, setEditorContentSeven] = useState("");
  const [editorContentEight, setEditorContentEight] = useState("");
  const [projects , setProjects] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [clickedReviewbutton, setClickedReviewbutton] = useState(false);
  const [counter, setCounter] = useState(0)

  const FormCodeInputForReview = (e) => {
    e.preventDefault();
    settwelvedigitcode(twelvedigitcode);
    setSumbittedACode(true);
    if (twelvedigitcode.length !== 14) {
      setSumbittedACode(false)
    }
  }

  const handleEditorChangeSeven = (e, editor) => {
    setEditorContentSeven(editor.getData())
  }

  const handleEditorChangeEight = (e, editor) => {
    setEditorContentEight(editor.getData())
  }

  const check = twelvedigitcode.length === 14

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`https://backendforlilygrenportfolio.herokuapp.com/testimonialpublished/grabforuser/${twelvedigitcode}`);
        const data = await response.json();
        //console.log(data)
        setTestimonials(data);
        //setIsloading(false);
        //console.log("data varaible", data);
        
      } catch (error) {
        console.error(error);
      }
    };

    if (check) {
      fetchTestimonials();

      
      setTimeout(() => {
        setTestimonialTitle(testimonial.testimonial_title)
        setTestimonialProjectId(testimonial.testimonialprojectid)
        setTestimonialStars(testimonial.stars)
        setTestimonialUsername(username)
        setTestimonialTwelveDigitCode(twelvedigitcode)

        const content = he.decode(String(testimonial.review))
        
        if (editorRefSeven.current){
          editorRefSeven.current.editor.setData(String(content));
        }
        
      }, 1000);
      
    }
    
    
  }, [twelvedigitcode, setTestimonials, setTestimonialTitle,testimonial.testimonial_title, setTestimonialProjectId,testimonial.testimonialprojectid, setTestimonialStars,testimonial.stars,  setTestimonialUsername, username, setTestimonialTwelveDigitCode, testimonial.review, check, editorRefSeven])

  const checkforusername = username !== "" && twelvedigitcode === "" && counter === 0

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://backendforlilygrenportfolio.herokuapp.com/project/GetAll");
        const data = await response.json();
        //console.log(data)
        setProjects(data);
        //console.log(data)
        //console.log("data varaible", data);
        
      } catch (error) {
        console.error(error);
      }
    };
    
    if (checkforusername){
      fetchProjects();
      setCounter(1);
    }
    
  }, [projects, setProjects, checkforusername, setCounter])

  const handleReviewClick = (e, identification) => {
    e.preventDefault();
    console.log(identification);
    setClickedReviewbutton(true);
    setTestimonialProjectId(identification);
    console.log(testimonialProjectId);
    setTestimonialUsername(username);
    console.log(testimonialUsername);
    function GenerateCode() {
      let code = '';
      const characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < 12; i++) {
        if (i === 4 || i === 8) {
          code += '-';
        }
        const index = Math.floor(Math.random() * characters.length);
        code += characters[index];
      }
      return code;
    };
    const twelvedigitcode = GenerateCode();
    setTestimonialTwelveDigitCode(twelvedigitcode);
    settwelvedigitcode(twelvedigitcode);
    console.log(testimonialTwelveDigitCode);
  }

  const projectRecords = projects.map(project => {
    //console.log(count)
    const PlainText = he.decode(project.description);
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
      //console.log(base64Data)
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
      <div key={project.project_id} className="Project-Object">
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
          <button type="button" onClick={(e) => handleReviewClick(e, project.project_id)}>Review</button>
        </div>
      </div>
    )
  });

  const projectRenderComp = () => {
    return [
      <React.Fragment key="Project-Render-For-Selection">
        <div className="The-Projects-Wrapper">
          {projectRecords}
        </div>
      </React.Fragment>
    ]
  }

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();

    const testimonialSelfIdentification = testimonial.id
    const editorData = editorRefSeven.current.editor;
    const content = editorData.getData();
    const data = {
      title: testimonialTitle,
      pid: testimonialProjectId,
      stars: testimonialStars,
      username: testimonialUsername,
      code: testimonialTwelveDigitCode,
      description: content
    }

    fetch(`https://backendforlilygrenportfolio.herokuapp.com/testimonialpublished/grabforedit/${testimonialSelfIdentification}`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // setTestimonialTitle("");
      // setTestimonialProjectId("");
      // setTestimonialStars(0);
      // setTestimonialUsername("");
      // setTestimonialTwelveDigitCode("");
      // setEditorContentFive("");
      //setChange(true);
    }).catch((error) => {
      console.error(error)
    })
  }

  

  const handleTestimonialAdd = (e) => {
    e.preventDefault();
    // console.log("Title :", testimonialTitle)
    // console.log("ProjectId :", testimonialProjectId)
    // console.log("Stars Given :", testimonialStars)
    // console.log("Username :", testimonialUsername)
    // console.log("Twelve Digit Code :", testimonialTwelveDigitCode)
    // console.log("RTE Text :", editorContentFive)
    const idproject = testimonialProjectId
    const editorData = editorRefEight.current.editor;
    const content = editorData.getData();
    const data = {
      title: testimonialTitle,
      pid: idproject,
      stars: testimonialStars,
      username: testimonialUsername,
      code: testimonialTwelveDigitCode,
      description: content
    }

    console.log(data)

    fetch('https://backendforlilygrenportfolio.herokuapp.com/testimonialunpblished/add', {
      method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTestimonialTitle("")
      setTestimonialProjectId("")
      setTestimonialStars(0)
      setTestimonialUsername("")
      setTestimonialTwelveDigitCode("")
      setEditorContentEight("")
    }).catch((error) => {
      console.error(error)
    })
  }

  const customConfig = {
    extraAllowedContent: 'h1 h2 h3 p strong em'
  };

  return (
    <div className="Page-Wrapper">
      <div className="Create-Review-Page-Wrapper">
        <div className="Section-For-Commisioners">
          {twelvedigitcode !== "" && twelvedigitcode.length === 14 && sumbittedacode ? (<div className="Form-Wrapper-For-Testimonial-Add">
          <h1>Add Testimonial For User Commissioner</h1>
          <form className="True-testimonal-form" onSubmit={(e) => handleTestimonialSubmit(e)} >
            <div className="Top-bar-inputs-wrapper">

              <div className="Title-Wrapper">
                <label htmlFor='testimonialtitle'>Title :</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="Title"
                  value={testimonialTitle}
                  name="testimonialtitle"
                  onChange={(e) => setTestimonialTitle(e.target.value)}
                />
              </div>
              
              <div className="Id-Wrapper">
                <label htmlFor='testimonialprojectid'>ProjectID :</label>
                <input 
                  type="text"
                  placeholder="Project Id"
                  className="Testimonial-ProjectId"
                  value={testimonialProjectId}
                  name="testimonialprojectid"
                  readOnly={true}
                  onChange={(e) => setTestimonialProjectId(e.target.value)}
                />
              </div>
              
              <div className="Username-Wrapper">
                <label>Username:</label>
                <input 
                  type="text"
                  placeholder="Filler Username For User"
                  className="Testimonial-Username"
                  value={testimonialUsername}
                  name="testimonialusername"
                  onChange={(e) => setTestimonialUsername(e.target.value)}
                  readOnly={true}
                />
              </div>

            </div>

            <div className="Star-Review-Wrapper">
              <div className="Star-Review-Button">
                  <label>Star Review:</label>
                  {[1,2,3,4,5].map((i) => {
                    return (<span key={i} className={`fas fa-star${testimonialStars >= i ? " checked" : ""}`} onClick={() => setTestimonialStars(i)}></span>)
                  })}
              </div>
            </div>
            

            <div className="Testimonial-Code-Gen">
              <label>Code Generator</label>
              <input 
                type="Text"
                placeholder="Generate 12 Digit Code Here"
                className="Testimonial-Twelve-Digit-Code-Gen"
                value={testimonialTwelveDigitCode}
                name="testimonialtwelvedigitcode"
                onChange={(e)=> setTestimonialTwelveDigitCode(e.target.value)}
                readOnly={true}
              />
            </div>

            <div className="RTE-WRAPPER">
                <div className="Editor-Wrapper">
                  <CKEditor
                    ref={editorRefSeven}
                    name="descriptionone"
                    editor={ClassicEditor}
                    data={editorContentSeven}
                    onChange={handleEditorChangeSeven}
                    config={customConfig}
                  />
                </div>
            </div>

            <button className="Testimonial-Form-Button-Submit" type="submit">Submit</button>
          </form>
        </div>) : twelvedigitcode !== "" && twelvedigitcode.length === 14 && !sumbittedacode && clickedReviewbutton? (
              <div className="Form-Wrapper-For-Testimonial-Add">
                <h1>Add Testimonial For User</h1>
                  <form className="True-testimonal-form" onSubmit={(e) => handleTestimonialAdd(e)} >
                    <div className="Top-bar-inputs-wrapper">

                      <div className="Title-Wrapper">
                        <label htmlFor='testimonialtitle'>Title :</label>
                        <input
                          type="text"
                          placeholder="Title"
                          className="Title"
                          value={testimonialTitle}
                          name="testimonialtitle"
                          onChange={(e) => setTestimonialTitle(e.target.value)}
                        />
                      </div>
                      
                      <div className="Id-Wrapper">
                        <label htmlFor='testimonialprojectid'>ProjectID :</label>
                        <input 
                          type="text"
                          placeholder="Project Id"
                          className="Testimonial-ProjectId"
                          value={testimonialProjectId}
                          name="testimonialprojectid"
                          onChange={(e) => setTestimonialProjectId(e.target.value)}
                        />
                      </div>
                      
                      <div className="Username-Wrapper">
                        <label>Username:</label>
                        <input 
                          type="text"
                          placeholder="Filler Username For User"
                          className="Testimonial-Username"
                          value={testimonialUsername}
                          name="testimonialusername"
                          onChange={(e) => setTestimonialUsername(e.target.value)}
                          readOnly={true}
                        />
                      </div>

                    </div>

                    <div className="Star-Review-Wrapper">
                      <div className="Star-Review-Button">
                          <label>Star Review:</label>
                          {[1,2,3,4,5].map((i) => {
                            return (<span key={i} className={`fas fa-star${testimonialStars >= i ? " checked" : ""}`} onClick={() => setTestimonialStars(i)}></span>)
                          })}
                      </div>
                    </div>
                    

                    <div className="Testimonial-Code-Gen">
                      <label>Code Generator</label>
                      <input 
                        type="Text"
                        placeholder="Generate 12 Digit Code Here"
                        className="Testimonial-Twelve-Digit-Code-Gen"
                        value={testimonialTwelveDigitCode}
                        name="testimonialtwelvedigitcode"
                        onChange={(e)=> setTestimonialTwelveDigitCode(e.target.value)}
                        readOnly={true}
                      />
                    </div>

                    <div className="RTE-WRAPPER">
                        <div className="Editor-Wrapper">
                          <CKEditor
                            ref={editorRefEight}
                            name="descriptionone"
                            editor={ClassicEditor}
                            data={editorContentEight}
                            onChange={handleEditorChangeEight}
                            config={customConfig}
                          />
                        </div>
                    </div>

                    <button className="Testimonial-Form-Button-Submit" type="submit">Submit</button>
                  </form>
              </div>
            ):
            (<div className="The-Form-To-Insert-Code">
              <h1>Insert Given Code Below or Select a project down farther</h1>
              <form onSubmit={(e) => FormCodeInputForReview(e)}>
              <input
                type="text"
                placeholder="12 - DIGIT CODE"
                className="Twelve-Digit-Code"
                value={twelvedigitcode}
                name="twelvedigitcode"
                onChange={(e) => settwelvedigitcode(e.target.value)}
              />

              <button type="submit">Send Code</button>
            </form>
            </div>)
          }
        </div>
        <div className="Section-For-People-TCWTR">
          {twelvedigitcode !== "" && sumbittedacode ? 
            null : 
            (<div className="ProjectSelection">
              <h1>Welcome {username} select a project you'd like to review</h1>
              <div className="Project-Selection-Grid-Wrapper">
                {projectRenderComp()}
              </div>
            </div> )
          }
        </div>
        <div className="Message-Logger">
          {twelvedigitcode !== "" && twelvedigitcode.length !== 14 && !sumbittedacode ? 
            <p>current submitted code is not twelve characters it is {twelvedigitcode.length} characters long you are either missing or added to many characters</p> : 
            twelvedigitcode !== "" && twelvedigitcode.length === 14 && sumbittedacode ? 
            <p>Form Should be Seen Above</p> : 
            twelvedigitcode !== "" && twelvedigitcode.length === 14 && !sumbittedacode ? 
            <p>There ya go! its 14 just double check everything is correct then hit send</p>: 
            null
          }
        </div>
      </div>
    </div>
  )
}

export default Createtestimonial