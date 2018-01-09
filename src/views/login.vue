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
            <el-form ref="form" :model="data" :rules="rules" label-width="80px" label-position="top">
              <el-form-item label="账号" prop="loginName">
                <el-input v-model="data.loginName" type="text" placeholder="请输入账号" suffix-icon=""></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="data.password" type="password" placeholder="请输入密码" suffix-icon=""></el-input>
              </el-form-item>
              <el-form-item class="submitBtn">
                <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
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
import Rules from '../assets/validate/rules';

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
      rules: {
        loginName: [
          { ...Rules.required, message: '请填写账号' },
        ],
        password: [
          { ...Rules.required, message: '请填写密码 ' },
        ],
      },
      loading: false,
    };
  },
  created() {
  },
  computed: {
    ...mapState('Global', ['tokenExpire', 'message']),
  },
  components: {
    // navMenu,
  },
  methods: {
    ...mapMutations('Global', ['TOGGLE_MENU', 'RECORD_MESSAGE']),
    ...mapActions('Global', ['userLogin']),
    onSubmit: function () {
      this.loading = true;
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
    message(val) {
      if (val !== '') {
        this.loading = false;
        this.$message({
          message: val,
          type: 'error',
        });
        this.RECORD_MESSAGE('');
      }
    },
  },
};
</script>
<style lang="scss">
  .login{
    .el-input__inner:hover{
      border-color: #f5ba63;
    }
    .el-input__inner:focus{
      border-color: #F1A534;
    }
    .el-form-item.is-required .el-form-item__label:before{
      content: "";
    }
  }
</style>
<style lang="scss" scoped>
  @import '../scss/views/index.scss';
  @import '../scss/views/login.scss';
</style>
