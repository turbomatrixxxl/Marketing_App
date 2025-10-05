import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { logIn, oAuthlLogInRegister } from "../../redux/auth/operationsAuth";

import { Link, useNavigate } from "react-router-dom";
import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

import useToggle from "../../hooks/useToggle";
import useFormValidation from "../../hooks/useFormValidation";
import validateLogin from "../../hooks/validateLogin";
import useFormTouched from "../../hooks/useFormTouched";
import { useAuth } from "../../hooks/useAuth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const { fields, setFields, validateFields } = useFormValidation(
    { email: "", password: "" },
    validateLogin
  );

  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { touched, handleBlur } = useFormTouched(fields);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [eyeVisible, toggleEyeVisible] = useToggle(true);
  const [closedEyeVisible, toggleClosedEyeVisible] = useToggle(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await dispatch(logIn(fields)).unwrap();
      toast.success("Login successful!", { position: "top-center" });
    } catch (error) {
      setErrorMessage("You have entered an invalid username or password.");
    }
  };

  const handleOAuthLogin = async (profile, provider, accessToken = null) => {
    const userPayload = { profile, provider, accessToken };
    try {
      await dispatch(oAuthlLogInRegister(userPayload)).unwrap();
      toast.success("Login successful!", { position: "top-center" });
    } catch (err) {
      toast.error(`${provider} login failed`);
      console.error(err);
    }
  };

  // callback FB common
  const onFacebookResponse = (response) => {
    console.log("FB raw response:", response);

    if (!response) {
      toast.error("Facebook returned no response");
      return;
    }

    if (response.status === "unknown") {
      toast.error("Facebook login failed or cancelled");
      return;
    }

    const accessToken =
      response.accessToken || response.authResponse?.accessToken || null;
    const id =
      response.id || response.userID || response.authResponse?.userID || null;
    const name = response.name || null;
    const email = response.email || null;
    const avatar = response.picture?.data?.url || null;

    const profile = {
      id,
      name,
      email,
      avatar,
    };

    // handleOAuthLogin trebuie să accepte accessToken ca al treilea param
    handleOAuthLogin(profile, "facebook", accessToken);
  };

  const isFormValid = fields.email.trim() !== "" && fields.password.length >= 6;

  return (
    <div className={styles.cont}>
      <div className={styles.linkContainer}>
        <Link to="/auth/register" className={styles.navLinkTitle}>
          Registration
        </Link>
        <p className={styles.login}>Log In</p>
      </div>

      <div className={styles.form}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsCont}>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  autoComplete="on"
                  paddingLeft="18px"
                  width="100%"
                  type="email"
                  value={fields.email}
                  handleChange={(e) =>
                    setFields({ ...fields, email: e.target.value })
                  }
                  handleBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {touched.email && !fields.email && (
                <p className={styles.inputError}>Required</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                {eyeVisible && (
                  <VscEye
                    fill="var(--brand-color)"
                    onClick={() => {
                      toggleEyeVisible();
                      toggleClosedEyeVisible();
                      setType("text");
                    }}
                    size="24px"
                    className={styles.eyeIcon}
                  />
                )}
                {closedEyeVisible && (
                  <VscEyeClosed
                    fill="#4885e0"
                    onClick={() => {
                      toggleEyeVisible();
                      toggleClosedEyeVisible();
                      setType("password");
                    }}
                    size="24px"
                    className={styles.eyeIcon}
                  />
                )}
                <Input
                  autoComplete="on"
                  paddingLeft="14px"
                  width="100%"
                  type={type}
                  value={fields.password}
                  handleChange={(e) =>
                    setFields({ ...fields, password: e.target.value })
                  }
                  handleBlur={() => {
                    handleBlur("password");
                    setForgotPassword(false);
                  }}
                  handleClick={() => setForgotPassword(true)}
                  placeholder="Password"
                  required
                />
              </div>

              {forgotPassword && (
                <button className={styles.forgotPassword} type="button">
                  Forgot password?
                </button>
              )}
              {touched.password && fields.password.length < 6 && (
                <p className={styles.inputError}>
                  Password must be at least 6 characters!
                </p>
              )}
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <Button disabled={!isFormValid} variant="auth" type="submit">
              Login
            </Button>
          </div>

          {((user !== null && !isLoggedIn) || user?.verify === false) && (
            <div className={styles.errorCont}>
              <p className={styles.error}>
                It seems that your authorisation token expired or your email is
                not verified! Please click Login or Verify.
              </p>
              <Button
                variant="auth"
                handleClick={() => navigate("/verify-email")}>
                Verify
              </Button>
            </div>
          )}
        </form>

        <p className={styles.choiceContainer}>
          <span className={styles.line}></span>
          <span>or</span>
          <span className={styles.line}></span>
        </p>

        <div className={styles.socialButtonCont}>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              background: "royalblue",
              borderRadius: "6px",
            }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const profile = jwtDecode(credentialResponse.credential);
                handleOAuthLogin(
                  {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.picture,
                  },
                  "google"
                );
              }}
              onError={() => toast.error("Google login failed")}
              size="large"
              shape="rectangular"
              theme="filled_blue"
              width="100%" // doar ca fallback
            />
          </div>
        </div>

        <div className={styles.socialButtonCont}>
          <FacebookLogin
            className={styles.facebookButton}
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            scope="email,public_profile"
            callback={onFacebookResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
