import "./AdminLogin.css";
import line from "../../Images/line.png";

function AdminLogin() {
  return (
    <>
      <div className="container-2">
        <div className="image-section-2">
          <div className="image-content-2">
            <h2>Please enter the joining code to join in this lucky draw.</h2>
            <img src={line}></img>
          </div>
        </div>
        <div className="content-section-2">
          <div className="content-content-1">
            <h1 className="login">Login</h1>
            <div >
              <p className="codebtn-3">Email</p>
              <input
                id="email-input"
                type="email"
                className="code-input-3"
                placeholder=" Enter email"
              />
            </div>
            <div >
              <p className="codebtn">Password</p>
              <input
                id="password-input"
                type="password"
                className="code-input-3"
                placeholder=" Enter password"
              />
            </div>
            <button className="button-admin">Join</button>
          </div>
          <div className="powered-4">
            <p className="invision"> Powered by Invision Solutions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
