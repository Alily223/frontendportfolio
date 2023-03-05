import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import he from 'he';
import HtmlReactParser from 'html-react-parser';

const Testimonials = ({username, twelvedigitcode, settwelvedigitcode}) => {
  const [message, setMessage] = useState("")
  const [countdownthingy , setCountdownThingy] = useState(0)
  const [countdownthingy2 , setCountdownThingy2] = useState(0)
  const [publishedTestimonials, setPublishedTestimonials] = useState([])
  const [change , setChange] = useState(true)
  const [isLoading,setIsloading] = useState(true)
  
  const tobackend = "https://backendforlilygrenportfolio.herokuapp.com"
  const navigate = useNavigate();

  const TheBeginningOfReview = () =>{
    if (username !== ""){
      //console.log("This will send you direct to create review page")
      navigate("/createtestimonial")
    }else {
      setMessage("First lets setup a account for you wait until the end of this countdown and it'll auto navigate you to a sign-up page then you can come back here and try again.")
      let countdown = 10
      const countdownTimer = setInterval(() => {
        countdown--;
        //console.log(countdown)
        setCountdownThingy(countdown)
        if(countdown === 0){
          clearInterval(countdownTimer);
          navigate("/authentication");
        }
      }, 1000)
    }
  }

  useEffect(() => {
    if (change) {
      const fetchpublishedTestimonials = async () => {
        try {
          const response = await fetch(`${tobackend}/truepublishedtestimonials/getall`);
          const data = await response.json();
          //console.log(data)
          setPublishedTestimonials(data);
          setIsloading(false);
          //console.log("data varaible", data);
          
        } catch (error) {
          console.error(error);
        }
      };
      fetchpublishedTestimonials();
      //console.log(projects)
      setChange(false)
      }
  }, [change])

  const PublishedTestimonialsElements = publishedTestimonials.map(testimonial => {
    const review = he.decode(testimonial.review)

    const parsedDescription = HtmlReactParser(review)

    console.log(testimonial)

    return (
      <div key={testimonial.id} className="Testimonial-Wrapper">
        <div className="Testimonial-Left-Box-Wrapper">
          <div className="Testimonal-Title">
            <h2>{testimonial.publishedtitle}</h2>
          </div>
          <div className="Testimonial-Project-Id">
            <p>Project Id: {testimonial.publishedprojectid}</p>
            <button>Go to Project</button>
          </div>
        </div>
        <div className="Testimonial-Middle-Box-Wrapper">
          <div className="Testimonial-Stars-Wrapper">
            {[1,2,3,4,5].map((i) => {
              return (<span key={i} className={`fas fa-star${testimonial.stars >= i ? " checked" : ""}`}></span>)
            })}
          </div>
          <div className="Testimonial-Review-Wrapper">
            {parsedDescription}
          </div>
        </div>
        <div className="Testimonial-Right-Box-Wrapper">
          <div className="Testimonial-Username">
            <p>BY: {testimonial.testimonial_username}</p>
          </div>
        </div>
        
      </div>
    )
  })

  const FormCodeInputForReview = (e) => {
    e.preventDefault();
    settwelvedigitcode(twelvedigitcode);
    if (username !== "" && twelvedigitcode !== ""){
      //console.log("This will send you direct to create review page")
      navigate("/createtestimonial")
    }else {

      if (username === ""){
        setMessage("First lets setup a account for you wait until the end of this countdown and it'll auto navigate you to a sign-up page then you can come back here and try again.")
        let countdown = 10
        const countdownTimer = setInterval(() => {
        countdown--;
        //console.log(countdown)
        setCountdownThingy2(countdown)
        if(countdown === 0){
          clearInterval(countdownTimer);
          navigate("/authentication");
        }
      }, 1000)
      }
      if (twelvedigitcode === ""){
        setMessage("Please input code to continue")
      }
      if (username === "" && twelvedigitcode === ""){
        setMessage("Please input code then ill send you to sign up or log in")
      }
      
    }
  }


  return (
    <div className="Page-Wrapper">
      <div className="Testimonial-Page-Wrapper">
        <div className="Form-For-Users-To-Add-A-Review">
          <div className="For-Commisoners">
            <p>I've Requested A website and would Like to add a review</p>
            <form onSubmit={(e) => FormCodeInputForReview(e)}>
              <label>Insert 12-Digit Code :</label>
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
            {countdownthingy2 > 0 ? <p>{message}<br/>The Countdown: {countdownthingy2} Seconds</p> : <p>{message}</p>}
          </div>
          
          <div className="For-Guests">
            <p>I've viewed a website and would like to add a review</p>
            <button type="button" onClick={() => TheBeginningOfReview()}>Click Here To Begin Review</button>
            {countdownthingy > 0 ? <p>{message}<br/>The Countdown: {countdownthingy} Seconds</p> : null}
          </div>
          
        </div>

        <div className="PublishedTestimonialsPage">
          {PublishedTestimonialsElements}
        </div>
      </div>
    </div>
  )
}

export default Testimonials