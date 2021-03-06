const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const keepAlive = require("./server")
const Data = require('./Data.json')

const mySecret = process.env.TOKEN;

let createdDate = "12-02-2022";
let Admin = ["!your admin", "!admin", "!your owner", "!founder", "!your founder"];
let Name = ["!bot name", "!your name", "!name"];
let aboutMe = ["!about sa", "!your boss details", "!about your boss", "!about sarath adhithya", "!sarath adhithya", "!sa", "!sarath", "!about your founder", "!about sarath"];
let about = "Hello, I am Sarath Adhithya, I am a Under Graduate student at Vellore Institute of Technology, Chennai. I am pursuing CS specialization in Artificial Intelligence and Robotics.\n"+
    "\nShorts about me:\nPet lover\nFriends forever\nCricket"+"\n\nSocial media handles:\nLinkedin: https://www.linkedin.com/in/sarath-adhithya-145427225/"+
    "\nInstagram: https://www.instagram.com/sarath_adhithya/\nGithub: https://github.com/SarathAdhi\nTwitter: https://twitter.com/AdhithyaSarath\nMy portfolio: https://sarathadhi.netlify.app";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {

    str = msg.content.toLowerCase();
    
    if (msg.author.bot == false && str.includes("!")){   //reply only if the user and not the bot itself
        
        if (/!-how/.test(str) || /!- how/.test(str)) {           //for chatting
            msg.reply(howRU(str));
        }
        if (str.includes("help")) {
            msg.reply(help());
        }
        if(aboutMe.includes(str)){
            msg.reply(aboutSA());
        }
        if (str.includes("google")) {
            msg.reply(googleLink(str));
        }
        if (Admin.includes(str)) {
            msg.reply(sendAdmin());
        }
        if (Name.includes(str)) {
            msg.reply("My name is Progret. You can call me Prog.");
        }
        if (/joke/.test(str)) {
            msg.reply(sendJoke());
        }
        if (str.includes('calc')) {
            msg.reply(calculator(str));
        }
        if(str.includes('img')){
            msg.reply(showImg(str));
        }
    }
    
})

keepAlive()
client.login(mySecret)

function howRU(str){
    let splitMSG = str.split("-");
    let reply = splitMSG[1];

    let len = Data.Reply.FineMSG.length;

    for(var i=0; i<len; i++){
        if(reply.includes(Data.Reply.FineMSG[i].question))
            return Data.Reply.FineMSG[i].answer;
    }
    
}

function help(){
    let helpStr = "Here is what I can doo\n\nNOTE: Include ! symbol before every keyword\n\nAbout my founder - !about SA\nCalculation - !calc 1+2\nGoogle - !google (your search)\nJokes - !joke"+
    "\nTo show images - !img (image URL)"
    return helpStr;
}

function aboutSA(){
    return about;
}

function googleLink(str){
    let splitResult = str.substr(str.indexOf(' ')+1);
    let replaceSpace = splitResult.replace(/\s/g, '+')
    let result = "https://www.google.com/search?q="+replaceSpace;
    return result;
}

function sendAdmin() {
    return "At first I was an idea, Then my founder Sarath Adhithya created me ??????";
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

function showImg(str) {
    let values = str.split(" ")
    return {files: [values[1]]};
}