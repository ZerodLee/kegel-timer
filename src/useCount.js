import { ref, computed, reactive } from "vue";
import { totalCount, interval, commandList, commandOption } from "./interval";
const sourceList = [{ label: "百度", getUrl: function () {} }];

function loadVoice(text) {
  // http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=你要转换的文字
  // var url = `https://fanyi.sogou.com/reventondc/synthesis?text=${text}&speed=1&lang=zh-CHS&from=translateweb&speaker=6`;
  // const url = `http://tts.youdao.com/fanyivoice?word=${text}&le=zh&keyfrom=speaker-target`
  // 直接转换mp3格式 https://api.vvhan.com/api/song?txt=%E5%86%85%E5%AE%B9
  const url = `https://api.oick.cn/txt/apiz.php?text=${text}&spd=3`
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
  const isPaused = ref(false);
  // 主按钮文本
  const MainBtnText = computed(function () {
    return isRunning.value ? "结束" : "开始";
  });
  // 暂停按钮文本
  const pausedBtnText = computed(function () {
    return isPaused.value ? "继续" : "暂停";
  });
  const commandIndex = ref(1);

  const commandText = ref("口令");

  function toggleStatus() {
    if (!isRunning.value) {
      start();
    } else {
      end();
    }
  }
  function togglePaused() {
    isPaused.value = !isPaused.value;
    if (!isPaused.value) {
      next();
    }
  }
  function start() {
    isRunning.value = true;
    // reset();
    commandIndex.value = commandList.length;
    next();
  }
  function end() {
    isRunning.value = false;
    isPaused.value = false;
    reset();
  }
  function reset() {
    commandText.value = "口令";
    commandIndex.value = 0;
    interval.value = 0;
    totalCount.value = commandOption.total;
  }
  function next() {
    setTimeout(function () {
      // 及时完毕
      if (totalCount.value <= 0) {
        reset();
        return false;
      }
      // 停止
      if (!isRunning.value || isPaused.value) {
        return false;
      }
      if (interval.value <= 0) {
        // 一轮循环结束
        if (commandIndex.value >= commandList.length - 1) {
          commandIndex.value = 0;
        } else {
          commandIndex.value += 1;
        }
        const command = commandList[commandIndex.value];
        commandText.value = command.text;
        interval.value = commandOption.interval;
        speak(commandIndex.value);
        next()
        // setTimeout(next, 500);
      } else {
        interval.value -= 1;
        next();
      }
      totalCount.value -= 1;
    }, 1000);
  }

  return { isRunning, toggleStatus, isPaused, togglePaused, MainBtnText, pausedBtnText, commandText };
}
