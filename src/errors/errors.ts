import { ApplicationError } from "../protocols";

export function duplicatedEmailError():ApplicationError {
    return {
      name: "DuplicatedEmailError",
      message: "E-mail already registered",
    };
  }

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

export function titleAlreadyInUse(): ApplicationError {
  return {
    name: "Conflict",
    message: "title already in use",
  };
}

export function idError(): ApplicationError {
  return {
    name: "Conflict",
    message: "id does not exist or is not yours",
  };
}