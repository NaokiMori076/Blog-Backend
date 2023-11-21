module.exports = response = (res, data = {}, error = {}, status = 200, message = "") => {
  res.status(200).json({
    data,
    error,
    status,
    message,
  });
};
