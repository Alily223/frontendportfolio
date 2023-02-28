import React, {useState, useEffect, useRef} from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HtmlReactParser from 'html-react-parser';
import he from 'he';

const Createtestimonial = ({username, twelvedigitcode, settwelvedigitcode}) => {
  const editorRefSeven = useRef(null)
  const [sumbittedacode, setSumbittedACode] = useState(false);
  const [testimonial, setTestimonials] = useState([]);
  const [testimonialTitle , setTestimonialTitle] = useState("")
  const [testimonialProjectId, setTestimonialProjectId] = useState(0)
  const [testimonialUsername ,setTestimonialUsername] = useState("")
  const [testimonialStars, setTestimonialStars] = useState(0)
  const [testimonialTwelveDigitCode,setTestimonialTwelveDigitCode] = useState("")
  const [editorContentSeven, setEditorContentSeven] = useState("")

  const FormCodeInputForReview = (e) => {
    e.preventDefault();
    settwelvedigitcode(twelvedigitcode);
    setSumbittedACode(true);
    if (twelvedigitcode.length !== 14) {
      setSumbittedACode(false)
    }
  }

  const check = twelvedigitcode.length === 14

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/testimonialpublished/grabforuser/${twelvedigitcode}`);
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

        setTimeout(() => {editorRefSeven.current.editor.setData(String(content))}, 500)
      }, 1000)
      
      
    }
    
    
  }, [twelvedigitcode, setTestimonials, setTestimonialTitle,testimonial.testimonial_title, setTestimonialProjectId,testimonial.testimonialprojectid, setTestimonialStars,testimonial.stars,  setTestimonialUsername, username, setTestimonialTwelveDigitCode, testimonial.review, check])

  const handleEditorChangeSeven = (e, editor) => {
    setEditorContentSeven(editor.getData())
  }

  const customConfig = {
    extraAllowedContent: 'h1 h2 h3 p strong em'
  };

  return (
    <div className="Page-Wrapper">
      <div className="Create-Review-Page-Wrapper">
        <div className="Section-For-Commisioners">
          {twelvedigitcode !== "" && twelvedigitcode.length === 14 && sumbittedacode? (<div className="Form-Wrapper-For-Testimonial-Add">
          <h1>Add Testimonial For User</h1>
          <form className="True-testimonal-form" onSubmit={() => console.log('fuck')} >
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
        </div>) : 
            (<div className="The-Form-To-Insert-Code">
              <p>Insert Given Code Below or Select a project down farther</p>
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
            <p>Welcome {username} select a project you'd like to review</p>
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