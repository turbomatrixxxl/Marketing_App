import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { oAuthlLogInRegister, register } from "../../redux/auth/operationsAuth";

import { Link } from "react-router-dom";

import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

import useToggle from "../../hooks/useToggle";
import useFormValidation from "../../hooks/useFormValidation";
import validateRegister from "../../hooks/validateRegister";
import useFormTouched from "../../hooks/useFormTouched";
import usePasswordStrength from "../../hooks/usePasswordStrength";

import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const { fields, setFields, validateFields } = useFormValidation(
    {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validateRegister
  );

  const { touched, handleBlur } = useFormTouched();
  const passwordStrength = usePasswordStrength(fields.password);

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [eyeVisible, toggleEyeVisible] = useToggle(true);
  const [closedEyeVisible, toggleClosedEyeVisible] = useToggle(false);

  const [confirmType, setConfirmType] = useState("password");
  const [confirmEyeVisible, toggleConfirmEyeVisible] = useToggle(true);
  const [confirmClosedEyeVisible, toggleConfirmClosedEyeVisible] =
    useToggle(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const { passwordConfirm, ...fieldsWithoutPasswordConfirm } = fields;

    dispatch(register(fieldsWithoutPasswordConfirm))
      .unwrap()
      .then(() => {
        setFields({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        toast.success("Registration successful!");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Account with this email already exists.");
        toast.error("Account with this email already exists.");
      });
    toast.success("Registration successful!");
  };

  const handleOAuthLogin = async (profile, provider) => {
    const userPayload = { profile, provider };
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

  const isFormValid =
    fields.username.trim() !== "" &&
    fields.email.trim() !== "" &&
    fields.password.length >= 6 &&
    fields.password === fields.passwordConfirm;

  return (
    <div className={styles.cont}>
      <div className={styles.linkContainer}>
        <p className={styles.login}>Registration</p>

        <Link to="/auth/login" className={styles.navLinkTitle}>
          Log In
        </Link>
      </div>

      <div className={styles.form}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <Input
                  autoComplete="on"
                  paddingLeft="18px"
                  width="100%"
                  type={"text"}
                  value={fields.username}
                  handleChange={(e) => {
                    setFields({ ...fields, username: e.target.value });
                  }}
                  handleBlur={handleBlur("username")}
                  placeholder="Name"
                  required={true}
                />
              </div>
              {touched.username && !fields.username && (
                <p className={styles.inputError}>Required</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <Input
                  autoComplete="on"
                  paddingLeft="18px"
                  width="100%"
                  type="email"
                  value={fields.email}
                  handleChange={(e) => {
                    setFields({ ...fields, email: e.target.value });
                  }}
                  handleBlur={handleBlur("email")}
                  placeholder="E-mail"
                  required={true}
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
                  paddingLeft="18px"
                  width="100%"
                  type={type}
                  value={fields.password}
                  handleChange={(e) => {
                    setFields({ ...fields, password: e.target.value });
                  }}
                  handleBlur={handleBlur("password")}
                  placeholder="Password"
                  required={true}
                />
              </div>
              {touched.password && !fields.password && (
                <p className={styles.inputError}>Required</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                {confirmEyeVisible && (
                  <VscEye
                    fill="var(--brand-color)"
                    onClick={() => {
                      toggleConfirmEyeVisible();
                      toggleConfirmClosedEyeVisible();
                      setConfirmType("text");
                    }}
                    size="24px"
                    className={styles.eyeIcon}
                  />
                )}
                {confirmClosedEyeVisible && (
                  <VscEyeClosed
                    fill="#4885e0"
                    onClick={() => {
                      toggleConfirmEyeVisible();
                      toggleConfirmClosedEyeVisible();
                      setConfirmType("password");
                    }}
                    size="24px"
                    className={styles.eyeIcon}
                  />
                )}
                <Input
                  autoComplete="on"
                  paddingLeft="18px"
                  width="100%"
                  type={confirmType}
                  value={fields.passwordConfirm}
                  handleChange={(e) =>
                    setFields({ ...fields, passwordConfirm: e.target.value })
                  }
                  handleBlur={handleBlur("passwordConfirm")}
                  placeholder="Confirm Password"
                  required={true}
                />
              </div>
              {touched.passwordConfirm && !fields.passwordConfirm && (
                <p className={styles.inputError}>Required</p>
              )}
              {touched.passwordConfirm &&
                fields.password !== fields.passwordConfirm && (
                  <p className={styles.inputError}>Passwords must match</p>
                )}
            </div>
            <div className={styles.passwordStrengthBar}>
              <div
                className={styles.passwordStrengthIndicator}
                style={{
                  width: `${(passwordStrength / 5) * 100}%`,
                  backgroundColor:
                    passwordStrength < 3
                      ? "red"
                      : passwordStrength < 4
                      ? "orange"
                      : "green",
                }}></div>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <Button disabled={!isFormValid} variant="auth" type="submit">
              Register Now
            </Button>
          </div>
        </form>
        <p className={styles.choiceContainer}>
          <span className={styles.line}></span>
          <span>or</span>
          <span className={styles.line}></span>
        </p>
        <div className={styles.socialButtonCont}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
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

export default RegisterForm;
