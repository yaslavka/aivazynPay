const HistoryTable = require("../../Functions/HistoryTable");
const UserTable = require("../../Functions/UserTable");
const { messagePayS } = require("../../utils/botUtils");
const dayjs = require("dayjs");
class PayController {
  async payS(req, res, bot) {
    try {
      const { orderId } = req.body;
      const history = await HistoryTable.findOne({ id: orderId });
      if (history && !history.status) {
        console.log(history);
        const historyResult = HistoryTable.historyProcess(history);
        const user = await UserTable.findOne({ id: historyResult.userId });
        if (user) {
          await history.update({ status: true });
          await user.update({
            sumPay: Number(user.sumPay) + Number(historyResult.amount),
          });
          const currentDate = dayjs(history.createdAt).format("DD.MM.YYYY");
          await messagePayS(
            bot,
            264133466,
            orderId,
            currentDate,
            historyResult.amount,
            user.email,
            user.userName,
          );
          return res.status(200).json({ status: true });
        } else {
          return res.status(500).json({ status: false });
        }
      } else {
        return res.status(500).json({ status: false });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: false });
    }
  }
}
module.exports = new PayController();
