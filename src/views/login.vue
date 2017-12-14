<template>
  <div class="login">
    <div>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="data.loginName" type="text" placeholder="请输入账号" suffix-icon=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="data.password" type="password" placeholder="请输入密码" suffix-icon=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
// import navMenu from '../components/nav-menu.vue';

export default {
  data() {
    return {
      data: {
        loginName: '90000000',
        password: '32294417',
        code: 'bb27n',
        baseId: 'aa70e7d4956c4118a5f6b776704b191e',
      },
      Rurl: this.$route.query.Rurl,
    };
  },
  created() {
    console.log(this.$store.state.Browser);
  },
  computed: {
    ...mapState('Global', ['tokenExpire']),
  },
  components: {
    // navMenu,
  },
  methods: {
    ...mapMutations('Global', ['TOGGLE_MENU']),
    ...mapActions('Global', ['userLogin']),
    onSubmit: function () {
      this.userLogin(this.data);
    },
  },
  watch: {
    tokenExpire() {
      if (this.tokenExpire) {
        if (this.Rurl === undefined) {
          this.$router.replace('/basic/userCenter/list');
        } else {
          this.$router.replace(this.Rurl);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/views/index.scss';
  .login{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
    >div{
      width:30%;
      margin-top: 10%;
      margin-left: 20%;
    }
  }
</style>
