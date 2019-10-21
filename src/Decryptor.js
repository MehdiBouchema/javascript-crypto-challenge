const nacl = require('libsodium-wrappers')
var ownKey = null

async function init(){
    await nacl.ready
}

// definieren functies door te exporteren vanuit src folder

module.exports.setKey = async function setKey(key){
    ownKey = key
}

module.exports.decrypt = async function decrypt(ciphertext, nonce){
    if (ownKey == null){
        throw "no key"
    }

    return nacl.crypto_secretbox_open_easy(ciphertext, nonce, ownKey);
}

/*const decrypt = () => {}
module.exports.decrypt = () => {
    return
}
export default {decrypt}*/