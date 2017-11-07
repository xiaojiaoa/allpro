<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">订单列表</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit">修改员工信息</el-button>
        </li>
        <li>
          <el-button type="primary">密码重置</el-button>
        </li>
        <li>
          <el-button type="warning">锁定账号</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">员工号</el-col>
          <el-col :span="16">{{data.id}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">员工固定电话</el-col>
          <el-col :span="16">{{data.telephone}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">员工手机</el-col>
          <el-col :span="16">{{data.mobile}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">员工姓名</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">证件类型</el-col>
          <el-col :span="16">{{data.idcardType}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">证件号码</el-col>
          <el-col :span="16">{{data.idcard}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">员工属性</el-col>
          <el-col :span="16"></el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">所属部门</el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">角色</el-col>
          <el-col :span="20">
            <span v-for="item in data.roleList"></span>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">学历</el-col>
          <el-col :span="16"></el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">婚否</el-col>
          <el-col :span="16">{{data.isMarrige}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">出生地</el-col>
          <el-col :span="20">
            {{data.birthCountry}}-{{data.birthProvince}}-{{data.birthCity}}-{{data.birthDist}}
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">居住地</el-col>
          <el-col :span="20">
            {{data.resideCountry}}
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">居住详细地址</el-col>
          <el-col :span="20">
            {{data.resideProvince}}-{{data.resideCity}}-{{data.resideDist}}
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Employees } from '../../../services/admin';

export default {
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  methods: {
    init: function (val) {
      Employees.detail(val).then(res => {
        this.data = res.data;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  // @import '../scss/views/index.scss';
</style>
