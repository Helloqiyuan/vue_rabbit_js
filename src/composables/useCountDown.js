import { computed, ref } from "vue";
export const useCountDown = () => {
  const time = ref(0);
  const formatTime = computed(() => {
    if (time.value > 60) {
      return parseInt(time.value / 60) + " 分 " + (time.value % 60) + " 秒 ";
    } else {
      return (time.value % 60) + " 秒 ";
    }
  });
  let timer = null;
  const startAt = (second) => {
    time.value = second;
    timer = setInterval(() => {
      if (time.value > 0) {
        time.value--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };
  return {
    time,
    formatTime,
    startAt,
  };
};
