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
            text: "📄 Открыть статью",
            url: "https://telegra.ph/eryrtu-06-18",
          },
        ],
        [
          {
            text: "Принимаю условия и согласен на обработку персональных данных",
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
module.exports = { DefaultMessage, messagePay, StartMessage };
