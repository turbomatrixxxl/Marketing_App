import React from "react";
import icons from "../../images/sprite.svg";
import {
  Container,
  Wrapper,
  Logo,
  LogoWrapper,
  Icon,
  Title,
  Text,
  AuthWrapper,
  AuthButton,
  AuthButtonLogin,
  WrapperBackground,
} from "./Welcome.styled";
import Footer from "../Footer/Footer";

function Welcome() {
  return (
    <Container>
      <WrapperBackground />
      <Wrapper>
        <Logo />
        <LogoWrapper>
          <Icon>
            <use href={`${icons}#logo`} />
          </Icon>
          <Title>Smart Marketing Platform</Title>
        </LogoWrapper>
        <Text>
          Boost your business with an all-in-one marketing solution. Automate
          campaigns, analyze results, and reach your audience faster and
          smarter.
          <br />
          <br />
          Powered by <strong>Creative Infinity</strong>, built to give you the
          edge over your competition.
        </Text>

        <AuthWrapper>
          <AuthButton to="/auth/register" className="register">
            Sign Up
          </AuthButton>
          <AuthButtonLogin to="/auth/login" className="login">
            Log In
          </AuthButtonLogin>
        </AuthWrapper>
      </Wrapper>
      <Footer style={{ position: "relative", zIndex: 3 }} />
    </Container>
  );
}

export default Welcome;
