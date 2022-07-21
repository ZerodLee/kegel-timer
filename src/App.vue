<template>
  <v-app>
    <v-app-bar color="indigo darken-1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>凯格尔运动计时器</v-app-bar-title>

      <template v-slot:append>
        <v-btn :icon="mdiDotsVertical"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" bottom temporary>
      <!-- <v-list :items="items"></v-list> -->
      123
    </v-navigation-drawer>
    <v-main>
      <v-container fluid style="position: absolute">
        <div
          class="text-h1 text-center"
          :class="[isRunning ? 'scale-03 mt-12' : 'scale-1']"
          style="transition: transform 0.3s linear, margin 0.3s linear"
        >
          {{ currentCount }}
        </div>
      </v-container>
      <v-container fluid>
        <div class="text-center mt-16 pt-16">
          <v-expand-transition>
            <v-card v-show="isRunning" elevation="2" height="270" class="mx-auto">
              <v-card-text>
                <!-- <div>Word of the Day</div> -->
                <p class="text-h5 text--primary mb-8">
                  {{ currentCommand.text }}
                </p>
                <p class="text-h1">{{ currentCommand.time }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="tonal"
                  size="x-large"
                  color="orange darken-2"
                  @click="togglePaused"
                >
                  {{ pausedBtnText }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
          <v-btn
            :color="isRunning ? 'red-darken-2' : 'success'"
            icon
            width="100"
            height="100"
            size="x-large"
            class="mx-auto mt-6 text-h5"
            @click="toggleStatus"
          >
            {{ MainBtnText }}
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mdiDotsVertical } from "@mdi/js";
import { ref } from "vue";
import useCount from "./useCount";
export default {
  name: "App",

  components: {
    HelloWorld,
  },
  setup() {
    const drawer = ref(false);

    const {
      isRunning,
      toggleStatus,
      paused,
      togglePaused,
      currentCommand,
      currentCount,
      MainBtnText,
      pausedBtnText,
    } = useCount();
    return {
      drawer,
      mdiDotsVertical,
      isRunning,
      toggleStatus,
      paused,
      togglePaused,
      currentCommand,
      currentCount,
      MainBtnText,
      pausedBtnText,
    };
  },
};
</script>

<style>
.scale-03 {
  transform: scale(0.3);
}
.scale-1 {
  transform: scale(1);
}
</style>