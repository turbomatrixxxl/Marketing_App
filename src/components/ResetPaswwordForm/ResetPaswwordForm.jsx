import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/auth/operationsAuth";

import { useNavigate, useParams } from "react-router-dom";

import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

import useToggle from "../../hooks/useToggle";
import useFormValidation from "../../hooks/useFormValidation";
import validateNewPassword from "../../hooks/validateNewPassword";
import useFormTouched from "../../hooks/useFormTouched";
import usePasswordStrength from "../../hooks/usePasswordStrength";

import styles from "./ResetPaswwordForm.module.css";

function ResetPasswordForm() {
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    console.log("Token from URL:", token);
    // Poți valida tokenul aici sau face fetch către backend
  }, [token]);

  const { fields, setFields, validateFields } = useFormValidation(
    {
      password: "",
      passwordConfirm: "",
    },
    validateNewPassword
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
    console.log("password ;", fieldsWithoutPasswordConfirm);

    const newPassword = fieldsWithoutPasswordConfirm.password;

    dispatch(resetPassword({ token, newPassword }))
      .unwrap()
      .then(() => {
        setFields({
          password: "",
          passwordConfirm: "",
        });
        toast.success("Password reset successful!");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Password not reseted.");
        toast.error(err);
      });
    navigate("/auth/login");
  };

  const isFormValid =
    fields.password.length >= 8 && fields.password === fields.passwordConfirm;

  return (
    <div className={styles.cont}>
      <h1 className={styles.title}>Reset Password</h1>

      <div className={styles.form}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs}>
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
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
