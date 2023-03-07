
// Currently only works for DMs

/*
appmount = document.getElementById("app-mount");
appasidepanelwrapper = document.querySelector("[class^='appAsidePanelWrapper-']");
not_appasidepanel = document.querySelector("[class^='notAppAsidePanel-']");
*/
//app=document.querySelectorAll("[class^='app-']")[1];

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
