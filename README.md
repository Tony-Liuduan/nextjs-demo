# nextjs try try

## 数据流调研

> <https://mp.weixin.qq.com/s/g5ZjQt9F1UUryisEW1csSA>

### 需求

* 合理的分层， UI / 逻辑分离
* 复杂项目 Store 的粒度细化很重要
* 拒绝模版代码，提升开发效率
* 面向未来&兼容旧代码 -- 支持 hook & class
* 更好的 ts 支持

### redux

* 大量的模版代码
* 过于灵活的 Redux 调用（网状调用）
* TS 支持改造成本大

### mobx

#### 优点

✅ 少量/无 模版代码
✅ 面向未来&兼容旧代码 -- 支持 hook & class
✅ 很方便地对业务进行分层，很方便地设计领域模型
✅ TS 支持 0 成本
✅ 天然支持多态 Store ，去中心化更方便
✅ 需要显示 DI， 解决了网状调用的问题

#### 缺点

* 状态可以随意被修改 -- 解决方案：开启严格模式限制，且只可在 Store 中修改，不可在视图组件修改
* 不支持 hook （mobx-react-lite 已支持）
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

TODO:

* <https://juejin.cn/post/6844903990396715022>
* <https://juejin.cn/post/6998057947070726158>
* <https://juejin.cn/post/6844903562095362056>
