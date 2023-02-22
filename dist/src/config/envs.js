import dotenv from "dotenv";
export function loadEnvs() {
    var path = ".env";
    if (process.env.NODE_ENV === "test") {
        path = ".env.test";
    }
    dotenv.config({ path: path });
}
