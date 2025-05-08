"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const errorDetails = error.details.map((detail) => ({
                message: detail.message,
                path: detail.path,
            }));
            return res.status(400).json({
                error: "Validation failed",
                details: errorDetails,
            });
        }
        // If validation succeeds, continue to the controller
        next();
    };
};
exports.validate = validate;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            const errorDetails = error.details.map((detail) => ({
                message: detail.message,
                path: detail.path,
            }));
            return res.status(400).json({
                error: "Validation failed",
                details: errorDetails,
            });
        }
        // If validation succeeds, continue to the controller
        next();
    };
};
exports.validateParams = validateParams;
