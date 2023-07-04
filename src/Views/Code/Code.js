import './Code.css'
import line from "../../Images/line.png";

function Code() {
  return (
    <>
      <div className="container">
        <div className="image-section">
          <div className="image-content">
            <h2>Please enter the joining code to join in this lucky draw.</h2>
            <img src={line}></img>
          </div>
        </div>
        <div className="content-section">
          <div className="content-content">
            <h1>Join Lucky Draw</h1>
            <div >
              <p className="codebtn">Code</p>
              <input
                id="code-input"
                type="number"
                className="code-input"
                placeholder=" Enter code"
              />
            </div>
            <button className='cd-button'>Join</button>
          </div>
          <div className="powered">
            <p className="invision"> Powered by Invision Solutions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Code
