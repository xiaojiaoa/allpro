<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">机构详情</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit" @click="edit(data.id)">修改</el-button>
        </li>
        <li>
          <el-button :type="data.state | colorType" @click="changeState(data.state)">{{data.state | stateType}}</el-button>
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
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        data: {},
        state: {
          id: this.$route.params.id,
          state: 10,
        },
      };
    },
    created() {
      this.init(this.$route.params.id);
    },
    mixins: [mixins],
    filters: {
      stateType: function (val) {
        switch (val) {
          case 10:
            return '禁用';
          case 20:
            return '禁用';
          case 30:
            return '启用';
          case 40:
            return '启用';
          default:
            return '';
        }
      },
      colorType: function (val) {
        switch (val) {
          case 10:
            return 'danger';
          case 20:
            return 'danger';
          case 30:
            return 'success';
          case 40:
            return 'success';
          default:
            return '';
        }
      },
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
        this.$router.push(`/basic/cliques/edit/${val}`);
      },
      changeState: function (val) {
        if (val === 40) {
          this.state.state = 10;
        } else if (val === 20 || val === 10) {
          this.state.state = 40;
        }
        Organization.state(this.state).then(res => {
          console.log(res);
          this.init(this.state.id);
        }).catch(err => {
          console.log(err);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
