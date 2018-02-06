<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">采购合同信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">合同编号</el-col>
          <el-col :span="16">{{data.contractNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">采购单编号</el-col>
          <el-col :span="16">{{data.purcNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">合同金额</el-col>
          <el-col :span="16">{{data.total}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">付款方式</el-col>
          <el-col :span="16">{{data.payTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">运输方式</el-col>
          <el-col :span="16">{{data.transTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">到货地址</el-col>
          <el-col :span="16">{{data.deliveryAddress}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">联系人</el-col>
          <el-col :span="16">{{data.contact}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">联系电话</el-col>
          <el-col :span="16">{{data.contactMobile}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人</el-col>
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
      <div class="page-title">合同清单</div>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
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
              <tr v-for="(item,index) in purchaseData">
                <td>{{index + 1}}</td>
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
        </el-checkbox-group>
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
      purchaseData: {},
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.purContractDetai(val).then(res => {
        this.data = res.data;
        this.purchaseData = res.data.purchaseLists;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
