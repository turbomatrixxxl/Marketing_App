const validateEmail = (fields) => {
  const errors = {};
  if (!fields.email) {
    errors.email = "Email is required";
  }

  return errors;
};

export default validateEmail;
