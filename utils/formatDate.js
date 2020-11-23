'use strict'
const format = use("date-fns/format");

const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  if (date) {
    const data = new Date(date);
    date = format(data, dateFormat);
  }

  return date;
};

module.exports = formatDate;
