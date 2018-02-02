<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">流水详情</div>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">流水号</el-col>
          <el-col :span="16">{{baseInfo.contNo}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">流水号</el-col>
          <el-col :span="20">{{baseInfo.amount}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">客户号</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">联系人姓名</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.deliveryDate)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">联系人电话</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.lastDate)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">建档日期</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">建档人</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.deliveryDate)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">提交量尺时间</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.lastDate)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">设计师</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店地址</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.deliveryDate)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店编号</el-col>
          <el-col :span="16">{{unixFormat(baseInfo.lastDate)}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">量尺空间</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>     
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">希望量尺时间</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col> 
        <el-col :span="8">
          <el-col :span="8" class="label">楼盘名称</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>  
        <el-col :span="8">
          <el-col :span="8" class="label">楼盘位置</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>      
      </el-row>
      <el-row>  
        <el-col :span="8">
          <el-col :span="8" class="label">客户地址</el-col>
          <el-col :span="16">{{baseInfo.deposit}}</el-col>
        </el-col>      
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">备注</el-col>
          <el-col :span="16">{{baseInfo.remark}}</el-col>
        </el-col>
      </el-row>
    </div>
    <div class="page-oper">
      <div class="page-title">收款登记</div>
    </div>
    <div class="container">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item  label="类型：">
                <span>{{this.$route.params.type == 10? '预付款':'预付款退款'}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="入账金额：" prop="money">
                <el-input v-model="form.money"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注：">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">确认添加</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import { Contracts } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      baseInfo: {},
      form: {},
      rules: {
        money: [
          { required: true, message: '请输入入账金额' },
        ],
      },
    };
  },
  created() {
    this.init(this.$route.params.lid);
  },
  methods: {
    init: function (val) {
      Contracts.detail(val).then(res => {
        this.baseInfo = res.data;
        this.form.fid = res.data.lid;
        this.form.cid = res.data.cid;
        this.form.money = res.data.residualAmount;
        this.form.contractId = res.data.contNo;
        this.form.storeId = res.data.bid;
        this.form.payType = res.data.type;
        this.form.status = res.data.stcode;
        this.form.empId = res.data.gid;
        console.log(this.form);
      }).catch(err => {
        console.log(err);
      });
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this.form');
        } else {
          console.log('error submit!!');
        }
      });
    },
    returnList: function () {
      this.$router.push(`/order/contracts/detail/${this.$route.params.lid}/${this.$route.params.id}`);
    },
  },
  mixins: [mixins],
};
</script>
