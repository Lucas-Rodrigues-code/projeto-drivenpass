import Joi from "joi";
export var createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});
export var createCredentialSchema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
});
export var createNetworkSchema = Joi.object({
    title: Joi.string().required(),
    network: Joi.string().required(),
    password: Joi.string().min(6).required()
});
