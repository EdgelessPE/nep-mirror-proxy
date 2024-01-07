import { Config } from "./type";
import { Err, Ok, Result } from "ts-results";
import fs from "fs";
import TOML from "@iarna/toml";
import Ajv from "ajv";
const ajv = new Ajv();

export function readConfig(): Result<Config, string> {
  const text = fs.readFileSync("config.toml").toString();
  const obj = TOML.parse(text);
  const schemaText = fs.readFileSync("schema/config.json").toString();
  const validate = ajv.compile(JSON.parse(schemaText));
  if (!validate(obj)) {
    const details =
      validate.errors
        ?.map((n) => `${n.instancePath} : ${n.message}`)
        .join("\n") ?? "";
    return new Err(`Error:Failed to validate config.toml : \n${details}`);
  }
  return new Ok(obj as unknown as Config);
}
