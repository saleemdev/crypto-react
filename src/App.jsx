import { useState } from "react";

import "./App.css";
import { Button, Form } from "react-bootstrap";
import { AES, enc } from "crypto-js";
// import {
//   createCipheriv,
//   createDecipheriv,
//   createHash,
//   randomBytes,
// } from 'crypto';
import crypto from 'crypto-browserify'
import { Buffer } from 'buffer/' // <-- no typo here ("/")

console.log("Loaded cypher stuff");
function App() {
  return (
    <>
      <p>V3</p>
      <UsingNodeJSCrypto />
      <hr />
      <UsingCryptoJS />
    </>
  );
}
const UsingNodeJSCrypto = () => {
  const [pwd, setPwd] = useState(null);
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const APIKEY = "bc25a22a8aa7d8b2904a7471a9d2d5fb";
  let bytes;
  const algorithm = "aes-256-cfb";

  function encryptPwd() {
    const hash = crypto.createHash("sha256");
    hash.update(APIKEY);
    const keyBytes = hash.digest();

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, keyBytes, iv);
    console.log("IV:", iv);
    let enc = [iv, cipher.update(pwd, "utf8")];
    enc.push(cipher.final());
    const cipherText = Buffer.concat(enc).toString("base64");
    setEncryptedPassword((prevState) => cipherText.toString());
  }
  return (
    <>
      <h4>Vite + React + Crypto using Node-js Inbuilt</h4>
      <div className="card">
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            encryptPwd();
          }}
        >
          <Form.Group controlId="formBasicPassword1">
            <Form.Label>Enter Password here and click encrypt</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPwd((prevState) => e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group>
            <Button variant="primary" type="submit">
              Encrypt
            </Button>
          </Form.Group>
        </Form>
      </div>
      <p className="read-the-docs">{encryptedPassword}</p>
      <hr />
      {/* {encryptedPassword ? (
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={() => decryptPwd()}
          >
            Decrypt
          </Button>
          <hr />
          <p className="read-the-docs">
            {decryptedPassword || "None, click Decrypt"}
          </p>
        </>
      ) : null} */}
    </>
  );
};
const UsingCryptoJS = () => {
  const [pwd, setPwd] = useState(null);
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const APIKEY = "bc25a22a8aa7d8b2904a7471a9d2d5fb";
  let bytes;
  const encryptPwd = () => {
    if (pwd === null || pwd.length == 0)
      throw new Error("Error, No password supplied");
    console.log(pwd);
    const cipherText = AES.encrypt(pwd, APIKEY);
    setEncryptedPassword((prevState) => cipherText.toString());
  };

  const decryptPwd = () => {
    bytes = AES.decrypt(encryptedPassword, APIKEY);
    const decrypted = bytes.toString(enc.Utf8);
    console.log(decrypted);
    setDecryptedPassword((prevState) => decrypted);
  };
  return (
    <>
      <h4>Vite + React + Crypto using crypto-js</h4>
      <div className="card">
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            encryptPwd();
          }}
        >
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Enter Password here and click encrypt</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPwd((prevState) => e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group>
            <Button variant="primary" type="submit">
              Encrypt
            </Button>
          </Form.Group>
        </Form>
      </div>
      <p className="read-the-docs">{encryptedPassword}</p>
      <hr />
      {encryptedPassword ? (
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={() => decryptPwd()}
          >
            Decrypt
          </Button>
          <hr />
          <p className="read-the-docs">
            {decryptedPassword || "None, click Decrypt"}
          </p>
        </>
      ) : null}
    </>
  );
};
export default App;
