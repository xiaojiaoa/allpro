<template>
	<transition>
		<div class="admin-header no-select">
			<div class="left">
        <div class="iconDiv pointer">
          <i class="iconfont icon-caidan icon" @click="TOGGLE_MENU"></i>
        </div>
				<span class="word">机构后台管理</span>
				<el-button>自定义</el-button>
			</div>
			<div class="right">
				<span class="word">欢迎您！<span v-for="data in employee.roleList">{{data}}</span> {{employee.name}}</span>
        <i class="iconfont icon-xiugaimima icon lock pointer" @click="changePassword()"></i>
				<i class="iconfont icon-tuichu icon out pointer" @click="TOGGLE_MENU"></i>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      customBtn: [
        { name: '系统', url: 'www.baidu.com' },
      ],
    };
  },
  computed: {
    ...mapState('Global', ['employee']),
  },
  methods: {
    ...mapMutations('Global', ['TOGGLE_MENU']),
    changePassword: function () {
      this.$router.push('/basic/employees/changePassword');
    },
  },
};
</script>
<style lang="scss">
  @import '../scss/components/header.scss';
</style>
