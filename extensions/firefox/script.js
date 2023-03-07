
// Currently only works for DMs

messages=

document.addEventListener("click", (e) => {
    let target = e.target;
    while (target.tagName!=="A") {
        target = target.parentNode;
    }
    if (target.href.includes("/channels/@me/")) {
        console.log(getMessages());
    }
});

const getMessages = () => {
    return document.querySelectorAll("[class*='messageContent-']");
}

console.log(getMessages());
