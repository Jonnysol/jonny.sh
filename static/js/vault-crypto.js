/* vault-crypto.js — tiny password-keyed obfuscation cipher.
 *
 * HONEST SECURITY NOTE: this is obfuscation, not real cryptography. The blob in
 * vault-data.js is XOR-streamed with a key derived from (password + seed) and
 * base64'd. You cannot read it from the repo WITHOUT knowing the password, but a
 * determined person could brute-force a short riddle answer. Do not put true
 * secrets (passwords, keys, NDA material) in here.
 *
 * Written in plain ES5 with zero Web APIs (no btoa/TextEncoder) on purpose, so
 * the identical file runs in the browser AND in a build-time JS engine — which
 * guarantees encrypt and decrypt always agree.
 */
var VaultCrypto = (function () {
  // FNV-1a 32-bit -> unsigned int
  function hash32(str) {
    var h = 0x811c9dc5 >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  // mulberry32 deterministic PRNG
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function normalize(pw) {
    return String(pw).toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function utf8Encode(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 0x80) {
        bytes.push(c);
      } else if (c < 0x800) {
        bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      } else if (c >= 0xd800 && c <= 0xdbff) {
        var c2 = str.charCodeAt(++i);
        var cp = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
        bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
      } else {
        bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      }
    }
    return bytes;
  }

  function utf8Decode(bytes) {
    var out = '', i = 0;
    while (i < bytes.length) {
      var b = bytes[i++];
      if (b < 0x80) {
        out += String.fromCharCode(b);
      } else if (b >= 0xf0) {
        var cp = ((b & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
        cp -= 0x10000;
        out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
      } else if (b >= 0xe0) {
        out += String.fromCharCode(((b & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f));
      } else {
        out += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i++] & 0x3f));
      }
    }
    return out;
  }

  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  function b64encode(bytes) {
    var out = '';
    for (var i = 0; i < bytes.length; i += 3) {
      var b0 = bytes[i], b1 = bytes[i + 1], b2 = bytes[i + 2];
      var has1 = (i + 1) < bytes.length, has2 = (i + 2) < bytes.length;
      out += B64[b0 >> 2];
      out += B64[((b0 & 0x03) << 4) | (has1 ? (b1 >> 4) : 0)];
      out += has1 ? B64[((b1 & 0x0f) << 2) | (has2 ? (b2 >> 6) : 0)] : '=';
      out += has2 ? B64[b2 & 0x3f] : '=';
    }
    return out;
  }

  function b64decode(str) {
    var lookup = {};
    for (var k = 0; k < B64.length; k++) lookup[B64.charAt(k)] = k;
    var clean = str.replace(/[^A-Za-z0-9+/]/g, ''), bytes = [];
    for (var i = 0; i < clean.length; i += 4) {
      var n0 = lookup[clean.charAt(i)], n1 = lookup[clean.charAt(i + 1)];
      var c2 = clean.charAt(i + 2), c3 = clean.charAt(i + 3);
      var n2 = c2 ? lookup[c2] : undefined, n3 = c3 ? lookup[c3] : undefined;
      bytes.push((n0 << 2) | (n1 >> 4));
      if (n2 !== undefined) bytes.push(((n1 & 0x0f) << 4) | (n2 >> 2));
      if (n3 !== undefined) bytes.push(((n2 & 0x03) << 6) | n3);
    }
    return bytes;
  }

  function keystream(password, seed, n) {
    var rng = mulberry32((hash32(normalize(password)) ^ (seed >>> 0)) >>> 0);
    var ks = new Array(n);
    for (var i = 0; i < n; i++) ks[i] = Math.floor(rng() * 256) & 0xff;
    return ks;
  }

  var MAGIC = 'PRSM∞1|'; // header proves the password was correct

  function encrypt(plaintext, password, seed) {
    var bytes = utf8Encode(MAGIC + plaintext);
    var ks = keystream(password, seed, bytes.length);
    for (var i = 0; i < bytes.length; i++) bytes[i] = (bytes[i] ^ ks[i]) & 0xff;
    return b64encode(bytes);
  }

  function decrypt(b64, password, seed) {
    var bytes = b64decode(b64);
    var ks = keystream(password, seed, bytes.length);
    for (var i = 0; i < bytes.length; i++) bytes[i] = (bytes[i] ^ ks[i]) & 0xff;
    var text = utf8Decode(bytes);
    return text.indexOf(MAGIC) === 0 ? text.slice(MAGIC.length) : null;
  }

  return { encrypt: encrypt, decrypt: decrypt, normalize: normalize };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = VaultCrypto;
