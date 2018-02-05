<template>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
</template>

<script>

export default {
  data() {
    return {
      name: 'basic index',
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .center{
    position: relative;
    width: 100%;
  }
  // @import '../scss/views/index.scss';
</style>
