const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { exec } = require("child_process");
const cors = require("cors");

let operatorAddress = "0x57418b2C8aE4840ed9De5eEDaF453D503b7d4F3D";
let adminAddress = "0x57418b2C8aE4840ed9De5eEDaF453D503b7d4F3D";
let value = 'kljkSD9d89klndskfahlskdbflkKJAS*&&SAVKASDFHHOFGSJKASF';
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

try {
  app.get("/*", (req, res) => {
    res.json("API server working!");
  });

  app.post("/startCakeLottery", (req, res) => {
    console.log("body", req.body);
    if (req.body.operatorAddress == operatorAddress && req.body.value == value) {
      exec("pm2 start cakeLotteryBOT", (error, stdout, stderr) => {
        try {
          if (error) {
            console.log(`error: ${error.message}`);
            res.json(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json(`stderr: ${stderr}`);
            return;
          }
          console.log(`Cake Lottery BOT started!`);
          res.json(`Cake Lottery BOT started`);
        } catch (err) {
          console.log(err);
        }
      });

    } else res.json("Invalid admin");
  });
  
  app.post("/stopCakeLottery", (req, res) => {
    console.log("body", req.body);
    if (req.body.operatorAddress == operatorAddress && req.body.value == value) {
      try {
        exec("pm2 stop cakeLotteryBOT", (error, stdout, stderr) => {
          try {
            if (error) {
              console.log(`error: ${error.message}`);
              res.json(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              res.json(`stderr: ${stderr}`);
              return;
            }
            console.log('Cake Lottery BOT stopped')
            res.json(`Cake Lottery BOT stopped`);
          } catch (err) {
            console.log(err)
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else res.json("Invalid admin");
  });

  app.post("/startBNBLottery", (req, res) => {
    console.log("body", req.body);
    if (req.body.operatorAddress == operatorAddress && req.body.value == value) {
      exec("pm2 start bnbLotteryBOT", (error, stdout, stderr) => {
        try {
          if (error) {
            console.log(`error: ${error.message}`);
            res.json(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json(`stderr: ${stderr}`);
            return;
          }
          console.log(`BNB Lottery BOT started!`);
          res.json(`BNB Lottery BOT started`);
        } catch (err) {
          console.log(err);
        }
      });
    } else res.json("Invalid admin");
  });
  
  app.post("/stopBNBLottery", (req, res) => {
    console.log("body", req.body);
    if (req.body.operatorAddress == operatorAddress && req.body.value == value) {
      try {
        exec("pm2 stop bnbLotteryBOT", (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            res.json(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json(`stderr: ${stderr}`);
            return;
          }
          res.json(`BNB Lottery BOT stopped`);
          console.log('BNB Lottery BOT stopped')
        });
      } catch (err) {
        console.log(err);
      }
    } else res.json("Invalid admin");
  });

  app.post("/changeOperatorAddress", (req, res) => {
    if(req.body.adminAddress == adminAddress && req.body.value == value) {
      operatorAddress = req.body.operatorAddress
    }
    else {
      res.json('Invalid Admin!')
    }
  })

  app.post("changeSecurityKey", (req, res) => {
    if(req.body.adminAddress == adminAddress && req.body.old == value)
      value = req.body.new;
    else res.json("Invalid Admin")
  })

} catch (error) {
  console.log("Error occured.");
}

app.listen(process.env.PORT || 3100, () => {
  console.log("Server running on port ", process.env.PORT || 3100);
});
