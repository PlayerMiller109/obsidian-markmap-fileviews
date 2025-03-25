Ob 的工作方式：以阅读模式打开时，不是在切换时才渲染编辑模式，而是与阅读模式同时。
如何得出这个判断：阅读模式的 `ctx` 有 `promises[0]`；编辑模式相反。

此时编辑模式的 div 状态为 `display: none`
→ 初始化 markmap 时容器不可见
→ 容器的 width/height 被计算为 0，坐标计算为 NaN

When opened in reading mode, the editing mode is rendered simultaneously with the reading mode, rather than when switching to.
How to arrive at this judgment: In reading mode, the `ctx` has `promises[0]`; vice versa.

At this time, the state of the editing mode div is `display: none`.
→ The container is invisible when initializing the markmap.
→ The width/height of the container is calculated as 0, and the coordinates are calculated as NaN.

初步已解决：不再报错。
Preliminarily solved: Do not call `mm.fit()` for the editing mode when you open in reading mode. No longer reports an error.

进一步方案：找到切换模式的检测。
Further solution: Find the detection for mode switching.

- 目前 Ob 没有提供直接的方法实现。no direct method currently
- 急用可以考虑定时器监测。can use a timer for monitoring if urgent
- 我倾向于等待寻找更合适的方法。I tend to wait and look for a more suitable method.
