import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/main.scss';

import Home from './Components/Pages/home.jsx';
import Authentication from './Components/Pages/authentication.jsx';
import Blog from './Components/Pages/blog.jsx';
import Contact from './Components/Pages/contact.jsx';
import Createtestimonial from './Components/Pages/createtestimonial.jsx';
import Hireforwork from './Components/Pages/hireforwork.jsx';
import Manager from './Components/Pages/manager.jsx';
import Projects from './Components/Pages/projects.jsx';
import Testimonials from './Components/Pages/testimonials.jsx';
import Usermanager from './Components/Pages/usermanager.jsx';
import Navigation from './Components/Navigation/navigation.jsx';
import Nomatch from './Components/Pages/nomatch.jsx';
import Resume from './Components/Pages/resume.jsx';



function App() {
  const [userLogInStatus, setUserLogInStatus] = useState("NOT_LOGGED_IN")
  const [adminLogInStatus, setAdminLogInStatus] = useState("NOT_LOGGED_IN")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const [twelvedigitcode, settwelvedigitcode] = useState("")

  useEffect(() => {
  const token = localStorage.getItem("token");
  //console.log(token)

  //console.log(localStorage.getItem("token"))

  if (token) {
    fetch("https://backend-for-lilygrenportfolio.herokuapp.com/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          username: username
        }),
      })
      .then((res)=> res.json())
      .then((res) => {
        //console.log(res.data.username)
        if (res.data.username === "AustinLily"){
          setError(false);
          setErrorMessage("");
          setUserLogInStatus("LOGGED_IN");
          setAdminLogInStatus("LOGGED_IN");
          setUsername(res.data.username);
          setMessage(`Successfully logged in as ${username}`);
        } else if (res.user_found === true) {
          setError(false);
          setErrorMessage("");
          setUserLogInStatus("LOGGED_IN");
          setUsername(res.data.username);
          setMessage(`Successfully logged in as ${username}`);
        } else {
          setError(true);
          setErrorMessage("Error: not a user");
          setAdminLogInStatus("NOT_LOGGED_IN")
          setUserLogInStatus("NOT_LOGGED_IN");
          setUsername("guest")
          setMessage("Unsuccessful login, try again")
        }
      }).catch((error) => {
        setError(true);
        setErrorMessage(`Error: network request failed ${error}`);
      });
  }}, [username]);

  return (
    <div className="Container">
      <BrowserRouter>
        <Navigation userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>
        {error === true ? <p className='ErrorMessage'>{errorMessage}</p> : null}
        { userLogInStatus === "NOT_LOGGED_IN" ? (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername} username={username} message={message} setMessage={setMessage}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/resume" element={<Resume/>}/>

            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        ): userLogInStatus === "LOGGED_IN" || adminLogInStatus === "LOGGED_IN" ? (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/resume" element={<Resume/>}/>


            <Route path="/createtestimonial" element={<Createtestimonial username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/hireforwork" element={<Hireforwork />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/manager" element={<Manager />} />
            <Route path="/usermanager" element={<Usermanager />} />
            <Route exact path="*" element={<Nomatch />} />
  
          </Routes>
        ):userLogInStatus === "LOGGED_IN" ? (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/resume" element={<Resume/>}/>

            <Route path="/createtestimonial" element={<Createtestimonial username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/hireforwork" element={<Hireforwork />} />
            <Route path="/contact" element={<Contact />} />
            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials username={username} twelvedigitcode={twelvedigitcode} settwelvedigitcode={settwelvedigitcode}/>} />
            <Route path="/resume" element={<Resume/>}/>
            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
