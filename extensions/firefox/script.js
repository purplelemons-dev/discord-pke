
// Currently only works for DMs
(() => { // <- this is a self-executing function and privatizes the funcs/vars
    const getMessages = () => {
        return document.querySelectorAll("[class*='messageContent-']");
    }

    const getUserID = () => {
        let accountStorage = JSON.parse(localStorage.getItem("MultiAccountStore"));
        return Math.ceil(Math.sqrt(Math.sqrt(accountStorage._state.users[0].id)));
    }

    /*
    const toBase256 = (num) => {
        if (num === 0) return [0];
        let result = [];
        while (num > 0) {
            result.unshift(num % 256);
            num = Math.floor(num / 256);
        }
        return new Uint8Array(result);
    }
    */

    const deriveKey = async (privateKey, publicKey) => {
        // Private key should be local user's private ECDH key, public key should be the other user's public ECDH key
        return await window.crypto.subtle.deriveKey(
            {
                name: "ECDH",
                public: publicKey
            },
            privateKey,
            {
                name: "AES-GCM",
                length: 256

            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    const keyGenECDH = async () => {
        return await window.crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-384"
            },
            true,
            ["deriveKey"]
        );
    }

    const exportECDH = async (key) => {
        // Used in order to send the public key to the other user
        return await window.crypto.subtle.exportKey("jwk", key);
    }

    const importECDH = async (key) => {
        // Get the public key from the user and import it in order to generate a shared key
        return await window.crypto.subtle.importKey(
            "jwk",
            key,
            {
                name: "ECDH",
                namedCurve: "P-384"
            },
            true,
            ["deriveKey"]
        );
    }

    const encrypt = async (key, data) => {
        return await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: window.crypto.getRandomValues(new Uint8Array(12))
            },
            key,
            data
        );
    }


    /*const RSAKeyGen = async (exponent=65537) => {
        return await window.crypto.subtle.generateKey(
            {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 2048,
                publicExponent: toBase256(exponent),
                hash: {name: "SHA-256"}
            },
            true,
            ["sign", "verify"]
        );
    }*/

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

    // This is for testing purposes only; when set to 1, it will clear the storage
    if (1) {
        browser.storage.local.set({publicKey: null, privateKey: null});
        console.log("cleared storage");
    }

    browser.storage.local.get(["publicKey","privateKey"])
    .then((keys) => {
        // Ensure that public and private keys exist
        if (keys.publicKey && keys.privateKey) {
            console.log("keys: ", keys);
        } else {
            // ... otherwise generate them
            console.log("generating keys...");
            RSAKeyGen(UID)
            .then(async (keys) => {
                console.log("keys generated");
                await crypto.subtle.exportKey("jwk", keys.publicKey)
                .then((key) => {
                    // TODO: publish key to server
                    // ATTN: THIS IS NOT SECURE I REPEAT THIS IS NOT SECURE
                    browser.storage.local.set({publicKey: key});
                    console.log("stored public key")
                });
                await crypto.subtle.exportKey("jwk", keys.privateKey)
                .then((key) => {
                    // WHATEVER YOU DO DO NOT USE THIS YET
                    browser.storage.local.set({privateKey: key});
                    console.log("stored private key")
                });
            })
            .catch((err) => {
                console.error("keygen error: ", err);
            });
        }
    })
    .catch((err) => {
        console.error("storage error: ", err);
    });
})();
