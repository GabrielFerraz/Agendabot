require('dotenv').config(); // Recommended way of loading dotenv
import container from "./inversify.config";
import { TYPES } from "./types/types";
import { Bot } from "./bot/bot";
import { connect } from "mongoose";

let bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
  connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  console.log('Logged in!')
}).catch((error) => {
  console.log('Oh no! ', error)
});