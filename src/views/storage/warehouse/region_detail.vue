<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">仓库区域详情</div>
      <ul class="page-methods">
        <li v-if="isEdit">
          <el-button type="primary" icon="edit" @click="routerLink(`/storage/region/edit/${$route.params.whseId}/${$route.params.regionId}`)">修改</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">区域编号</el-col>
          <el-col :span="16">{{data.regionCode}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">区域名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">区域助记码</el-col>
          <el-col :span="16">{{data.regionMnemonicCode}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">所属仓库</el-col>
          <el-col :span="16">{{unixFormat(data.whseName)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属集团</el-col>
          <el-col :span="16">{{unixFormat(data.cliqueName)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属机构</el-col>
          <el-col :span="16">{{data.orgName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">一级区域分类</el-col>
          <el-col :span="16">{{data.regionTypeName}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">二级区域分类</el-col>
          <el-col :span="20">{{data.cargoTypeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">添加人</el-col>
          <el-col :span="16">{{data.addEmp}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">添加时间</el-col>
          <el-col :span="20">{{ unixFormat(data.addTime) }}</el-col>
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
  import { mapState } from 'vuex';
  import { Storage } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        data: {},
        loading: false,
        isEdit: false,
      };
    },
    created() {
      this.init(this.$route.params.regionId);
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        const allcli = this.$_has8('edit99');
        const cli = this.$_has8('edit98');
        const org = this.$_has8('edit97');
        Storage.regionDetail(val).then(res => {
          this.data = res.data;
          this.loading = false;
          if (
            org === true &&
            cli === false &&
            allcli === false &&
            res.data.orgId === this.employee.organId
          ) {
            this.isEdit = true;
          }
          if (allcli === true) {
            this.isEdit = true;
          }
          if (
            org === true &&
            cli === true &&
            allcli === false &&
            res.data.cliqueId === this.employee.cliqueId
          ) {
            this.isEdit = true;
          }
          if (
            org === false &&
            cli === true &&
            allcli === false &&
            res.data.cliqueId === this.employee.cliqueId
          ) {
            this.isEdit = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      routerLink: function (val) {
        this.$router.push(`${val}`);
      },
    },
    computed: {
      ...mapState('Global', ['employee']),
      cliqueIdWatch: function () {
        return this.employee;
      },
    },
    watch: {
      cliqueIdWatch: function (val) {
        if (val !== 0) {
          this.init(this.$route.params.id);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
