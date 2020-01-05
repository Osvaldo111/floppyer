const mGetAdministradorCredentials = require("../model/mGetAdminCredentials");

/**
 * This function is designed to log in the
 * administrador.
 * @param {Object} req
 * @param {Object} res
 */
getCredentialsLogIn = (req, res) => {
  var userName = req.body.credentials.username;
  var password = req.body.credentials.password;

  mGetAdministradorCredentials.queryGetAdminCredentials(
    userName,
    password,
    function(error, results) {
      if (error) res.status(500).json({ error: "error" });

      if (results.length > 0) {
        req.session.user = results[0].user;
        res.status(200).json(true);
      } else {
        res.status(500).json({ error: "error" });
      }
    }
  );
};

module.exports = {
  getCredentialsLogIn: getCredentialsLogIn
};
