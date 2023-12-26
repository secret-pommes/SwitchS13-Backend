function not_found(req, service) {
  if (!service) service = "common";
  return {
    header: {
      "X-Epic-Error-Name": `errors.com.epicgames.${service}.not_found`,
      "X-Epic-Error-Code": 1004,
    },
    error: {
      errorCode: `errors.com.epicgames.${service}.not_found`,
      errorMessage:
        "Sorry the resource you were trying to find could not be found",
      messageVars: [req.originalUrl],
      numericErrorCode: 1004,
      originatingService: "fortnite",
      intent: "prod",
    },
  };
}

function method(req, service) {
  if (!service) service = "common";
  return {
    header: {
      "X-Epic-Error-Name": `errors.com.epicgames.${service}.method_not_allowed`,
      "X-Epic-Error-Code": 1009,
    },
    error: {
      errorCode: `errors.com.epicgames.${service}.method_not_allowed`,
      errorMessage:
        "Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
      messageVars: [req.originalUrl],
      numericErrorCode: 1009,
      originatingService: "fortnite",
      intent: "prod",
    },
  };
}

module.exports = { not_found, method };
