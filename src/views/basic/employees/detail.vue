<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">订单列表</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit" @click="edit(data.id)">修改员工信息</el-button>
        </li>
        <li>
          <el-button type="primary" @click="resetPassword(data.id)">密码重置</el-button>
        </li>
        <li>
          <el-button type="warning" @click="lockAccounts(data.id ,data.state)">{{data.state == 10 ?'锁定':'开启'}}账号</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">员工号</el-col>
          <el-col :span="16">{{data.id}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">员工固定电话</el-col>
          <el-col :span="16">{{data.telephone}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">员工手机</el-col>
          <el-col :span="16">{{data.mobile}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">员工姓名</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">证件类型</el-col>
          <el-col :span="16">{{data.idcardTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">证件号码</el-col>
          <el-col :span="16">{{data.idcard}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">员工属性</el-col>
          <el-col :span="16">{{data.empTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属部门</el-col>
          <el-col :span="16">{{data.deptName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">学历</el-col>
          <el-col :span="16">{{data.educationName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">婚否</el-col>
          <el-col :span="16">{{data.isMarrigeName}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">角色</el-col>
          <el-col class="text el-8-9">
            <span v-for="item in data.roleList" :key="item.id">{{item.name}}&nbsp;&nbsp;&nbsp;</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">出生地</el-col>
          <el-col class="text el-8-9">
            {{data.birthCountryName}}-{{data.birthProvinceName}}-{{data.birthCityName}}-{{data.birthDistName}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col >
          <el-col class="label el-1-9">居住地</el-col>
          <el-col class="text el-8-9">
            {{data.resideCountryName}}-{{data.resideProvinceName}}-{{data.resideCityName}}-{{data.resideDistName}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">居住详细地址</el-col>
          <el-col class="text el-8-9">
            {{data.address}}
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Employees } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Employees.detail(val).then(res => {
        this.data = res.data;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    edit: function (val) {
      this.$router.push(`/basic/employees/edit/${val}`);
    },
    resetPassword: function (val) {
      Employees.resetPassword(val).then(res => {
        this.$message({
          message: '重置密码成功',
          type: 'success',
        });
        console.log(res);
      }).catch(err => {
        this.handleError(err);
      });
    },
    lockAccounts: function (val, state) {
      const stcode = state === 10 ? 20 : 10;
      const params = { state: stcode };
      console.log(params);
      Employees.lockAccounts(val, params).then(res => {
        console.log(res);
        if (res.status === 201) {
          this.$message({
            message: '操作成功',
            type: 'success',
          });
          this.init(this.$route.params.id);
        }
      }).catch(err => {
        this.handleError(err);
      });
    },
  },
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
  // @import '../scss/views/index.scss';
</style>
