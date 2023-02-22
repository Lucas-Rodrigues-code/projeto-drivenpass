export function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "E-mail already registered"
    };
}
export function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "email or password are incorrect"
    };
}
export function titleAlreadyInUse() {
    return {
        name: "Conflict",
        message: "title already in use"
    };
}
export function idError() {
    return {
        name: "Conflict",
        message: "id does not exist or is not yours"
    };
}
