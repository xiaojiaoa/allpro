<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">客户详情</div>
      <ul class="page-methods">
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">客户号</el-col>
          <el-col :span="16">{{data.cid}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">企业联系人</el-col>
          <el-col :span="16">{{data.legalPerson}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">企业联系人电话</el-col>
          <el-col :span="16">{{data.legalMobile}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">建档日期</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">建档人编号</el-col>
          <el-col :span="20">{{data.gid}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">企业名称</el-col>
          <el-col :span="16">{{data.entpName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">企业类型</el-col>
          <el-col :span="16">{{data.entpType}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">企业所属行业</el-col>
          <el-col :span="16">{{data.entpIndustry}}</el-col>
        </el-col>
      </el-row>
      
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">企业地址</el-col>
          <el-col class="text el-8-9">{{data.provinceName}} {{data.cityName}} {{data.distName}} {{data.entpAddr}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">企业情况备注</el-col>
          <el-col class="text el-8-9">{{data.remark}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">优惠备注</el-col>
          <el-col class="text el-8-9">{{data.discountRemark}}</el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Customers } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      data: {},
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Customers.enterpriseDetail(val).then(res => {
        this.loading = false;
        this.data = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    edit: function () {
      this.$router.push(`/basic/customers/edit_enterprise/${this.$route.params.id}`);
    },
  },
  filters: {
    enterpriseType: (status) => {
      switch (status) {
        case 1110:
          return '男孩1人';
        case 1011:
          return '女孩1人';
        case 1111:
          return '男孩女孩各1人';
        default:
          return '没有孩子';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  // @import '../scss/views/index.scss';
</style>
