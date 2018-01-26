<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">仓库区域详情</div>
      <ul class="page-methods">
        <li>
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
          <el-col :span="16">{{unixFormat(data.whseId)}}</el-col>
        </el-col>
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
          <el-col :span="8" class="label">一级区域分类</el-col>
          <el-col :span="16">{{data.regionType}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">二级区域分类</el-col>
          <el-col :span="20">{{data.cargoType}}</el-col>
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
      this.init(this.$route.params.regionId);
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        // this.loading = true;
        Storage.regionDetail(val).then(res => {
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
