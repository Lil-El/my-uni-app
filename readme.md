# Project Build

## 依赖

1. 插件市场：vView-ui，uni-table（选择：`使用HBuilderX导出插件`）
2. npm：js-md5

### vView-ui

- 项目中的组件大都使用`uView`提供的，`http`相关也是调用的`uView`的。
- 如果uView组件无法满足开发，可以进行二次封装，**勿修改uView源码**。

## 组件须知

- `node_modules`: package.json下载
- `uni-modules`: 插件市场下载的组件
- `components`: developer封装的组件

## SCSS须知

- 根据设计稿，可以在`uni.scss`修改uView自带的css变量
- `/uni.scss`: 1. 引入其他scss文件 2. css变量
- `/static/style/common.scss`: 公共样式