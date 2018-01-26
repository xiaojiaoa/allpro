<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">仓库详情</div>
      <ul class="page-methods">
        <li>
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
          <el-col :span="16">{{data.owner}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">仓储助记码</el-col>
          <el-col :span="16">{{data.whseMnemonicCode}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">所属集团</el-col>
          <el-col :span="16">{{unixFormat(data.cliqueId)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属机构</el-col>
          <el-col :span="16">{{data.orgId}}</el-col>
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
  import { Storage } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        data: {},
        loading: false,
      };
    },
    created() {
      this.init(this.$route.params.id);
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        // this.loading = true;
        Storage.storageDetail(val).then(res => {
          this.data = res.data;
          this.loading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      routerLink: function (val) {
        this.$router.push(`${val}`);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
