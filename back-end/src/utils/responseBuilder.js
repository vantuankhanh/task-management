const response = (res, data, message, statusCode) => {
  console.log("----------> Message response:", message);

  return res.status(statusCode ?? 200).json({
    message: message ?? "OK",
    data: data ?? [],
  });
};

module.exports = { response };
