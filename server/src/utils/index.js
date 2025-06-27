const axios = require("axios");
const crypto = require("crypto");
function createSHA256Hash(input) {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}
async function tinkoffInit(Amount, data, Token, user) {
  try {
    const initPay = await axios.post(process.env.URL_TINKOF, {
      TerminalKey: data.TerminalKey,
      Amount: Amount,
      OrderId: data.OrderId,
      Description: data.Description,
      Token: Token,
      DATA: {
        Email: user.email,
      },
      Receipt: {
        Email: user.email,
        Taxation: "osn",
        Items: [
          {
            Name: "консультация по размещению рекламы",
            Price: Amount,
            Quantity: 1,
            Amount: Amount,
            Tax: "none",
            Ean13: "303130323930303030630333435",
          },
        ],
      },
    });
    console.log(initPay?.data);
    if (
      initPay &&
      initPay.status === 200 &&
      initPay.data &&
      initPay.data.Success
    ) {
      return initPay.data.PaymentURL;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = { isValidEmail, tinkoffInit, createSHA256Hash };
