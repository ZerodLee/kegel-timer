<template>
  <v-navigation-drawer
    :model-value="modelVlaue"
    @update:modelValue="updateDrawer"
    bottom
    temporary
  >
    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
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

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateDrawer">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="updateDrawer"> Reset Form </v-btn>

      <v-btn color="warning" @click="updateDrawer"> Reset Validation </v-btn>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    modelVlaue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const drawer = ref(false);
    return {
      // drawer
      updateDrawer(value) {
        ctx.emit("update:modelValue", value);
      },
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
};
</script>