import fs from "fs";
import path from "path";

const envName = process.env.ENV || "sit";

const envFilePath = path.resolve(__dirname, `env.${envName}.json`);

const envConfig = JSON.parse(fs.readFileSync(envFilePath, "utf-8"));

export default envConfig;
