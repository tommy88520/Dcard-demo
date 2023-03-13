## **Using 📦**


1. Clone Template

```
git clone https://github.com/tommy88520/issue-frontend
```

2. Install Packages

```
yarn install
```

3. Start Project

```
yarn dev
```

## **Options ✍️**

你也可以clone Release 分支，local有支援 gsap scroll smooth 使用者體驗更佳(此功能若要deploy致線上環境需要付費)


## **架構**

主要專案架構：
1. routes：為各子路由或model頁面的進入點，處理一些頁面初始化的部分，裡面再放入各路由相關的組件。
2. store： 為管理各全域state、接 api action的地方，以使用zustand為主。
3. components：子components以及其scss統一管理的地方。
4. utils： 管理animation 或 全域可用function

登入頁面即是主頁，須登入過後才能進行各項操作，頁面主要分為三個頁面：

1. 登入頁面，請先登入並授權github帳號進行登入。
2. repo頁面：可選擇github專案當案的各個repo來進行操作。
3. issue頁面：可管理各repo中的issue，包含篩選status、date order、search、issue的crud，issue detail編輯頁面可支援撰寫markdown語法。