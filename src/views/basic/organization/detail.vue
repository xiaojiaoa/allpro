<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">机构详情</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit" @click="edit(data.id)">修改</el-button>
        </li>
        <li>
          <el-button type="danger">禁用</el-button>
        </li>
        <!--<li>-->
          <!--<el-button type="warning">锁定账号</el-button>-->
        <!--</li>-->
      </ul>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">机构编号</el-col>
          <el-col :span="16">{{data.id}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人姓名</el-col>
          <el-col :span="16">{{data.owner}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人电话</el-col>
          <el-col :span="16">{{data.ownerMobile}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">新建日期</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">新建人</el-col>
          <el-col :span="16">{{data.addEmpName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">机构类型</el-col>
          <el-col :span="16">{{data.typeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">机构名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">是否自带仓库</el-col>
          <el-col :span="20">{{data.isWarehouseName}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">机构地址</el-col>
          <el-col class="text el-8-9">{{data.countryName}} {{data.provinceName}} {{data.cityName}} {{data.distName}} {{data.address}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">备注</el-col>
          <el-col class="text el-8-9">{{data.remark}}</el-col>
        </el-col>
      </el-row>     
    </div>
  </div>
</template>

<script>
  import { Organization } from '../../../services/admin';

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
        Organization.detail(val).then(res => {
          this.data = res.data;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      },
      edit: function (val) {
        this.$router.push(`/basic/organizations/edit/${val}`);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
