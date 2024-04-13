import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default function Body({ title, responseFacebook, responseGoogle }) {
  return (
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <GoogleLogin
        clientId="112201727875-bd592d1f57i64d9967ome7805fhv71a7.apps.googleusercontent.com"
        render={(renderProps) => (
          <div className={styles["social-login"]}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
              alt="Google icon"
            />
            <span>Continue with Google</span>
          </div>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <FacebookLogin
        appId="2997899053806903"
        autoLoad={false}
        callback={(data) => responseFacebook(data)}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} className={styles["social-login"]}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
              alt="Facebook icon"
            />
            <span>Continue with Facebook</span>
          </div>
        )}
      />
      {/* <div className={styles["social-login"]}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
          alt="Google icon"
        />
        <span>Continue with Google</span>
      </div> */}
      {/* <div className={styles["social-login"]}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
          alt="Facebook icon"
        />
        <span>Continue with Facebook</span>
      </div> */}
      <div className={styles.directLink}>
        {title === "Register" ? (
          <>
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </>
        ) : (
          <>
            <span>Don't have account?</span>
            <Link to="/register">Create one</Link>
          </>
        )}
      </div>
    </div>
  );
}
