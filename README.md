# EMB101 · ESP32-S3 无痛入门

面向会编程、但没有电子硬件经验的学习者。从器材清单、开发板方向和面包板孔位开始，用免焊接方式完成 LED、按钮和本地 Wi-Fi 控制作品。

## 课程指定器材

- Espressif ESP32-S3-DevKitC-1，ESP32-S3-WROOM-1-N8R8，**两排排针必须已焊好**。
- Micro-USB（Micro-B）数据线，连接开发板的 USB-to-UART 接口；Mac 接口不匹配时使用支持数据的转接线/头。
- 400 孔、2.54 mm 无焊面包板，至少 4 根公对母杜邦线（母头接开发板针脚，公头插面包板）。
- 普通红色直插 LED、330Ω 电阻、适合面包板的四脚轻触按钮。

不需要焊接工具、电池或额外电源。购买不同板型时，不要直接照抄课程接线图。

## 运行课程

需要 Node.js 和 npm：

```sh
npm install
npm run dev
```

打开终端显示的地址。网页中的实验是教学模拟，不会连接或控制真实开发板；课程进度保存在当前浏览器中。

## 安全与官方资料

改线或插拔器件前先拔掉 USB。ESP32-S3 GPIO 使用 3.3V 逻辑；LED 必须串联电阻，不要把 GPIO 直接接到电源或 GND。课程实物实验使用 USB 供电，不连接外接 5V、电池或市电。

- [ESP32-S3-DevKitC-1 官方说明](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32s3/esp32-s3-devkitc-1/)
- [Arduino-ESP32 安装说明](https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html)
- [Arduino IDE 2 下载](https://www.arduino.cc/en/software)
