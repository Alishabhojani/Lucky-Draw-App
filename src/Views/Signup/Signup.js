import './Signup.css'

import {useParams} from 'react-router-dom'


function Signup() {
  const params = useParams()
  console.log(params)
  return (
    <>
      <div className="container-1">
        <div className="image-section-1"></div>
        <div className="content-section-1">
          <div className="content-content-2">
            <h1 className='personal'>Personal Information</h1>
            <p className='please'>Please enter below your personal information to continue.</p>
            <div className="codebtn-1">
              <input
                type="text"
                className="input-field-1"
                placeholder="   Name"
              />
              <input
                type="tel"
                className="input-field-1"
                placeholder="   Phone"
              />
            </div>

            <button className="button-continue">Continue</button>
          </div>
          <div className="powered-2">
            <p className="invision">Powered by Invision Solutions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
