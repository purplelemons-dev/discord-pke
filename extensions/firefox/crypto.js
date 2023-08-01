const generateKeyPair = async() => {
    return await crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256"
      },
      true,
      ["deriveKey"]
    );
}

const deriveKey = async (privateKey, publicKey) => {
    return await crypto.subtle.deriveKey(
        {
            name: "ECDH",
            public: publicKey
        },
        privateKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}
  
const main = async () => {
    // Generate Diffie-Hellman key pairs for Alice and Bob
    const aliceKeyPair = await generateKeyPair();
    const bobKeyPair = await generateKeyPair();
  
    // Derive shared secrets using each other's public keys
    const aliceSharedSecret = await deriveKey(
        aliceKeyPair.privateKey,
        bobKeyPair.publicKey
    );
    const bobSharedSecret = await deriveKey(
        bobKeyPair.privateKey,
        aliceKeyPair.publicKey
    );
  
    // Encrypt a message using the shared secret as the AES-GCM key
    const message = "Hello World!";
    const { iv, ciphertext } = await encrypt(message, aliceSharedSecret);
  
    // Decrypt the message using the shared secret as the AES-GCM key
    const decryptedMessage = await decrypt(ciphertext, bobSharedSecret, iv);
}

const test = async () => {
    await console.log("test");
}

export default {deriveKey, generateKeyPair, test};
