export function handleError(res, error, status = 500) {
    const response = {
      success: false,
      message: error.message || "Something went wrong",
      status: status,
    };
  
    if (process.env.NODE_ENV === "development") {
      response.stack = error.stack;
    }
  
    return res.json(response, { status });
  }
  