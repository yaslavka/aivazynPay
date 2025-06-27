const UserTable = require("../../Functions/UserTable");
const { UsersModel } = require("../../Models/UsersModel");
const {
  DefaultMessage,
  messagePay,
  StartMessage,
} = require("../../utils/botUtils");
const { isValidEmail, tinkoffInit, createSHA256Hash } = require("../../utils");
const { HistoryModel } = require("../../Models/HistoryModel");

class BotController {
  async startBot(bot) {
    try {
      await bot.onText("/start", async (req) => {
        console.log(req);
        const data = {
          tegId: req?.chat?.id,
          username: req?.chat?.username,
        };
        const optionsStart = DefaultMessage();
        const optionsStartEmail = StartMessage();
        let userData = await UserTable.findOne(data);
        if (userData) {
          const user = UserTable.userProcess(userData);
          const newMessage = messagePay(
            `Оплачивая услугу, вы соглашаетесь со всеми условиями сделки, возврат не предусмотрен!`,
          );
          if (!user.email) {
            await bot.sendMessage(data.tegId, optionsStartEmail.message, {
              parse_mode: "Markdown",
              reply_markup: optionsStartEmail.reply_markup,
            });
          } else {
            if (!user.isVerify) {
              await bot.sendMessage(data.tegId, optionsStart.message, {
                parse_mode: "Markdown",
                reply_markup: optionsStart.reply_markup,
              });
            } else {
              await bot.sendMessage(data.tegId, newMessage.message, {
                parse_mode: "Markdown",
                reply_markup: newMessage.reply_markup,
              });
            }
          }
        } else {
          await UsersModel.create({
            tegId: data.tegId,
            userName: data.username,
          });
          await bot.sendMessage(data.tegId, optionsStartEmail.message, {
            parse_mode: "Markdown",
            reply_markup: optionsStartEmail.reply_markup,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  async botRules(bot) {
    try {
      await bot.on("callback_query", async (req) => {
        const data = {
          tegId: req.message?.chat?.id,
        };
        const callbackQuery = req.data;
        const messageId = req.message.message_id;
        const user = await UserTable.findOne(data);
        let newMessage = messagePay(
          `Оплачивая услугу, вы соглашаетесь со всеми условиями сделки, возврат не предусмотрен!`,
        );
        switch (callbackQuery) {
          case "accept_terms":
            if (user) {
              await user.update({ isVerify: true });
            }
            await bot.editMessageText(newMessage.message, {
              chat_id: data.tegId,
              message_id: messageId,
              parse_mode: "Markdown",
              reply_markup: newMessage.reply_markup,
            });
            break;
          case "start_pay":
            newMessage = messagePay(
              `Введите сумму для оплаты (от 500 до 300000)`,
            );
            const question = await bot.sendMessage(
              data.tegId,
              newMessage.message,
              {
                reply_markup: {
                  force_reply: true,
                  selective: true,
                },
              },
            );
            bot.onReplyToMessage(
              data.tegId,
              question.message_id,
              async (reply) => {
                const amountText = reply.text.trim();
                if (/^\d+$/.test(amountText)) {
                  const amount = parseInt(amountText);
                  if (amount >= 9 || amount <= 300000) {
                    const sum = amount * 100;
                    const historyCreate = await HistoryModel.create({
                      amount: amount,
                      userId: user.id,
                    });
                    const newData = {
                      TerminalKey: process.env.TERMINAL_KEY,
                      Amount: sum.toString().trim(),
                      OrderId: historyCreate.id.toString().trim(),
                      Description: "Оплата услуг рекламмы",
                    };
                    const dataArr = [
                      { TerminalKey: newData.TerminalKey },
                      { Amount: newData.Amount },
                      { OrderId: newData.OrderId },
                      { Description: newData.Description },
                      { Password: process.env.TERMINAL_PASSWORD },
                    ];
                    const sortedData = dataArr.sort((a, b) => {
                      const keyA = Object.keys(a)[0];
                      const keyB = Object.keys(b)[0];
                      return keyA.localeCompare(keyB);
                    });
                    const concatenatedString = sortedData
                      .map((obj) => Object.values(obj)[0])
                      .join("");
                    const hash = createSHA256Hash(concatenatedString);
                    const url = await tinkoffInit(sum, newData, hash, user);
                    if (url) {
                      newMessage = messagePay(`Перейдите к оплате`);
                      await bot.sendMessage(data.tegId, newMessage.message, {
                        reply_markup: {
                          resize_keyboard: true,
                          one_time_keyboard: true,
                          inline_keyboard: [
                            [
                              {
                                text: "Оплатить",
                                url: url,
                              },
                            ],
                          ],
                        },
                      });
                    }
                  }
                }
              },
            );
            break;
          case "add_email":
            newMessage = messagePay(`Укажите ваш email`);
            const questionEmail = await bot.sendMessage(
              data.tegId,
              newMessage.message,
              {
                reply_markup: {
                  force_reply: true,
                  selective: true,
                },
              },
            );
            bot.onReplyToMessage(
              data.tegId,
              questionEmail.message_id,
              async (reply) => {
                const emailText = isValidEmail(reply.text);
                if (emailText) {
                  await user.update({ email: reply.text });
                  const optionsStart = DefaultMessage();
                  newMessage = messagePay(
                    `Оплачивая услугу, вы соглашаетесь со всеми условиями сделки, возврат не предусмотрен!`,
                  );
                  if (!user.isVerify) {
                    await bot.sendMessage(data.tegId, optionsStart.message, {
                      parse_mode: "Markdown",
                      reply_markup: optionsStart.reply_markup,
                    });
                  } else {
                    await bot.sendMessage(data.tegId, newMessage.message, {
                      parse_mode: "Markdown",
                      reply_markup: newMessage.reply_markup,
                    });
                  }
                }
              },
            );
            break;
          default:
            break;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new BotController();
