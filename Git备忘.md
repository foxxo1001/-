# Git 使用备忘（只记四招，够用）

在「个人主页」文件夹里打开终端（或用 Git Bash），以下命令都在这个目录执行。

## 1. 存档（每做完一小步就存一次）
```
git add -A
git commit -m "一句话说明这次改了什么"
```

## 2. 看 changed 了什么（还没存档的改动）
```
git diff
```
按 `q` 退出查看。

## 3. 改坏了，恢复到上次存档
```
git restore index.html
```

## 4. 查看历史存档列表
```
git log --oneline
```

## 回到某次旧存档（慎用，先问 AI 再操作）
```
git log --oneline        # 先找到那次的编号，如 a1b2c3d
git restore --source a1b2c3d index.html
```

> 注：`backups/` 文件夹已被忽略，不会进 git。
> 存档节奏建议：改完一个能打开看的效果就 commit 一次，别攒大包。
