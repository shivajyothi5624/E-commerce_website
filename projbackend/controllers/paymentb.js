var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "ymrk7jf849jg9hvq",
  publicKey: "hhkxv7n7t5k5jssr",
  privateKey: "724ca11458242850dd20d14a0100af77"
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      // console.log(response)
      res.json(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
