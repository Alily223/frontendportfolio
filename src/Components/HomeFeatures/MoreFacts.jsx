import React, {useEffect, useState} from 'react'

const MoreFacts = () => {
    const [htmlPercent, setHtmlPercent] = useState("")
    const [pythonPercent, setPythonPercent] = useState("")
    const [mongoDBPercent, setMongoDBPercent] = useState("")
    const [scssPercent, setScssPercent] = useState("")
    const [flaskPercent, setFlaskPercent] = useState("")
    const [umlPercent, setUMLPercent] = useState("")
    const [uiUxPercent, setUiUxPercent] = useState("")
    const [javascriptPercent, setJavascriptPercent] = useState("")
    const [gitPercent, setGitPercent] = useState("")
    const [reactJSPercent, setReactJSPercent] = useState("")
    const [mySQLPercent, setMySQLPercent] = useState("")

    useEffect(() => {
        setHtmlPercent(document.getElementById('Percent-Tag-HTML').innerText.slice(0, -1))
        setPythonPercent(document.getElementById('Percent-Tag-Python').innerText.slice(0, -1))
        setMongoDBPercent(document.getElementById('Percent-Tag-MongoDB').innerText.slice(0, -1))
        setScssPercent(document.getElementById('Percent-Tag-Scss').innerText.slice(0, -1))
        setFlaskPercent(document.getElementById('Percent-Tag-Flask').innerText.slice(0, -1))
        setUMLPercent(document.getElementById('Percent-Tag-UML').innerText.slice(0, -1))
        setUiUxPercent(document.getElementById('Percent-Tag-UIUX').innerText.slice(0, -1))
        setJavascriptPercent(document.getElementById('Percent-Tag-Javascript').innerText.slice(0, -1))
        setGitPercent(document.getElementById('Percent-Tag-GIT').innerText.slice(0, -1))
        setReactJSPercent(document.getElementById('Percent-Tag-ReactJS').innerText.slice(0, -1))
        setMySQLPercent(document.getElementById('Percent-Tag-SQL').innerText.slice(0, -1))
    }, [])
    
  return (
    <div className='More-Facts-About-Me-Grid-Wrapper'>
        <div className='Skills-Wrapper'>
            <div className='Header-MFAMGW-SW'>
                <h2>Skills & Percent Confidence</h2>
            </div>

            <div className='Skill-bar-confidence-wrapper'>
                <div className='Skill-Item-wrapper'>

                    <div className="Skill-Name">
                        <p>HTML5</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-HTML" style={{width: `${htmlPercent}%`}}>
                            <p id='Percent-Tag-HTML'>95%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>SCSS/CSS</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-CSS" style={{width: `${scssPercent}%`}}>
                            <p id='Percent-Tag-Scss'>95%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>Python</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-Python" style={{width: `${pythonPercent}%`}}>
                            <p id='Percent-Tag-Python'>75%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>Flask</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-Flask" style={{width: `${flaskPercent}%`}}>
                            <p id='Percent-Tag-Flask'>55%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>MongoDB</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-MongoDB" style={{width: `${mongoDBPercent}%`}}>
                            <p id='Percent-Tag-MongoDB'>65%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper' >
                
                    <div className="Skill-Name">
                        <p>UML</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-UML" style={{width: `${umlPercent}%`}}>
                            <p id='Percent-Tag-UML'>90%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>UI/UX</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-UIUX" style={{width: `${uiUxPercent}%`}}>
                            <p id='Percent-Tag-UIUX'>100%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>Javascript</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-Javascript" style={{width: `${javascriptPercent}%`}}>
                            <p id='Percent-Tag-Javascript'>85%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>GIT</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-GIT" style={{width: `${gitPercent}%`}}>
                            <p id='Percent-Tag-GIT'>85%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>ReactJS</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-ReactJS" style={{width: `${reactJSPercent}%`}}>
                            <p id='Percent-Tag-ReactJS'>75%</p>
                        </div>
                    </div>

                </div>

                <div className='Skill-Item-wrapper'>
                
                    <div className="Skill-Name">
                        <p>MySQL</p>
                    </div>

                    <div className='Skill-Bar'>
                        <div className="Skill-Percent-SQL" style={{width: `${mySQLPercent}%`}}>
                            <p id='Percent-Tag-SQL'>90%</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className='Hobbies-Wrapper'>
            <div className='Header-MFAMGW-HW'>
                <h2>Hobbies</h2>
            </div>

            <div className='Hobbies-list-wrapper'>
                <ul>
                    <li className='List-item'><b>Gaming</b></li>
                    <div><p>Project Zomboid, No Mans Sky, Fallout 4, Skyrim</p></div>
                    <li className='List-item'><b>Writing</b></li>
                    <div><p>World Building, Character Building, Story Creation</p></div>
                    <li className='List-item'><b>Coding</b></li>
                    <div><p>Hacker Ranks, Problem Solving, Random Code Creation</p></div>
                    <li className='List-item'><b>Photography</b></li>
                    <div><p>Lively Portraits, Landscape Photos, Abstract Photos</p></div>
                    <li className='List-item'><b>Digitial Arts</b></li>
                    <div><p>Abstract Art, Portrait Art, Fantasy Art</p></div>
                    <li className='List-item'><b>Science</b></li>
                    <div><p>Space Exploration, Human Health, Theories</p></div>
                </ul>
            </div>
        </div>

        <div className='Currently-Learning-Wrapper'>
            <div className='Header-MFAMGW-CLW'>
                <h2>Currently Learning from Udemy</h2>
            </div>

            <div className='Currently-Learning-Wrapper-List'>
                <div className="Currently-learning-item">
                    <div className="C-L-I-TOP">
                        <div className="Item-Learning-Title">
                            <h3>Next.Js -</h3>
                        </div>
                        
                        <div className="Stage-Of-Learning">
                            <p>&nbsp;&nbsp;Module One</p>
                        </div>
                    </div>

                    <div className="C-L-I-BOTTOM">
                        <div className="Description-For-C-L-I">
                            <p>Next.js is a JavaScript framework for building fast and scalable server-side rendered web applications with React.</p>
                        </div>
                    </div>
                </div>

                <div className="Currently-learning-item">
                    <div className="C-L-I-TOP">
                        <div className="Item-Learning-Title">
                            <h3>Three.Js -</h3>
                        </div>
                        
                        <div className="Stage-Of-Learning">
                            <p>&nbsp;&nbsp;Foundations</p>
                        </div>
                    </div>

                    <div className="C-L-I-BOTTOM">
                        <div className="Description-For-C-L-I">
                            <p>Three.js is a JavaScript library for creating interactive 3D graphics in web browsers.</p>
                        </div>
                    </div>
                </div>

                <div className="Currently-learning-item">
                    <div className="C-L-I-TOP">
                        <div className="Item-Learning-Title">
                            <h3>Lua Scripting -</h3>
                        </div>
                        
                        <div className="Stage-Of-Learning">
                            <p>&nbsp;&nbsp;Foundations</p>
                        </div>
                    </div>

                    <div className="C-L-I-BOTTOM">
                        <div className="Description-For-C-L-I">
                            <p>Lua is a lightweight, high-level, multi-paradigm programming language used for scripting and extension in various applications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MoreFacts