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

if (url.pathname === "/quest-sources") {
  const sources = [
    {
      platform: "Galxe",
      website: "https://app.galxe.com/",
      data_status: "not_connected",
      access: "API 權限待確認",
      api_key_required: "待確認",
      live_data: false
    },
    {
      platform: "Layer3",
      website: "https://layer3.xyz/",
      data_status: "not_connected",
      access: "公開資料來源待確認",
      api_key_required: "待確認",
      live_data: false
    },
    {
      platform: "Zealy",
      website: "https://zealy.io/",
      data_status: "not_connected",
      access: "需要社群 API 權限",
      api_key_required: true,
      live_data: false
    }
  ];

  return Response.json({
    status: "success",
    module: "Quest Source Manager",
    version: "2.1",
    total_sources: sources.length,
    connected_sources: 0,
    sources,
    message: "Quest source management is ready."
  });
}

if (url.pathname === "/quest-search") {
  const q = (url.searchParams.get("q") || "").toLowerCase().trim();
  const platform = (url.searchParams.get("platform") || "").toLowerCase().trim();
  const category = (url.searchParams.get("category") || "").toLowerCase().trim();

  const demoQuests = [
    {
      id: "solana-001",
      project: "Solana",
      platform: "Galxe",
      title: "Solana Quest Explorer",
      category: "Ecosystem",
      website: "https://app.galxe.com/"
    },
    {
      id: "solana-002",
      project: "Solana",
      platform: "Layer3",
      title: "Solana Learning Quest",
      category: "Learning",
      website: "https://layer3.xyz/"
    },
    {
      id: "solana-003",
      project: "Solana",
      platform: "Zealy",
      title: "Solana Community Quest",
      category: "Community",
      website: "https://zealy.io/"
    }
  ];

  const results = demoQuests.filter((quest) => {
    const text = `${quest.project} ${quest.platform} ${quest.title} ${quest.category}`.toLowerCase();

    return (
      (!q || text.includes(q)) &&
      (!platform || quest.platform.toLowerCase() === platform) &&
      (!category || quest.category.toLowerCase() === category)
    );
  });

  return Response.json({
    status: "success",
    module: "Solana Quest Search",
    version: "1.0",
    search: { q, platform, category },
    total: results.length,
    live_data: false,
    data_type: "demo_only",
    results,
    message: "Search engine is ready. Live data integration is pending."
  });
}


    return Response.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }
};
