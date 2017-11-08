<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">订单列表</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit">修改</el-button>
        </li>
        <li>
          <el-button type="danger">禁用</el-button>
        </li>
        <!--<li>-->
          <!--<el-button type="warning">锁定账号</el-button>-->
        <!--</li>-->
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
          <el-col :span="16">{{data.telephone}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">新建日期</el-col>
          <el-col :span="16">{{data.telephone}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人姓名</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">店长手机</el-col>
          <el-col :span="16">{{data.mobile}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">门店类型</el-col>
          <el-col :span="16">{{data.idcardType}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">经营类型</el-col>
          <el-col :span="16">{{data.idcard}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">其他类型</el-col>
          <el-col :span="16">{{data.idcard}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">是否自带仓库</el-col>
          <el-col :span="16"></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店最低资金</el-col>
          <el-col :span="16"></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">预约电话</el-col>
          <el-col :span="16">
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">营业时间</el-col>
          <el-col :span="16">
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">大区类型</el-col>
          <el-col :span="16">
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="8" class="label">是否展示</el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="8" class="label">门店地址</el-col>
          <el-col :span="16">
            {{data.birthCountry}}-{{data.birthProvince}}-{{data.birthCity}}-{{data.birthDist}}
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">备注</el-col>
          <el-col :span="20">
            {{data.resideCountry}}
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">账户信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="success" icon="edit">实际可用资金 元</el-button>
        </li>
        <li>
          <el-button type="success">预警资金 元</el-button>
        </li>
        <li>
          <el-button type="success">最低资金 元</el-button>
        </li>
        <li>
          <el-button type="success">冻结资金 元</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Store } from '../../../services/admin';

  export default {
    data() {
      return {
        data: {},
      };
    },
    created() {
      this.init(this.$route.params.id);
    },
    methods: {
      init: function (val) {
        Store.detail(val).then(res => {
          this.data = res.data;
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
