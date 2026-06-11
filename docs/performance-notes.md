# 效能優化備忘（Performance Notes）

最後更新：2026-06-12

這份文件記錄 injoy.taipei 已做過的效能優化、目前的瓶頸，以及未來若要再優化的選項與風險，方便日後接手。

---

## 目前狀態（PageSpeed Insights，行動版）

> PSI 行動版使用「Moto G Power + Slow 4G + 4× CPU」的**實驗室模擬**，是刻意的最壞網路條件。桌機與一般網路下的真實體感好很多（桌機 LCP ≈ 1.0s）。

| 指標 | 數值 | 備註 |
|---|---|---|
| Performance | 55 | 卡在 LCP/FCP（見下方「真正瓶頸」）|
| Accessibility / Best Practices / SEO | 96 / 96 / 100 | |
| FCP | ~12.1s | 實驗室模擬值 |
| LCP | ~13.6s | 實驗室模擬值 |
| TBT / CLS | 0ms / 0 | 滿分 |
| 真實使用者資料（CrUX） | No Data | 流量還不夠，尚無真實用戶分佈 |

---

## 已完成的優化

| 項目 | 成果 |
|---|---|
| 子集化 Iansui 標題字型（`scripts/subset-fonts.sh`） | 4.9MB → 250KB woff2 |
| 子集化 GenSenRounded 內文字型（同上腳本；2026-06-12） | 15MB otf → 152KB woff2，`font-display` 改 `swap`，行動裝置也能顯示圓體；部署產物 22MB → 7.2MB |
| 下載酬載 | ~7MB → ~615KB |
| Google Fonts 改非阻擋載入（`index.html` + `scripts/prerender.mjs` 後處理） | Render-blocking 11s → ~1s |
| 人文空間圖片 `sizes` 修正 | 桌機抓取 93KB → 23KB |
| 結果：行動版 LCP | 37.4s → 13.6s（−64%） |

相關檔案：
- `scripts/subset-fonts.sh`：字型子集化流程（從 build 後的 HTML 取字集）。原始字型放在 `fonts-source/`（不部署）。
- `src/index.css`：`@font-face`（Iansui 指向子集 woff2；GenSenRounded 為 `font-display: optional`）。
- `index.html`：Google Fonts 以 `preload` + `media="print" onload` 非阻擋載入。
- `scripts/prerender.mjs`：預渲染後會把字型 link 重新設回 `media="print"`（否則瀏覽器 onload 會把它烤回 `media="all"` 變阻擋）。
- `scripts/check-assets.mjs`：build 時若有 HTML 引用到不存在的資產就讓建置失敗（防止破圖上線）。

---

## 真正的瓶頸（重要）

把 render-blocking 從 11s 砍到 1s 後，**FCP/LCP 完全沒動（仍 ~12/13.6s）**。這證明 FCP/LCP **不是被字型或 CSS 卡住**，而是被 SPA 的 JS 重畫卡住：

- `src/main.tsx` 用 `createRoot(...).render(<App/>)`，載入時會**把預渲染好的 HTML 整個清掉、再用 JS 重畫一次**。
- 因此第一次有意義的繪製要等 JS 下載 + 解析 + 執行完（模擬慢手機上 ≈ 12s）。
- 預渲染（`scripts/prerender.mjs`）目前只對 **SEO（子頁可被收錄）** 有幫助，對「畫面出現時間」沒幫助。

PSI network 關鍵鏈佐證：`/fonts/GenSenRounded2TW-R.otf` 仍在關鍵鏈、佔 ~2,002ms（但 `font-display: optional`，弱網實際下載 0 bytes）。

---

## 未來優化選項（依槓桿排序）

### 1. 改用 `hydrateRoot`（最大槓桿、風險較高）
讓瀏覽器**直接用預渲染的 HTML 繪製**，React 再「接管（hydrate）」而非清掉重畫。

- **預期**：FCP/LCP 有機會從 ~12s → ~2s，分數真正往上動。
- **風險**：目前的預渲染是用 Playwright 擷取「**effect 執行後**」的 DOM，client 端初次 render（effect 前）可能與之**不一致 → hydration mismatch**（畫面閃動或錯位）。
- **動工前必查**：是否有 scroll-reveal / IntersectionObserver 之類「初始 opacity:0、JS 後才顯示」的動畫；若有，需改成 SSR 友善寫法或在 hydration 後才套用。
- 牽涉檔案：`src/main.tsx`（`createRoot`→`hydrateRoot`）、可能需調整 `scripts/prerender.mjs` 的擷取時機。

### 2. ~~移除或瘦身 GenSenRounded~~（✅ 已完成，2026-06-12）
採選項 B：用 `scripts/subset-fonts.sh` 子集成 `public/fonts/GenSenRounded-subset.woff2`（152KB），原始 otf 移到 `fonts-source/`（不部署）。`font-display` 改為 `swap`，圓體在行動裝置也能顯示。

另外腳本的字集來源除了預渲染 HTML，現在也掃 `dist/assets/*.js` 中的 CJK 字元——popover／dialog 等條件渲染的文字（如「電話預約」）不會出現在預渲染 HTML，但字串常數在 JS bundle 裡。新增文字後重跑 `npm run build` + 本腳本即可。

### 3. 減少 JS bundle / 第三方
- PSI 另列：Reduce unused JavaScript（~116KB）、Google Tag Manager（~155KB transfer / 96ms 主執行緒）。
- 可評估是否延後載入 GTM、或精簡未使用的相依。

### 4. 觀察真實用戶數據後再決定
- CrUX 目前 No Data。等流量累積後，看 Search Console「核心體驗」或 PSI 上方的真實用戶區塊。
- **若真實用戶 LCP 大多 < 2.5s**，則 PSI 的實驗室 55 分不必急著處理（投入 1 的風險不划算）。

---

## 量測注意事項（踩過的雷）

- **不要只用本機 lab 量測下結論**：本機 Playwright 曾量到 ~4s，但 PSI 模擬量到 37s，差很多。以 **PageSpeed Insights（pagespeed.web.dev）** 的數字為準。
- 本機若要比較，務必**模擬真實環境**（gzip 壓縮 + 節流），否則未壓縮資產會嚴重失真。
- 任何建置/部署類改動，**部署後用 PSI 複驗**，不要只看本機。
