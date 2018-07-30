const parseBookedDates = (data) => {
  const result = {
    checkIn: new Date(...data.checkIn),
    checkOut: new Date(...data.checkOut),
  };
  return result;
};

module.exports = {
  parseBookedDates,
};
