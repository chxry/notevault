import fs = require("fs");

interface Config {
  port: number;
  secret: string;
  githubID: string;
  mongodb: string;
  githubSecret: string;
  githubCallback: string;
}

export const loadConfig = (): Config =>
  JSON.parse(fs.readFileSync(`${__dirname}/config.json`, "utf8"));
