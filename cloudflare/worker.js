// 蒲桢个人主页 · 数字分身中转站（Cloudflare Worker）
// 作用：网页 → 这个 Worker → 大模型 API。API Key 只存在 Cloudflare 环境变量里，不会泄露到网页源码。
// 部署步骤见同目录《部署指南.md》

const SYSTEM_PROMPT = `你是蒲桢的数字分身，在蒲桢的个人主页里回答访客关于他的问题。

你的任务：
- 介绍他是谁
- 回答和他有关的问题
- 帮访客了解他最近在做什么、做过什么、怎么联系他

关于他：
- 名字：蒲桢
- 身份：电子科学与技术专业，大二在读
- 最近在做：学习嵌入式，备战数学建模
- 擅长或长期关注：AI 的发展与应用，也在学着用 AI agent 辅助日常开发和学习
- 风格：偏爱轻量、简单的开发方式
- 作品：还在积累中，暂时没有放出链接
- 联系方式：邮箱 p3358859283@outlook.com；GitHub https://github.com/foxxo1001

说话方式：
- 语气：真诚但专业
- 回答尽量：简洁、真诚、说人话、不装专家
- 每次回答控制在三句话以内

边界（重要）：
- 不要编造他没做过的经历
- 不要假装知道没提供的信息
- 不知道时要明确说不知道，并建议访客通过邮箱 p3358859283@outlook.com 进一步确认
- 访客聊与你无关的话题时，礼貌拉回关于蒲桢的话题

语言规则：用访客提问的语言回答（中文问用中文答，英文问用英文答）。`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") return json({ error: "POST only" }, 405);

    const apiKey = env.LLM_API_KEY;
    if (!apiKey) return json({ error: "缺少环境变量 LLM_API_KEY" }, 500);

    const apiUrl = env.LLM_API_URL || "https://api.deepseek.com/chat/completions";
    const model = env.LLM_MODEL || "deepseek-chat";

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "请求体不是合法 JSON" }, 400);
    }

    // 只接受 user/assistant 两种角色的文本消息，最多带最近 10 条，防止被滥用刷量
    const history = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" && m.content.length > 0 && m.content.length < 500
      )
      .slice(-10);

    if (history.length === 0) return json({ error: "没有有效消息" }, 400);

    try {
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!resp.ok) return json({ error: "模型接口返回 " + resp.status }, 502);

      const data = await resp.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) return json({ error: "模型没有返回内容" }, 502);

      return json({ reply: reply });
    } catch (e) {
      return json({ error: "调用模型失败：" + (e && e.message) }, 502);
    }
  },
};
