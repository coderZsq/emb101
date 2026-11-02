const step = (title, body, checkpoint, troubleshooting, power = '先断开 USB') => ({ title, body, checkpoint, troubleshooting, power });
const quiz = (question, options, answer, feedback, lessonId, reviewStep = 0) => ({ question, options, answer, feedback, lessonId, reviewStep });

export const lessons = [
  {
    id: 's3-start', number: '00', tag: '准备器材', title: '先准备一套不用焊接的器材',
    intro: '从零开始没关系。先把课程要用的东西认全，确认买到的板子开箱就能插接。',
    goal: '核对一套可直接动手的器材，不需要焊台、焊锡或电池。',
    materials: ['ESP32-S3-DevKitC-1，ESP32-S3-WROOM-1-N8R8，排针已焊好', 'Micro-USB（Micro-B）数据线，连接板上的 USB-to-UART 口', '400 孔、2.54 mm 无焊面包板，至少 4 根公对母杜邦线', '普通红色直插 LED、330Ω 电阻、适合面包板的四脚轻触按钮'],
    body: `<p>本课程只按一种板子讲解：<strong>Espressif ESP32-S3-DevKitC-1 N8R8</strong>。同名芯片的迷你板、带屏幕板或不同开发板，排针位置可能不同，接线图不能直接照搬。</p><div class="note"><b>这门课不需要焊接</b><br>购买时确认两排排针已经焊在开发板上。若商品图显示只有一块裸板或单独附送排针，那就不是本课程的免焊版本。</div>`,
    steps: [
      step('核对开发板型号', `<p>查看商品标题和开发板金属屏蔽罩上的字样，寻找 <code>ESP32-S3-DevKitC-1</code> 与 <code>ESP32-S3-WROOM-1-N8R8</code>。本课不使用同名芯片的迷你板、带屏幕板或其他开发板。</p>`, '商品与板上型号都对应 ESP32-S3-DevKitC-1；两排金属针脚已经焊在板子上。', '型号不清楚或排针没有焊好，先不要下单/通电；把商品信息与课程清单对照。'),
      step('核对数据线和电脑接口', `<p>本课程用板上的 <b>USB-to-UART</b> 接口上传程序；此接口是 Micro-USB（Micro-B）。线材必须支持数据，只有充电功能的线无法上传。若 Mac 没有对应接口，准备 USB-C 转 Micro-USB 数据线或数据转接头。</p>`, '你有一条能接入 Mac 的 Micro-USB 数据线，并确认它支持数据传输。', '不确定线材时，之后可用手机/其他设备的数据传输验证；“能充电”不代表“能传数据”。'),
      step('把小元件分清楚', `<p>LED 是有方向的小灯；330Ω 电阻没有方向；四脚按钮按下时才接通。杜邦线选择<strong>母头接开发板已焊好的公针，公头插入面包板</strong>。面包板本身不用电，也不用焊。</p><div class="note warn"><b>本阶段的安全规则</b><br>凡是移动或插拔元件，先拔掉 USB。GPIO 只能使用 3.3V 逻辑，LED 必须串联电阻。</div>`, '桌面上有课程清单里的器材；暂时不需要把任何东西插在一起。', '少了某一项就先补齐；不用用裸线、硬币、电池或其他物品替代。')
    ],
    quiz: quiz('哪一种开发板符合本课程的免焊要求？', ['ESP32-S3-DevKitC-1，排针已焊好', '只有芯片模块和散装排针', '任意一块名字带 ESP32 的小板'], 0, ['对。已焊排针的 DevKitC-1 可以直接插接。', '这还需要焊接，不符合免焊要求。', '不同板子的孔位和引脚不同，课程接线图不能通用。'], 's3-start', 0)
  },
  {
    id: 's3-board', number: '01', tag: '认识开发板', title: '先认方向，再找引脚',
    intro: '先把板子方向固定下来。之后每张接线图都会按同一个方向画，不需要猜左右。',
    goal: '能在课程指定的板子上找到 USB、BOOT、RESET、GPIO4、GPIO5、3V3 和 GND。',
    materials: ['ESP32-S3-DevKitC-1 N8R8'], viz: 'board',
    body: `<p>把开发板正面朝上、金属屏蔽罩朝向自己。课程照片和示意图都让 <b>USB 接口朝上</b>。开发板上的数字引脚就是 GPIO；<code>GND</code> 是电路回路的共同地。</p><figure class="official-board-image"><img src="https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32s3/_images/ESP32-S3-DevKitC-1_v2-annotated-photo.png" alt="Espressif ESP32-S3-DevKitC-1 正面标注图，显示 USB 接口、BOOT、RESET、GPIO 与 GND 引脚" loading="lazy"><figcaption>Espressif 官方开发板标注图。实物按板上丝印找针脚。</figcaption></figure><div class="note">板子不同批次的板载 RGB 灯引脚可能不同，所以我们不用板载灯做实验，改用标记清楚的 GPIO4 和外接 LED。</div>`,
    steps: [
      step('摆好开发板', `<p>把开发板正面朝上放在桌面，USB-to-UART 接口朝上。以后拿起板子时，先摆回这个方向，再按板上的白色字样找针脚。</p>`, 'USB-to-UART 接口在上边；金属屏蔽罩和引脚标记能看见。', '若图上的左右和你手中的板子相反，检查是否把板子翻到背面或转了 180 度。'),
      step('找出连接电脑的接口', `<p>靠近顶部的 Micro-USB 接口中，选择标有 <b>USB-to-UART</b> 的那个。课程用它给板子供电、上传程序和查看串口文字。另一个 USB 接口这阶段先不使用。</p>`, '能在板子丝印或标注图上找到 USB-to-UART。', '如果两个接口看起来相似，先看板子旁的文字；本课始终使用 USB-to-UART。'),
      step('找到课程会用的针脚', `<p>沿着两侧针脚看白色标记：找到 <code>GPIO4</code>、<code>GPIO5</code>、<code>3V3</code> 和 <code>G</code>/<code>GND</code>。不要只凭某个针脚的行数猜名称。</p>`, '能指出 GPIO4、GPIO5 和至少一个 GND 标记。', '如果标记被看不清的照片遮住，先查课程标注图；不要给未确认的针脚接线。')
    ],
    quiz: quiz('接 LED 的时候，应该怎样确定使用哪个针脚？', ['读开发板上的 GPIO 标记', '数它离 USB 口有几个孔', '照抄其他 ESP32 板子的图'], 0, ['对。以这块指定板子的丝印和课程标注图为准。', '针脚位置会随板型变化，不能靠数孔猜。', '不同开发板引脚排列可能不同。'], 's3-board', 2)
  },
  {
    id: 's3-setup', number: '02', tag: '连接电脑', title: '上传第一个程序',
    intro: '先只做电脑和开发板之间的事。接线实验稍后再开始。',
    goal: '在 Mac 上编译并上传程序，在串口监视器里看到一行文字。',
    materials: ['Mac', 'ESP32-S3-DevKitC-1', 'Micro-USB 数据线'],
    body: `<p>我们用 Arduino IDE 2 写 C++ 程序。第一次只打印文字，不接 LED 和按钮，这样上传遇到问题时更容易定位。</p><p><a href="https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html" target="_blank" rel="noreferrer">Espressif Arduino-ESP32 安装说明</a>提供了官方稳定版开发板索引。中国网络下载慢时，可以使用官方文档列出的国内镜像地址。</p>`,
    steps: [
      step('安装 Arduino IDE 2', `<p>从 <a href="https://www.arduino.cc/en/software" target="_blank" rel="noreferrer">Arduino 官方软件下载页</a>下载 macOS 版本，按提示完成安装并打开 IDE。</p>`, 'Arduino IDE 2 能打开，菜单栏可见。', '若 macOS 阻止首次打开，按系统提示确认你从 Arduino 官方网站下载的应用。'),
      step('添加 ESP32 开发板支持', `<ol><li>打开 Arduino IDE 设置（Settings/偏好设置）里的“开发板管理器网址”（Additional Boards Manager URLs）。</li><li>添加 Espressif 官方稳定索引：<code>https://espressif.github.io/arduino-esp32/package_esp32_index.json</code>。</li><li>若下载很慢，可使用官方文档提供的中国镜像：<code>https://jihulab.com/esp-mirror/espressif/arduino-esp32/-/raw/gh-pages/package_esp32_index_cn.json</code>；使用该镜像时，在版本列表里选择名称以 <code>-cn</code> 结尾的版本。</li><li>在开发板管理器搜索 <b>esp32</b>，安装 Espressif Systems 发布的包，然后重启 IDE。</li></ol>`, '开发板管理器显示 Espressif 的 esp32 平台已安装。', '下载失败时先检查索引网址是否完整；中国网络环境下可改用上方官方镜像并选择 -cn 版本，等待安装完成后重启 IDE。'),
      step('连接板子并选板型', `<p>使用数据线把 <b>USB-to-UART</b> 口连到 Mac。打开“选择开发板和端口”，选择 <code>ESP32S3 Dev Module</code>，再选择新出现的串口。</p><p>若列表里有多个端口，先拔掉板子看哪个消失，再插回去选择它。不要选择另一个不随板子插拔变化的端口。</p>`, '板子供电指示灯亮起，IDE 显示选中的 ESP32-S3 板型和一个串口。', '没有端口时，换一条确认支持数据的线并重新连接 USB-to-UART；不要换到另一侧 USB 口。', '连接 USB-to-UART 并上电'),
      step('上传并看到文字', `<pre><code>void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("Hello, ESP32-S3!");
}

void loop() {
}</code></pre><p>点击“上传”。完成后打开串口监视器，把波特率设为 <code>115200</code>。若卡在连接阶段，按住板上的 <b>BOOT</b>，直到 IDE 开始上传再松开。</p>`, '串口监视器出现 <code>Hello, ESP32-S3!</code>。', '编译错误时检查代码括号是否完整；上传超时时按住 BOOT 重试；串口空白时确认波特率为 115200，并确认选的是 USB-to-UART 对应的端口。', '开发板保持 USB 连接'),
    ],
    quiz: quiz('串口监视器里出现乱码，先检查什么？', ['串口监视器波特率是否为 115200', '把 GPIO4 接到 3V3', '拆下开发板的排针'], 0, ['对。串口两端的波特率需要一致。', '这与串口文字无关，而且不应随意接线。', '上传和串口通信不需要拆排针。'], 's3-setup', 3)
  },
  {
    id: 's3-breadboard', number: '03', tag: '认识接线', title: '面包板和杜邦线怎么连接？',
    intro: '面包板内部有金属片，把特定孔位连在一起。先学会判断哪些孔相通，再做任何带电实验。',
    goal: '能看懂同一行的连接组、中央沟，并知道杜邦线两端插在哪里。',
    materials: ['开发板', '400 孔无焊面包板', '公对母杜邦线'], viz: 'breadboard',
    body: `<p>先断开 USB，把开发板放在一旁。本课只观察面包板孔位，不连接电源。</p><div class="breadboard-diagram" role="img" aria-label="面包板同一行 A 到 E 相通，F 到 J 相通，中央沟隔开两边，不同行之间断开"><div>列　 A  B  C  D  E　│沟│　F  G  H  I  J</div><div>20　 ●──●──●──●──●　│ │　●──●──●──●──●</div><div>21　 ●──●──●──●──●　│ │　●──●──●──●──●</div></div>`,
    steps: [
      step('看一行里的五个孔', `<p>面包板中间区域的同一数字行，左边 <b>A–E</b> 五孔内部相通；右边 <b>F–J</b> 五孔内部相通。第 20 行和第 21 行不相通。</p>`, '能说出 A20 与 E20 相通；A20 与 A21 不相通。', '先对照板上的字母和数字标记。不要把不同数字行当成同一组。', '此练习不接电'),
      step('看中央沟', `<p>中间的沟把左右两组隔开：<b>E20 不会和 F20 相通</b>。四脚按钮会跨在这条沟上，让按钮的两组接点分居左右两边。</p>`, '能说出 E20 和 F20 不相通。', '若你的面包板布局与图明显不同，先查该型号说明；本课只按常见 2.54 mm 无焊面包板讲解。', '此练习不接电'),
      step('把板子和面包板摆在一起', `<p>面包板数字行朝上、中央沟竖直。开发板正面朝上放在它旁边，USB-to-UART 接口朝上。开发板不需要插进面包板；针脚用杜邦线接到指定孔位。</p>`, '开发板和面包板并排摆放，两个方向都和图一致。', '方向不一致就先旋转其中一块，USB-to-UART 和数字行标记都能看清。', '此练习不接电'),
      step('练习拿取杜邦线', `<p>拿一根公对母杜邦线。母头是带金属孔的一端，轻轻套到开发板已经焊好的公针上；公头是露出金属针的一端，插进面包板孔。插拔时捏住塑料套，不要拉扯线身。</p>`, '母头能套在板子公针上，公头能插进面包板孔。', '不要用力压弯针脚；若孔位或线头明显不匹配，先核对买到的是公对母线。', '此练习不接电')
    ],
    quiz: quiz('A20 和 E20 在常见面包板上是什么关系？', ['内部相通', '被中央沟隔开', '和 A21 相通'], 0, ['对。它们在同一行的左侧五孔组里。', '中央沟位于 E 与 F 之间。', '相邻数字行彼此不相通。'], 's3-breadboard', 1)
  },
  {
    id: 's3-led', number: '04', tag: '第一个输出', title: '用 GPIO4 点亮一颗 LED',
    intro: '把程序的输出接到外部 LED。接线按图一步一步完成，先断电，最后再接 USB。',
    goal: '搭出 GPIO4 → 电阻 → LED → GND 的串联回路，并让 LED 按程序亮起。',
    materials: ['开发板', '400 孔面包板', '公对母杜邦线', '红色直插 LED', '330Ω 电阻'], viz: 'led',
    body: `<p>LED 有方向，长脚通常是正极。330Ω 电阻限制电流，必须和 LED 串联。开发板放在面包板旁边，本课统一使用第 10 和第 12 行。</p><div class="breadboard-diagram" role="img" aria-label="GPIO4通过公对母线到A10，电阻连接E10与E12，LED长脚插A12，短脚插F12，GND通过另一根线连接J12"><div>GPIO4 ─公对母线─ A10　 E10 ─[330Ω]─ E12</div><div>　　　　　　　　　　　　　　　 LED 长脚 (+) → A12</div><div>　　　　　　　　　　　　　　　 中 央 沟</div><div>GND ─公对母线─ J12　　　 LED 短脚 (−) → F12</div></div>`,
    steps: [
      step('先拔掉 USB，认清 LED 方向', `<p>开发板先不接 USB，放在面包板旁边，USB-to-UART 朝上。找到 LED 的长脚（正极）和短脚（负极）；若两脚一样长，查看 LED 外壳平边，或按器件说明确认。</p>`, 'USB 已拔掉；你能分辨 LED 两脚方向；开发板放在面包板旁。', '不要根据颜色猜正负极。若无法辨认 LED，引导到元件说明或先更换标识清楚的直插 LED。'),
      step('接 GPIO4 和电阻', `<p>在开发板左侧找到 <code>GPIO4</code> 针脚。把一根公对母杜邦线的母头套在 GPIO4 上，公头插入面包板 <b>A10</b>。把电阻一脚插入 <b>E10</b>，另一脚插入 <b>E12</b>。电阻没有方向，两脚必须在不同行。</p>`, 'GPIO4 通过一根线连到 A10；电阻连接 E10 和 E12。', '确认线的母头接开发板 GPIO4、公头进 A10；A10 与 E10 是同一行，电阻两脚不在同一组孔里。'),
      step('接 LED 和 GND', `<p>把 LED 长脚插进 <b>A12</b>，短脚跨过中央沟插进 <b>F12</b>。再把第二根公对母杜邦线的母头套在开发板任意一个 <code>GND</code> 针脚上，公头插入 <b>J12</b>。</p><p>现在路径应为：GPIO4 → A10/E10 → 电阻 → E12/A12 → LED → F12/J12 → GND。</p>`, 'A12 和 E12 在同组；F12 和 J12 在同组；长脚在左、短脚在右。', '如果 LED 两脚在同一侧，会被同一组孔短接；若两脚位置反了，灯可能不亮。改线前始终断开 USB。'),
      step('上传点亮程序', `<pre><code>const int ledPin = 4;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
}

void loop() {
}</code></pre><p>先逐项核对 GPIO4、串联电阻、LED 方向和 GND，再连接 USB 并上传程序。</p>`, '红色 LED 稳定点亮。', '不亮时先拔 USB，依次检查 GPIO4 是否认对、LED 方向、电阻是否串联、GND 路径和代码引脚号。不要省略电阻。', '核对完成后再接 USB')
    ],
    quiz: quiz('LED 电路中为什么要串联 330Ω 电阻？', ['限制流过 LED 的电流', '让面包板的孔相通', '把 GPIO 电压变成 Wi-Fi'], 0, ['对。电阻帮助限制电流，保护 LED 和 GPIO。', '孔位连通由面包板里的金属片决定。', '电阻不会让 GPIO 产生 Wi-Fi。'], 's3-led', 2)
  },
  {
    id: 's3-button', number: '05', tag: '第一个输入', title: '接上按钮，读取按下状态',
    intro: '按钮把 GPIO 和 GND 接通或断开。程序读取的是电平状态，不是“按钮事件”。',
    goal: '用 GPIO5 和 INPUT_PULLUP 读取按钮，并通过串口查看松开/按下状态。',
    materials: ['已完成的开发板与面包板', '四脚轻触按钮', '公对母杜邦线'], viz: 'button',
    body: `<p>此课沿用同一块面包板。四脚轻触按钮跨过中央沟；同一侧的两脚通常内部相通，按下时左右两侧才接通。不同按钮脚位可能不同，请先确认它属于适合面包板的四脚按钮。</p><div class="note warn"><b>先拔 USB 再改线。</b><br>按钮接在 GPIO5 与 GND 之间，不要接到 3V3 或 5V。</div>`,
    steps: [
      step('断电并把按钮跨过中央沟', `<p>拔掉 USB。将按钮跨着中央沟放置，让按钮两组脚分居面包板左右两侧。不要勉强把不合适的脚距压进孔里。</p>`, '按钮能平稳插入，左右两组脚分在沟的两边。', '如果脚距不匹配，停止并换成适合 2.54 mm 面包板的四脚按钮；不需要掰脚。'),
      step('确认按钮的两组脚', `<p>查按钮商品资料，确认同一侧的两脚是一组，另一侧是另一组；按下时两组接通。也可在断电状态下用万用表通断档验证：松开时两侧不通，按下时两侧导通。</p>`, '确认“松开断开、按下接通”。', '若松开时四脚之间一直导通，按钮可能插错方向或该按钮布局不同；重新看资料，不要继续猜。'),
      step('连接 GPIO5 与 GND', `<p>把一根公对母杜邦线的母头套在开发板 <code>GPIO5</code> 针脚上，公头插进按钮左侧一组的 <b>A20</b>。把第二根线的母头套在另一个 <code>GND</code> 针脚上，公头插进按钮右侧一组的 <b>J20</b>。按钮跨过中央沟，四只脚落在第 20 和第 22 行。</p><div class="breadboard-diagram" role="img" aria-label="GPIO5公对母线连按钮左侧第20行，按钮跨中央沟，右侧第20行用公对母线连GND"><div>GPIO5 ─线─ A20　 E20 ─┐  ┌─ F20 ─ J20 ─线─ GND</div><div>　　　　　　　　　　　│按钮│</div><div>　　　　　　　 E22 ─┘  └─ F22</div></div><p>不要把线接到按钮同一侧的两只脚上，否则按下前后电路状态都不变。</p>`, 'GPIO5 接按钮一侧；按钮另一侧接 GND。', '确认两根线都是母头接板子、公头进面包板；按钮跨在中央沟两侧，改线前再次确认 USB 已拔下。'),
      step('用输入上拉读取按钮', `<pre><code>const int buttonPin = 5;

void setup() {
  Serial.begin(115200);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  Serial.println(digitalRead(buttonPin));
  delay(200);
}</code></pre><p>接 USB 并上传，打开 115200 波特率的串口监视器。松开时应看到 <code>1</code>（HIGH）；按下时应看到 <code>0</code>（LOW）。</p>`, '松开显示 1，按下显示 0。', '一直是 1：检查按钮、GPIO5 和 GND 连线。一直是 0：检查是否把按钮两组直接短接，或线接错了针脚。', '核对完成后再接 USB')
    ],
    quiz: quiz('INPUT_PULLUP 下，按钮按下并接通 GND 时通常读到什么？', ['LOW（0）', 'HIGH（1）', 'GPIO5 变成输出'], 0, ['对。按下后 GPIO5 被接到 GND，因此读到 LOW。', '松开时内部上拉通常让输入读到 HIGH。', 'INPUT_PULLUP 配置的是输入，不会变成输出。'], 's3-button', 3)
  },
  {
    id: 's3-project', number: '06', tag: '合成作品', title: '按住按钮，点亮 LED',
    intro: '现在把已经验证过的输入和输出合起来，做出第一个真实交互作品。',
    goal: '按下按钮 LED 亮，松开按钮 LED 灭；通过串口确认按钮状态。',
    materials: ['已搭好的 GPIO4 LED 电路', '已搭好的 GPIO5 按钮电路'], viz: 'project',
    body: `<div class="note"><b>先复用前两课的接线</b><br>LED 使用 GPIO4 和 330Ω 串联电阻；按钮使用 GPIO5 与 GND。不要为了本课重新换引脚。</div>`,
    steps: [
      step('断电并核对两条回路', `<p>拔掉 USB。先独立检查 LED 路径：GPIO4 → 电阻 → LED → GND；再检查按钮路径：GPIO5 → 按钮 → GND。两条回路共享 GND 是正常的。</p>`, 'LED 与按钮分别接到 GPIO4、GPIO5；两者都回到 GND。', '若任何一条路径无法从头到尾说清楚，按课程图重看对应接线步骤，暂时不要上电。'),
      step('上传组合程序', `<pre><code>const int ledPin = 4;
const int buttonPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(115200);
}

void loop() {
  const bool pressed = digitalRead(buttonPin) == LOW;
  digitalWrite(ledPin, pressed ? HIGH : LOW);
  Serial.println(pressed ? "按下" : "松开");
  delay(20);
}</code></pre><p>接 USB 上传，打开串口监视器。</p>`, '按住按钮 LED 亮且串口显示“按下”；松开后 LED 灭且串口显示“松开”。', '串口状态变化但 LED 不变：检查 GPIO4 和 LED 回路。LED 常亮：检查按钮是否一直连接到 GND。没有任何变化：先核对 GPIO5 按钮接线。', '核对完成后再接 USB'),
      step('完成自检', `<p>连续按下、松开几次，观察输入和输出是否一致。现在你已经完成一个“硬件输入 → 程序判断 → 硬件输出”的闭环。</p>`, '每次按下和松开都能改变 LED 状态。', '偶尔不响应时先检查按钮两组脚是否插对；机械按钮的快速抖动可留到进阶课，不影响本课基本原理。', '观察中')
    ],
    quiz: quiz('组合程序把按钮判定为“按下”的条件是什么？', ['GPIO5 读到 LOW', 'GPIO4 读到 HIGH', '串口监视器打开'], 0, ['对。INPUT_PULLUP 配合接地按钮，按下时读到 LOW。', 'GPIO4 是 LED 输出，不用于判断按钮。', '串口监视器只显示信息，不决定按钮状态。'], 's3-project', 1)
  },
  {
    id: 's3-wifi', number: '07', tag: '联网作品', title: '用浏览器通过 Wi-Fi 控制 LED',
    intro: '把程序、接线和网络连起来：Mac 与 ESP32-S3 接入同一个 2.4 GHz Wi-Fi 后，在浏览器点按钮控制 LED。',
    goal: '让开发板连接本地 Wi-Fi，在浏览器页面打开或关闭 GPIO4 LED。',
    materials: ['已完成按钮控制 LED 的开发板', '可用的 2.4 GHz Wi-Fi 名称与密码', 'Mac 与 ESP32-S3 接入同一网络'],
    body: `<p>ESP32-S3 通过本地 Wi-Fi 接收浏览器请求。课程使用路由器的 2.4 GHz 网络，不部署公网服务。Wi-Fi 名称和密码只填入你本机上的草图代码，不要把自己的真实密码写进课程示例或公开页面。</p>`,
    steps: [
      step('填写本地 Wi-Fi 信息', `<p>在下面代码里把 <code>YOUR_WIFI_NAME</code> 和 <code>YOUR_WIFI_PASSWORD</code> 换成自己的 2.4 GHz 网络名称和密码。若路由器把 2.4 GHz 和 5 GHz 合并成一个名称，通常可以直接使用该名称。</p><p>上传后开发板会等待最多 20 秒。连接成功时，IP 地址会显示在串口监视器。</p>`, 'SSID 和密码已填入本机草图，串口监视器设为 115200。', '若连接超时，检查密码、网络名称及是否允许新设备加入；不要把密码发给他人或贴进公开仓库。', '连接 USB，上传本课程序'),
      step('启动本地网页服务器', `<p>确保 GPIO4 LED 电路仍然连接，按钮电路也可以保留。上传完整程序后，串口监视器会输出类似 <code>192.168.1.23</code> 的地址。这个地址由你的路由器分配，每次可能不同。</p><pre><code>#include &lt;WiFi.h&gt;
#include &lt;WebServer.h&gt;

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const int ledPin = 4;
WebServer server(80);

void showPage() {
  server.send(200, "text/html", R"rawliteral(
    &lt;h1&gt;ESP32-S3 LED&lt;/h1&gt;
    &lt;p&gt;&lt;a href='/led?state=on'&gt;点亮&lt;/a&gt;&lt;/p&gt;
    &lt;p&gt;&lt;a href='/led?state=off'&gt;熄灭&lt;/a&gt;&lt;/p&gt;
  )rawliteral");
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting");
  const unsigned long started = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - started &lt; 20000) {
    delay(500);
    Serial.print(".");
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nWi-Fi connection failed");
    return;
  }
  server.on("/", showPage);
  server.on("/led", []() {
    digitalWrite(ledPin, server.arg("state") == "on" ? HIGH : LOW);
    server.sendHeader("Location", "/");
    server.send(303, "text/plain", "");
  });
  server.begin();
  Serial.print("Open http://");
  Serial.println(WiFi.localIP());
}

void loop() {
  server.handleClient();
}</code></pre>`, '串口显示 Wi-Fi 连接成功，并打印一个本地 IP 地址。', '若 20 秒后仍失败，检查 SSID、密码、2.4 GHz 网络和路由器是否限制新设备；断开 USB 后再修改代码。', '开发板已连接并运行'),
      step('在浏览器打开并控制', `<p>确认 Mac 也连接到同一个本地 Wi-Fi。在浏览器地址栏输入串口显示的 IP，例如 <code>http://192.168.1.23</code>。点击“点亮”和“熄灭”，观察外接 LED。</p><div class="note">该网页只在你的本地网络里访问，不是公网网站。若 Mac 和开发板连接了访客网络，路由器可能会阻止设备互访。</div>`, '网页出现两个链接，点击后 LED 能点亮和熄灭。', '页面打不开时确认地址包含 <code>http://</code>、两台设备在同一网络且没有连访客 Wi-Fi；IP 变化后重新看串口输出。', '开发板保持 USB 连接并运行')
    ],
    quiz: quiz('Mac 打不开 ESP32-S3 的网页，最先确认哪件事？', ['Mac 和开发板在同一个可互访的 2.4 GHz 网络', '把 GPIO4 接到 5V', '把 LED 电阻拆掉'], 0, ['对。本地网页需要两台设备能在同一网络互相访问。', 'GPIO 不能接 5V，接线错误也不会修复 Wi-Fi。', 'LED 必须保留串联电阻。'], 's3-wifi', 2)
  }
];
