import { createVuetify } from "vuetify/framework";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

export const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
