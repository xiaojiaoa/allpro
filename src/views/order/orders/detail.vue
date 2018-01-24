<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">基本信息</div>
      <!-- <orderEdit  @init="init" :sendInfo="sendInfo" ref="orderEdit"></orderEdit> -->
      <ul class="page-methods">
         <li v-if="$_has8('edit01') && orderBasicInfo.stcode >= 110 && orderBasicInfo.stcode <=410">
           <el-button type="primary" size="small" @click="openEditOrder()">订单修改</el-button>
        </li>
        <li v-if="$_hasMulti8('addOrder01,addResupplyOrder01') && orderBasicInfo.stcode >= 710 && orderBasicInfo.stcode < 999">
          <el-button type="primary" size="small" @click="routerLink(`/order/resupplys/create/${baseData.orderBasicInfo.lid}/${baseData.orderBasicInfo.id}`)">新建补单</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">订单状态</el-col>
          <el-col :span="16">{{orderBasicInfo.stcodeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">订单号</el-col>
          <el-col :span="16">{{orderBasicInfo.tno}}</el-col>
        </el-col>
         <el-col :span="8">
          <el-col :span="8" class="label">流水号</el-col>
          <el-col :span="16">{{orderBasicInfo.lno}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">订单信息</el-col>
          <el-col :span="16">{{orderBasicInfo.orderInfo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">装修风格</el-col>
          <el-col :span="16">{{orderBasicInfo.decoStyleStr}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">订单类型</el-col>
          <el-col :span="16">{{orderBasicInfo.orderTypeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">订单子类型</el-col>
          <el-col :span="16">{{orderBasicInfo.orderSubTypeStr}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">客户编号</el-col>
          <el-col :span="16">{{customer.cid}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">客户姓名</el-col>
          <el-col :span="16">{{customer.name}}</el-col>
        </el-col>
         <el-col :span="8">
          <el-col :span="8" class="label">建档人</el-col>
          <el-col :span="16">{{createEmp.name}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">商品类型</el-col>
          <el-col :span="16">{{orderBasicInfo.goodsTypeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">客户地址</el-col>
          <el-col :span="16">{{customer.address}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">专卖店名称</el-col>     
          <el-col :span="16">{{store.name}}</el-col>     
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店地址</el-col>
          <el-col :span="16">{{store.address}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">收货人</el-col>     
          <el-col :span="16">{{customer.contact}}</el-col>   
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">收货人联系电话</el-col>
          <el-col :span="16">{{customer.contactMobile}}</el-col>
        </el-col>       
      </el-row>
      
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">收货地址</el-col>
          <el-col class="text el-8-9">
            {{customer.deliveryAddress}}
          </el-col>
        </el-col>
      </el-row>
        <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">预期交货时间</el-col>
          <el-col class="text el-8-9">
            {{unixFormat(orderBasicInfo.deliveryTime)}}
          </el-col>
        </el-col>
      </el-row>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">备注</el-col>
          <el-col class="text el-8-9">
            {{orderBasicInfo.remark}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">订单数量</el-col>
          <el-col class="text el-8-9">
            <template v-if="orderBasicInfo.orderNum > 1">
               {{orderBasicInfo.orderNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <el-button type="primary" size="mini" @click="routerLink(`/order/orders/childOrderList/${orderBasicInfo.id}`)">查看子订单</el-button>
            </template>
            <template v-else>
              {{orderBasicInfo.orderNum}}
            </template>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">同客户订单</el-col>
          <el-col class="text el-8-9">
            <template v-for="item in baseData.orders">
              <span class="router"><span @click="routerLink(`/order/orders/detail/${item.id}`)">{{item.tno}}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
            </template>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">订单关联流水</el-col>
          <el-col class="text el-8-9">
            <template v-for="item in baseData.sequences">
               <span class="router"><span @click="routerLink(`/order/taskseq/detail/${item.id}`)">{{item.no}}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
            </template>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <template v-if="returnTbody.length > 0">
      <div class="page-oper">
      <div class="page-title">退回信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary">查看所有退回信息</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th v-for="value in returnThead" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in returnTbody">            
                <td>{{item.causeStr}}</td>                  
                <td>{{item.backTypeStr}}</td>
                <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>              
                <td>{{item.remark}}</td>
                <td>{{item.EmployeeSimpleVo.backEmp.name}}</td>       
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>
    </template>
    <div class="page-oper">
      <div class="page-title">交流信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/orders/communicate/${baseData.orderBasicInfo.id}`)">交流登记</el-button>
        </li>
         <li>
          <el-button type="primary" @click="routerLink(`/order/orders/communicateAll/${baseData.orderBasicInfo.id}`)">查看所有交流信息</el-button>
        </li>
      </ul>
    </div>
     <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th>序号</th>
                <th v-for="value in theadCommunication" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tbodyCommunication">
                <template v-if="index < 5">
                  <td>{{index+1}}</td>
                  <td>{{item.content}}</td>
                  <td>{{item.name}}</td> 
                  <td>{{item.roleNames }}</td>  
                  <td>{{item.mobile}}</td>     
                  <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
                </template> 
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>
     <div class="page-oper">
      <div class="page-title">相关文件</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/orders/fileCreate/${orderBasicInfo.stcode}/${orderBasicInfo.id}/${orderBasicInfo.lid}`)">文件管理</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th v-for="value in relatedFilesThead" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in relatedFilesTbody">                               
                <td>{{item.orderFileReturnVo.tno}}</td>
                <td>{{item.orderFileReturnVo.fileName}}</td>              
                <td>{{item.orderFileReturnVo.name}}</td>
                <td>{{unixFormat(item.orderFileReturnVo.createTime)}} {{dateTimeFormat(item.orderFileReturnVo.createTime)}}</td>
                <td>{{item.orderFileReturnVo.uploadEmp.name}}</td>
                <td>{{item.orderFileReturnVo.remark}}</td>   
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>

     <div class="page-oper">
      <div class="page-title">状态信息</div>
      <ul class="page-methods">
        <li v-if="$_has8('addOrder01') && $_has8('subReview01') && orderBasicInfo.stcode == 110 && orderBasicInfo.designerId == employee.id">
          <el-button type="primary" size="small" @click="checkOrder(orderBasicInfo.id)">提交审核</el-button>
        </li>
        <li v-if="$_has8('del01') && orderBasicInfo.stcode >= 110 && orderBasicInfo.stcode <= 120">
          <el-button type="primary" size="small" @click="deleteOrder(orderBasicInfo.id)">删除订单</el-button>
        </li>
         <li v-if="$_has8('reEdit01') && orderBasicInfo.stcode == 120 && orderBasicInfo.designerId == employee.id">
          <el-button type="primary" size="small" @click="reEditOrder(orderBasicInfo.id)">重新编辑</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="24" >
          <el-col :span="4" class="label">许可状态</el-col>
          <el-col :span="20">

          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">{{unixFormat(statusData.reviewTime)}} {{dateTimeFormat(statusData.reviewTime)}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">审核人</el-col>
          <el-col :span="16" v-if="reviewEmp !== null">{{reviewEmp.name}}</el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">订单改价</el-col>
          <el-col :span="16">{{unixFormat(statusData.modifyPriceTime)}} {{dateTimeFormat(statusData.modifyPriceTime)}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">改价人</el-col>
          <el-col :span="16" v-if="modifyPriceEmp !== null">{{modifyPriceEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">收款确认</el-col>
          <el-col :span="16">{{unixFormat(statusData.receiptTime)}} {{dateTimeFormat(statusData.receiptTime)}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">确认人</el-col>
          <el-col :span="16"  v-if="receiptEmp !== null">{{ receiptEmp.name }}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单时间</el-col>
          <el-col :span="16" >{{unixFormat(statusData.apartTime)}} {{dateTimeFormat(statusData.apartTime)}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单人</el-col>
          <el-col :span="16"  v-if="apartEmp !== null">{{apartEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单审核</el-col>     
          <el-col :span="16">{{unixFormat(statusData.apartTime)}} {{dateTimeFormat(statusData.apartTime)}}</el-col>     
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">审核人</el-col>
          <el-col :span="16"  v-if="reviewEmp !== null">{{reviewEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">排产时间</el-col>     
          <el-col :span="16">{{unixFormat(statusData.produceTime)}} {{dateTimeFormat(statusData.produceTime)}}</el-col>     
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">排产人</el-col>
          <el-col :span="16"  v-if="produceEmp !== null">{{produceEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>       
      </el-row>     
     <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">出仓时间</el-col>     
          <el-col :span="16">{{unixFormat(statusData.outStorageTime)}} {{dateTimeFormat(statusData.outStorageTime)}}</el-col>     
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">出仓人</el-col>
          <el-col :span="16" v-if="outStorageEmp !== null">{{outStorageEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>       
      </el-row>
    </div>

     <div class="page-oper">
      <div class="page-title">日志信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/orders/logInfoAll/${baseData.orderBasicInfo.id}`)">查看所有日志信息</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th>序号</th>
                <th v-for="value in logThead" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in logTbody">
                 <template v-if="index < 5">
                    <td>{{index+1}}</td>              
                    <td>{{item.content}}</td>                  
                    <td>{{item.name}}</td>
                    <td>{{item.roleList.name}}</td>              
                    <td>{{item.mobile}}</td>
                    <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
                 </template>
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
// import orderEdit from '../../../components/orders/order_edit.vue';
import { Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      baseData: {},
      sendInfo: {},
      orderBasicInfo: {},
      customer: {},
      store: {},
      createEmp: {},
      reviewEmp: {},
      modifyPriceEmp: {},
      receiptEmp: {},
      apartEmp: {},
      produceEmp: {},
      outStorageEmp: {},
      statusData: {},
      chgbackInfo: [],
      returnThead: ['退回原因', '退回类型', '退回时间', '备注', '操作员工'],
      returnTbody: [],
      theadCommunication: ['交流信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      tbodyCommunication: [],
      relatedFilesThead: ['订单号', '文件名', '文件类型', '上传时间', '上传员工', '备注'],
      relatedFilesTbody: [],
      logThead: ['日志信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      logTbody: [],
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  computed: {
    ...mapState('Global', ['employee']),
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Promise.all([
        Order.orderDetail(val), Order.detailCommunication(val), Order.orderStatus(val),
        Order.orderLog({ tid: val }), Order.returnInfo(val)])
        .then(([
          orderDetail, detailCommunication, orderStatus, orderLog, returnInfo]) => {
          this.loading = false;
          this.baseData = orderDetail.data;
          this.orderBasicInfo = orderDetail.data.orderBasicInfo;
          this.customer = orderDetail.data.orderBasicInfo.customer;
          this.store = orderDetail.data.orderBasicInfo.store;
          this.createEmp = orderDetail.data.orderBasicInfo.createEmp;
          this.tbodyCommunication = detailCommunication.data.result;
          this.chgbackInfo = returnInfo.data.result;
          this.statusData = orderStatus.data.orderStatusDetail;
          this.reviewEmp = orderStatus.data.orderStatusDetail.reviewEmp;
          this.modifyPriceEmp = orderStatus.data.orderStatusDetail.modifyPriceEmp;
          this.apartEmp = orderStatus.data.orderStatusDetail.apartEmp;
          this.produceEmp = orderStatus.data.orderStatusDetail.produceEmp;
          this.outStorageEmp = orderStatus.data.orderStatusDetail.outStorageEmp;
          this.logTbody = orderLog.data.result;
          // 为订单修改赋初始值
          this.sendInfo.spaceTypeId = `${this.baseData.orderBasicInfo.orderSpace.spaceTypeId}`;
          this.sendInfo.prodType = this.baseData.orderBasicInfo.prodType;
          this.sendInfo.orderSubType = `${this.baseData.orderBasicInfo.orderSubType}`;
          this.sendInfo.orderInfo = this.baseData.orderBasicInfo.orderInfo;
          this.sendInfo.spaceName = this.baseData.orderBasicInfo.orderSpace.spaceName;
          this.sendInfo.goodsType = this.baseData.orderBasicInfo.goodsType;
          this.sendInfo.decoColorId = this.baseData.orderBasicInfo.decoColorId;
          this.sendInfo.remark = this.baseData.orderBasicInfo.remark;
          this.sendInfo.deliveryTime = this.baseData.orderBasicInfo.deliveryTime;
          this.sendInfo.brandId = this.baseData.orderBasicInfo.brandId;
          this.sendInfo.orderNum = this.baseData.orderBasicInfo.orderNum;
          Order.orderAllFileInfo({
            lid: this.orderBasicInfo.lid,
            tid: val,
          }).then((fileInfo) => {
            this.relatedFilesTbody = fileInfo.data;
          }).catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // openEditOrder() {
    //   this.$refs.orderEdit.show();
    //   this.$refs.orderEdit.initData();
    // },
    checkOrder(id) {
      this.$confirm('确认提交该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.checkOrder(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!',
            });
            this.init(this.$route.params.id);
          })
          .catch(err => {
            this.$message.error(`${err.msg}`);
          });
      });
    },
    deleteOrder(id) {
      this.$confirm('确认删除该订单?删除之后无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.deleteOrder(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.init(this.$route.params.id);
          })
          .catch(err => {
            this.$message.error(`${err.msg}`);
          });
      });
    },
    reEditOrder(id) {
      this.$confirm('确认重新编辑该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.reEditOrder(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '编辑成功!',
            });
            this.init(this.$route.params.id);
          })
          .catch(err => {
            this.$message.error(`${err.msg}`);
          });
      });
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  watch: {
    $route: {
      handler: function () {
        this.init(this.$route.params.id);
      },
      deep: true,
    },
  },
  mixins: [mixins],
//   components: {
//     orderEdit,
//   },
};
</script>
<style scoped>
</style>
