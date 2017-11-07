<template>
  <div class="center">
    <div>{{msg}}</div>
    <div>{{msg}}</div>
    <div>{{msg}}</div>
    <div>{{msg}}</div>
    <div>{{msg}}</div>
    <div>{{msg}}</div>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      msg: '测试布局',
    };
  },
  created() {
    console.log(this.$store.state.Browser);
  },
  computed: {
    ...mapState('Global', ['isCollapse']),
  },
  methods: {
    ...mapMutations('Global', ['TOGGLE_MENU']),
  },
};
</script>

<style lang="scss" scoped>
  .center{
    position: relative;
    width: 100%;
    >div{
      height: 500px;
    }
  }
  // @import '../scss/views/index.scss';
</style>
