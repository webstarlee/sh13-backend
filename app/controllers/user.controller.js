exports.allAccess = (req, res) => {
  console.log(req.user);
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).json({ data: req.user });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
