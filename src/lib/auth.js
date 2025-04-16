import supabase from "./supabase";

async function signInWithPassword(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    },
    {
      expiresIn: 604800, // 7 days in seconds
    }
  );

  return data;
}

/**
 * Gets the user object from a Supabase JWT token
 * @param {string} token - The JWT token to validate
 * @returns {Promise<Object>} - The user object or error
 */
async function getUserFromToken(token) {
  try {
    // Get the user from the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return {
        success: false,
        error: error.message,
        status: 401,
      };
    }

    return {
      success: true,
      user: data.user,
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error occurred",
      status: 500,
    };
  }
}

export {
  signInWithPassword,
  // authMe,
  getUserFromToken,
};
