# ALPHA Twitter Frontend Web
ALPHA CAMP 學期三最後小組專案 - Simple Twitter - 的前端網頁。
專案採前後分離的模式開發，小組成員有五人，其中三人負責前端，兩人負責後端。

**後端Github Repository網址：** [Simple Twitter API](https://github.com/martinchiu/twitter-api-2020)

## 小組成員

### 前端
* [Tsuki](https://github.com/erase2004)
* [Tony](https://github.com/yuanliif)
* [Alison](https://github.com/AlisonLeng)

### 後端
* [鰻魚燒](https://github.com/HUANG-SIH-MAN)
* [Martin](https://github.com/martinchiu)
---

## 目錄
----------------

- [專案畫面預覽](#專案畫面預覽)
- [專案使用技術](#專案使用技術)
- [專案使用說明](#專案使用說明)
---

## 專案畫面預覽

_預覽畫面準備中_

---

## 專案使用技術

- [JavScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Vue.js](https://vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [npm](https://www.npmjs.com/)
- [SASS/SCSS](https://sass-lang.com/)
- [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
---

## 專案使用說明

* 使用git下載專案後，進到專案根目錄，操作以下指令安裝所需的套件

```
npm install
```

* 安裝完畢後，增加或修改`./src/configs/`目錄下的設定，將後綴為`-sample`的檔案複製到該目錄底下，並寫刪除後綴的`-sample`後，對複製後的檔案的內容進行修改
* 以`api.js-sample`為例，複製並更名為`api.js`，對裡面的`API_URL`的數值進行修改，調整前端網頁要接到的後端API服務的位址
* 完成設定後，在專案跟目錄下述指令，跑起供開發使用的網頁服務
```
npm run serve
```
* 開發完成後，在專案根目錄使用下述指令，來將程式碼輸出成Production環境使用的版本
```
npm run build
```
* 專案部屬到Github Page請參考：[[Vue] 將Vue專案部署至Github Pages](https://dean34520.medium.com/vue%E7%B3%BB%E5%88%97%E6%96%87-%E5%B0%87vue%E6%AA%94%E6%A1%88%E9%83%A8%E7%BD%B2%E8%87%B3github-334951cadede)
* 另外，還可以使用下述指令來對程式碼進行程式碼風格檢查
```
npm run lint
```
