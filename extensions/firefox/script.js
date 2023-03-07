
// Currently only works for DMs
(() => { // <- this is a self-executing function and privatizes the funcs/vars
    const getMessages = () => {
        return document.querySelectorAll("[class*='messageContent-']");
    }

    // Write a function that converts a number into a base 2 array
    const toBase256 = (num) => {
        if (num === 0) return [0];
        let result = [];
        while (num > 0) {
            result.unshift(num % 256);
            num = Math.floor(num / 256);
        }
        return new Uint8Array(result);
    }

    const getUserID = () => {
        let accountStorage = JSON.parse(localStorage.getItem("MultiAccountStore"));
        return BigInt(accountStorage._state.users[0].id);
    }

    const keyGen = async (nbits=2048,exponent=65537) => {
        console.log(`using public exponent ${toBase256(exponent)} and ${nbits} bits`);
        return await window.crypto.subtle.generateKey(
            {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: nbits,
                publicExponent: toBase256(exponent),
                hash: {name: "SHA-256"}
            },
            true,
            ["sign", "verify"]
        );
        print("good");
        //return await keys;
    }

    document.addEventListener("click", (e) => {
        let target = e.target;
        while (target.tagName!=="A") {
            target = target.parentNode;
        }
        if (target.href.includes("/channels/@me/")) {
            console.log(getMessages());
        }
    });

    const UID = getUserID();
    console.log(`UID: ${UID}`);
    keyGen(2048,UID)
    .then(async (keys) => {
        console.log("success!");
        await crypto.subtle.exportKey("jwk", keys.publicKey)
        .then((key) => {
            // ATTN: THIS IS NOT SECURE I REPEAT THIS IS NOT SECURE
            localStorage.setItem("publicKey", JSON.stringify(key));
        });
        await crypto.subtle.exportKey("jwk", keys.privateKey)
        .then((key) => {
            // WHATEVER YOU DO DO NOT USE THIS YET
            localStorage.setItem("privateKey", JSON.stringify(key));
        });
    })
    .catch((err) => {
        console.error("error: ", err);
    });
    
})();
