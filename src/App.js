import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/main.scss';

import Home from './Components/Pages/home';
import Authentication from './Components/Pages/authentication';
import Blog from './Components/Pages/blog';
import Certificates from './Components/Pages/certificates';
import Contact from './Components/Pages/contact';
import Createtestimonial from './Components/Pages/createtestimonial';
import Hackerrank from './Components/Pages/hackerrank';
import Hireforwork from './Components/Pages/hireforwork';
import Manager from './Components/Pages/manager';
import Projects from './Components/Pages/projects';
import Testimonials from './Components/Pages/testimonials';
import Unfinishedprojects from './Components/Pages/unfinishedprojects';
import Usermanager from './Components/Pages/usermanager';
import Navigation from './Components/Navigation/navigation';
import Nomatch from './Components/Pages/nomatch';



function App() {
  const [userLogInStatus, setUserLogInStatus] = useState("LOGGED_IN")
  const [adminLogInStatus, setAdminLogInStatus] = useState("NOT_LOGGED_IN")
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div class="Container">
      <BrowserRouter>
        <Navigation userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>
        { userLogInStatus === "NOT_LOGGED_IN" ? (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername} message={message} setMessage={setMessage}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/hackerrank" element={<Hackerrank />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/unfinishedprojects" element={<Unfinishedprojects />} />
            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        ): userLogInStatus === "LOGGED_IN" || adminLogInStatus === "LOGGED_IN" ? (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/hackerrank" element={<Hackerrank />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/unfinishedprojects" element={<Unfinishedprojects />} />

            <Route path="/createtestimonial" element={<Createtestimonial />} />
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
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/hackerrank" element={<Hackerrank />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/unfinishedprojects" element={<Unfinishedprojects />} />

            <Route path="/createtestimonial" element={<Createtestimonial />} />
            <Route path="/hireforwork" element={<Hireforwork />} />
            <Route path="/contact" element={<Contact />} />
            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home userLogInStatus={userLogInStatus} setUserLogInStatus={setUserLogInStatus} adminLogInStatus={adminLogInStatus} setAdminLogInStatus={setAdminLogInStatus} username={username} setUsername={setUsername}/>}/>
            <Route path="/authentication" element={<Authentication setUserLogInStatus={setUserLogInStatus} setAdminLogInStatus={setAdminLogInStatus} setUsername={setUsername}/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/hackerrank" element={<Hackerrank />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/unfinishedprojects" element={<Unfinishedprojects />} />
            <Route exact path="*" element={<Nomatch />} />
          </Routes>
        )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
