(function (p, p2) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = p2();
    } else if (typeof define === "function" && define.amd) {
      define(p2);
    } else {
      (p = typeof globalThis !== "undefined" ? globalThis : p || self).uuidv1cs = p2();
    }
  })(this, function () {
    'use strict';
  
    let v;
    const v2 = new Uint8Array(16);
  
    function f() {
      if (
        !v &&
        !(
          (v =
            (typeof crypto !== "undefined" &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            (typeof msCrypto !== "undefined" &&
              typeof msCrypto.getRandomValues === "function" &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
      ) {
        throw new Error("crypto.getRandomValues() not supported.");
      }
      return v(v2);
    }
  
    const v3 =
      /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  
    function f2(p3) {
      return typeof p3 === "string" && v3.test(p3);
    }
  
    let v4;
    let v5;
    const v6 = [];
  
    for (let v7 = 0; v7 < 256; ++v7) {
      v6.push((v7 + 256).toString(16).substr(1));
    }
  
    let v8 = 0;
    let v9 = 0;
  
    return function (p4, p5, p6) {
      let v10 = p5 && p6 || 0;
      const v11 = p5 || new Array(16);
      let v12 = (p4 = p4 || {}).node || v4;
      let v13 = p4.clockseq !== undefined ? p4.clockseq : v5;
  
      if (v12 == null || v13 == null) {
        const v14 = p4.random || (p4.rng || f)();
        if (v12 == null) {
          v12 = v4 = [v14[0] | 1, v14[1], v14[2], v14[3], v14[4], v14[5]];
        }
        if (v13 == null) {
          v13 = v5 = (v14[6] << 8 | v14[7]) & 16383;
        }
      }
  
      const v15 = p4.msecs !== undefined ? p4.msecs : Date.now();
      let v16 = p4.nsecs !== undefined ? p4.nsecs : v9 + 1;
      const v17 = v15 - v8 + (v16 - v9) / 10000;
  
      if (v17 < 0 && p4.clockseq === undefined) {
        v13 = (v13 + 1) & 16383;
      }
  
      if ((v17 < 0 || v15 > v8) && p4.nsecs === undefined) {
        v16 = 0;
      }
  
      if (v16 >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
  
      v8 = v15;
      v9 = v16;
      v5 = v13;
  
      const v18 = (((v15 + 12219292800000) & 268435455) * 10000 + v16) % 4294967296;
      v11[v10++] = (v18 >>> 24) & 255;
      v11[v10++] = (v18 >>> 16) & 255;
      v11[v10++] = (v18 >>> 8) & 255;
      v11[v10++] = v18 & 255;
  
      const v19 = (v15 / 4294967296) * 10000 & 268435455;
      v11[v10++] = (v19 >>> 8) & 255;
      v11[v10++] = v19 & 255;
      v11[v10++] = (v19 >>> 24 & 15) | 16;
      v11[v10++] = (v19 >>> 16) & 255;
  
      v11[v10++] = (v13 >>> 8) | 128;
      v11[v10++] = v13 & 255;
  
      for (let v20 = 0; v20 < 6; ++v20) {
        v11[v10 + v20] = v12[v20];
      }
  
      return p5 || (function (p7, p8 = 0) {
        const v21 = (
          v6[p7[p8 + 0]] +
          v6[p7[p8 + 1]] +
          v6[p7[p8 + 2]] +
          v6[p7[p8 + 3]] +
          "-" +
          v6[p7[p8 + 4]] +
          v6[p7[p8 + 5]] +
          "-" +
          v6[p7[p8 + 6]] +
          v6[p7[p8 + 7]] +
          "-" +
          v6[p7[p8 + 8]] +
          v6[p7[p8 + 9]] +
          "-" +
          v6[p7[p8 + 10]] +
          v6[p7[p8 + 11]] +
          v6[p7[p8 + 12]] +
          v6[p7[p8 + 13]] +
          v6[p7[p8 + 14]] +
          v6[p7[p8 + 15]]
        ).toLowerCase();
  
        if (!f2(v21)) {
          throw TypeError("Stringified UUID is invalid");
        }
  
        return v21;
      })(v11);
    };
  });
  