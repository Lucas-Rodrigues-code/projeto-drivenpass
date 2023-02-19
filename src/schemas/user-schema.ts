import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export const createCredentialSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username:Joi.string().required(),
  password:Joi.string().min(6).required()
});