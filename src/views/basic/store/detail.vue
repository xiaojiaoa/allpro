<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">门店列表</div>
      <ul class="page-methods">
        <li>
          <router-link :to="{path: '/basic/stores/edit/' + this.$route.params.id}" >
            <el-button type="primary" icon="edit">修改</el-button>
          </router-link>
        </li>
        <li>
          <el-button type="danger" v-if="data.state==40" @click="stateEdit">启用</el-button>
          <el-button type="danger" v-else="data.state==10" @click="stateEdit">禁用</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">门店编号</el-col>
          <el-col :span="16">{{data.id}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">新建日期</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人姓名</el-col>
          <el-col :span="16">{{data.owner}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人手机</el-col>
          <el-col :span="16">{{data.ownerMobile}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">门店类型</el-col>
          <el-col :span="16">{{data.typeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">经营类型</el-col>
          <el-col :span="16">{{data.addressTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">是否自带仓库</el-col>
          <el-col :span="16">{{data.isWarehouseName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店最低资金</el-col>
          <el-col :span="16">{{data.minFunds}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">大区类型</el-col>
          <el-col :span="16">{{data.regionCodeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-col :span="4" class="label">门店地址</el-col>
          <el-col :span="20">
            {{data.provinceName}}-{{data.cityName}}-{{data.distName}}-{{data.address}}
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-col :span="4" class="label">备注</el-col>
          <el-col :span="20">
            {{data.resideCountry}}
          </el-col>
        </el-col>
      </el-row>
    </div>
    <!--<div class="dis-flex">-->
      <!--<div class="page-oper">-->
        <!--<div class="page-title">账户信息</div>-->
        <!--<ul class="page-methods">-->
          <!--<li>-->
            <!--<el-button type="success">实际可用资金 元</el-button>-->
          <!--</li>-->
          <!--<li>-->
            <!--<el-button type="success">预警资金 元</el-button>-->
          <!--</li>-->
          <!--<li>-->
            <!--<el-button type="success">最低资金 元</el-button>-->
          <!--</li>-->
          <!--<li>-->
            <!--<el-button type="success">冻结资金 元</el-button>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div class="dis-flex">-->
      <!--<div class="table dis-flex">-->
        <!--<div class="admin-table dis-flex">-->
          <!--<table class="admin-main-table">-->
            <!--<thead>-->
            <!--<tr>-->
              <!--<th v-for="value in thead" :title="value">-->
                <!--{{value}}-->
              <!--</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr>-->
              <!--<td>待收款</td>-->
              <!--<td>111111</td>-->
              <!--<td>2017-11-08 09:49:43</td>-->
              <!--<td>订单实收资金33333.33元</td>-->
              <!--<td>1610900011711080100</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { Store } from '../../../services/admin';

  export default {
    data() {
      return {
        data: {},
        thead: ['资金类型', '交易金额', '交易时间', '操作说明', '订单编号'],
        conditions: {
          pageSize: '',
          pageNo: '',
        },
      };
    },
    created() {
      this.init(this.$route.params.id);
    },
    methods: {
      init: function (val) {
        Store.detail(val).then(res => {
          this.data = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      stateEdit: function () {
        this.data.state = (this.data.state === 40 ? 10 : 40);
        Store.forbid(this.data.id, this.data.state)
          .then(res => {
            console.log(res);
            let msg = '';
            if (this.data.state === 10) {
              msg = '启用成功';
            } else {
              msg = '禁用成功';
            }
            this.$message({
              message: msg,
              type: 'success',
            });
            this.$router.push(`/basic/stores/detail/${this.data.id}`);
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
