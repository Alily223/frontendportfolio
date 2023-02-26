import React, {useState, useEffect} from 'react';

const Createtestimonial = ({username, twelvedigitcode, settwelvedigitcode}) => {
  const [sumbittedacode, setSumbittedACode] = useState(false);

  const FormCodeInputForReview = (e) => {
    e.preventDefault();
    settwelvedigitcode(twelvedigitcode);
    setSumbittedACode(true);
    if (twelvedigitcode.length !== 12) {
      setSumbittedACode(false)
    }
  }

  return (
    <div className="Page-Wrapper">
      <div className="Create-Review-Page-Wrapper">
        <div className="Section-For-Commisioners">
          {twelvedigitcode !== "" && twelvedigitcode.length === 12 && sumbittedacode? (<p>Filled Form</p>) : 
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
          {twelvedigitcode !== "" && twelvedigitcode.length !== 12 && !sumbittedacode ? 
            <p>current submitted code is not twelve characters it is {twelvedigitcode.length} characters long you are either missing or added to many characters</p> : 
            twelvedigitcode !== "" && twelvedigitcode.length === 12 && sumbittedacode ? 
            <p>Form Should be Seen Above</p> : 
            twelvedigitcode !== "" && twelvedigitcode.length === 12 && !sumbittedacode ? 
            <p>There ya go! its twelve just double check everything is correct then hit send</p>: 
            null
          }
        </div>
      </div>
    </div>
  )
}

export default Createtestimonial