# CDP Portal Html5

## 项目概述

1. 此项目为 CDP Portal 移动端版本。
2. 前端核心框架为 [React][1] + [Flux][2] + [ES6][3]，编译工具为 [Webpack][4]。学习框架请参照链接指向的官方或参考网站。
3. 项目起始架构时间为 2015/10/04，距今半年以上历史。鉴于前端技术的更新速度，项目架构在今天看起来已经相当古老。由于外包的时间、精力等限制，未根据时代变化作不断的重构或优化。恳请继任同胞再接再厉。

### 项目启动

安装依赖：

```
npm install
bower install
```

开发模式运行：

```
npm start
```

打包：

```
npm run build
```

注：Windows 环境下，需修改 `package.json` 中的相关命令为 `SET BABEL_ENV=production && webpack`

### 代码缺陷

#### 依赖的外部库已经过时

主要体现在：

* Babel 为 5.x 版本，官方已升级至 6.x，两者配置区别较大。但对项目本身无甚影响，不建议升级。
* Webpack 配置文件未遵循最佳实践，开发版本与发布版本未作区分与公共部分抽提。但对项目本身无甚影响，有兴趣可修改、优化。
* React 为 0.13.x 版本，官方已升级至 0.15.x。如欲升级，会导致较大改动，请参考官方升级指南：

    > https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html
    > https://facebook.github.io/react/blog/2016/04/07/react-v15.html
    
* [React Router][5] 版本为 1.0.x，官方已升级为 2.0.x，改动非常大。请参考链接中 1.0.x 的 API。
    
#### Flux 框架的不成熟

基于 React 单向数据流的实现有：

- Flux（官方）
- Reflux
- [Redux][6]：目前业内最成熟，社区最丰富，推荐使用

当然，尽管有代码利用效率低的问题，官方的 Store - Container 模式目前依然可用。

## 如何写一个 React 组件

### 组件概述

React 中，所有页面上的单位都被称之为组件。按照[开发原则][7]，组件要尽量细化，从最小单位开始，逐级往上，小组件拼装成大组件。直至 Flux 中的 Container（页面级别）。

### 组件位置

- 组件代码放在 `src/components` 文件夹下
- 每个组件一个文件夹
- 每个组件包含一个 `.jsx` 文件，和一个 `.less` 文件

### 举例

#### 1. 简单的纯渲染组件

[Icon 组件][8]

```javascript
// 样式
import './icon.less';

// 必须引用 React 和 Component，所有的组件都继承自 Component
import React, { Component } from 'react';

// 定义一个 Icon Coponent
export default class Icon extends Component {

  // 每个组件都必须提供 render 方法，返回 jsx 代码（类似于模板），用以生成 HTML
  render() {
    // 渲染所需的属性自上层传递
    const { name, button, className, type } = this.props;

    // 返回的 jsx
    return (
      <i className={
        (type ? 'icon-' + type + ' icon-'  : 'fa fa-')
          + name
          + (button ? ' icon-button' : '')
          + (className ? ' ' +  className : '')
      }>{this.props.children}</i>
    );
  }
}
```

此处用了 ES6 class 的定义方式（推荐）。这部分的语法详见：http://facebook.github.io/react/docs/reusable-components.html#es6-classes

#### 2. 带 API 的组件

[PageOpener][9]

```javascript
// 省略了外部引用部分

export default class PageOpener extends Component {

  constructor(props) {
    super(props);
    
    // React 方法中调用的 this 并非组件实例本身，需要手动绑定
    this.close = this.close.bind(this);
  }

  // render 方法照常进行
  render() {
    const { className = '' } = this.props;

    return (
      <div className={`page-opener ${className}`}>
        <i className='icon-icomoon icon-cdp-close page-closer' onTouchTap={this.close}></i>
        {this.props.children}
      </div>
    );
  }

  // API 直接写在下面即可
  open(e) {
    const pX = e.clientX / window.innerWidth * 100 + '%',
          pY = e.clientY / window.innerHeight * 100 + '%',
          to = pX + ' ' + pY,
          
          // 0.13 版本中，React 中获取 DOM 元素的方法
          // 后期 React 与 ReactDOM 分为两个组件
          // 详情请见：https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#two-packages-react-and-react-dom
          page = React.findDOMNode(this);

    page.style.transformOrigin = to;
    page.style.webkitTransformOrigin = to;

    page.classList.add('opened');
  }

  // 此 API 不通过 jsx 调用，可以略过 bind 一步
  close() {
    React.findDOMNode(this).classList.remove('opened');
  }
}
```

#### 3. 带声明周期的组件

React 组件从加载、更新到销毁，存在好几个生命周期相关的 API。

最常用的有：`componentDidMount` - 加载后执行；`componentWillUnmount` - 销毁前执行。这两个 API 经常分别用来做初始化和清理工作。

详见：http://facebook.github.io/react/docs/component-specs.html

[PullLoader][10]

```javascript
export default class PullLoader extends Component {

  componentDidMount() {
    // 组件加载后，绑定 DOM 事件
    window.addEventListener('scroll', load, false);
  }

  componentWillUnmount() {
    // 组件销毁后，解绑 DOM 事件，不然会占用更多内存
    window.removeEventListener('scroll', load, false);
  }

  // 渲染方法照旧
  render() {
    const { status, className = '' } = this.props;

    return (
      <div className={className}>
        {this.props.children}

        <div className={'pull-loader ' + status}>
          {
            (status === 'loaded')
              ? getLang('PULL_TO_LOAD')
              : (status === 'loading')
                ? <i className='fa fa-spinner fa-pulse' />
                : <span><i className='fa fa-meh-o' /> {getLang('NO_MORE_DATA')}</span>
          }
        </div>
      </div>
    );
  }
}
```

### 组件开发的原则

> 一个组件做一件事情，或是几个组件的拼装，不要把逻辑不相关的内容强行写入一个组件

## 如何写一个 Flux 结构的页面

### 什么是 Container

- 它也是一个 React 组件
- 它控制一整个页面（或一个完整的页面结构）
- 是子组件的拼装集合
- 从 Store 里收集数据，成为自身的 state，再把数据作为 props 传到子组件
- 没有 props，也没有 UI 逻辑

```javascript
// 引用 React
import React, { Component } from 'react';
// 引用官方 Flux utils
// https://facebook.github.io/flux/docs/flux-utils.html#content
import { Container } from 'flux/utils';

// 引用组件
import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

// 注入相关的 Store
import LeaveStore from '../../stores/LeaveStore';

// 注入相关的 Data utils
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

// Container 同样继承 React.Component
class LeaveListContainer extends Component {

  // 必须有这个方法，指明数据从哪几个 Store 获取
  static getStores() {
    return [LeaveStore];
  }

  // 必须有这个方法，指明如何从 Store 收集数据
  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);

    // 获取初始化的数据，基本都是从 Data utils 里获取
    LeaveDataUtils.getApproveRecord(this.props.routeParams.id);
  }

  render() {
  
    // 从 state 里获取渲染 UI 时需要的数据
    const {
      leaveRecord = [],
      status = 'loading'
    }  = this.state;

    // 正常渲染
    return (
      <div>
        <Header goBack title={getLang('LEAVE_SUMMARY')} />

        <Loader className='side-gap'
                status={status}>
          <RecordList recordList={leaveRecord} />
        </Loader>
      </div>
    );
  }
}

// 记住最后调用 Container.create 方法
export default Container.create(LeaveListContainer);
```

以上就是整套项目的前端结构。敬请查收。

  [1]: http://facebook.github.io/react/index.html
  [2]: https://facebook.github.io/flux/
  [3]: http://es6.ruanyifeng.com/
  [4]: https://webpack.github.io/
  [5]: https://github.com/reactjs/react-router/tree/1.0.x/docs
  [6]: http://redux.js.org/
  [7]: https://facebook.github.io/react/docs/thinking-in-react.html
  [8]: https://github.com/ashnorseman/CDPCloudHtml5/blob/master/src/components/Icon/Icon.jsx
  [9]: https://github.com/ashnorseman/CDPCloudHtml5/blob/master/src/components/PageOpener/PageOpener.jsx
  [10]: https://github.com/ashnorseman/CDPCloudHtml5/blob/master/src/components/PullLoader/PullLoader.jsx
