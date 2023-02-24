import React from 'react';
import resume from '../../assests/Resume.pdf'

const Resume = () => {
  return (
    <div className="Page-Wrapper">
        <div className="resume-page-wrapper">
            <embed 
                src={resume}
                type="application/pdf"
                width="100%"
                height="800px"
            />
        </div>
    </div>
  )
}

export default Resume