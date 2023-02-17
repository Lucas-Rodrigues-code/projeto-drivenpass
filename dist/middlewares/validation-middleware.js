import { createUserSchema } from "../schemas/user-schema";
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
