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
      socket: null,
      remark: this.token !== ''?true:false,
    };
  },
  created() {
    this.config();
    if (this.remark) {
      this.socketConnect();
    }
  },
  computed: {
    ...mapState('Global', ['isCollapse', 'token']),
  },
  components: {
    navMenu,
    adminHeader,
  },
  methods: {
    ...mapActions('Global', ['config']),
    socketConnect: function () {
      if (this.token !== undefined && this.token !== null) {
        let headers = {};
        const socket = new SockJS(`${process.env.WEBSOCKET_SERVER}/endpointSang?x-auth-token=${this.token}`);
        this.socket = Stomp.over(socket);
        this.socket.connect(headers, (frame) => {
          console.log(frame);
          this.socket.subscribe('/user/queue/messages', (message) => {
            const text = JSON.parse(message.body);
            // const h = this.$createElement;
            this.$notify.info({
              title: text.title,
              message: text.content,
            });
          });
        }, (error) => {
          console.log(error);
        });
      }
    },
  },
  watch: {
    token: function (val) {
      if (val === '') {
        this.remark = false;
      } else {
        this.remark = true;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.socket !== null) {
      this.socket.disconnect();
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/views/index.scss';
</style>
