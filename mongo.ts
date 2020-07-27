import { MongoClient } from "./deps.ts";
import config from "./config/config.json";

const client = new MongoClient();
client.connectWithUri(config.mongoURI);

const db = client.database("deno_survey");

export const usersCollection = db.collection("users");
