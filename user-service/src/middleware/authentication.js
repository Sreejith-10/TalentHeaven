export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];


  console.log(authorization)

  if (token)
    next();
  else
    return res.status(401).json({ message: "please authenticate" });
};
