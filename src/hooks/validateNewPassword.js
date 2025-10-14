const validateNewPassword = (fields) => {
  const newErrors = {};
  if (fields.password.length < 8) {
    newErrors.password = "Password must be at least 6 characters!";
  }
  if (!fields.password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};

export default validateNewPassword;
