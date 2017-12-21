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
          <el-col :span="8" class="label">客户姓名</el-col>
          <el-col :span="16">{{data.nickName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">客户电话</el-col>
          <el-col :span="16">{{data.mobile}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">建档日期</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">建档人</el-col>
          <el-col :span="16">{{data.addEmp}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">客户生日</el-col>
          <el-col :span="16">{{unixFormat(data.birthday)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">年收入</el-col>
          <el-col :span="16">{{data.income}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">家庭收入</el-col>
          <el-col :span="16">{{data.familyIncome}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">是否已婚</el-col>
          <el-col :span="16">{{data.isMarried | marriedType}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">配偶姓名</el-col>
          <el-col :span="16">{{data.spouseName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">配偶生日</el-col>
          <el-col :span="16">{{unixFormat(data.spouseBirth)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">配偶手机</el-col>
          <el-col :span="16">{{data.spouseMobile}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">所在地址</el-col>
          <el-col class="text el-8-9">{{data.provinceName}} {{data.cityName}} {{data.distName}} {{data.address}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">家庭情况</el-col>
          <el-col class="text el-8-9">{{data.children | childrenType}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">优惠备注</el-col>
          <el-col class="text el-8-9">{{data.discountRemark}}</el-col>
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
      Customers.individualDetail(val).then(res => {
        this.loading = false;
        this.data = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    edit: function () {
      this.$router.push(`/basic/customers/edit/${this.$route.params.id}`);
    },
    createTaskseq: function () {
      this.$router.push(`/order/taskseq/measure/${this.$route.params.id}`);
    },
  },
  filters: {
    marriedType: (status) => {
      switch (status) {
        case 1:
          return '未婚';
        case 2:
          return '已婚';
        default:
          return '保密人';
      }
    },
    childrenType: (status) => {
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
