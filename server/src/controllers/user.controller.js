export const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully.",
    data: {
      user: req.user,
    },
  });
};