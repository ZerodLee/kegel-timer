<template>
  <v-navigation-drawer
    :model-value="modelVlaue"
    @update:modelValue="updateDrawer"
    touchless
    bottom
    temporary
  >
    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <div class="text-h5">设置</div>
      <v-divider class="my-4"></v-divider>
      <div class="">
        计时时长：<span class="text-h6 mx-2">{{ setting.total }}</span
        >分钟
      </div>

      <v-slider v-model="setting.total" step="1" min="1" max="40"></v-slider>

      <div class="">
        间隔时长：<span class="text-h6 mx-2">{{ setting.interval }}</span
        >秒
      </div>

      <v-slider v-model="setting.interval" step="1" min="1" max="15"></v-slider>

      <v-select v-model="setting.voice" :items="voiceList" variant="underlined">
        <template v-slot:prepend>
          <div class="">选择语音：</div>
        </template>
      </v-select>

      <div class="d-flex justify-space-around align-center fill-height">
        <v-btn color="success" @click="comfirmSetting"> 确认 </v-btn>

        <v-btn color="warning" @click="comfirmSetting"> 重置 </v-btn>
      </div>

      <!-- <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updateDrawer"
      >
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="updateDrawer">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="updateDrawer"> Reset Validation </v-btn> -->
    </v-form>
  </v-navigation-drawer>
</template>

<script>
import { ref, reactive, toRaw } from "vue";
import { totalCount, interval, setCommand } from "../interval";
export default {
  props: {
    modelVlaue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "updateSetting"],
  setup(props, ctx) {
    const drawer = ref(false);
    const setting = reactive({
      total: 20, // mins
      interval: 10,
      voice: null,
      endNotice: true,
    });
    function updateDrawer(value) {
      ctx.emit("update:modelValue", value);
      if (!value) {
        // 更新数据
        ctx.emit("updateSetting", toRaw(setting));
      }
    }
    return {
      setting,
      voiceList: [
        {
          title: "百度",
          value: "baidu",
          url: "",
        },
        {
          title: "搜狗",
          value: "sogou",
          url: "",
        },
        {
          title: "有道",
          value: "youdao",
          url: "",
        },
      ],
      updateDrawer,
      comfirmSetting() {
        setCommand(setting.total * 60, setting.interval);
        updateDrawer(false);
      },
      valid: true,
      // name: "",
      // nameRules: [
      //   (v) => !!v || "Name is required",
      //   (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      // ],
      // email: "",
      // emailRules: [
      //   (v) => !!v || "E-mail is required",
      //   (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      // ],
      // select: null,
      // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      // checkbox: false,
    };
  },
};
</script>