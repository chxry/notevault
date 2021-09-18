import { MongoClient } from "mongodb";

import config from "./config";

const mongo = new MongoClient(config.mongodb);

export const mongoConnect = () => {
  mongo.connect();
  console.log(`Connected to ${config.mongodb}`);
};
export const users = mongo.db("notevault").collection("users");
export const notes = mongo.db("notevault").collection("notes");
