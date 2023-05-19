const fs = require('fs');
// Certificate Signing Request handler
const createCSR = (privateKey, publicKey) => {
  // Initiating certificate signing request
  const csrGenerator = require("./csr-generator");
  const CSR = csrGenerator.generateCSR(privateKey, publicKey);

  // verifying csr by certification authority and getting a CA certificate
  const certificatesVerifier = require("./certificates-verifier");
  const cert = certificatesVerifier.verifiyCSR(CSR);

  // Writting CA certificate to a file, so we can use it a bit latter
  fs.writeFileSync("ssl/is-cert.pem", cert, { encoding: "utf-8" });
};

const rsaHandler = require('./rsa-handler.js');
  const {
    privateKey,
    publicKey,
  } = rsaHandler.generatePublicPrivatePairOfKeys();

createCSR(privateKey, publicKey);