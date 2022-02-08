---
title: vue应用，从创建到部署到github pages
date: 2022/02/06
tags:
 - Vue
 - github-pages
 - 部署
categories:
 - frontend
---

::: tip 参考资料
- [如何将 Vue 应用部署到 GitHub Pages](https://docs.leoku.top/blog/deploy-vue-app-to-github-pages.html)
- [持续集成：使用 GitHub Actions 来帮你的应用自动化部署到 GitHub Pages](https://docs.leoku.top/blog/ci-cd-with-github-actions-to-deploy-on-github-pages.html)
- [手摸手使用GitHub Pages + GitHub Actions自动化部署项目/博客](https://www.wuxunjie.org/Q&A/deploy.html#%E5%89%8D%E7%BD%AE%E5%86%85%E5%AE%B9)
:::


## 用vue官方提供的脚手架vue-cli来完成项目创建
   1. 用npm或者yarn全局安装vue-cli
        ```npm i -g @vue-cli```
   2. 创建项目
        ``` 
        //基于命令行
        vue creage ProjectName
        //或基于可视化面板
        vue ui
        ````

   3. 可以通过修改项目根目录中的配置文件`vue.config.js`来让项目实现自动刷新
        ```
            module.exports = {
                devServer: {
                //修改端口
                port: 8080,
                //自动打开
                open: true
                }
            }
    ```

   4.打开`package.json`文件查看可用命令
        ```
        {
            "scripts": {
                    "serve": "vue-cli-service serve",
                    "build": "vue-cli-service build"
                }
        }
        ```
    现在可以输入`npm run serve`命令，启动项目。

## 开发阶段（略过）
## 部署准备阶段
    首先要明白[./dist](./../../../back-end/deploy/how-webpack-work.md)文件夹的由来

   - 3.1 在github创建新仓库
    ![new repo](/img/create-repo.jpg)
   - 3.2 按实际情况选初始化仓库，我通常用的都是第二个，push本地已有数据到仓库
    ![push repo](/img/push-to-repo.jpg)

   - 3.3 创建好以后，到settings/tokens，生成新token
    ![new token](/img/new-token.jpg)

   - 3.4 勾选repo，授予对仓库的[完全访问权限](https://docs.github.com/cn/developers/apps/building-oauth-apps/scopes-for-oauth-apps)
    ![scope](/img/select-scope.jpg)

    - 3.4 创建完毕后复制密匙，回到仓库的settings/secrets/action界面，添加密匙
    ![add secret](/img/add-secret.jpg)
    
    - 3.5 点击菜单的pages，新建`gh-pages`拿来放`./dist`
    ![new branches](/img/gh-pages.jpg)

3. 配置github action
   - 4.1 点action，[创建工作流程](https://docs.github.com/cn/actions/using-workflows/workflow-syntax-for-github-actions)，对照工作流程的存放位置，在本地创建`.yml`文件
    ![workflow](/img/workflow-path.jpg)

    复制以下代码，修改最后一项`GITHUB_TOKEN`名称
    ```
    # workflow 的名称，如果省略则默认为当前 workflow 的文件名
    name: deployment

    on:
    # 每当 push 到 main 分支时触发部署
    push:
        branches: 
        - main

    jobs:
    docs:
        runs-on: ubuntu-latest # 使用最新的 Ubuntu 系统作为编译部署的环境

        steps:
        - name: Checkout codes
        uses: actions/checkout@v2.3.4

        # 设置 node.js 运行环境
        - name: Setup node
        uses: actions/setup-node@v2.1.2
        with:
            node-version: '14'

        # 设置缓存依赖，加快下次安装依赖的速度
        - name: Cache node modules
        uses: actions/cache@v2.1.3
        with:
            path: '**/node_modules'
            key: ${{ runner.os }}-node-${{ hashFiles('**/yarn.lock') }}

        # 安装依赖
        - name: Install dependencies
        run: yarn install

        # 构建文件
        - name: Generate files
        run: yarn build

        # 将构建后的文件推送到 gh-pages
        - name: Push to gh-pages     
        uses: crazy-max/ghaction-github-pages@v2
        with:
            # 部署到 gh-pages 分支
            target_branch: gh-pages
            # 部署目录
            build_dir: ./dist
        env:
            #填写刚才的token名
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    ```
## 用git push进行部署
    可以在action里查看日志，部署地址既可以在deploy下找到
    ![查看日志](/img/deploy.jpg)

    也可以在仓库首页的右侧的`Environments`找到。
    ![部署地址](/img/gh-page-path.jpg)



   