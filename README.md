# SoButy+ 可点击落地页

这是根据设计图制作的纯静态网站，不需要安装或编译。双击 `index.html` 即可打开，也可以直接发布到任意静态网站托管平台。

## 本地预览

```bash
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 上线前需要替换

请在 `script.js` 中把 WhatsApp 客服和会员加入按钮的占位逻辑替换为真实链接。目前 Instagram 已连接到 `@sobutyplus`，Facebook 使用平台首页占位。

## 最简单的上线方法

1. 打开 Netlify Drop：`https://app.netlify.com/drop`
2. 解压本压缩包。
3. 把整个 `sobuty-site` 文件夹拖进页面。
4. 等待上传完成，即可获得可公开访问的网址。
