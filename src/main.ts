import Vue = require('vue/dist/vue');

import Weather = require('./app/components/Weather.vue')


new Vue({ // eslint-disable-line no-new
  el: '#app',
  delimiters: ['${', '}'],
  components: {
    weather : Weather
  }
})

