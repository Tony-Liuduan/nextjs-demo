# nextjs try try

## 数据流调研

> 为什么要用 mobx <https://mp.weixin.qq.com/s/g5ZjQt9F1UUryisEW1csSA>
> redux vs mobx <https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09>
> redux vs mobx <https://juejin.cn/post/6844903562095362056>
> <https://juejin.cn/post/6844903990396715022>
> <https://juejin.cn/post/6998057947070726158>

### 需求

* 合理的分层， UI / 逻辑分离
* 复杂项目 Store 的粒度细化很重要
* 拒绝模版代码，提升开发效率
* 面向未来&兼容旧代码 -- 支持 hook & class
* 更好的 ts 支持

### redux

#### redux-特点

1. redux 提倡编写函数式代码，纯函数，接受输入，然后输出结果
2. 单一store，将所有共享的应用数据集中在一个大的store中
3. 以JavaScript原生对象形式存储数据
4. redux 状态对象是不可变的（Immutable）
5. store注入：```<Provider store={store}>...根组件</Provider>```，注入Props：connect(mapStateToProps)()

#### redux-优点

* 数据结构不可变 prue 纯的，数据历史可追溯
* 数据修改规范化，只能通过 action 修改，可维护性强 maintainable，由于整个纯函数事物和函数式编程范式，Redux 更易于维护，使用 Redux 可以更好地控制事情
* debugger 调试更好

#### redux-缺点

* 大量的模版代码 action、reducer
* 异步处理需要 redux-thunk 第三包支持，mobx 无需额外配置
* 过于灵活的 Redux 调用（网状调用）
* TS 支持改造成本大

### mobx

#### mobx-特点

1. 面向对象编程（OOP）和响应式编程（Reactive Programming），一旦状态对象变更，就能自动获得更新
2. 多 store，通常按模块将应用状态划分，在多个独立的store中管理
3. 存储数据使用可观察对象（数组不是数组是可观察对象）
4. mobx 状态对象可变，可以直接使用新值更新状态对象值
5. store 注入：```<Provider {...stores}>...父组件</Provider>```，子组件注入Props：@inject， hooks 使用 useContext 即可

#### mobx-优点

✅ 少量/无 模版代码
✅ 面向未来&兼容旧代码 -- 支持 hook & class
✅ 很方便地对业务进行分层，很方便地设计领域模型
✅ TS 支持 0 成本
✅ 天然支持多态 Store ，去中心化更方便
✅ 需要显示 DI， 解决了网状调用的问题

#### mobx-缺点

* 状态可以随意被修改，不纯
  * 解决方案：开启严格模式限制 `useStrict(true)`，且只可在 Store 中修改，不可在视图组件修改
* 不支持 hook （mobx-react-lite 已支持）
  * useStaticRendering replace enableStaticRendering
* 使用 mobx 创建的可观察对象会在内存中使用 listener 来监听对象的变化，但实际上在服务端是没有必要监听变化的，将有可能造成内存泄漏
  * 解决方案：使用 `useStaticRendering(isServer)` 方法，当该文件在服务端执行时，让 mobx 创建静态的普通js对象即可
* mobx 5 需要放弃ie，低版本ios 安卓
* mobx 4 对数组、新增删除属性的处理不友好，需要使用mobx api 支持
  * isObservableArray(observable) <https://cn.mobx.js.org/best/pitfalls.html>
  * extendObservable(target, props)
* autorun 要记得清理

### 数据设计

1. store 分层
    * root
    * page
    * module（compnent上一层）
2. 通用逻辑单独设计 store，领域模型设计

## nextjs use mobx

> <https://juejin.cn/post/6844904165630541837>

* getStaticProps （静态生成）：在构建时获取数据。
* getStaticPaths （静态生成）：指定 动态路由 以根据数据进行预渲染。
* getServerSideProps （服务器端渲染）：在每个请求上获取数据。
* getInitialProps （服务器端渲染）：在每个请求上获取数据。

只要 getServerSideProps 和 getInitialProps 的页面都不会构建成静态文件

getServerSideProps 更为被推荐  <https://www.webpro.nl/articles/migrate-from-getinitialprops-to-getserversideprops-in-nextjs>

### 使用原则

1. 涉及到公司产品和其他信息需要被更多人知道的页面的接口和数据尽可能放到服务端渲染 （getServerSideProps,getInitialProps）
2. 不涉及以上信息的尽可能放到浏览器端做，减少node的压力，提高交互体验
