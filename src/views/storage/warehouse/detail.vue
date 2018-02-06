<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">仓库详情</div>
      <ul class="page-methods">
        <li v-if="isEdit">
          <el-button type="primary" icon="edit" @click="routerLink(`/storage/warehouse/edit/${$route.params.id}`)">修改</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">仓库编号</el-col>
          <el-col :span="16">{{data.whseCode}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">仓库名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">仓储助记码</el-col>
          <el-col :span="16">{{data.whseMnemonicCode}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">所属集团</el-col>
          <el-col :span="16">{{data.cliqueName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属机构</el-col>
          <el-col :span="16">{{data.orgName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">仓库状态</el-col>
          <el-col :span="16">{{data.stcodeName}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">仓库类型</el-col>
          <el-col :span="20">{{data.typeName}}</el-col>
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
      this.init(this.$route.params.id);
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        const allcli = this.$_has8('edit99');
        const cli = this.$_has8('edit98');
        const org = this.$_has8('edit97');
        Storage.storageDetail(val).then(res => {
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
