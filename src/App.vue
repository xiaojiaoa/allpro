<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      browser: {
        userAgent: navigator.userAgent,
        name: '',
        version: navigator.appVersion,
        cookieEnabled: navigator.cookieEnabled,
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        colorDepth: window.screen.colorDepth,
        deviceXDPI: window.screen.deviceXDPI,
      },
    };
  },
  created() {
    if (this.browser.userAgent.indexOf('Firefox') !== -1) {
      this.browser.name = 'Firefox';
    }
    if (this.browser.userAgent.indexOf('Edge') !== -1) {
      this.browser.name = 'Edge';
    }
    if (this.browser.userAgent.indexOf('NET') !== -1 && this.browser.userAgent.indexOf('rv') !== -1) {
      this.browser.name = 'IE';
    }
    if (this.browser.userAgent.indexOf('WOW') < 0 && this.browser.userAgent.indexOf('Edge') < 0) {
      this.browser.name = 'Chrome';
    }
    if (this.browser.userAgent.indexOf('WOW') !== -1 && this.browser.userAgent.indexOf('NET') < 0 && this.browser.userAgent.indexOf('Firefox') < 0) {
      this.browser.name = '360';
    }
    this.RECORD_BROWSER(this.browser);
  },
  components: {
    // adminHeader,
  },
  methods: {
    ...mapMutations('Browser', ['RECORD_BROWSER']),
  },
};
</script>

<style lang="scss">
  @import "./assets/icon/iconfont.css";
  @import "./scss/common/global.scss";
  @import "./scss/common/layout.scss";
</style>
