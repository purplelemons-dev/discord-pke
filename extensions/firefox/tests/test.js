
const toBase256 = (num) => {
    if (num === 0) return [0];
    let result = [];
    while (num > 0) {
        result.unshift(num % 256);
        num = Math.floor(num / 256);
    }
    return new Uint8Array(result);
}
const RSAKeyGen = async (exponent=65537) => {
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
}

console.log("----- RSA Key Generation -----");
RSAKeyGen()
.then(async (keys) => {
    await crypto.subtle.exportKey("jwk", keys.publicKey)
    .then((key) => {
        console.log(key);
    });
    await crypto.subtle.exportKey("jwk", keys.privateKey)
    .then((key) => {
        console.log(key);
    });
});
