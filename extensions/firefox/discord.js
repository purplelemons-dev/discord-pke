
const URL = "https://discord.com/api/v9/channels/*/messages";

class Message {
    constructor(text, userid) {
        this.text = text;
        this.userid = userid;
    }
    decrypt = (key) => {
        // decrypt this.text using key
    }
}

let messages = [];

setTimeout(() => {
    //const messages = document.querySelectorAll("[class*='messageContent-']");
    const unparsed_messages = document.querySelector("[class^=scrollerInner-]").children;
    unparsed_messages.forEach(message => {
        let text = message.querySelector("[class*=messageContent-]").innerText;
        let userid = message.querySelector("img").src.split("/")[4];
        messages.push(new Message(text, userid));
        if (text) {
            if (text.endsWith(" (edited)")) {
                console.log("removing edit...");
                text = text.replace(" (edited)", "");
            }
            console.log(text);
        }
    }); // message.innerText = ... works 👍
    console.log("finished thing");
}, 4000);
