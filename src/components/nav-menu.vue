<template>
  <div class="no-select nav-menu">
    <!-- <transition-group name="fade"> -->
      <div class="menu" :key="1" :class="{ collaspe : isCollapse }">
        <div v-for="(item, index) in menu" :key="index" @click="chooseSecond(item.route)" :class="{ pointer: !isCollapse, active: item.route == routerActive[0] }">
          <div class="main">
            <i class="iconfont" :class="item.icon"></i>
            <transition name="slider">
              <div class="name" v-show="!isCollapse">{{item.name}}</div>
            </transition>
          </div>
          <div class="activeMark" v-show="(index == firstIndex) && !isCollapse"></div>
          <ul class="secondHover" v-show="isCollapse">
            <li v-for="(data, index2) in item.subMenu" :key="'s' + index2" @click="chooseDetail(data.route)" :class="{ active: data.route == routerActive[1] && item.route == routerActive[0] }">
              <router-link :to="data.href ? data.href : '/center'">
                <span>{{data.name}}</span>
                <div class="blueMark" v-show="data.route == routerActive[1] && item.route == routerActive[0]"></div>
                <!-- <div class="activeMark secondMark" v-show="data.route == routerActive[1] && item.route == routerActive[0]"></div> -->
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    <!-- </transition-group> -->
    <transition-group name="slider">
      <div class="second" v-show="!isCollapse" :key="2">
        <div v-for="(item, index) in menu" :key="index" v-show="index == firstIndex">
          <ul>
            <li v-for="(data, index2) in item.subMenu" :key="'s' + index2" @click="chooseDetail(data.route)" :class="{ active: data.route == routerActive[1] && item.route == routerActive[0] }">
              <router-link :to="data.href ? data.href : '/center'">
                <span>{{data.name}}</span>
                <div class="blueMark" v-show="data.route == routerActive[1] && item.route == routerActive[0]"></div>
                <div class="activeMark secondMark" v-show="data.route == routerActive[1] && item.route == routerActive[0]"></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isCollapse: this.propsIsCollapse,
      firstIndex: 0,
      secondIndex: -1,
      flag: -1,
    };
  },
  props: [
    'propsIsCollapse',
  ],
  computed: {
    ...mapState('Global', ['menu', 'routerActive']),
  },
  created() {
  },
  methods: {
    ...mapMutations('Global', ['ROUTER_ACTIVE']),
    chooseSecond: function (data) {
      if (!this.isCollapse) {
        const activeData = {
          type: 0,
          data: data,
        };
        this.ROUTER_ACTIVE(activeData);
        // this.firstIndex = index;
      }
    },
    chooseDetail: function (data) {
      // this.firstIndex = firstIndex;
      // this.flag = firstIndex;
      // this.secondIndex = (firstIndex * 1000) + secondIndex;
      const activeData = {
        type: 1,
        data: data,
      };
      this.ROUTER_ACTIVE(activeData);
    },
  },
  watch: {
    propsIsCollapse: function (data) {
      this.isCollapse = data;
      if (this.isCollapse) {
        // this.firstIndex = this.flag > 0 ? this.flag : 0;
        // this.routerActive[]
      }
    },
  },
};
</script>
<style lang="scss">
  @import '../scss/components/nav-menu.scss';
</style>
