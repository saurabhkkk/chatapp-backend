const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Ensure this is set in your environment variables

if (!ENCRYPTION_KEY) {
  throw new Error("Missing ENCRYPTION_KEY environment variable");
}

const encryptMessage = (message) => {
  if (!message) throw new Error("Message to encrypt cannot be empty");
  return CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString();
};

const decryptMessage = (cipherText) => {
  if (!cipherText) throw new Error("Cipher text to decrypt cannot be empty");
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptMessage, decryptMessage };
