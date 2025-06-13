// @/lib/auth.js
import { query } from "./db"; // Your existing db.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateAuth } from "@/actions/auth-actions";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_SECONDS = 604800; // 7 days, same as your Supabase example

/**
 * Signs in the admin user with email and password.
 * Mimics the return structure of Supabase's signInWithPassword where `data` contains user and session.
 * @param {string} email - The admin's email.
 * @param {string} password - The admin's password.
 * @returns {Promise<Object>} - Object containing `data` (with user & session) or `error`.
 */
async function signInWithPassword(email, password) {
  // Enforce single admin user by checking against the configured ADMIN_EMAIL
  // if (email !== ADMIN_EMAIL) {
  //   return {
  //     data: null,
  //     error: { message: "Invalid credentials", status: 401 },
  //   };
  // }

  try {
    const dbResult = await query(
      "SELECT id, email, password_hash FROM admin_users WHERE email = $1",
      [email]
    );

    if (dbResult.rows.length === 0) {
      // This case should ideally not be reached if the admin user is seeded correctly
      // and ADMIN_EMAIL matches the one in the DB.
      console.error(`Admin user with email ${email} not found in database.`);
      return {
        data: null,
        error: { message: "Invalid credentials", status: 401 },
      };
    }

    const adminUser = dbResult.rows[0];
    const passwordIsValid = await bcrypt.compare(
      password,
      adminUser.password_hash
    );

    if (!passwordIsValid) {
      return {
        data: null,
        error: { message: "Invalid credentials", status: 401 },
      };
    }

    const tokenPayload = {
      userId: adminUser.id,
      email: adminUser.email,
      // Add any other non-sensitive claims you might need for the admin
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN_SECONDS,
    });

    return {
      data: {
        user: {
          id: adminUser.id,
          email: adminUser.email,
          // You can add more fields here if needed, e.g., a role
          // aud: 'authenticated', // Supabase includes this
          // role: 'admin', // Example custom role
        },
        session: {
          access_token: token,
          token_type: "bearer",
          expires_in: JWT_EXPIRES_IN_SECONDS,
          // Note: This simple setup does not include a refresh token.
        },
      },
      error: null,
    };
  } catch (error) {
    console.error("Error in signInWithPassword:", error);
    return {
      data: null,
      error: {
        message: error.message || "An internal server error occurred.",
        status: 500,
      },
    };
  }
}

/**
 * Gets the user object from a JWT token.
 * Mimics the return structure of the original getUserFromToken.
 * @param {string} token - The JWT token to validate.
 * @returns {Promise<Object>} - Object containing success, user, status, and error.
 */
async function getUserFromToken(token) {
  if (!token) {
    return {
      success: false,
      error: "No token provided.",
      status: 401,
      user: null,
    };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optionally, re-verify against the database to ensure the user still exists
    // and is valid, especially if you implement token revocation or user status changes later.
    // For a single admin that's always valid, this DB check is an extra layer of sanity.
    const dbResult = await query(
      "SELECT id, email FROM admin_users WHERE id = $1 AND email = $2",
      [decoded.userId, decoded.email]
    );

    if (dbResult.rows.length === 0) {
      return {
        success: false,
        error: "User not found or token data mismatch.",
        status: 401,
        user: null,
      };
    }

    const userFromDb = dbResult.rows[0];

    return {
      success: true,
      user: {
        id: userFromDb.id,
        email: userFromDb.email,
        // aud: 'authenticated', // Supabase includes this
        // Add any other relevant fields from decoded token or DB
      },
      status: 200,
      error: null,
    };
  } catch (error) {
    let errorMessage = "Invalid or expired token.";
    let status = 401;

    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Token has expired.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid token structure or signature.";
    } else {
      // Log unexpected errors for server-side debugging
      console.error("Error in getUserFromToken:", error);
      errorMessage = "An unexpected error occurred while validating the token.";
      status = 500; // Internal server error
    }

    return {
      success: false,
      error: errorMessage,
      status: status,
      user: null,
    };
  }
}

/**
 * Creates a new admin account.
 * @param {string} email - The admin's email.
 * @param {string} password - The admin's password.
 * @returns {Promise<Object>} - Object containing success status and error message if any.
 */
async function createAdminAccount(email, password) {
  // try {
  //   // Check if admin already exists
  //   const existingAdmin = await query(
  //     "SELECT id FROM admin_users WHERE email = $1",
  //     [email]
  //   );
  //   if (existingAdmin.rows.length > 0) {
  //     return {
  //       success: false,
  //       error: "An admin account with this email already exists.",
  //     };
  //   }
  //   // Hash the password
  //   const saltRounds = 10;
  //   const passwordHash = await bcrypt.hash(password, saltRounds);
  //   // Create the admin account
  //   await query(
  //     "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)",
  //     [email, passwordHash]
  //   );
  //   return {
  //     success: true,
  //     error: null,
  //   };
  // } catch (error) {
  //   console.error("Error in createAdminAccount:", error);
  //   return {
  //     success: false,
  //     error: "Failed to create admin account. Please try again.",
  //   };
  // }
}

export {
  validateAuth,
  signInWithPassword,
  getUserFromToken,
  createAdminAccount,
};
