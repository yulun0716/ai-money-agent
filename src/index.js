export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        name: "AI Money Agent",
        version: "1.0",
        status: "online",
        message: "AI Agent is running!"
      });
    }

    if (url.pathname === "/health") {
      return Response.json({
        status: "healthy",
        timestamp: new Date().toISOString()
      });
    }

    if (url.pathname === "/tasks") {
      return Response.json({
        tasks: [],
        message: "Task discovery module is ready."
      });
    }

    return Response.json({
      error: "Not Found"
    }, { status: 404 });
  }
};