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

    if (url.pathname === "/ask") {
      try {
        let prompt;

        if (request.method === "GET") {
          prompt = url.searchParams.get("prompt");
        } else if (request.method === "POST") {
          const body = await request.json();
          prompt = body.prompt;
        } else {
          return Response.json(
            { error: "Method not allowed" },
            { status: 405 }
          );
        }

        if (!prompt || !prompt.trim()) {
          return Response.json(
            { error: "Please provide a prompt." },
            { status: 400 }
          );
        }

        const result = await env.AI.run(
          "@cf/zai-org/glm-4.7-flash",
          {
            messages: [
              {
                role: "system",
                content: "你是 AI Money Agent，一個專業的加密貨幣與區塊鏈研究助理。請使用繁體中文回答，重視風險管理，不保證投資收益。"
              },
              {
                role: "user",
                content: prompt
              }
            ]
          }
        );

        return Response.json({
          status: "success",
          model: "GLM-4.7-Flash",
          question: prompt,
          answer: result.choices?.[0]?.message?.content ?? "AI 暫時沒有產生回答"
        });

      } catch (error) {
        return Response.json({
          status: "error",
          message: "AI request failed",
          detail: error.message
        }, { status: 500 });
      }
    }

if (url.pathname === "/quests") {
  const quests = [
    {
      id: "solana-001",
      project: "Solana",
      platform: "Galxe",
      title: "Solana Quest Explorer",
      category: "Ecosystem",
      cost: "待確認",
      status: "待探索",
      website: "https://app.galxe.com/"
    },
    {
      id: "solana-002",
      project: "Solana",
      platform: "Layer3",
      title: "Solana Learning Quest",
      category: "Learning",
      cost: "待確認",
      status: "待探索",
      website: "https://layer3.xyz/"
    },
    {
      id: "solana-003",
      project: "Solana",
      platform: "Zealy",
      title: "Solana Community Quest",
      category: "Community",
      cost: "待確認",
      status: "待探索",
      website: "https://zealy.io/"
    }
  ];

  return Response.json({
    status: "success",
    module: "Solana Quest Explorer",
    version: "2.0",
    total: quests.length,
    quests,
    message: "Quest Explorer API is ready."
  });
}

    return Response.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }
};
