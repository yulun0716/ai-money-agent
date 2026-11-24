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
  const capital = (url.searchParams.get("capital") || "zero").toLowerCase().trim();

  const demoQuests = [
    {
      id: "solana-001",
      project: "Solana",
      platform: "Galxe",
      title: "Solana Quest Explorer",
      category: "Ecosystem",
      cost_type: "unknown",
      reward_type: "points",
      website: "https://app.galxe.com/"
    },
    {
      id: "solana-002",
      project: "Solana",
      platform: "Layer3",
      title: "Solana Learning Quest",
      category: "Learning",
      cost_type: "unknown",
      reward_type: "points",
      website: "https://layer3.xyz/"
    },
    {
      id: "solana-003",
      project: "Solana",
      platform: "Zealy",
      title: "Solana Community Quest",
      category: "Community",
      cost_type: "unknown",
      reward_type: "points",
      website: "https://zealy.io/"
    },
    {
      id: "solana-004",
      project: "Solana",
      platform: "Layer3",
      title: "Free Learning Campaign",
      category: "Learning",
      cost_type: "free",
      reward_type: "token",
      website: "https://layer3.xyz/"
    },
    {
      id: "solana-005",
      project: "Solana",
      platform: "Layer3",
      title: "Deposit SOL Campaign",
      category: "DeFi",
      cost_type: "deposit",
      reward_type: "token",
      website: "https://layer3.xyz/"
    }
  ];

  const results = demoQuests.filter((quest) => {
    const text = `${quest.project} ${quest.platform} ${quest.title} ${quest.category}`.toLowerCase();

    const keywordMatch = !q || text.includes(q);
    const platformMatch = !platform || quest.platform.toLowerCase() === platform;
    const categoryMatch = !category || quest.category.toLowerCase() === category;

    const capitalMatch =
      capital !== "zero" ||
      quest.cost_type === "free";

    return keywordMatch && platformMatch && categoryMatch && capitalMatch;
  });

  return Response.json({
    status: "success",
    module: "Zero Capital Quest Search",
    version: "2.0",
    search: { q, platform, category, capital },
    total: results.length,
    capital_filter: capital,
    live_data: false,
    data_type: "demo_only",
    results,
    message: "Zero capital quest filtering is ready. Live data integration is pending."
  });
}



if (url.pathname === "/quest-analyze") {
  try {
    let quest;

    if (request.method === "GET") {
      quest = {
        title: url.searchParams.get("title") || "",
        platform: url.searchParams.get("platform") || "",
        website: url.searchParams.get("website") || "",
        description: url.searchParams.get("description") || "",
        cost: url.searchParams.get("cost") || "",
        requirements: url.searchParams.get("requirements") || ""
      };
    } else if (request.method === "POST") {
      quest = await request.json();
    } else {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    if (!quest.title || !quest.title.trim()) {
      return Response.json(
        { error: "Please provide a quest title." },
        { status: 400 }
      );
    }

    const prompt = `
請分析以下區塊鏈任務，並使用繁體中文提供風險評估報告。

任務名稱：${quest.title}
平台：${quest.platform || "未提供"}
網站：${quest.website || "未提供"}
任務說明：${quest.description || "未提供"}
成本：${quest.cost || "未提供"}
參與條件：${quest.requirements || "未提供"}

請依照以下項目分析：
1. 任務內容與參與方式
2. 可能的時間成本
3. 可能的金錢成本
4. 錢包連接與簽名風險
5. 專案可信度與資料完整度
6. 是否值得進一步研究
7. 最後給出風險等級：低、中、高或資料不足

重要規則：
- 只能根據提供的資料分析，不可假裝已查證官方活動。
- 不可自行編造獎勵、代幣、截止日期或空投資格。
- 不確定的資訊必須明確標示「尚未確認」。
- 不保證空投、獲利或投資報酬。
- 提醒使用者不要提供助記詞或私鑰。
- 不要建議使用者盲目簽署錢包交易。
`;

    const result = await env.AI.run(
      "@cf/zai-org/glm-4.7-flash",
      {
        messages: [
          {
            role: "system",
            content: "你是 AI Money Agent 的區塊鏈任務研究分析師。請保持客觀、謹慎，使用繁體中文回答。"
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
      module: "Quest AI Analyzer",
      model: "GLM-4.7-Flash",
      live_verification: false,
      quest,
      analysis: result.choices?.[0]?.message?.content ?? "AI 暫時沒有產生分析結果"
    });

  } catch (error) {
    return Response.json({
      status: "error",
      message: "Quest analysis failed",
      detail: error.message
    }, { status: 500 });
  }
}


    return Response.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }
};
