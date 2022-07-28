import { ref, reactive, computed } from "vue";

export const totalCount = ref(20 * 60);

export const interval = ref(0);

export const voice = ref(null);

export const totalText = computed(function () {
  const secends = totalCount.value % 60;
  return Math.floor(totalCount.value / 60) + ":" + (secends < 10 ? `0${secends}` : secends);
});
