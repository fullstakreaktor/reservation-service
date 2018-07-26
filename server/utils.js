const parseBookedDates = (data) => {
  data.checkIn = new Date(...data.checkIn);
  data.checkOut = new Date(...data.checkOut);
  return data;
};

module.exports = {
  parseBookedDates,
};
