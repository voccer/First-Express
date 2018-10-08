module.exports = {
  POSTcreatePro: (req, res, next) => {
    let Err = [];
    if (!req.body.namePro) {
      Err.push("Name is required!!");
    }
    if (!req.body.price) {
      Err.push("Price is required!!");
    }
    if (Err.length > 0) {
      res.render("product/create", {
        Err: Err,
        Value: req.body
      });
      return;
    }
    next();
  }
};
