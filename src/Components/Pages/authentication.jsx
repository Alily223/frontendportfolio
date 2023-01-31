import React ,{ useState } from 'react';
import { useNavigate } from "react-router-dom";


const Authentication = ({setUserLogInStatus, setAdminLogInStatus, setUsername, username, message, setMessage}) => {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState("LOG_IN")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === ""){
      setError(true);
      setErrorMessage("Error: All fields must be completed")
    } else {
      fetch("http://127.0.0.1:5000/users/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          username:username,
          password: password
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if(res === "user NONE EXISTENT"){
            setError(true);
            setErrorMessage("Error: Account could not be verified");
          }else if(res.admin_logged_in === true && res.user_found === true){
            setError(false);
            setErrorMessage("");
            setUserLogInStatus("LOGGED_IN");
            setAdminLogInStatus("LOGGED_IN");
            setUsername(username)
            setPassword(password)
            setMessage(`Succesfully logged in as ${username}`)
            navigate("/");
          } else if (res.user_found === true) {
            setError(false);
            setErrorMessage("");
            setUserLogInStatus("LOGGED_IN");
            setUsername(username)
            setPassword(password)
            setMessage(`Succesfully logged in as ${username}`)
            navigate("/");
          } else {
            setError(true);
            setErrorMessage("Error: not a user");
            setAdminLogInStatus("NOT_LOGGED_IN")
            setUserLogInStatus("NOT_LOGGED_IN");
            setUsername("guest")
            setPassword(password)
            setMessage(`UnSuccesfully logged in try again`)
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Error with logging in, please try again.", error);
          setError(true);
          setErrorMessage("Error with logging in, please try again.")
        })
    }
  }

  const toSignUp = () => {
    setFormState("SIGN_UP")
  }

  const toLogIn = () => {
    setFormState("LOG_IN")
  }

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Error: the passwords must match");
    } else {
      fetch("http://127.0.0.1:5000/users/signup", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "Error: The username is already registered"){
            setError(true);
            setErrorMessage("Error: The username is already reistered.");
          } else {
            setError(false);
            setErrorMessage("");
            setUserLogInStatus("LOGGED_IN");
            setUsername(username);
            setMessage(`Created user named ${username}`);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Error with creating account", error);
          setError(true);
          setErrorMessage("Error setting up your account, please try again!");
        });
    }
  };

  const loginForm = () => {
    return [
      <React.Fragment key="Login-Form">
        <div className="Login-Form">
          <div className="Form-Title">
            <h1>LOG-IN</h1>
          </div>
          <div className="Login-Form-Wrapper">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>

              <input 
              type="text"
              placeholder="Username"
              className="loginInput"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              />

              <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="loginButton">
                Log-In
              </button>

            </form>
          </div>

          <div className="Message-Wrapper">
            {error ? errorMessage : message}
          </div>
      
          <div className="Sign-up-wrapper">

            <div className="Button-Title">
              <p>Not a user? Sign-up below</p>
            </div>

            <div className="Sign-Up-Button">
              <button type="button" onClick={() => toSignUp()}>
                Sign-up
              </button>
            </div>
            
          </div>
          
        </div>
      </React.Fragment>
    ]
  }

  const signupForm = () => {
    return [
      <React.Fragment key="Signup-Form">
        <div className="Signup-Form">
          <div className="Form-Title">
            <h1>SIGN-UP</h1>
          </div>
          <div className="Signup-Form-Wrapper">
            <form className="loginBox" onSubmit={(e) => handleSubmitUser(e)}>

              <input 
              type="text"
              placeholder="Username"
              className="SignupInput"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              />

              <input
              type="password"
              placeholder="Password"
              className="SignupInput"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              />

              <input
              type="password"
              placeholder="Confirm Password"
              className="SignupInput"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="SignupButton">
                Sign-Up
              </button>

            </form>
          </div>

          <div className="Message-Wrapper">
            {error ? errorMessage : message}
          </div>

          <div className="Log-In-wrapper">

            <div className="Button-Title">
              <p>Already a user? Log-In below.</p>
            </div>

            <div className="Log-In-Button">
              <button type="button" onClick={() => toLogIn()}>
                Log-In
              </button>
            </div>
            
          </div>
          
        </div>
      </React.Fragment>
    ]
  }


  return (
    <div classname="Page-Wrapper">
      <div className="Forms-Wrapper">
        {formState === "LOG_IN" ? loginForm() : formState === "SIGN_UP" ? signupForm() : loginForm()}
      </div>
    </div>
    
  )
}

export default Authentication