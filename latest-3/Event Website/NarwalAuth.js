//const fetch = require("node-fetch");
// import crypto from 'crypto';
// const express = require("express");
// const bodyParser = require("body-parser");
// in place of unique entity add any entity unique to the password, like an email or uniqueentity, it needs to be a string
//import { pow, BN } from "bn.js";
// async function NarwalAuth()  {
//   async function generatePublicKey(password, uniqueentity) {
//     const x = await hashFunction(password, uniqueentity);
//     const g = BigInt(2);
//     const primenumber =
//       "4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779";
//     const modulus = BigInt(primenumber);
//     const Y = Exponent(g, x, modulus);
//     console.log("Y",Y);
//     return Y.toString();
//   }

//   async function hashFunction(password, uniqueentity) {
//     const pepper = password + uniqueentity;
//     const msgUint8 = new TextEncoder().encode(pepper);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray
//       .map((b) => b.toString().padStart(2, "0"))
//       .join("");
//     return BigInt(hashHex);
//   }

// function Exponent(g, x, mod) {
//     if (mod === 1n) return 0n;
//     let crypted = 1n;
//     g = g % mod;
//     while (x > 0n) {
//       if (x % 2n === 1n) {
//         crypted = (crypted * g) % mod;
//       }
//       x = x / 2n;
//       g = (g * g) % mod;
//     }
//     return crypted;
//   }
//   async function solveChallenge(uniqueentity, password, challenge) {
//     const primenumber =
//     "4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779";
//   const modulus = BigInt(primenumber);
//     const g = BigInt(2);
//     const r = BigInt(Math.floor(Math.random() * 1000));
//     var Y = await generatePublicKey(password, uniqueentity);
//     Y=BigInt(Y);
//     var T = Exponent(g,r,modulus);
//     console.log("T",T);
//     T=T.toString();
//     const a = BigInt(challenge);

//     const hashedPassword = await hashFunction(password, "");
//     const x = hashedPassword;
//     const hashConcatenation = `${Y}${T}${a}`;
//     var c=await hashFunction(hashConcatenation,"");
//     console.log("c",c); 
//     c=BigInt(c);
//     var z = r - c * x;
//     if (z < 0) {
//       z = z * -1n;
//   }
//   console.log("z",z);
//   c=c.toString();
//   z=z.toString();
//     const solution = {
//     // uniqueentity: uniqueentity,
//       //  challenge: challenge,
//       c: c,
//       z: z,
//      isValid: true,
//     };

//     return solution;
//   }
// return {
//   GetPublicKey: async function(password, uniqueentity) {
//     return await generatePublicKey(password, uniqueentity);
//   },
//   SolveChallenge: async function(uniqueentity, password, challenge) {
//     return await solveChallenge(uniqueentity, password, challenge);
//   },
// };
 
// }
// export default NarwalAuth;



// import { BN } from "bn.js";
// //import crypto from "crypto";
// //import { TextEncoder } from "util";

// async function NarwalAuth() {
//   async function generatePublicKey(password) {
//     console.log("In generatePublicKey");
//     const x = await hashFunction(password);
//     console.log("x", x.words);
//     const g = new BN(2);
//     const Y = await Exponent(g, x);
//     console.log("Y", Y.toString());
//     return Y.toString();
//   }

//   async function hashFunction(password) {
//     const pepper = password;
//     const msgUint8 = new TextEncoder().encode(pepper);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
//     return new BN(hashHex, 16); // Convert hex string to BN
//   }

//   function Exponent(base, exponent) {
//     const primeNumber = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779');
//     let result = new BN(1);
//     base = base.mod(primeNumber);

//     while (!exponent.isZero()) {
//       if (exponent.isOdd()) {
//         result = result.mul(base).mod(primeNumber);
//       }
//       exponent = exponent.shrn(1); // Shift right
//       base = base.mul(base).mod(primeNumber);
//     }

//     return result;
//   }

//   async function solveChallenge(password, challenge) {
//     const g = new BN(2);
//     const r = new BN(Math.floor(Math.random() * 1000));
//     var Y = await generatePublicKey(password);
//     Y = new BN(Y);
//     var T = await Exponent(g, r);
//     console.log("T", T);
//     T = T.toString();
//     const a = new BN(challenge);

//     const hashedPassword = await hashFunction(password);
//     const x = hashedPassword;
//     const hashConcatenation = `${Y.toString()}${T}${a.toString()}`;
//     var c = await hashFunction(hashConcatenation);
//     console.log("c", c);
//     var z = r.sub(c.mul(x)); // Correct subtraction and multiplication
//     if (z.isNeg()) {
//       z = z.neg(); // Correct handling of negative values
//     }
//     console.log("z", z);
//     c = c.toString();
//     z = z.toString();
//     const solution = {
//       c: c,
//       z: z,
//       isValid: true,
//     };

//     return solution;
//   }

//   return {
//     GetPublicKey: async function (password, uniqueentity) {
//       return await generatePublicKey(password, uniqueentity);
//     },
//     SolveChallenge: async function (uniqueentity, password, challenge) {
//       return await solveChallenge(uniqueentity, password, challenge);
//     },
//   };
// }

// export default NarwalAuth;

// import { BN } from "bn.js";
// // import crypto from "crypto";
// // import { TextEncoder } from "util";

// async function NarwalAuth() {
//   async function generatePublicKey(password) {
//     console.log("In generatePublicKey");
//     const x = await hashFunction(password);
//    // console.log("x", x.words);
//     const g = new BN(2);
//     const Y = await Exponent(g, x);
//     console.log("Y", Y.toString(16));
//     return Y.toString(16);
//   }

//   async function hashFunction(password) {
//     const pepper = password ;
//     const msgUint8 = new TextEncoder().encode(pepper);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
//     return new BN(hashHex, 16); // Convert hex string to BN
//   }

//   async function  Exponent(base, exponent) {
//     const modulus = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779', 16); // Prime number
//     let result = new BN(1, 16);
//   base = base.mod(modulus);

//   while (!exponent.isZero()) {
//     if (exponent.isOdd()) {
//       result = result.mul(base).mod(modulus);
//     }
//     exponent = exponent.shrn(1);
//     base = base.mul(base).mod(modulus);
//   }

//   return result;
// }

//   async function solveChallenge( password, challenge) {
//     const g = new BN(2);
//     const r = new BN(Math.floor(Math.random() * 1000));
//     var Y = await generatePublicKey(password);
//     Y = new BN(Y, 16);
//     var T = await Exponent(g, r);
//     console.log("T", T.toString(16));
//     T = T.toString(16);
//     const a = new BN(challenge, 16);

//     const hashedPassword = await hashFunction(password);
//     const x = hashedPassword;
//     const hashConcatenation = `${Y.toString(16)}${T}${a.toString(16)}`;
//     var c = await hashFunction(hashConcatenation);
//     console.log("c", c.toString(16));
//     var z = r.sub(c.mul(x));
//         if (z.isNeg()) {
//             z = z.neg(); // Correct handling of negative values
//           }
//     console.log("z", z.toString(16));
//     c = c.toString(16);
//     z = z.toString(16);
//     const solution = {
//       c: c,
//       z: z,
//     //  T:T,
//       isValid: true,
//     };

//     return solution;
//   }

//   return {
//     GetPublicKey: async function (password, uniqueentity) {
//       return await generatePublicKey(password, uniqueentity);
//     },
//     SolveChallenge: async function (uniqueentity, password, challenge) {
//       return await solveChallenge(uniqueentity, password, challenge);
//     },
//   };
// }

// export default NarwalAuth;



// import { BN } from "bn.js";

// async function NarwalAuth() {
//   async function generatePublicKey(password) {
//     const x = await hashFunction(password);
//     const g = new BN(2);
//     const Y = await modPowCustom(g, x);
//     console.log("Y", Y.toString(16));
//     return Y.toString(16);
//   }

//   async function hashFunction(password) {
//     const msg = password;
//     const msgUint8 = new TextEncoder().encode(msg);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
//     console.log("hashHex in hashFunction: ", hashHex);
//     return new BN(hashHex, 16);
//   }

//   async function modPowCustom(base, exponent) {
//     const modulus = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779', 16);
//     let result = new BN(1, 16);
//     base = base.mod(modulus);

//     while (!exponent.isZero()) {
//       if (exponent.isOdd()) {
//         result = result.mul(base).mod(modulus);
//       }
//       exponent = exponent.shrn(1);
//       base = base.mul(base).mod(modulus);
//     }

//     return result;
//   }

//   async function calculateHash(Y, T, a) {
//     const msg = Y + T + a;
//     console.log("msg in calculateHash: ", msg);
//     const msgUint8 = new TextEncoder().encode(msg);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     console.log("hashHex in calculateHash: ", hashHex);
//     const biExponent = new BN(hashHex, 16);
//     console.log("biExponent in calculateHash: ", biExponent);
//     const modulus = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779', 16);
//     const C = await modPowCustom(biExponent, new BN(1, 16), modulus);
//     return C.toString(16);
//   }

//   async function calculateT(r) {
//     const p = '4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779';
//     const biModulus = new BN(p, 16);
//     const T = await modPowCustom(new BN(2), new BN(r), biModulus);
//     console.log("T in calculateT: ", T.toString(16));
//     return T.toString(16);
//   }

//   async function generateZ(r, c, x) {
//     const p = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779', 16);
//     const cx = new BN(c, 16).mul(x);
//     let rcx = r.sub(cx);

//     if (rcx.isNeg()) {
//       rcx = rcx.neg();
//     }

//     rcx = rcx.mod(p);
//     console.log("rcx after modPowCustom: ", rcx.toString(16));
//     return rcx.toString(16);
//   }

//   async function solveChallenge(password, challenge) {
//     console.log("In solveChallenge")
//     const r = new BN(Math.floor(Math.random() * 1000));
//     const Y = await generatePublicKey(password);
//     const T = await calculateT(r);
//     console.log("T", T);
//     const a = new BN(challenge, 16);
//     console.log("a", a);
//     const hashedPassword = await hashFunction(password);
//     const x = hashedPassword;
//     const c = await calculateHash(Y, T, a.toString(16));
//     const z = await generateZ(r, c, x);

//     const solution = {
//       c,
//       z,
//       isValid: true,
//     };

//     return solution;
//   }

//   return {
//     GetPublicKey: async function (password) {
//       return await generatePublicKey(password);
//     },
//     SolveChallenge: async function (password,challenge) {
//       return await solveChallenge(password, challenge);
//     },
//   };
// }

// export default NarwalAuth;


async function NarwalAuth() {
  
function modPowCustom(base, exponent, modulus) {
  base = BigInt(base);
  exponent = BigInt(exponent);
  modulus = BigInt(modulus);

  if (modulus === BigInt(1)) return BigInt(0);
  let result = BigInt(1);
  base = (base % modulus + modulus) % modulus; // Ensure base is non-negative
  while (exponent > 0) {
      if (exponent % BigInt(2) === BigInt(1)) {
          result = (result * base) % modulus;
      }
      exponent = exponent / BigInt(2);
      base = (base * base) % modulus;
  }
  return (result + modulus) % modulus; // Ensure result is non-negative
}
async function calculateHash(Y, T, a) {
  var msg = Y + T + a;
  console.log("msg in calculateHash: ", msg);
  const msgUint8 = new TextEncoder().encode(msg);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log("hashHex in calculateHash: ", hashHex);
  // hex to integer
  const biBase = BigInt('1');
  const biExponent = BigInt('0x' + hashHex);
  console.log("biExponent in calculateHash: ", biExponent);
  const modulus = "4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779";
  const biModulus = BigInt(modulus);
  const C = modPowCustom(biExponent,biBase, biModulus);
  return C.toString();
}

function calculateT(r) {
  var p = '4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779';
  const biModulus = BigInt(p);
  var T = modPowCustom(BigInt(2), BigInt(r), biModulus);
  return T.toString();
}


function generateZ(r, c, x) {
  var p = BigInt('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794778');
  var cx = BigInt(c) * x;
  // cx = modPowCustom(cx, BigInt(1), p);

  console.log("cx mod p is: ", cx);
  var rcx = (BigInt(r) - cx);  // Add modulus operation to ensure rcx is positive

  console.log("rcx: ", rcx);
  // var aftermod = BigNumber(rcx).mod(p);
  // console.log("aftermod: ", aftermod.valueOf());
  rcx = modPowCustom(rcx, BigInt(1),p);
  // rcx = mod(rcx,p);

  console.log("rcx after modPowCustom: ", rcx);
  return rcx.toString();
}



var hashedPasswordDecimal;
async function generatePublicKey(password ) {
  // Concatenate the password, sitename, and username
  const msg = password;

  // Hash the message using SHA-256
  const msgUint8 = new TextEncoder().encode(msg);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  hashedPasswordDecimal = BigInt('0x' + hashHex);
  // Convert the hash, g, and modulus to BigInt
  const biBase = BigInt('2');
  const biExponent = BigInt('0x' + hashHex);
  const modulus = "4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779";
  const biModulus = BigInt(modulus);

  // Calculate Y = (biBase ^ biExponent) % biModulus using modular exponentiation
  const Y = modPowCustom(biBase, biExponent, biModulus);


  // Return Y as a string
  return Y.toString();
}

async function solveChallenge(password, challenge) {
  console.log("In solveChallenge")
  var r = Math.floor(Math.random() * 100) + 1;
  var T = calculateT(r);
  var a = challenge;
  var Y = await generatePublicKey(password);
  var c = await calculateHash(Y, T, a);
  var z = generateZ(r,c,hashedPasswordDecimal);
  console.log("T",T);
  // var cstring = c.toString();
  // var zstring = z.toString();
  const solution = {
    c,
    z,
    isValid: true,
  };

  return solution;
}

return {
  GetPublicKey: async function (password) {
    return await generatePublicKey(password);
  },
  SolveChallenge: async function (password,challenge) {
    return await solveChallenge(password, challenge);
  },
};
}

export default NarwalAuth;