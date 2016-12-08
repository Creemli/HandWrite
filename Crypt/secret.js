/**
 * Created by lixiaoxi on 2016/12/7.
 * @description
 */


import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

const Encrypt = new JSEncrypt();

function Secret(opts) {
    const defaultOpts = {
        RES_KEY: '',
        iv: '',
        PUBLIC_KEY: '',
    };
    this.opts = {...defaultOpts, ...opts};

    this._resKey = CryptoJS.enc.Utf8.parse(this.opts.RES_KEY);
    this._iv = CryptoJS.enc.Utf8.parse(this.opts.iv);
}

Secret.prototype = {
    constructor: Secret,

    encryptRsa: function (publicKey) {
        if (publicKey) {
            Encrypt.setPublicKey(publicKey);
        } else {
            Encrypt.setPublicKey(this.opts.PUBLIC_KEY);
        }
        return Encrypt.encrypt(this.opts.RES_KEY);
    },

    encrypt: function (word) {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, this._resKey, {iv: this._iv, mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    },

    decrypt: function (word) {
        var decrypt = CryptoJS.AES.decrypt(word, this._resKey, {iv: this._iv, mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var decryptedStr = (CryptoJS.enc.Utf8.stringify(decrypt).toString());
        return decryptedStr;
    }
};

export default Secret;
