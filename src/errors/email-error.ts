import { ApplicationError } from "../protocols";

export function duplicatedEmailError():ApplicationError {
    return {
      name: "DuplicatedEmailError",
      message: "E-mail already registered",
    };
  }