const nacl = require('libsodium-wrappers')
var keyPair = null;

(async() => {
    await nacl.ready
    keyPair = nacl.crypto_sign_keypair()
})()

// definieren functies door te exporteren vanuit src folder

module.exports.sign = async function sign(message){
    await nacl.ready
    return nacl.crypto_sign(message, keyPair.privateKey)
}

module.exports.verifyingKey = async function verify(){
    await nacl.ready
    return keyPair.publicKey
}

