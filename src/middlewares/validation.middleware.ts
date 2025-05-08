import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

export const validateParams = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
