function StartMessage() {
  return {
    message: `Для продолжения Укажите Email`,
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      force_reply: true,
      selective: true,
      inline_keyboard: [
        [
          {
            text: "Указать Email",
            callback_data: "add_email",
          },
        ],
      ],
    },
  };
}

function DefaultMessage() {
  return {
    message: `для продолжения необходимо прочитать правила сервиса и согласиться с условиями`,
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      inline_keyboard: [
        [
          {
            text: "📄 Правила сервиса",
            url: "https://telegra.ph/POLITIKA-KONFIDENCIALNOSTI-06-24-26",
          },
        ],
        [
          {
            text: "Прочитано/Принято",
            callback_data: "accept_terms",
          },
        ],
      ],
    },
  };
}

function messagePay(message) {
  return {
    message: message,
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      inline_keyboard: [
        [
          {
            text: "Оплата",
            callback_data: "start_pay",
          },
        ],
      ],
    },
  };
}
async function messagePayS(bot, chatId, orderId, date, sum, email, userName) {
  await bot.sendMessage(
    chatId,
    `
Оплата №:  ${orderId}
Дата: ${date}
Сумма:  ${sum} руб

Пользователь: 
E-mail: ${email}
Telegram: @${userName}
  `,
  );
}
module.exports = { DefaultMessage, messagePay, StartMessage, messagePayS };
