const { HistoryModel } = require("../../Models/HistoryModel");

function historyProcess(history) {
  return {
    id: history.id,
    amount: history.amount,
    status: history.status,
    userId: history.userId,
  };
}

async function findOne(where) {
  try {
    const history = await HistoryModel.findOne({ where: where });
    if (history) {
      return history;
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
  historyProcess,
};
