import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/auth/operationsAuth";

import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import useFormValidation from "../../hooks/useFormValidation";
import validateEmail from "../../hooks/validateEmail";
import useFormTouched from "../../hooks/useFormTouched";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./ForgotPasswordForm.module.css";

function ForgotPasswordForm() {
  const { fields, setFields, validateFields } = useFormValidation(
    { email: "" },
    validateEmail
  );

  const { touched, handleBlur } = useFormTouched(fields);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await dispatch(forgotPassword(fields)).unwrap();
      toast.success("Email sent successful!", { position: "top-center" });
    } catch (error) {
      setErrorMessage("You have entered an invalid email.");
      toast.error(error);
    }
  };

  const isFormValid = fields.email.trim() !== "";

  return (
    <div className={styles.cont}>
      <h1 className={styles.title}>Forgot Password</h1>

      <p className={styles.text}>
        An email will be sent to Your email address to reset the password
      </p>

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
          </div>

          <div className={styles.buttonsContainer}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <Button disabled={!isFormValid} variant="auth" type="submit">
              Send Mail
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
