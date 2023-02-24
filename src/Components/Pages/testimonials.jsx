import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Testimonials = ({username, twelvedigitcode, settwelvedigitcode}) => {
  const [message, setMessage] = useState("")
  const [countdownthingy , setCountdownThingy] = useState(0)
  const [countdownthingy2 , setCountdownThingy2] = useState(0)
  

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
      </div>
    </div>
  )
}

export default Testimonials