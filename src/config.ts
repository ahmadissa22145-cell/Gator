import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName?: string;
};

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function validateConfig(raw: any): Config {

  if(!raw || typeof raw.db_url !== "string")
    throw new Error("Invalid config file: db_url is required");

  return{
        dbUrl: raw.db_url,
        currentUserName: typeof raw.current_user_name === "string" ? 
                                                raw.current_user_name : undefined,

  };

}

function writeConfig(cfg: Config): void {
  const filePath = getConfigFilePath();

  const json = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };

  console.log("Writing to:", filePath);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const file =  fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(file);

  return validateConfig(parsed);
}

export function setUser(username: string): void {
  const cfg = readConfig();
  cfg.currentUserName = username;
  writeConfig(cfg);
}