<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">专卖店信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
       <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">专卖店编号</el-col>
          <el-col :span="16">{{baseInfo.bid}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">专卖店名</el-col>
          <el-col :span="16">{{baseInfo.store ? baseInfo.store.name : ''}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">收货人</el-col>
          <el-col :span="16">{{baseInfo.customer ? baseInfo.customer.contact : ''}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">联系电话</el-col>
          <el-col :span="16">{{baseInfo.customer ? baseInfo.customer.contactMobile : ''}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="4" class="label">收货地址</el-col>
          <el-col :span="20">{{baseInfo.customer ? baseInfo.customer.deliveryAddress : ''}}</el-col>
        </el-col>
      </el-row>
    </div>
    <div class="page-oper">
      <div class="page-title">其他信息</div>
    </div>
    <div class="container" >
        <el-form ref="ruleForm" :model="form"  label-width="140px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item  label="原订单号：" prop="orgTid">
                <span class="router"><span @click="routerLink(`/order/orders/detail/${form.orgTid}`)">{{form.tno}}</span></span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="增补类型：" prop="orderType">
                <el-radio v-model="form.orderType" :label="form.orderType">补单</el-radio>
                <span style="color: red">(増单请重新新建流水)</span>
              </el-form-item>
            </el-col>
          </el-row>
        
          <el-row>
            <el-col :span="16">
              <el-form-item label="问题反馈：" prop="describe">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.describe"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

           <el-row>
            <el-col :span="16">
              <el-form-item label="补单数量以及规格：" prop="quantity">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.quantity"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button" :loading="request">确认添加</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import { Resupply, Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      baseInfo: {},
      form: {
        orderType: '',
        orgTid: '',
        describe: '',
        quantity: '',
        tno: '',
      },
      loading: true,
      request: false,
      rules: {
        orderType: [
          { required: true },
        ],
        orgTid: [
          { required: true },
        ],
        describe: [
          { required: true, message: '请填写问题反馈' },
        ],
        quantity: [
          { required: true, message: '请填写补单数量以及规格' },
        ],
      },
    };
  },
  created() {
    this.init(this.$route.params.tid);
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Order.orderDetail(val).then(res => {
        this.loading = false;
        this.baseInfo = res.data.orderBasicInfo;
        this.form.orgTid = res.data.orderBasicInfo.id;
        this.form.orderType = res.data.orderBasicInfo.orderType + 1;
        this.form.tno = res.data.orderBasicInfo.tno;
      }).catch(err => {
        console.log(err);
      });
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          Resupply.addResupplys(this.form).then(() => {
            this.$message({
              message: '操作成功',
              type: 'success',
            });
            this.returnList();
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    returnList: function () {
      this.$router.go(-1);
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  mixins: [mixins],
};
</script>
