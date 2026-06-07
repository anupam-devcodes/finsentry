const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
      });
    }

    if (source === "body") {
      req.body = result.data;
    }

    if (source === "query") {
      req.validatedQuery = result.data;
    }

    if (source === "params") {
      req.validatedParams = result.data;
    }

    next();
  };
};

export default validate;