const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const keepAlive = require("./server")

const mySecret = process.env.TOKEN;

var x=0;

let Admin = ["$your admin", "$admin", "$your owner"];
let Name = ["$bot name", "$your name", "$name"];

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {

    str = msg.content.toLowerCase();

    if (msg.author.bot == false && str.includes("$")){   //reply only if the user and not the bot itself

        if (str.includes("help")) {
            msg.channel.send(help());
        }
        if (str.includes("google")) {
            msg.channel.send(googleLink(str));
        }
        if (Admin.includes(str)) {
            msg.channel.send(sendAdmin());
        }
        if (Name.includes(str)) {
            msg.channel.send("My name is Progret. You can call me Prog.");
        }
        if (str.includes('joke')) {
            msg.channel.send(sendJoke());
        }
        if (str.includes('calc')) {
            msg.channel.send(calculator(str));
        }

    }
})

keepAlive()
client.login(mySecret)

function help(){
    let helpStr = "Here is what I can doo\n\nNOTE: Include Dollor symbol before every keyword\n\n1. Calculation - $calc 1+2\n2. Google - $google (your search)\n3. Jokes - $joke"
    return helpStr;
}

function googleLink(str){
    let splitResult = str.substr(str.indexOf(' ')+1);
    let replaceSpace = splitResult.replace(/\s/g, '+')
    let result = "https://www.google.com/search?q="+replaceSpace;
    return result;
}

function sendAdmin() {
    return "My Admin is Sarath Adhithya ❤️";
}

function sendJoke() {
    const random = Math.floor(Math.random() * Data.Jokes.length);
    return Data.Jokes[random].joke;
}

function calculator(str) {
    let values = str.split(" ")
    let answer = eval(values[1]);
    return "Answer = " + answer;
}

