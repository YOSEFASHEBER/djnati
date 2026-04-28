export const apiHandler = (handler) => {
  return async (req, ...args) => {
    try {
      return await handler(req, ...args);
    } catch (err) {
      console.error("API Error:", err);

      return new Response(
        JSON.stringify({
          success: false,
          message: err.message || "Internal Server Error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  };
};
