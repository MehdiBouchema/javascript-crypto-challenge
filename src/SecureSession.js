const nacl = require('libsodium-wrappers')

var rx = null
var tx = null

var publicKey = null
var privateKey = null
var clientKey = null

module.exports.setClientPublicKey = function(key)
{
    
    //see if key already set
    if (clientKey === key)
        return;

    //disallow changes to client key
    if ((clientKey !== null) && (clientKey !== key))
        throw 'client public key already set';
    
    clientKey = key;

    //get the keypairs respectively
    const keypair = nacl.crypto_kx_keypair();
    privateKey = keypair.privateKey;
    publicKey = keypair.publicKey;

    //create the shared keys
    sharedKeys = nacl.crypto_kx_server_session_keys(publicKey, privateKey, key);

    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
}

module.exports.serverPublicKey = async function(){
    await nacl.ready
    return publicKey
}

module.exports.encrypt = async function(msg){
    await nacl.ready

    //get your nonce and encrypt the message with it
    nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
    ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx)

    return {ciphertext, nonce}
}

module.exports.decrypt = async function(ciphertext, nonce){
    await nacl.ready

    //decrypt message with given nonce and cipher
    return await nacl.crypto_secretbox_open_easy(ciphertext, nonce, rx)
}
