<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">检验单信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">检验单编号</el-col>
          <el-col :span="16">{{data.checkNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">收货单编号</el-col>
          <el-col :span="16">{{data.receNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人名称</el-col>
          <el-col :span="16">{{data.reviewEmpName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">{{unixFormat(data.reviewTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">状态</el-col>
          <el-col :span="16">{{data.stcodeName}}</el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">检验单清单</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="review">审核</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
        <table class="admin-main-table">
            <thead>
            <tr>
              <th>序号</th>
              <th v-for="value in thead" :title="value">
                {{value}}
              </th>
            </tr>
            </thead>
            <tbody>
            <template>
              <tr v-for="(item,index) in checkData">
                <td>
                  {{index + 1}}
                </td>
                <td>{{item.mateName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td>{{item.suppName}}</td>
                <td>{{item.num}}</td>
                <td>{{item.unitName}}</td>
                <td>{{item.discount}}</td>
                <td>{{item.taxRate}}</td>
                <td>{{item.price}}</td>
                <td>{{item.taxPrice}}</td>
                <td>{{item.total}}</td>
                <td>{{item.taxAmount}}</td>
                <td>{{item.taxTotal}}</td>
                <td>{{item.disAmount}}</td>
                <td>{{unixFormat(item.needTime)}}</td>
              </tr>
            </template>
            </tbody>
          </table>
      </div>
    </div>

  </div>
</template>

<script>
import { Purchase } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['物料名称', '物料类型', '供应商名称', '数量', '单位', '折扣率', '税率', '单价', '含税单价', '总价', '税额', '含税金额', '折扣金额', '需求日期'],
      data: {},
      checkData: {},
      checkList: [],
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.purCheckDetail(val).then(res => {
        this.data = res.data;
        this.checkData = res.data.checkLists;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    review: function () {
      Purchase.purCheckReview(this.$route.params.id)
        .then(res => {
          console.log('res', res);
          this.$message({
            message: '审核成功',
            type: 'success',
          });
          this.init(this.$route.params.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
