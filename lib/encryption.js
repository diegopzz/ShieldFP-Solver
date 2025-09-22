const crypto = require('crypto');
const { webcrypto } = require('crypto');
const atob = data => Buffer.from(data, 'base64').toString('binary');
const btoa = data => Buffer.from(data, 'binary').toString('base64');

async function f17(p303) {
  let v585 = await webcrypto.subtle.generateKey({
    name: "AES-CBC",
    length: 256
  }, true, ["encrypt", "decrypt"]);
  let v586 = webcrypto.getRandomValues(new Uint8Array(16));
  let v587 = await webcrypto.subtle.encrypt({
    name: "AES-CBC",
    iv: v586
  }, v585, f18(p303));
  const v588 = "-----BEGIN PUBLIC KEY-----\n            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmygN8eW5F7/b1EyZi2UO\n            6jc2Kw3c5zrYcfa6MvOVVph6ON2R9r40B3wbf5V2oolFrw5ufu+UWyi+HxhRTYxB\n            V2JiM/dm828RJoxkiEo9k2MCNFiwvkIO7q8wkAWr+0Njb83fi/yHoglxCGB+sPdi\n            qyGgYsXTd/33La79PmmcxLuACeiVe68VcqTlB3jj7Uj5s7CRKG3wzzdnLs0z5Q0Q\n            Osi2tyAHWnY2lIIP6TNNLCPJsKUB9IH6Tlg8BMV9Wzn3ajoNoQE2mbz0TwVtUdgm\n            zHx9QY60olvmxvKn2TPwyNTcW/ZufhpuLe42LteLVgOsLu+FL2OvXhzxt2i9sESO\n            RQIDAQAB\n            -----END PUBLIC KEY-----".substring("-----BEGIN PUBLIC KEY-----".length, "-----BEGIN PUBLIC KEY-----\n            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmygN8eW5F7/b1EyZi2UO\n            6jc2Kw3c5zrYcfa6MvOVVph6ON2R9r40B3wbf5V2oolFrw5ufu+UWyi+HxhRTYxB\n            V2JiM/dm828RJoxkiEo9k2MCNFiwvkIO7q8wkAWr+0Njb83fi/yHoglxCGB+sPdi\n            qyGgYsXTd/33La79PmmcxLuACeiVe68VcqTlB3jj7Uj5s7CRKG3wzzdnLs0z5Q0Q\n            Osi2tyAHWnY2lIIP6TNNLCPJsKUB9IH6Tlg8BMV9Wzn3ajoNoQE2mbz0TwVtUdgm\n            zHx9QY60olvmxvKn2TPwyNTcW/ZufhpuLe42LteLVgOsLu+FL2OvXhzxt2i9sESO\n            RQIDAQAB\n            -----END PUBLIC KEY-----".length - "-----END PUBLIC KEY-----".length);
  let v589 = atob(v588);
  let vF124 = f18(v589);
  let v590 = await webcrypto.subtle.importKey("spki", vF124, {
    name: "RSA-OAEP",
    hash: "SHA-256"
  }, true, ["encrypt"]);
  let v591 = await webcrypto.subtle.exportKey("raw", v585);
  let v592 = new Uint8Array(v591);
  let v593 = decodeURIComponent(btoa(f126(v586))) + ":" + decodeURIComponent(btoa(f126(v592)));
  let v594 = await webcrypto.subtle.encrypt({
    name: "RSA-OAEP"
  }, v590, f18(v593));
  let v595 = decodeURIComponent(btoa(f126(v587))) + ":" + decodeURIComponent(btoa(f126(v594)));
  return decodeURIComponent(btoa(v595));
}

function f18(p304) {
  const v596 = new ArrayBuffer(p304.length);
  const v597 = new Uint8Array(v596);
  let v598 = 0;
  for (let v599 = p304.length; v598 < v599; v598++) {
    v597[v598] = p304.charCodeAt(v598);
  }
  return v596;
}

function f126(p305) {
  const v600 = Array.from(new Uint8Array(p305));
  const v601 = v600.map(p306 => String.fromCharCode(p306)).join("");
  return v601;
}
function f18(p304) {
  const v596 = new ArrayBuffer(p304.length);
  const v597 = new Uint8Array(v596);
  let v598 = 0;
  for (let v599 = p304.length; v598 < v599; v598++) {
    v597[v598] = p304.charCodeAt(v598);
  }
  return v596;
}
// Sensor_data encrypt function
async function f8(p74) {
    const v114 = crypto.webcrypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  
    const v115 = crypto.randomBytes(16);
  
    const v116 = await crypto.webcrypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: v115,
      },
      await v114,
      f9(p74)
    );
  
    const v117 = `-----BEGIN PUBLIC KEY-----
              MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmygN8eW5F7/b1EyZi2UO
              6jc2Kw3c5zrYcfa6MvOVVph6ON2R9r40B3wbf5V2oolFrw5ufu+UWyi+HxhRTYxB
              V2JiM/dm828RJoxkiEo9k2MCNFiwvkIO7q8wkAWr+0Njb83fi/yHoglxCGB+sPdi
              qyGgYsXTd/33La79PmmcxLuACeiVe68VcqTlB3jj7Uj5s7CRKG3wzzdnLs0z5Q0Q
              Osi2tyAHWnY2lIIP6TNNLCPJsKUB9IH6Tlg8BMV9Wzn3ajoNoQE2mbz0TwVtUdgm
              zHx9QY60olvmxvKn2TPwyNTcW/ZufhpuLe42LteLVgOsLu+FL2OvXhzxt2i9sESO
              RQIDAQAB
              -----END PUBLIC KEY-----`;
  
    const v118 = "-----BEGIN PUBLIC KEY-----";
    const v119 = "-----END PUBLIC KEY-----";
    const v120 = v117.substring(v118.length, v117.length - v119.length);
    const v121 = Buffer.from(v120, "base64");
  
    const v122 = await crypto.webcrypto.subtle.importKey(
      "spki",
      v121,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    );
  
    const v123 = await crypto.webcrypto.subtle.exportKey("raw", await v114);
    const v124 = new Uint8Array(v123);
  
    const v125 =
      encodeURIComponent(Buffer.from(v115).toString("base64")) +
      ":" +
      encodeURIComponent(Buffer.from(v124).toString("base64"));
  
    const v126 = await crypto.webcrypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      v122,
      f9(v125)
    );
  
    const v127 =
      encodeURIComponent(Buffer.from(v116).toString("base64")) +
      ":" +
      encodeURIComponent(Buffer.from(v126).toString("base64"));
  
    return encodeURIComponent(Buffer.from(v127).toString("base64"));
  }
  function f9(p75) {
    const v128 = new ArrayBuffer(p75.length);
    const v129 = new Uint8Array(v128);
    for (let v130 = 0, v131 = p75.length; v130 < v131; v130++) {
      v129[v130] = p75.charCodeAt(v130);
    }
    return v128;
  }
  function f10(p76) {
    const v132 = Array.from(new Uint8Array(p76));
    const v133 = v132.map(p77 => String.fromCharCode(p77)).join("");
    return v133;
  }

  module.exports = {
    f8,
    f17
  };