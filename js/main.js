import { lessons } from './lessons.js';
import './style-import.js';

const progressKey = 'emb101-progress-v1';
let done = new Set();
let stepIndex = 0;
const checkedSteps = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
  if (Array.isArray(saved)) done = new Set(saved.filter(id => lessons.some(lesson => lesson.id === id)));
} catch {}

const app = document.querySelector('#app');
const activeLessonIndex = () => {
  const found = lessons.findIndex(lesson => lesson.id === location.hash.slice(1));
  return found < 0 ? 0 : found;
};
const saveProgress = () => {
  try { localStorage.setItem(progressKey, JSON.stringify([...done])); } catch {}
};

function render() {
  const index = activeLessonIndex();
  const lesson = lessons[index];
  const total = lessons.length;
  const percent = Math.round(done.size / total * 100);
  const step = lesson.steps[Math.min(stepIndex, lesson.steps.length - 1)];
  stepIndex = Math.min(stepIndex, lesson.steps.length - 1);

  app.innerHTML = `<aside class="sidebar">
    <a class="brand" href="#s3-start"><span class="brand-logo">EMB101</span><span class="brand-sub">ESP32-S3 无痛入门</span></a>
    <nav aria-label="课程导航">${lessons.map((item, number) => `<a href="#${item.id}" class="nav ${number === index ? 'active' : ''}" ${number === index ? 'aria-current="page"' : ''}>
      <span class="nav-number">${item.number}</span><span class="nav-title">${item.title}</span><span class="check" aria-label="${done.has(item.id) ? '已完成' : ''}">${done.has(item.id) ? '✓' : ''}</span></a>`).join('')}</nav>
    <div class="sidebar-bottom"><div class="progress-head"><span>课程进度</span><b>${done.size} / ${total}</b></div><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done.size}"><span style="width:${percent}%"></span></div><p>一步一步来，每个结果都能看见。</p><button class="reset" type="button">重置进度</button></div>
  </aside>
  <main><article>
    <div class="lesson-head"><div class="eyebrow">${lesson.tag} · ${lesson.number}</div><h1>${lesson.title}</h1><p class="intro">${lesson.intro}</p></div>
    <section class="lesson-overview"><div class="goal-card"><span class="card-label">本课目标</span><p>${lesson.goal}</p></div>${lesson.materials?.length ? `<div class="materials-card"><span class="card-label">准备器材</span><ul>${lesson.materials.map(item => `<li>${item}</li>`).join('')}</ul></div>` : ''}<div class="lesson-body">${lesson.body || ''}</div></section>
    <div id="viz"></div>
    <section class="step-panel" aria-labelledby="step-title">
      <div class="step-progress"><span>动手步骤</span><b>第 ${stepIndex + 1} 步 / 共 ${lesson.steps.length} 步</b></div>
      <div class="step-track" aria-label="步骤进度">${lesson.steps.map((_, number) => `<button class="step-dot ${number === stepIndex ? 'current' : number < stepIndex ? 'visited' : ''}" type="button" data-step-index="${number}" aria-label="第 ${number + 1} 步" ${number === stepIndex ? 'aria-current="step"' : ''}></button>`).join('')}</div>
      <div class="step-content"><div class="step-title-row"><span class="step-number">${String(stepIndex + 1).padStart(2, '0')}</span><h2 id="step-title">${step.title}</h2></div>
        ${step.power ? `<div class="power-state ${step.power.includes('拔') ? 'power-off' : 'power-note'}"><span aria-hidden="true">${step.power.includes('拔') ? '⏻' : '✓'}</span>${step.power}</div>` : ''}
        <div class="step-copy">${step.body}</div>
        <div class="checkpoint"><button class="checkpoint-mark ${checkedSteps.has(`${lesson.id}-${stepIndex}`) ? 'checked' : ''}" type="button" data-checkpoint aria-label="标记检查点">✓</button><div><b>检查一下</b><p>${step.checkpoint}</p><span class="checkpoint-status">${checkedSteps.has(`${lesson.id}-${stepIndex}`) ? '已确认' : '看到这个结果后，点一下确认'}</span></div></div>
        <details class="troubleshoot"><summary>没看到这个结果？先看这里</summary><p>${step.troubleshooting}</p></details>
      </div>
      <div class="step-controls"><button type="button" class="step-prev" ${stepIndex === 0 ? 'disabled' : ''}>← 上一步</button><button type="button" class="step-next" ${stepIndex === lesson.steps.length - 1 ? 'disabled' : ''}>下一步 →</button></div>
    </section>
    <section class="quiz"><div class="quiz-heading"><span aria-hidden="true">✓</span><div><h2>本课小练习</h2><p>答错也没关系，先看原因，再回到对应步骤。</p></div></div><p class="quiz-question">${lesson.quiz.question}</p><div class="options">${lesson.quiz.options.map((option, number) => `<button type="button" data-option="${number}"><span>${String.fromCharCode(65 + number)}</span>${option}</button>`).join('')}</div><div class="feedback" aria-live="polite"></div></section>
    <footer class="pager"><div>${index ? `<a href="#${lessons[index - 1].id}">← 上一课</a>` : '<span>从这里开始</span>'}</div>${index < total - 1 ? `<a class="next" href="#${lessons[index + 1].id}"><small>接下来</small><b>${lessons[index + 1].title} ↗</b></a>` : '<a class="next" href="#s3-start"><small>第一阶段完成</small><b>回到开始 ↗</b></a>'}</footer>
  </article></main>`;

  document.querySelector('.reset').onclick = () => {
    if (confirm('确定清除本浏览器保存的课程进度？')) { done.clear(); saveProgress(); render(); }
  };
  document.querySelector('.step-prev').onclick = () => { if (stepIndex > 0) { stepIndex -= 1; render(); } };
  document.querySelector('.step-next').onclick = () => { if (stepIndex < lesson.steps.length - 1) { stepIndex += 1; render(); } };
  document.querySelector('[data-checkpoint]').onclick = event => {
    const key = `${lesson.id}-${stepIndex}`;
    if (checkedSteps.has(key)) checkedSteps.delete(key); else checkedSteps.add(key);
    event.currentTarget.classList.toggle('checked', checkedSteps.has(key));
    document.querySelector('.checkpoint-status').textContent = checkedSteps.has(key) ? '已确认' : '看到这个结果后，点一下确认';
  };
  document.querySelectorAll('[data-step-index]').forEach(button => button.onclick = () => {
    stepIndex = Number(button.dataset.stepIndex); render();
  });
  document.querySelectorAll('[data-option]').forEach(button => button.onclick = () => {
    const choice = Number(button.dataset.option);
    const correct = choice === lesson.quiz.answer;
    const feedback = document.querySelector('.feedback');
    const explanation = lesson.quiz.feedback[choice];
    feedback.innerHTML = `<p class="${correct ? 'good' : 'bad'}">${correct ? '✓ ' : '再看一下：'}${explanation}</p>${!correct ? `<button type="button" class="review-step">回看第 ${lesson.quiz.reviewStep + 1} 步</button>` : ''}`;
    button.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) return;
    done.add(lesson.id);
    saveProgress();
    document.querySelectorAll('[data-option]').forEach(option => { option.disabled = true; });
    document.querySelector('.progress-head b').textContent = `${done.size} / ${total}`;
    document.querySelector('.progress').setAttribute('aria-valuenow', String(done.size));
    document.querySelector('.progress span').style.width = `${Math.round(done.size / total * 100)}%`;
    document.querySelector('.nav.active .check').textContent = '✓';
  });
  document.querySelector('.feedback').onclick = event => {
    if (!event.target.matches('.review-step')) return;
    stepIndex = lesson.quiz.reviewStep;
    render();
    document.querySelector('.step-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  mount(lesson.viz);
  if (!window.__emb101HashListener) {
    window.addEventListener('hashchange', () => { stepIndex = 0; render(); window.scrollTo(0, 0); });
    window.__emb101HashListener = true;
  }
}

function mount(type) {
  if (!type) return;
  const root = document.querySelector('#viz');
  const top = `<section class="experiment"><div class="experiment-head"><span>先在网页里看</span><span>示意实验 · 不连接真实硬件</span></div>`;
  if (type === 'board') {
    root.innerHTML = `${top}<h2>点一下标记，认识它的位置</h2><div class="board-lab"><div class="devkit" role="group" aria-label="ESP32-S3-DevKitC-1 示意图">
      <div class="devkit-usb">USB-to-UART<br><small>Micro-USB</small></div><div class="devkit-chip">ESP32-S3<br>WROOM-1-N8R8</div>
      <div class="devkit-pins left"><button data-pin="3V3">3V3</button><button data-pin="RESET">RST</button><button data-pin="GPIO4">GPIO4</button><button data-pin="GPIO5">GPIO5</button><span>···</span><button data-pin="GND">GND</button></div>
      <div class="devkit-pins right"><button data-pin="GND">GND</button><button data-pin="TX">TX</button><button data-pin="RX">RX</button><button data-pin="GPIO1">GPIO1</button><span>···</span><button data-pin="GND">GND</button></div>
      <div class="devkit-buttons"><button data-pin="BOOT">BOOT</button><button data-pin="RESET">RESET</button></div>
    </div><div class="pin-readout" aria-live="polite">选一个标记查看说明。</div></div><p class="sim-foot">方向示意，不按比例绘制；实物请以板上丝印为准。</p></section>`;
    const descriptions = { '3V3': '3V3 · 3.3V 电源标记。本课不把 GPIO 接到它。', GPIO4: 'GPIO4 · 本课程外接 LED 的输出引脚。', GPIO5: 'GPIO5 · 本课程读取按钮的输入引脚。', GND: 'GND · 电路共同地，帮助电流形成完整回路。', BOOT: 'BOOT · 上传遇到连接超时可按住它辅助进入下载模式。', RESET: 'RST / RESET · 重新启动开发板。', TX: 'TX · 串口发送信号；本课程通过 USB-to-UART 查看串口文字。', RX: 'RX · 串口接收信号；本课程暂不需要接线。', GPIO1: 'GPIO1 · 一个可编程输入/输出引脚；本课程不使用它。' };
    root.querySelectorAll('[data-pin]').forEach(button => button.onclick = () => {
      root.querySelectorAll('[data-pin]').forEach(pin => pin.classList.remove('selected'));
      button.classList.add('selected'); root.querySelector('.pin-readout').textContent = descriptions[button.dataset.pin];
    });
    return;
  }
  if (type === 'breadboard') {
    root.innerHTML = `${top}<h2>试着判断两孔相不相通</h2><p class="experiment-desc">点击一组孔位，看看它们下面的金属片是否连接。</p><div class="breadboard-lab"><div class="breadboard-row">A20　B20　C20　D20　E20 <span>│中央沟│</span> F20　G20　H20　I20　J20</div><div class="breadboard-actions"><button data-path="ae">A20 ↔ E20</button><button data-path="fj">F20 ↔ J20</button><button data-path="ef">E20 ↔ F20</button></div><p class="path-result" aria-live="polite">先选一组孔位。</p></div></section>`;
    root.querySelectorAll('[data-path]').forEach(button => button.onclick = () => {
      const connected = button.dataset.path !== 'ef';
      root.querySelector('.path-result').textContent = connected ? '相通：这些孔在同一侧、同一行。' : '不相通：中央沟把左右两侧隔开。';
    });
    return;
  }
  const isButton = type === 'button' || type === 'project';
  const isProject = type === 'project';
  root.innerHTML = `${top}<h2>${isProject ? '输入和输出连在一起' : isButton ? '按下按钮，观察输入变化' : '切换输出，观察 LED'}</h2><p class="experiment-desc">${isProject ? '按下时 GPIO5 读到 LOW，程序让 GPIO4 点亮 LED。' : isButton ? 'INPUT_PULLUP：松开时 HIGH，按下接通 GND 后 LOW。' : '点击按钮模拟 GPIO4 输出 HIGH 或 LOW。'}</p><div class="simple-sim"><div class="sim-state"><span>${isButton ? 'GPIO5 输入' : 'GPIO4 输出'}</span><b class="sim-value">${isButton ? 'HIGH · 松开' : 'LOW · 熄灭'}</b></div><div class="sim-lamp" aria-hidden="true">●</div><button class="sim-toggle" type="button" aria-pressed="false">${isButton ? '按下按钮' : '点亮 LED'}</button></div><p class="sim-foot">这是网页模拟；它不会读取或控制你的真实开发板。</p></section>`;
  let pressed = false;
  root.querySelector('.sim-toggle').onclick = () => {
    pressed = !pressed;
    const value = root.querySelector('.sim-value');
    const lamp = root.querySelector('.sim-lamp');
    const toggle = root.querySelector('.sim-toggle');
    value.textContent = isButton ? (pressed ? (isProject ? 'LOW · 按下' : 'LOW · 按下') : 'HIGH · 松开') : (pressed ? 'HIGH · 点亮' : 'LOW · 熄灭');
    lamp.classList.toggle('lit', pressed && (!isButton || isProject));
    toggle.textContent = isButton ? (pressed ? '松开按钮' : '按下按钮') : (pressed ? '熄灭 LED' : '点亮 LED');
    toggle.setAttribute('aria-pressed', String(pressed));
  };
}

render();
