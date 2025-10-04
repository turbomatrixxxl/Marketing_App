import { Link } from "react-router-dom";
import styles from "./FooterLogo.module.css";
import logoImage from "../../../images/smart1Edited.jpg";
import PropTypes from "prop-types";

const Logo = ({ variant = "default" }) => {
  return (
    <Link
      className={`${styles.logo} ${styles[variant] || styles.default}`}
      to="/home">
      <img src={logoImage} alt="Logo" />
      <span>RobiForexGabyTrade</span>
    </Link>
  );
};

Logo.propTypes = {
  variant: PropTypes.string,
};

export default Logo;
