import Joi from "joi";

/**
 * Validation schema for user sign-up
 *
 * Requirements:
 * - email: valid email format, required, normalize to lowercase
 * - password: min 6 chars, requires mixed case, numbers, and special chars, required
 * - firstName: min 2 chars, max 50 chars, required, sanitize spaces
 * - lastName: min 2 chars, max 50 chars, required, sanitize spaces
 */
export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  firstName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .pattern(/^[A-Za-z\s'-]+$/)
    .messages({
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base":
        "First name can only contain letters, spaces, hyphens and apostrophes",
      "string.empty": "First name is required",
      "any.required": "First name is required",
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .pattern(/^[A-Za-z\s'-]+$/)
    .messages({
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot exceed 50 characters",
      "string.pattern.base":
        "Last name can only contain letters, spaces, hyphens and apostrophes",
      "string.empty": "Last name is required",
      "any.required": "Last name is required",
    }),
});

/**
 * Validation schema for user sign-in
 *
 * Requirements:
 * - email: valid email format, required, normalize to lowercase
 * - password: required, no empty spaces
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string().trim().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

/**
 * Validation schema for token refresh
 *
 * Requirements:
 * - refreshToken: required, must be a string
 */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refresh token is required",
    "any.required": "Refresh token is required",
  }),
});
