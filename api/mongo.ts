import mongodb = require("mongodb");

const config = require("./config");

const mongo = new mongodb.MongoClient(config.mongodb);

export const mongoConnect = () => {
  mongo.connect();
  console.log(`Connected to ${config.mongodb}`);
};
export const users = mongo.db("notevault").collection("users");
export const notes = mongo.db("notevault").collection("notes");
