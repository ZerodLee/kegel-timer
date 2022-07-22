import { ref, computed, reactive } from "vue";

const sourceList = [{ label: "百度", getUrl: function () {} }];
const commandList = [
  { text: "收缩", time: 10, voice: null },
  { text: "放松", time: 10 },
];
function loadVoice(text) {
  var url = `https://fanyi.sogou.com/reventondc/synthesis?text=${text}&speed=1&lang=zh-CHS&from=translateweb&speaker=6`;

  const voice = new Audio(url);
  return voice;
}
function speak(index) {
  // const synth = window.speechSynthesis;
  // synth.speak(getVoice(text)); // 播放
  const command = commandList[index];
  return new Promise(function (resolve, reject) {
    if (!command.voice) {
      command.voice = loadVoice(command.text);
    }
    command.voice.onended = function () {
      resolve();
    };
    command.voice.play();
  }).catch(function (err) {
    alert("语音播放错误");
  });
}

export default function useCount() {
  // 是否在计时
  const isRunning = ref(false);
  // 是否暂停
  const paused = ref(false);
  // 主按钮文本
  const MainBtnText = computed(function () {
    return isRunning.value ? "结束" : "开始";
  });
  // 暂停按钮文本
  const pausedBtnText = computed(function () {
    return paused.value ? "继续" : "暂停";
  });

  const options = reactive({
    perTime: 10,
    totalCount: 20 * 60,
  });
  const currentCommand = reactive({
    text: "口令",
    time: 0,
    count: options.totalCount,
    index: 0,
  });
  const currentCount = computed(function () {
    const secends = currentCommand.count % 60;
    return Math.floor(currentCommand.count / 60) + ":" + (secends < 10 ? `0${secends}` : secends);
  });
  function toggleStatus() {
    if (!isRunning.value) {
      start();
    } else {
      end();
    }
  }
  function togglePaused() {
    paused.value = !paused.value;
    if (!paused.value) {
      next();
    }
  }
  function start() {
    isRunning.value = true;
    reset();
    currentCommand.index = commandList.length;
    next();
  }
  function end() {
    isRunning.value = false;
    reset();
  }
  function reset() {
    currentCommand.text = "口令";
    currentCommand.time = 0;
    currentCommand.count = options.totalCount;
    currentCommand.index = 0;
  }
  function next() {
    setTimeout(function () {
      // 及时完毕
      if (currentCommand.count <= 0) {
        reset();
        return false;
      }
      // 停止
      if (!isRunning.value || paused.value) {
        return false;
      }
      if (currentCommand.time <= 0) {
        // 一轮循环结束
        if (currentCommand.index >= commandList.length - 1) {
          currentCommand.index = 0;
        } else {
          currentCommand.index += 1;
        }
        const command = commandList[currentCommand.index];
        currentCommand.text = command.text;
        currentCommand.time = command.time;
        speak(currentCommand.index).then(next);
        // setTimeout(next, 500);
      } else {
        currentCommand.time -= 1;
        next();
      }
      currentCommand.count -= 1;
    }, 1000);
  }

  return { isRunning, toggleStatus, paused, togglePaused, currentCommand, currentCount, MainBtnText, pausedBtnText };
}
