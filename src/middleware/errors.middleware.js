exports.error404 = (req, res, next) => {
  next({ message: "Not Found", status: 404 });
};

exports.error500 = (req, res, next) => {
  next({ message: "Internal Server Error", status: 500 });
};
