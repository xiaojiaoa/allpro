<template>
  <div>
    <admin-header></admin-header>
    <div class="index">
      <nav-menu :propsIsCollapse="isCollapse"></nav-menu>
      <div class="page-container dis-flex" :class="{ 'page-container-collapse' : isCollapse }">
        <router-view/>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import navMenu from '../components/nav-menu.vue';
import adminHeader from '../components/header.vue';

export default {
  data() {
    return {
      msg: 'adminTemplate',
    };
  },
  created() {
    this.config();
  },
  computed: {
    ...mapState('Global', ['isCollapse']),
  },
  components: {
    navMenu,
    adminHeader,
  },
  methods: {
    ...mapActions('Global', ['config']),
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/views/index.scss';
</style>
