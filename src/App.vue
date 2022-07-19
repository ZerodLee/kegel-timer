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
      <v-container fluid>
        <div class="text-center pt-8">
          <div
            class="text-h1 mb-6"
            :class="[expand ? 'text-h5' : 'text-h1']"
            style="transition: font-size 0.3s linear"
          >
            20:00
          </div>
          <v-expand-transition>
            <v-card
              v-show="expand"
              height="300"
              
              class="mx-auto secondary"
            ></v-card>
          </v-expand-transition>
          <v-btn
            color="success"
            icon
            size="x-large"
            class="mx-auto"
            @click="expand = !expand"
          >
            开始
          </v-btn>
        </div>

        <v-row dense>
          <v-col v-for="n in 8" :key="n" cols="3">
            <v-sheet color="grey-lighten-2" height="96"></v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mdiDotsVertical } from "@mdi/js";
import { ref } from "vue";
export default {
  name: "App",

  components: {
    HelloWorld,
  },
  setup() {
    const drawer = ref(false);
    const expand = ref(false);
    return {
      drawer,
      expand,
      mdiDotsVertical,
    };
  },
};
</script>
