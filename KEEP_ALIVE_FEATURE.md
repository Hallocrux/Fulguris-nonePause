# 后台保活功能 / Keep Alive Background Feature

## 功能说明 / Feature Description

这个功能允许 Fulguris 浏览器在后台保持网页的"在线"状态，防止网页检测到你离开了浏览器。

This feature allows Fulguris browser to keep web pages "online" in the background, preventing pages from detecting when you leave the browser.

## 使用场景 / Use Cases

- 需要在网页上保持在线状态（如聊天应用、在线会议等）
- 防止网页因检测到不可见而暂停功能
- Keep online status on web pages (chat apps, online meetings, etc.)
- Prevent pages from pausing functionality when detected as invisible

## 如何使用 / How to Use

1. 打开 Fulguris 设置 / Open Fulguris Settings
2. 进入"常规"设置 / Go to "General" settings
3. 在"高级"部分找到"Keep pages alive in background"选项
4. 启用该选项 / Enable the option
5. 当你离开浏览器时，它会在后台继续运行 / When you leave the browser, it will continue running in background

## 技术实现 / Technical Implementation

### 1. 前台服务 / Foreground Service
- 当应用进入后台时启动前台服务
- 显示持续通知，告知用户浏览器正在后台运行
- Starts foreground service when app goes to background
- Shows persistent notification informing user browser is running in background

### 2. WebView 生命周期管理 / WebView Lifecycle Management
- 阻止 WebView 的 `onPause()` 调用
- 保持 WebView 活跃状态
- Prevents WebView `onPause()` calls
- Keeps WebView active

### 3. JavaScript 注入 / JavaScript Injection
- 覆盖 Page Visibility API
- 使 `document.hidden` 始终返回 `false`
- 使 `document.visibilityState` 始终返回 `'visible'`
- 拦截 `visibilitychange` 事件
- Overrides Page Visibility API
- Makes `document.hidden` always return `false`
- Makes `document.visibilityState` always return `'visible'`
- Intercepts `visibilitychange` events

## 文件修改清单 / Modified Files

### 新增文件 / New Files
1. `app/src/main/java/fulguris/service/BackgroundBrowserService.kt` - 前台服务
2. `app/src/main/js/KeepPageVisible.js` - JavaScript 注入脚本
3. `app/src/main/java/fulguris/js/KeepPageVisible.kt` - JavaScript 接口

### 修改文件 / Modified Files
1. `app/src/main/java/fulguris/settings/preferences/UserPreferences.kt` - 添加设置选项
2. `app/src/main/java/fulguris/view/WebPageTab.kt` - 修改生命周期
3. `app/src/main/java/fulguris/view/WebPageClient.kt` - 注入 JavaScript
4. `app/src/main/java/fulguris/activity/WebBrowserActivity.kt` - 服务管理
5. `app/src/main/java/fulguris/di/EntryPoint.kt` - 依赖注入
6. `app/src/main/AndroidManifest.xml` - 注册服务和权限
7. `app/src/main/res/values/strings.xml` - 添加字符串资源
8. `app/src/main/res/xml/preference_general.xml` - 添加设置界面
9. `app/src/styx/res/values/donottranslate.xml` - 添加设置键

## 注意事项 / Notes

1. 此功能会增加电池消耗 / This feature will increase battery consumption
2. 系统可能仍会在内存不足时终止应用 / System may still kill app when memory is low
3. 需要 Android 8.0+ 的前台服务权限 / Requires foreground service permission on Android 8.0+
4. 某些网站可能使用其他方法检测在线状态 / Some websites may use other methods to detect online status

## 权限要求 / Required Permissions

- `FOREGROUND_SERVICE` - 运行前台服务
- `FOREGROUND_SERVICE_SPECIAL_USE` - Android 14+ 特殊用途前台服务
- `POST_NOTIFICATIONS` - Android 13+ 显示通知

## 构建要求 / Build Requirements

- Mezzanine 插件已配置用于 JavaScript 注入
- Mezzanine plugin configured for JavaScript injection
