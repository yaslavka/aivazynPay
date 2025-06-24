const { UsersModel } = require("../../Models/UsersModel");

function userProcess(user) {
  return {
    id: user.id,
    tegId: user.tegId,
    email: user.email,
    sumPay: user.sumPay,
    isVerify: user.isVerify,
  };
}

async function findOne(where) {
  try {
    const user = await UsersModel.findOne({ where: where });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = {
  findOne,
  userProcess,
};
