export const home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Polling System Api",
  });
};
