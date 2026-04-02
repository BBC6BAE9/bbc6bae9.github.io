---
title: "A2UI-SwiftUI：在 Apple 全平台原生渲染 AI Agent UI"
description: "一个将 Google A2UI 协议原生渲染为 SwiftUI 组件的开源 SDK，支持 iOS、macOS、visionOS 等全平台。"
date: "2026-03-25"
lang: "zh-CN"
draft: false
---

## 痛点：AI Agent 的 UI 怎么展示？

随着 LLM 和 AI Agent 的爆发，越来越多的应用开始集成 Agent 能力。但随之而来的是一个令人头疼的问题：**Agent 动态生成的 UI 界面，客户端该如何渲染？**

常见的妥协方案是 **WebView + HTML**，这种方式虽然跨平台，但体验往往令人抓狂：
- ❌ 丢失了流畅的原生滚动手势
- ❌ 无法完美适配 iOS 的暗黑模式 (Dark Mode) 和动态字体
- ❌ 严重的性能损耗与内存占用
- ❌ 难以和宿主 App 的原生组件（如 MapKit、Swift Charts）深度联动

Google 为解决服务端驱动 UI (SDUI) 的问题提出了 [A2UI 协议](https://github.com/google/A2UI)（Agent to UI），通过一份声明式的 JSON 来描述 UI 结构。然而，Apple 生态一直缺少一个好用、原生的 A2UI 渲染实现。

这便是我开发 [A2UI-SwiftUI](https://github.com/BBC6BAE9/a2ui-swiftui) 的初衷。

## 🎉 A2UI-SwiftUI：真正的 Apple 原生渲染

**A2UI-SwiftUI** 是一个开源的 SwiftUI 原生渲染器，专为解析和渲染 A2UI 协议设计。**没有 WebView，没有跨端桥接，只有 100% 纯正的 SwiftUI 原生组件。**

目前，该项目已**被收录在 Google A2UI 的[官方生态页面](https://a2ui.org/ecosystem/renderers/)**中！

### 核心亮点

🌟 **全平台制霸**  
一套代码，完美适配 **iOS 17+、macOS 14+、visionOS 1+、watchOS 10+ 和 tvOS 17+**。你的 Agent 不仅能跑在手机上，还能直接在 Apple Vision Pro 中以原生 3D 形态展示空间交互！

⚡️ **丝滑的性能与原生体验**  
当 Agent 让你渲染一个输入框时，SDK 调用的正是 `SwiftUI.TextField`；遇到时间选择时，弹出的就是原生的 `DatePicker`。这意味着：
- 零 WebView 启动开销
- 完美支持 Accessibility（无障碍）、Dynamic Type（动态字体）与 Dark Mode
- 无缝衔接苹果全家桶的设计语言

🔄 **基于 `@Observable` 的属性级双向绑定**  
采用最新的 Observation 框架编写，实现高效的局部刷新。用户在 TextField 里输入的内容、滑动 Slider 的数值变化，都会通过底层的状态模型实时双向绑定，Agent 可以随时获取最新状态。

📡 **流式渲染 (Streaming)**  
不再需要等待大段 JSON 全部生成完毕。支持 JSONL 流式下发，**Agent 吐出多少，界面就顺滑地渲染出多少**，极大地降低用户的首屏等待焦虑。

🧩 **轻松扩展自定义组件**  
项目内置了从 `Text`、`Button` 到 `Tabs`、`Modal` 的 **18 个标准协议组件**。如果觉得不够用？你可以轻松注入自己的组件，比如原生的图表或地图：

```swift
A2UISurfaceView(viewModel: vm)
    // 注册宿主 App 里的自定义组件
    .environment(\.a2uiCustomComponentRenderer) { typeName, props, viewModel in
        if typeName == "MySwiftChart" {
            AnyView(MyChartView(props: props))
        } else {
            nil
        }
    }
```

## 💻 如何接入？极简 API 设计

SDK 提供了兼顾 v0.8 与最新 v0.9 版本的 API。这里是官方推荐的 v0.9 接入方式，三行核心代码搞定：

```swift
import A2UISwiftUI

// 1. 初始化 ViewModel 
@State var vm = SurfaceViewModel(catalog: basicCatalog)

// 2. 传入 Agent 返回的流式消息
try vm.processMessages(messages)

// 3. 在视图树中直接渲染
A2UISurfaceView(viewModel: vm) { action in
    print("用户触发了动作：\(action.name)")
}
```

## 🚀 立即体验 Demo！

如果你对这套方案感兴趣，强烈建议把项目 clone 下来跑一下！
项目中内置了 `samples/travel_app` 等完整的示例应用，包含了实时 Agent 连接、UI 实战以及自定义组件的深度用例，在 Xcode 里一键 Run 即可感受原生渲染的魅力。

## 💡 开源寄语 & 期待你的 Star

这个项目目前完全开源 (MIT 协议)，也是开源社区补齐 Apple 平台 AI Agent 原生 UI 拼图的一份努力。

如果你近期正在：
- 尝试在 iOS/macOS 客户端里接入大模型 Agent
- 寻找稳定的 Server-Driven UI (服务端驱动 UI) 方案
- 开发 visionOS 上的原生 AI 应用

不妨来试试 **[A2UI-SwiftUI](https://github.com/BBC6BAE9/a2ui-swiftui)**！

✨ **如果它对你有启发，或者你觉得项目有潜力，非常期待你能顺手去 GitHub 点个 ⭐️ Star 支持一下！** 你的 Star 是开源作者持续维护的最大动力！

> 🔗 **GitHub 地址**: [https://github.com/BBC6BAE9/a2ui-swiftui](https://github.com/BBC6BAE9/a2ui-swiftui)
> 欢迎提 Issue 讨论、提交 PR 或者是将它用在你的下个 AI 项目中！
