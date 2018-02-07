<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">收货单信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">收货单编号</el-col>
          <el-col :span="16">{{data.receNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">收货类型</el-col>
          <el-col :span="16">{{data.typeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">供应商</el-col>
          <el-col :span="16">{{data.suppName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">应付款</el-col>
          <el-col :span="16">{{data.payables}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">收货人</el-col>
          <el-col :span="16">{{data.empName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">收货时间</el-col>
          <el-col :span="16">{{unixFormat(data.receTime)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">收货人部门对应仓库</el-col>
          <el-col :span="16">{{data.whseName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人</el-col>
          <el-col :span="16">{{data.reviewEmpName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">{{unixFormat(data.reviewTime)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">状态</el-col>
          <el-col :span="16">{{data.stcodeName}}</el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">收货清单</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="edit">更新</el-button>
          <el-button type="primary" @click="review">提交审核</el-button>
          <el-button type="primary" @click="recall">撤回</el-button>
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
              <tr v-for="(item,index) in receiveData">
                <td>
                  {{index + 1}}
                </td>
                <td>{{item.mateName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td style="width:200px !important;">
                  <el-input v-model="item.num" size="small"></el-input>
                </td>
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
      thead: ['物料名称', '物料类型', '数量', '单位', '折扣率', '税率', '单价', '含税单价', '总价', '税额', '含税金额', '折扣金额', '需求日期'],
      data: {},
      receiveData: {},
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.purRecieveDetail(val).then(res => {
        this.data = res.data;
        this.receiveData = res.data.receivingLists;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    review: function () {
      Purchase.purReceiveReview(this.$route.params.id)
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
    recall: function () {
      Purchase.purReceiveRecall(this.$route.params.id)
        .then(res => {
          console.log('res', res);
          this.$message({
            message: '撤回成功',
            type: 'success',
          });
          this.init(this.$route.params.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit: function () {
      const arr = {};
      arr.receivingLists = this.receiveData;
      console.log('arr', arr);
      Purchase.purReceiveEdit(arr)
        .then(res => {
          console.log('res', res);
          this.$message({
            message: '修改收货单成功',
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
