
### 目录结构

    / 根目录
    |__ config webpack 配置
    |__ dist 编译后目录
    |__ dll webpack dll
    |__ public 静态文件
    |   |__ static 静态资源所在目录
    |__ script 初始化配置
    |__ src 源码
    |   |__ app 业务代码
    |   |   |__ components 组件
    |   |   |__ containers 页面容器
    |   |   |__ i18n 语言包
    |   |   |__ router 路由
    |   |   |__ service 服务层
    |   |   |__ store 状态层
    |   |   |__ utils 常用代码
    |   |__ assets 静态资源
    |   |__ types 全局类型
    |   |__ index.tsx 入口
    |__ package.json 依赖
    |__ project.config.js 项目基本配置
    |__ tsconfig.json ts 配置
    |__ tslint.json tslint 配置

### 安装依赖

    npm i

### 编译

    npm run dll // webpack dll 第一次发布环境需要先运行该命令

    npm run build:dev // 测试环境

    npm run build:prod // 正式环境

### 开发

    npm run start


### 其他

    jest安装失败，若是canvas依赖没有安装成功可以执行以下命令：

    brew install pkg-config cairo pango libpng jpeg giflib librsvg
