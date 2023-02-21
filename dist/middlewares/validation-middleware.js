import { createCredentialSchema, createNetworkSchema, createUserSchema } from "../schemas/user-schema.js";
export function validateBody(req, res, next) {
    var user = req.body;
    var error = createUserSchema.validate(req.body, { abortEarly: false }).error;
    if (error) {
        var errors = error.details.map(function (detail) { return detail.message; });
        return res.status(422).send(errors);
    }
    res.locals.user = user;
    next();
}
export function validateBodyCredential(req, res, next) {
    var credential = req.body;
    var error = createCredentialSchema.validate(req.body, { abortEarly: false }).error;
    if (error) {
        var errors = error.details.map(function (detail) { return detail.message; });
        return res.status(422).send(errors);
    }
    res.locals.credential = credential;
    next();
}
export function validateBodyNetwork(req, res, next) {
    var network = req.body;
    var error = createNetworkSchema.validate(req.body, { abortEarly: false }).error;
    if (error) {
        var errors = error.details.map(function (detail) { return detail.message; });
        return res.status(422).send(errors);
    }
    res.locals.network = network;
    next();
}
