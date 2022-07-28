import { ref, reactive, computed } from "vue";

const defaultTotal = 20 * 60;

export const totalCount = ref(defaultTotal);

export const interval = ref(0);

export const voice = ref(null);

export const totalText = computed(function () {
  const secends = totalCount.value % 60;
  return Math.floor(totalCount.value / 60) + ":" + (secends < 10 ? `0${secends}` : secends);
});
export const commandList = [
  { text: "收缩", voice: null },
  { text: "放松", voice: null },
];

export const commandOption = {
  total: defaultTotal,
  interval: 10,
};
/**
 *
 * @param {number} _totalCount
 * @param {number} _interval
 */
export function setCommand(_totalCount, _interval) {
  commandList.forEach((command) => (command.time = _interval));
  totalCount.value = commandOption.total = _totalCount;
  interval.value = commandOption.interval = _interval;
}
