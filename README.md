
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

### TODO

    - 添加 stylelint 
        
        stylelint 支持 stylus https://github.com/ota-meshi/stylelint-plugin-stylus


### 测试相关

https://www.cnblogs.com/lihuijuan/p/12957896.html
https://www.cnblogs.com/susu8/p/9512393.html

断言：

    expect({a:1}).toBe({a:1})//判断两个对象是否相等
    expect(1).not.toBe(2)//判断不等
    expect(n).toBeNull(); //判断是否为null
    expect(n).toBeUndefined(); //判断是否为undefined
    expect(n).toBeDefined(); //判断结果与toBeUndefined相反
    expect(n).toBeTruthy(); //判断结果为true
    expect(n).toBeFalsy(); //判断结果为false
    expect(value).toBeGreaterThan(3); //大于3
    expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
    expect(value).toBeLessThan(5); //小于5
    expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
    expect(value).toBeCloseTo(0.3); // 浮点数判断相等
    expect('Christoph').toMatch(/stop/); //正则表达式判断
    expect(['one','two']).toContain('one'); //匹配数组

    function compileAndroidCode() {
    throw new ConfigError('you are using the wrong JDK');
    }

    test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
    }）


覆盖率：
    % Stmts是语句覆盖率（statement coverage）：是否每个语句都执行了

    % Branch分支覆盖率（branch coverage）：是否每个分支代码块都执行了（if, ||, ? : ）

    % Funcs函数覆盖率（function coverage）：是否每个函数都调用了

    % Lines行覆盖率（line coverage）：是否每一行都执行了


### 提交规范
    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动

### React 规范

    1、调用组件大驼峰
    2、公用组件放置在components内
    3、公用数据调用走redux，私有数据调用直接在页面或组件内使用
    4、http接口统一放置在services，并对应写type
    5、链上接口统一放在data

### css 规范

    1、组件或私有页面能用 css module 就用
    2、公用的 css、img 统一放置在 assets

