const httpError = (res, error, next) => {
  console.log(error);
  res.status(500).send({ error: error.message });
  return next(error);
};

module.exports = { httpError };
