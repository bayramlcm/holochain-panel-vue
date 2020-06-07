import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import tr from 'vuetify/es5/locale/tr';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { tr },
      current: 'tr',
    },
});
