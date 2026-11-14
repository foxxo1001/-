# 蒲桢 · 个人主页

单文件手写的个人主页——无框架、无构建，CSS 与 JS 均为手写。

**线上地址**：<https://foxxo1001.github.io/-/>

## ✨ 特性

- **单文件手写** — 全部内容（HTML + CSS + JS）都在 `index.html` 一个文件里，不依赖任何框架与构建工具
- **数字分身** — 访客可直接与我的数字分身对话：Cloudflare Worker 代理云端大模型，API 密钥只存于 Cloudflare、不进前端；网络不可达时自动降级为页面内置的本地知识库，离线也能答
- **手绘 SVG 插画** — 作品区四幅内联示意插画（FIG.01 循迹小车 / FIG.02 气象站 / FIG.03 Agent 流水线 / FIG.04 数模手册），无外部图片依赖，悬停恢复彩色
- **中英双语** — 全站文案一键切换，逐条双语维护
- **移动端适配** — 手机端完整布局与交互
- **站点日志** — 基于 git 真实里程碑的更新时间线

## 📁 结构

```text
index.html             # 页面全部内容（HTML + CSS + JS 单文件）
cloudflare/worker.js   # 数字分身的 Cloudflare Worker（LLM 代理 + 人设 system prompt）
cloudflare/部署指南.md  # 分身上云分步教程（约 10 分钟）
wrangler.toml          # Worker 部署配置（名称、入口、模型变量）
```

## 🚀 部署

- **网页**：`git push` 即自动部署到 GitHub Pages（约 1–2 分钟生效）
- **分身**：配置 `LLM_API_KEY` secret 后执行 `npx wrangler deploy`，详见 [cloudflare/部署指南.md](cloudflare/部署指南.md)

## 🔗 相关仓库

- 数模真题复盘（数学建模 · 四川省一等奖）：<https://gitee.com/foxxo/question-c>
- 八路红外循迹小车（STM32 开源项目）：<https://atomgit.com/PZ1888/xunji_demo_1>
- GitHub 主页：<https://github.com/foxxo1001>

## 📌 动态

- **2026-11** 数学建模获四川省一等奖；作品配图升级为手绘插画，新增站点日志，分身知识库扩充
- **2026-10** 首个开源作品「八路红外循迹小车」上站；工具栈、档案六维度等板块扩充
- **2026-08** 站点上线：单文件 V1.2 基线，数字分身接入云端模型，完成移动端适配
