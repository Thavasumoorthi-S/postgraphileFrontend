import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUsers1($CreateUserInput1:CreateUserInput1!) {
    createUsers(input: $CreateUserInput1) {
      message
    }
  }
`;



export const RESEND_CODE = gql`
  mutation ResendCode($email: String!) {
    resendCode(email: $email) {
      message
    }
  }
`;



export const VERIFY_CODE = gql`
  mutation VerifyCode($email: String!, $code: String!) {
    verifyCode(email: $email, code: $code) {
      message
    }
  }
`;

export const PERFORM_SIGNIN = gql`
  mutation PerformSignIn($email: String!, $password: String!) {
    performsignin(email: $email, password: $password) {
      accessToken
      refreshToken
      idToken
      message
    }
  }
`;


