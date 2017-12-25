<template>
  <div class="login">
    <div class="login-container">
      <div class="layer">
        <div class="title">
          <h1>登录</h1>
          <h2>欢迎回来</h2>
          <p></p>
          <h4>机构管理系统</h4>
        </div>
        <div class="main">
          <div class="form">
            <el-form ref="form" :model="data" label-width="80px" label-position="top">
              <el-form-item label="账号">
                <el-input v-model="data.loginName" type="text" placeholder="请输入账号" suffix-icon=""></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="data.password" type="password" placeholder="请输入密码" suffix-icon=""></el-input>
              </el-form-item>
              <el-form-item class="submitBtn">
                <el-button type="primary" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

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
<style lang="scss">
  .el-input__inner:hover{
    border-color: #f5ba63;
  }
  .el-input__inner:focus{
    border-color: #F1A534;
  }
</style>
<style lang="scss" scoped>
  @import '../scss/views/index.scss';
  @import '../scss/views/login.scss';
</style>
