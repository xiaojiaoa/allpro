<template>
  <div>
    <div class="admin-header no-select">
      <div class="left">
        <div class="iconDiv pointer">
          <i class="iconfont icon-caidan icon" @click="TOGGLE_MENU"></i>
        </div>
        <span class="word">机构后台管理</span>
        <el-button>自定义</el-button>
      </div>
      <div class="right">
        <span class="word">欢迎您！<span v-for="(data,index) in employee.roleList" :key="index">{{data}}</span> {{employee.name}}</span>
        <i class="iconfont icon-xiugaimima icon lock pointer" @click="changePassword()"></i>
        <i class="iconfont icon-tuichu icon out pointer" @click="showLogout"></i>
      </div>
    </div>
    <el-dialog :visible.sync="dialogLogout" custom-class="logout" :before-close="cancel" :show-close="false">
      <div class="logout-main">
        <div class="first-word">Logout 
          <span>{{employee.name}} ( </span>
          <span v-for="(data,index) in employee.roleList" :key="index">{{data}} </span>
           <span>) ?</span>
         </div>
        <div class="second-word">点击Yes确认退出</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logout()">Yes</el-button>
        <el-button @click="cancel()">No</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      dialogLogout: false,
      customBtn: [
        { name: '系统', url: 'www.baidu.com' },
      ],
    };
  },
  computed: {
    ...mapState('Global', ['employee']),
  },
  methods: {
    ...mapMutations('Global', ['TOGGLE_MENU', 'CLEAR_TOKEN']),
    changePassword: function () {
      this.$router.push('/basic/employees/changePassword');
    },
    showLogout: function () {
      this.dialogLogout = true;
    },
    logout: function () {
      this.CLEAR_TOKEN();
      this.$router.replace({
        path: '/login',
        query: { Rurl: this.$route.fullPath },
      });
    },
    cancel: function () {
      this.dialogLogout = false;
    },
  },
};
</script>
<style lang="scss">
  @import '../scss/components/header.scss';
</style>
