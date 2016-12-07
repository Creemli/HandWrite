# JS 中加密相关研究
* 最近工作中需要使用到加密来满足安全要求， 简要的介绍一下前端加密，解密以及服务端加密流程，

## 目标
* JS请求服务端接口，服务端返回加密后的字符串，前端解密后显示。

## 分析
* 加密算法一般分为对称加密(Symmetric Cryptography)和非对称加密(Asymmetric Cryptography)
* 对称加密很好理解，加密和解密使用同样的一个密钥；另外对称加密的算法很多，效率高，因此被广泛的使用在加密协议的核心中， 这次我们也需要用到。
* 非对称加密，它使用了一对密钥，就是我们常常听到的公钥(public key)和私钥(private key)。一般私钥只有一方保管，比如服务端；而公钥可以保存在客户端，或者服务端提供接口返回。 只有私钥的拥有者才能够对消息解密，因为私钥只保存在一方，因此安全性也大大提高。

* 常见的对称加密算法AES, DES, 3DES, IDEA, RC4 等， 此次我们使用AES
* 常见的非对称加密算法有 RSA， ECC（移动设备）， DIffie-Hellman,EL Gamal， DSA(数字签名)， 此次我们使用RSA。

* <small>另外还有一种加密算法 Hash 算法， 此算法的特别之处在于其不可逆，加密之后无法再次获取到目标信息，常见的如MD5, 常常用于信息完整性校验， 不可还原密码存储等。我们的RN热更新最初就是采用MD5来校验文件完整性和是否被篡改</small>


## 开始

* 了解算法之后开始分析如何做到安全，我们定义的流程如下(最近刚开始用vi，只能码字了， 流程图以后增加)：
	1. 前端JS生成一个随机的KEY， KEY的形式为16位字符串
	2. 通过RSA加密算法，利用服务端给到的public key 进行加密得到一个encodeKey，然后传递给服务端
	3. 服务端获取到encodeKey, 利用私钥解密获取到前端真正产生的KEY。
	4. 服务端读取数据库，使用KEY对数据进行AES加密（复杂数据类型需要先转化为JSON字符串），返回给前端
	5. 前端获取到加密后字符串， 使用AES解密, 得到真正的数据。

* 至于为何使用以上流程?
	1. 首先对称加密是不安全的，同样的密钥如果暴露在网络传输中， 安全性更低,
	2. 配合非对称加密使用，但公钥和私钥加解密速度很慢，而且私钥常常只存在于服务端。
	3. 总结起来，就是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通


## 开始码代码
	1. JS, 这里介绍两个js库，crypto-js, JsEncrypt.
```javascript
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';

const PUBLIC_KEY = 'I am public';
const KEY = (+new Date()) + 'yzt';// random 应该也行，没试过

// 生成encodeKey， 使用RSA
const encryptIns = new JSEncrypt();
encryptIns.setPublicKey(PUBLIC_KEY);
const encodeKey = encryptIns.encrypt(KEY);

//send request with encodeKey;
...


```

	2. JS解密服务端返回的数据 encodeData, 这里需要了解AES加密算法的几个参数， 坑还蛮多的
		* 服务端（JAVA）采用AES加密算法，模式采用ECB， 偏移采用PKCS5Padding, 偏移量iv，最后生成base64编码的串
		* JS 解密的时候采用ECB， 但是便宜没有PKCS5啊，只有PKCS7, 后来查查资料都说是一样的，哎、
		* 还有一点要注意，待解密的消息肯定是Base64的，如果是字符串， 需要先将字符串Hex 转化一下，然后再转化为Base64串。
```javascript

// 这里的encodeData已经是Base64
function decrypt(encodeData) {
	const IV = '好像是16位的字符串来着'; // 偏移量
	
	// 设置好KEY， 偏移量（这俩都得是字节）， 工作模式，偏移模式即可解密
	const decryptStr = CryptoJS.AES.decrypt(encodeData, CryptoJS.enc.Utf8.parse(KEY), {iv: CryptoJS.enc.Utf8.parse(IV), mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})

	// 解密后需要按照Utf8 的方式转为字符串
	reutrn decryptStr.toString(CryptoJS.enc.Utf8);
}


```

3. 结束， 服务端的加密过程反推就可以知道了。

具体代码， 明天上。

























