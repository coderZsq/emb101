# ESP32-S3 无痛入门课程实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 EMB101 重做为面向编程基础学习者、电子硬件零基础的免焊 ESP32-S3 逐步实操课程。

**Architecture:** 保留 Vite 单页课程应用和本地进度存储。将课程数据重组为短课和有检查点的操作步骤；课程 UI 按步骤展示内容、接线图、预期结果和排错指引。课程只针对预焊排针的 ESP32-S3-DevKitC-1 N8R8，外接 LED 固定使用 GPIO4。

**Tech Stack:** 原生 JavaScript ES modules、Vite、HTML 字符串课程内容、CSS、Arduino IDE 2 教学代码片段。

**Spec:** `docs/superpowers/specs/2026-11-02-esp32-s3-painless-course-design.md`

## Global Constraints

- 课程面向有编程基础、但从未使用开发板、面包板或杜邦线的学习者。
- 开发板：Espressif ESP32-S3-DevKitC-1，目标模块为 ESP32-S3-WROOM-1-N8R8；购买时必须确认两排排针已焊接，开箱可直接插接。
- LED 实验固定使用 GPIO4，不依赖板载 RGB LED。
- 所有硬件实验均使用 USB 供电；课程不引入电池、焊接、外接 5 V 或市电。
- 浏览器模拟仅用于理解概念；页面清楚标明模拟不会连接或控制开发板。
- 改线前拔 USB，GPIO 使用 3.3 V 逻辑，LED 必须串联电阻，不把 GPIO 直接连到电源或 GND。
- 每个关键操作均有可见检查点和失败时的下一步检查方式。

---

## File Structure

- Modify `js/lessons.js`: 将旧 Nano ESP32 内容替换为 8 节 ESP32-S3 课程；定义课次、器材、操作步骤、检查点、排错、代码和小测数据。
- Modify `js/main.js`: 渲染新的逐步课程数据，加入步骤前进/后退、检查点、课程顺序导航和错误答案指导；保留本地进度。
- Modify `css/style.css`: 为分步操作、核对结果、警示、板子标注和接线图增加移动端可读样式。
- Modify `README.md`: 更新目标板型、器材、运行方式和模拟边界。
- Modify `docs/plan.md`: 替换旧 Nano ESP32 课程范围，保持项目计划与新设计一致。
- Modify `index.html`: 更新页面标题和课程副标题。
- Create `docs/superpowers/specs/2026-11-02-esp32-s3-painless-course-design.md`: 已批准的课程设计依据。

## Task 1: Replace course content and define step data

**Files:**
- Modify: `js/lessons.js`

**Produces:** `lessons` 数组，每课包含稳定 `id`、编号、标题、目标、器材、概念说明、`steps` 和 `quiz`。每个操作步骤包含 `title`、HTML `body`、`checkpoint`、`troubleshooting` 和可选 `power` 状态；示例代码放在对应步骤中。

- [x] 将课程替换为：00 器材准备、01 认识开发板、02 Mac 上传首个程序、03 面包板和杜邦线、04 GPIO4 控制 LED、05 按钮输入、06 按钮控制 LED、07 本地 Wi-Fi 浏览器控制。
- [x] 每课只引入一个主要新硬件概念；课程文案以动作编号、单一操作和明确预期结果表达。
- [x] 在 00 课列出已焊排针 ESP32-S3-DevKitC-1 N8R8、适合该板 USB-to-UART 口的数据线、400 孔无焊面包板、至少 4 根公对母杜邦线、红色 LED、330 Ω 电阻和轻触按钮。
- [x] 开发板放在面包板旁边，使用母头接预焊针脚、公头插入面包板。
- [x] 在 LED 步骤中使用 GPIO4、330 Ω 串联电阻、LED 和 GND；LED 用第 10/12 行，按钮用第 20/22 行，分别说明每个器件所在孔位和连接路径。
- [x] 在按钮步骤中使用 GPIO 与 GND 的输入上拉连接，解释按下时的逻辑状态。
- [x] 为 Wi-Fi 课提供本地网络连接、打开控制页面、控制 GPIO4 LED 的完整代码和逐项排错路径。
- [x] 为每课准备一个基于该课真实要点的小测；错误选项配具体解释，并指向应回看的步骤。

## Task 2: Build a calm step-by-step lesson experience

**Files:**
- Modify: `js/main.js`

**Consumes:** Task 1 的 `lessons` 数据结构。

**Produces:** 页面按课显示器材与目标；按单个步骤显示操作、接线图、检查点和排错；提供上一步/下一步；导航显示课程进度和完成状态。

- [x] 调整 `render()`，在课程正文、小测和页脚之间展示当前步骤面板。
- [x] 每课初次打开时从第一步开始；上一步/下一步只改变步骤，不改变课程或清空已完成进度。
- [x] 提供“我看到了”或等价的检查点交互；未查看检查点也允许继续，避免把小测做成阻塞。
- [x] 将每步 `power` 状态显示成接线前/接线中/上电后的清楚提示；所有需要插拔元件的步骤明确提示先拔 USB。
- [x] 保留当前 `localStorage` 的完成记录；新课 ID 与旧课 ID 不同时，丢弃无效旧 ID，不破坏应用初始化。
- [x] 错答时显示该题的具体解释和课程内步骤链接；答对后仍允许复习内容。
- [x] 更新 `mount()` 的实验内容，只保留板子识别、面包板连通性、LED 输出、按钮输入等支撑新课程的模拟，并始终显示“模拟，不连接真实硬件”。

## Task 3: Add unambiguous board and wiring visuals

**Files:**
- Modify: `js/lessons.js`
- Modify: `js/main.js`
- Modify: `css/style.css`

**Consumes:** Task 1 的固定 ESP32-S3-DevKitC-1 N8R8、GPIO4 和实物步骤。

**Produces:** 课程内标注一致的板子方向图、面包板孔位图、LED 串联图和跨中央沟按钮图。

- [x] 更新板子示意图，固定 USB-to-UART 端朝上，标出 USB、BOOT、RESET、GPIO4、3V3、GND；明确这是本课程指定板型的示意图。
- [x] 绘制面包板 2.54 mm 孔组示意，标明每组相通孔、中央沟隔离关系和示例行号；开发板放在板旁，LED 使用 10/12 行、按钮使用 20/22 行。
- [x] 绘制 GPIO4 → 330 Ω 电阻 → LED → GND 的单一路径，图与步骤使用完全相同的行号和极性。
- [x] 绘制轻触按钮跨中央沟接线图；提示不同按钮内部脚位须按商品资料或断电通断测量确认。
- [x] 为图示加入文字替代说明、横向溢出处理和小屏可读字号。
- [x] 在所有图示附近加上模拟/实物标签和相关断电提醒。

## Task 4: Align project documentation and remove stale course assumptions

**Files:**
- Modify: `README.md`
- Modify: `docs/plan.md`
- Modify: `index.html`

- [x] 更新 README 的课程目标、材料清单、USB 数据线要求、Mac 软件说明和本地模拟边界。
- [x] 把项目计划更新为本规格的 ESP32-S3 零硬件经验人群与 8 课路线。
- [x] 更新浏览器标签页标题和页面副标题，移除旧的泛用课程名称。
- [x] 清除 Nano ESP32、D2/D3 作为课程统一引脚、建议学习者自行焊排针等旧指导。
- [x] 保留不与新课程冲突的项目技术说明与运行命令。

## Task 5: Content and consistency review

**Files:**
- Review: `js/lessons.js`
- Review: `js/main.js`
- Review: `css/style.css`
- Review: `README.md`
- Review: `docs/plan.md`

- [x] 对照规格逐课核对固定板型、GPIO4、USB-to-UART 接口、器材规格、先断电要求和课程顺序。
- [x] 检查每个实物步骤是否说明起点、动作、预期结果和下一步排错；删掉要求新手自行推断的说法。
- [x] 检查页面的导航、步骤控件、重置进度、小测提示和窄屏接线图文案是否互相一致。
- [x] 检查没有把模拟描述成控制实物，没有引入焊接、电池、5 V 外接供电或公网部署。

## Self-review

- 规格里的学习者画像、固定硬件、8 课路线、教学原则、进度体验、课程边界和交付范围分别对应 Tasks 1–5。
- 逐步导航的数据契约由 Task 1 明确，并由 Task 2 消费。
- 接线图由 Task 3 跟随课程文本一起改，确保 GPIO4、行号和操作步骤一致。
- 没有安排新增自动化测试；本次按用户授权重做课程内容，最终以课程文案与交互一致性审阅作为收尾。
