<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">采购详情</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">采购单编号</el-col>
          <el-col :span="16">{{data.purcNo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">采购人名称</el-col>
          <el-col :span="16">{{data.empName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">供应商名称</el-col>
          <el-col :span="16">{{data.suppName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">采购时间</el-col>
          <el-col :span="16">{{unixFormat(data.purcTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">预计到货日期</el-col>
          <el-col :span="16">{{unixFormat(data.deliveryTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人名字</el-col>
          <el-col :span="16">{{data.reviewName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">{{unixFormat(data.reviewTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">采购单状态</el-col>
          <el-col :span="16">{{data.stcodeName }}</el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">采购清单</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" v-if="data.stcode === 30" @click="downLoad">下载文件</el-button>
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
              <tr v-for="(item,index) in purchaseData">
                <td>
                 {{index + 1}}
                </td>
                <td>{{item.mateNo}}</td>
                <td>{{item.mateName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td>{{item.suppName}}</td>
                <td>{{item.num}}</td>
                <td>{{item.unitName}}</td>
                <td>{{item.quote}}</td>
                <td>{{item.price}}</td>
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
      thead: ['物料编号', '物料名称', '物料类型', '供应商名称', '数量', '单位', '报价', '单价'],
      data: {},
      purchaseData: {},
      modData: {
        id: '',
        endDate: '',
      },
      dialogMod: false,
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.purchaseDetail(val).then(res => {
        this.data = res.data;
        this.purchaseData = res.data.purchaseList;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    downLoad: function () {
      Purchase.purDownLoad(this.$route.params.id).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
