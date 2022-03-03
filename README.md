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
- [ALPHA Twitter Frontend Web](#alpha-twitter-frontend-web)
  - [小組成員](#小組成員)
    - [前端](#前端)
    - [後端](#後端)
  - [目錄](#目錄)
  - [專案畫面預覽](#專案畫面預覽)
  - [專案使用技術](#專案使用技術)
  - [專案使用說明](#專案使用說明)
  - [疑難排除](#疑難排除)
    - [EBUSY：resource busy or locked](#ebusyresource-busy-or-locked)
  - [專案目錄結構說明](#專案目錄結構說明)

---

## 專案畫面預覽

![使用者登入頁](./covers/01.png)
![使用者註冊頁](./covers/02.png)
![前台首頁](./covers/03.png)
![使用者推文資訊](./covers/04.png)
![使用者推文與回覆資訊](./covers/05.png)
![使用者喜歡的內容資訊](./covers/06.png)
![使用者追隨者資訊](./covers/07.png)
![使用者正在追隨資訊](./covers/08.png)
![使用者設定頁](./covers/09.png)
![發推Modal](./covers/10.png)
![回推Modal](./covers/11.png)
![使用者Profile設定Modal](./covers/12.png)
![管理員登入頁](./covers/21.png)
![後台推文列表](./covers/22.png)
![後台使用者列表](./covers/23.png)

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

1. 使用git下載專案
```
git clone https://github.com/yuanliif/AC-twitter.git
```

2. 下載完畢後，進到專案根目錄，操作以下指令安裝所需的套件

```
npm install
```

3. 安裝完畢後，增加或修改`./src/configs/`目錄下的設定，將後綴為`-sample`的檔案複製到該目錄底下，並寫刪除後綴的`-sample`後，對複製後的檔案的內容進行修改
* 以`api.js-sample`為例，複製並更名為`api.js`，對裡面的`API_URL`的數值進行修改，調整前端網頁要接到的後端API服務的位址
4. 完成設定後，在專案根目錄執行下述指令，跑起供開發使用的網頁服務
```
npm run serve
```
5. 成功跑起來的網頁服務，會有類似下面的畫面，使用`Local`或者`Network`的網址資訊在瀏覽器中開啟
![成功畫面](./covers/31.png)
7. 開發完成後，在專案根目錄使用下述指令，來將程式碼輸出成Production環境使用的版本
```
npm run build
```
6. 專案部屬到Github Page請參考：[[Vue] 將Vue專案部署至Github Pages](https://dean34520.medium.com/vue%E7%B3%BB%E5%88%97%E6%96%87-%E5%B0%87vue%E6%AA%94%E6%A1%88%E9%83%A8%E7%BD%B2%E8%87%B3github-334951cadede)
7. 另外，還可以使用下述指令來對程式碼進行程式碼風格檢查
```
npm run lint
```

## 疑難排除

### EBUSY：resource busy or locked
![EBUSY](./covers/32.png)

安裝過程中遇到這問題的話，Command Line Interface（CLI）界面會有上圖的資訊，這時候可以嘗試以下幾種方法來排除問題：

* 完整移除專案根目錄底下的`node_modules`資料夾
* 執行`npm cache clean --force`來清除暫存檔案
* 關掉正在開啟的編輯器
* 重開電腦

操作完畢後，從 [專案使用說明](#專案使用說明) 的步驟二再次重新開始繼續安裝操作


## 專案目錄結構說明

```
./src               - 程式碼根目錄
./src/views         - 網頁頁面主體
./src/componenets   - 網頁元件
./src/router        - Vue Router設定
./src/store         - Vuex設定
./src/apis          - 與後端溝通的API
./src/utils         - 共用Function
./src/configs       - 專案設定檔
./src/assets        - 靜態檔案根目錄
./src/assets/icons  - SVG檔案
./src/assets/images - 圖檔
```