const nacl = require('libsodium-wrappers')
var keyPair = null

beforeAll(async() => {
    await nacl.ready
    keyPair = nacl.crypto_sign_keypair()
})

// definieren functies door te exporteren vanuit src folder

module.exports.verifyingKey = async function verify(){
    return keyPair.publicKey
}

module.exports.sign = async function sign(message){
    return nacl.crypto_sign(message, keyPair.privateKey)
}