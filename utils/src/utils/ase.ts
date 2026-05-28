const aseStr = () => {
    return `/**
    * 加解密处理
    * Copyright (c) 2023 dfec
    */
   import CryptoJs from 'crypto-js'
   
   /**
    * 加密方法
    * @param key 
    * @param data 
    * @returns 
    */
   export const getAES = (key: string, data: string | CryptoJs.lib.WordArray) => {
       const encrypted = CryptoJs.AES.encrypt(data, CryptoJs.enc.Utf8.parse(key), {
           mode: CryptoJs.mode.ECB,
           padding: CryptoJs.pad.Pkcs7
       })
       return encrypted.toString()
   }
   
   /**
    * 十六位十六进制数作为密钥
    */
   const key = CryptoJs.enc.Utf8.parse('1234123412ABCDEF')
   
   /**
    * 十六位十六进制数作为密钥偏移量
    */
   const iv = CryptoJs.enc.Utf8.parse('ABCDEF1234123412')
   
   /**
    * 参数加密方法
    * @param word 
    * @returns 
    */
   export const encrypt = (word: string) => {
       const srcs = CryptoJs.enc.Utf8.parse(word)
       const encrypted = CryptoJs.AES.encrypt(srcs, key, {
           iv,
           mode: CryptoJs.mode.CBC,
           padding: CryptoJs.pad.Pkcs7
       })
       return encrypted.ciphertext.toString().toUpperCase()
   }
   
   /**
    * 参数解密方法
    * @param word 
    * @returns
    */
   export const decrypt = (word: string) => {
       const encryptedHexStr = CryptoJs.enc.Hex.parse(word)
       const srcs = CryptoJs.enc.Base64.stringify(encryptedHexStr)
       const decrypt = CryptoJs.AES.decrypt(srcs, key, {
           iv,
           mode: CryptoJs.mode.CBC,
           padding: CryptoJs.pad.Pkcs7
       })
       return decrypt.toString(CryptoJs.enc.Utf8)
   }
   
   
   `
}

export default aseStr