 
// // const express = require('express');
// // const cors = require('cors');
// // const crypto = require('crypto');
// // const BN = require('bn.js');
// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // const challenges = new Map();
// // console.log("narawalauthapi.js is starting...");

// // // Endpoint to generate and send a challenge
// // app.post('/generate-challenge', (req, res) => {
// //   const { email } = req.body;
// //   if (!email) {
// //     return res.status(400).json({ error: 'Email is required' });
// //   }

// //   // Generate a random challenge
// //   const challenge = new BN(Math.floor(Math.random() * 1000));

// //   // Convert BigInt to string to avoid serialization error
// //   const challengeStr = challenge.toString();

// //   // Store the challenge as a string
// //   challenges.set(email, challengeStr);

// //   // Send the challenge as a string in the response
// //   res.json({ challenge: challengeStr });
// // });

// // // Endpoint to verify the authentication data
// // app.post('/verify', async (req, res) => {
// //   const { email, publicKey, c, z } = req.body;

// //   try {
// //     const a = challenges.get(email);
// //     if (!a || !email || !publicKey || !c || !z) {
// //       return res.status(400).json({ error: 'Limited Information' });
// //     }
// //     console.log(req.body);

// //     // Convert inputs to BN
// //     //console.log("Y",Y);
// //     const Y =new BN(publicKey); // Convert from hex string to BN
// //     console.log("Y",Y);
// //     const cInt = new BN(c); // Convert from hex string to BN
// //     console.log("cInt",cInt); 
// //     const zInt = new BN(z); // Convert from hex string to BN
// //     const g = new BN(2); // Use actual generator value

// //     // Compute T' = Y^c * g^z using bn.js methods
// //     console.log("here now");
// //    const TPrime1 = await Exponent(Y, cInt); 
// //    console.log("done here")
// //     const TPrime2 = await Exponent(g, zInt);
// //     const TPrime = TPrime1.mul(TPrime2).mod(Y);
// //    console.log("TPrime",TPrime);
// //     // Compute hash(Y || T' || a)
// //     // Note: You need to convert BN objects to string for concatenation
// //     console.log("here now 2");
// //     const hashInput = `${Y.toString()}${TPrime.toString()}${a}`;
// //     //console.log("hashInput", hashInput)
// //     const computedHash = await hash(hashInput);
// //     //TPrime=await hash(TPrime);
// //     //const computedHash = `${Y.toString(10)}||${TPrime}||${a}`;
// //     console.log('Computed hash1:', computedHash);

// //     // Verify if hash(Y || T' || a) == c
// //     const isSuccess = cInt.eq(computedHash);

// //     // Send the result back to the client
// //     console.log('isSuccess:', isSuccess);
// //     res.json({ success: isSuccess });
// //   } catch (error) {
// //     console.error('Error verifying authentication:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // Utility function to compute hash using SHA-256
// // async function hash(data) {
// //   const msgUint8 = new TextEncoder().encode(data);
// //   const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
// //   const hashArray = Array.from(new Uint8Array(hashBuffer));
// //   const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
// //   return new BN(hashHex, 16); // Convert hex string to BN
// // }

// // function generateLargeRandomNumber() {
// //   // Generate an 8-byte random value
// //   const bytes = crypto.randomBytes(8);
// //   // Convert bytes to a large number
// //   const number = bytes.readBigUInt64BE();
// //   return number;
// // }

// // function Exponent(base, exponent) {
// //   const primeNumber = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779');
// //   let result = new BN(1);
// //   base = base.mod(primeNumber);

// //   while (!exponent.isZero()) {
// //     if (exponent.isOdd()) {
// //       result = result.mul(base).mod(primeNumber);
// //     }
// //     exponent = exponent.shrn(1); // Shift right
// //     base = base.mul(base).mod(primeNumber);
// //   }

// //   return result;
// // }

// // const port = process.env.PORT || 3001;
// // app.listen(port, () => {
// //   console.log(`API running at http://localhost:${port}`);
// // });


// const express = require('express');
// const cors = require('cors');
// const crypto = require('crypto');
// const BN = require('bn.js');
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const challenges = new Map();
// console.log("narawalauthapi.js is starting...");

// // Endpoint to generate and send a challenge
// app.post('/generate-challenge', (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   // Generate a random challenge
//   const challenge = new BN(Math.floor(Math.random() * 1000));

//   // Store the challenge as a BN
//   challenges.set(email, challenge);

//   // Send the challenge as a string in the response
//   res.json({ challenge: challenge.toString(16) });
// });

// // Endpoint to verify the authentication data
// // app.post('/verify', async (req, res) => {
// //   const { email, publicKey, c, z/*,T*/ } = req.body;

// //   try {
// //     const challenge = challenges.get(email);
// //     console.log("challenge",challenge);
// //     if (!challenge || !email || !publicKey || !c || !z) {
// //       return res.status(400).json({ error: 'Limited Information' });
// //     }
// //     console.log(req.body);

// //     // Convert inputs to BN
// //     const Y = new BN(publicKey,16); // Convert from hex string to BN
// //     const cInt = new BN(c, 16); // Convert from hex string to BN
// //     const zInt = new BN(z, 16); // Convert from hex string to BN
// //     const g = new BN(2); // Use actual generator value

// //     // Compute T' = Y^c * g^z using bn.js methods
// //     const TPrime1 = Exponent(Y, cInt);
// //     const TPrime2 = Exponent(g, zInt);
// //     const TPrime = TPrime1.mul(TPrime2);
// //   console.log("TPrime",TPrime.toString(16));
// //  // console.log("T",T);
// //   //const Tchange=new BN(T,16);
// //   //console.log("Tchange",Tchange.toString(16));
// //     // Compute hash(Y || T' || a)
// //     const hashInput = `${publicKey}${TPrime.toString(16)}${challenge.toString(16)}`;
// //     const computedHash = await hash(hashInput);
    
// //     // Verify if hash(Y || T' || a) == c
// //     const isSuccess = cInt.eq(computedHash);

// //     // Send the result back to the client
// //     console.log('isSuccess:', isSuccess);
// //     res.json({ success: isSuccess });
// //   } catch (error) {
// //     console.error('Error verifying authentication:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });
// app.post('/verify', async (req, res) => {
//   const { email, publicKey, c, z } = req.body;

//   try {
//     const challenge = challenges.get(email);
//     console.log("challenge", challenge.toString(16));
//     if (!challenge || !email || !publicKey || !c || !z) {
//       return res.status(400).json({ error: 'Limited Information' });
//     }
//     console.log(req.body);

//     // Convert inputs to BN
//     const Y = new BN(publicKey, 16); // Convert from hex string to BN
//     const cInt = new BN(c, 16); // Convert from hex string to BN
//     const zInt = new BN(z, 16); // Convert from hex string to BN
//     const g = new BN(2); // Use actual generator value
//     const p = new BN('4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779', 16); // Prime number

//     // Compute Tnot = (Y^c * pow(2, z, p)) % p
//     const Yc = modPow(Y,cInt, p);
//     const gzModp = modPow(g,zInt, p);
//     var Tnot = Yc.mul(gzModp).mod(p);
//     //Tnot=modPow(Tnot,BN(1,10),p);
//     //const Tnot = Yc.mul(gzModp).mod(p);
//     Tnot = modPow(Tnot, new BN(1, 16), p);
//     console.log("Tnot",Tnot.toString(16));
//     // Compute hash(Y || Tnot || a)
//     const hashInput = `${publicKey}${Tnot.toString(16)}${challenge.toString(16)}`;
//     const computedHash = await hash(hashInput);

//     // Verify if hash(Y || Tnot || a) == c
//     const isSuccess = cInt.eq(computedHash);

//     // Send the result back to the client
//     console.log('isSuccess:', isSuccess);
//     res.json({ success: isSuccess });
//   } catch (error) {
//     console.error('Error verifying authentication:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // Utility function to compute hash using SHA-256
// async function hash(data) {
//   const msgUint8 = new TextEncoder().encode(data);
//   const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
//   return new BN(hashHex, 16); // Convert hex string to BN
// }

// function modPow(base, exponent, modulus) {
//   let result = new BN(1, 16);
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

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`API running at http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



function runPythonScript(scriptPath, args, callback) {
  const pythonProcess = spawn('python', [scriptPath].concat(args));

  let data = '';
  pythonProcess.stdout.on('data', (chunk) => {
      data += chunk.toString(); // Collect data from Python script
  });

  pythonProcess.stderr.on('data', (error) => {
      console.error(`stderr: ${error}`);
  });

  pythonProcess.on('close', (code) => {
      if (code !== 0) {
          console.log(`Python script exited with code ${code}`);
          callback(`Error: Script exited with code ${code}`, null);
      } else {
          console.log('Python script executed successfully');
          callback(null, data);
      }
  });
}


const challenges = new Map();
console.log("narwalauth api.js is starting...");

app.get('/generate-challenge', (req, res) => {
  console.log("In generate-challenge API");
  
  // Extract email from query parameters
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  runPythonScript('zkp_operations.py', ['generate_challenge'], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const challenge = results[0];
    challenges.set(email, challenge);
    res.json({ challenge: challenge.toString() });
  });
});
 

app.get('/verify', (req, res) => {
  const { email, publicKey, c, z } = req.query;

  const challenge = challenges.get(email);
  if (!challenge || !email || !publicKey || !c || !z) {
    return res.status(400).json({ error: 'Limited Information' });
  }

  console.log(req.query);
  console.log("challenge", challenge.toString());

  runPythonScript('zkp_operations.py', 
    ['verify', publicKey, c, z, challenge.toString()], 
    (err, results) => {
      if (err) {
        console.error('Error running Python script:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Log the raw output from the Python script
      const rawOutput = results.split('python verification script')[1].trim();
      console.log('Processed output from Python script:', rawOutput);

      try {
        const resultsArray = rawOutput.slice(1, -1).split(',').map(item => item.trim());
        const firstElement = parseInt(resultsArray[0], 10);
        console.log('First element from Python script output:', firstElement);
        if (firstElement === 1) {
          console.log('isSuccess: is true here');
          res.json({ success: true });
        } else {
          console.log('isSuccess: is false here');
          res.json({ success: false });
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Invalid response from verification process' });
      }
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});