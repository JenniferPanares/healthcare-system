export const generateToken = (user, message, statusCode, res) => {
  // Generate a JSON Web Token for the user
  const token = user.generateJsonWebToken();

  // Determine the cookie name based on the user's role
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  // Set the cookie with the token and send the response
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Cookie expiration time
      ),
      httpOnly: true, // Cookie accessible only by the server
    })
    .json({
      success: true, // Indicate operation was successful
      message, // Success message
      user, // User details
      token, // Generated token
    });
};
