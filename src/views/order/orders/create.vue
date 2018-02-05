<template>
  <div class="container">
    <div class="dis-flex">
      <taskflow @selectLid="selectLid" ref="taskflow"></taskflow>
      <order @initOrder="initOrder" :sendInfo="sendInfo" ref="order"></order>
      <space-alert @initOrder="initOrder" :sendInfo="sendInfo" ref="space"></space-alert>
      <upload @initOrder="initOrder" :sendInfo="sendInfo" ref="file"></upload>
      <store  ref="store"></store>
      <div class="page-oper">
          <div class="page-title">
             新建订单
          </div>
      </div>
      <div class="container select-container">
        <el-form  label-width="140px">
          <el-row>
             <el-col :span="7">
              <el-form-item  label="选择门店">
                <el-input  @focus="openStores"  v-model="storeName" clearable></el-input>              
              </el-form-item>
            </el-col>
            <el-col :span="7" >
              <el-form-item  label="流水号" >
                <el-input placeholder="请点击选择流水号" v-model="fullLid" clearable  @focus="openLid"></el-input>
              </el-form-item>
            </el-col>    
          </el-row>
        </el-form>
      </div>
    <div class="page-oper">
        <div class="page-title" style="font-size:20px;">基本信息</div>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">门店编号</el-col>
          <el-col :span="16">{{store.id}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店名称</el-col>
          <el-col :span="16">{{store.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">新建日期</el-col>
          <el-col :span="16">{{store.addTime}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人姓名</el-col>
          <el-col :span="16">{{store.owner}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">负责人手机</el-col>
          <el-col :span="16">{{store.ownerMobile }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">门店类型</el-col>
          <el-col :span="16">{{store.typeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">经营类型</el-col>
          <el-col :span="16">{{store.addressTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">是否自带仓库</el-col>
          <el-col :span="16">{{store.isWarehouseName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">门店最低资金</el-col>
          <el-col :span="16">{{store.minFunds}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label"></el-col>
          <el-col :span="16"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">大区类型</el-col>
          <el-col :span="16">{{store.regionCodeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-col :span="4" class="label">门店地址</el-col>
          <el-col :span="20">
           {{store.provinceName}}-{{store.cityName}}-{{store.distName}}-{{store.address}}
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-col :span="4" class="label">备注</el-col>
          <el-col :span="20">
            {{store.resideCountry}}
          </el-col>
        </el-col>
      </el-row>
    </div>
     <div v-loading.lock="loading">
        <div class="page-oper">
          <div class="page-title">订单列表</div>
          <ul class="page-methods">
              <!-- <li v-if="baseData.stCode > 350 && baseData.stCode < 540">
                <el-button type="primary" size="small">相关附件</el-button>
              </li> -->
              <li v-if="baseData.stCode >= 500 && baseData.stCode <= 520 && $_has8('addSpace01') && baseData.dsgnId == employee.id">
                <el-button type="success" size="small" @click="openSpace('create')">新增空间</el-button>
              </li>
              <li v-if="baseData.stCode == 520 && $_has8('confirmOrder01') && baseData.dsgnId == employee.id">
                <el-button type="success" size="small" @click="closeOrder(lidName)">下单完毕</el-button>
              </li>
              <template v-if="baseData.stCode > 520 && baseData.stCode <= 560 && $_has8('confirmOrder01') && baseData.dsgnId == employee.id">
                <li>
                  <span style="color: red">下单完毕日期：{{unixFormat(baseData.sequenceEndTime)}} {{dateTimeFormat(baseData.sequenceEndTime)}}</span>
                </li>
                <li>
                  <el-button type="success" size="small" @click="cancelOrder(lidName)">取消下单完毕</el-button>
                </li>
              </template>
              <li v-if="fullLid !== ''">
                <el-button :type="isShow.buttonColor" size="small" @click="showOrder(lidName)">{{isShow.text}}</el-button>
              </li>
          </ul>
        </div>
        <div class="default-detail" >
          <div class="admin-table">
              <table class="admin-main-table">
                <thead>
                  <tr>
                    <th v-for="value in theadOrder" :title="value">
                      {{value}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(item, index) in tbodyOrder" >
                    <tr v-if="item.orders.length == 0">  
                      <td>{{item.space.spaceName}}</td>
                      <td>{{item.space.spaceTypeName}}</td>
                      <td>{{item.space.spaceStyleName}}</td>
                      <td colspan="10">
                         <template  v-for="(type,ind) in orderType" v-if="baseData.stCode >= 500 && baseData.stCode <= 520 && $_has8('addOrder01') && baseData.dsgnId == employee.id">
                            <el-button type="success" size="small" @click="openOrder(item.space,type)" v-if="$_has8('addOrder00') && type.orderSuperType == 1">新增{{type.name}}</el-button>
                            <el-button type="success" size="small" @click="openOrder(item.space,type)" v-if="$_has8('addProOrder01') && type.orderSuperType == 3">新增{{type.name}}</el-button>
                            <!-- <el-button type="success" size="small" v-if="type.orderSuperType == 2 && $_has8('addResupplyOrder01')">新增补单</el-button> -->
                            <!-- <el-button type="success" size="small" v-if="type.orderSuperType == 4 && $_has8('addProResupplyOrder01')">新增工程单补单</el-button> -->
                         </template>
                            <el-button type="primary" size="small" @click="openSpace(item.space)" v-if="$_has8('edit01') && baseData.dsgnId == employee.id && baseData.stCode >= 500 && baseData.stCode <= 520">修改空间</el-button>
      
                      </td>  
                    </tr>
                    <template v-else>
                      <tr v-for="(orderItem ,orderIndex) in item.orders">
                        <template v-if="orderIndex == 0 && baseData.stCode >= 500 && baseData.stCode <= 520 && baseData.dsgnId == employee.id">
                          <td :rowspan="item.orders.length + 1">{{item.space.parentSpaceTypeName}}/{{item.space.spaceName}}</td>
                          <td :rowspan="item.orders.length + 1" >{{item.space.spaceTypeName}}</td>
                          <td :rowspan="item.orders.length + 1">{{item.space.spaceStyleName}}</td>
                        </template>
                        <template v-else-if="orderIndex == 0">
                          <td :rowspan="item.orders.length " >{{item.space.parentSpaceTypeName}}/{{item.space.spaceName}}</td>
                          <td :rowspan="item.orders.length ">{{item.space.spaceTypeName}}</td>
                          <td :rowspan="item.orders.length " >{{item.space.spaceStyleName}}</td>
                        </template>             
                          <td class="orderRouter" v-if="orderItem.orderNum > 1">
                                <span  @click="routerLink(`/order/orders/detail/${orderItem.id}`)">{{orderItem.tno}}</span>×{{orderItem.orderNum}}
                                <el-button type="primary" size="mini" class="subOrders" @click="routerLink(`/order/orders/childOrderList/${orderItem.id}`)">查看子订单</el-button> 
                          </td>
                          <td class="orderRouter" v-else>
                                <span  @click="routerLink(`/order/orders/detail/${orderItem.id}`)">{{orderItem.tno}}</span>×{{orderItem.orderNum}}                    
                          </td>
                          <td>{{orderItem.brandStr}}</td>
                          <td>{{orderItem.decoColorStr}}</td>
                          <td>{{orderItem.orderInfo}}</td>
                          <td>{{orderItem.createEmp.name}}</td>
                          <td>{{orderItem.retailPrice}}</td>
                          <td>{{unixFormat(orderItem.deliveryTime)}} {{dateTimeFormat(orderItem.deliveryTime)}}</td>
                          <td>{{orderItem.orderStatusSimpleVo.payedStr}}</td>
                          <td>{{orderItem.orderStatusSimpleVo.stcodeStr}}</td>
                          <td class="upload"  @click="uploadFiles(orderItem)" v-if="$_has8('upFile01')">上传</td>
                          <td v-else></td>
                      </tr>
                      <tr v-if="baseData.stCode >= 500 && baseData.stCode <= 520 && baseData.dsgnId == employee.id">
                          <td colspan="10">
                            <template v-for="(type,ind) in orderType" v-if="$_has8('addOrder01')">
                               <el-button type="success" size="small" @click="openOrder(item.space,type)" v-if="$_has8('addOrder00') &&  type.orderSuperType == 1">新增{{type.name}}</el-button>
                               <el-button type="success" size="small" @click="openOrder(item.space,type)" v-if="$_has8('addProOrder01') && type.orderSuperType == 3">新增{{type.name}}</el-button>
                               <!-- <el-button type="success" size="small" v-if="type.orderSuperType == 2 && $_has8('addResupplyOrder01')">新增补单</el-button>
                               <el-button type="success" size="small" v-if="type.orderSuperType == 4 && $_has8('addProResupplyOrder01')">新增工程单补单</el-button> -->
                            </template>
                            <el-button type="primary" size="small" @click="openSpace(item.space)" v-if="$_has8('edit01')">修改空间</el-button>
                          </td>
                      </tr>
                    </template>               
                  </template> 
                  <tr v-if="tbodyOrder.length==0 && !loading">
                    <td :colspan="theadOrder.length" class="nothing-data">暂无数据</td>
                  </tr>         
                </tbody>
              </table>
          </div>
        </div>
       </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../../components/orders/store.vue';
import taskflow from '../../../components/orders/taskflow.vue';
import order from '../../../components/orders/order.vue';
import spaceAlert from '../../../components/orders/space.vue';
import upload from '../../../components/orders/upload.vue';
import { Order, Assistant, Taskseq } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      sendInfo: {},
      baseData: {},
      theadOrder: ['空间名', '空间类型', '空间风格', '订单号', '品牌', '主材颜色', '订单信息', '下单员工', '零售价(元)', '约定交付日期', '收款状态', '订单状态', '上传'],
      tbodyOrder: [],
      store: {},
      storeName: '',
      lidName: '',
      fullLid: '',
      custName: '',
      custMobile: '',
      custId: '',
      orderType: [],
      loading: false,
      isShow: {
        type: true,
        text: '显示已删除订单',
        buttonColor: 'danger',
      },
    };
  },
  created() {
  },
  mixins: [mixins],
  computed: {
    ...mapState('Global', ['employee']),
  },
  methods: {
    selectStore(id) {
      Order.storeDetail(id).then(res => {
        this.store = res.data;
        this.storeName = res.data.name;
      }).catch(err => {
        console.log(err);
      });
      this.$refs.store.hide();
    },
    showOrder(lid) {
      if (this.isShow.type) {
        Order.undeletedOrder({ stcode: '999', lid: lid }).then((res) => {
          this.tbodyOrder = res.data;
          this.isShow.type = false;
          this.isShow.text = '隐藏已删除订单';
          this.isShow.buttonColor = 'success';
        }).catch(err => {
          console.log(err);
        });
      } else {
        Order.orderList(lid).then((res) => {
          this.tbodyOrder = res.data;
          console.log('resdata', res.data);
          this.isShow.type = true;
          this.isShow.text = '显示已删除订单';
          this.isShow.buttonColor = 'danger';
        }).catch(err => {
          console.log(err);
        });
      }
    },
    initOrder(lid) {
      this.loading = true;
      Order.orderList(lid).then(res => {
        this.loading = false;
        this.tbodyOrder = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    selectLid(item) {
      // 子组件之间传值
      this.baseData = item;
      this.fullLid = item.no;
      this.lidName = item.id;
      this.sendInfo.lid = item.id;
      this.sendInfo.cid = item.custId;
      this.sendInfo.custName = item.ctctName;
      this.sendInfo.custMobile = item.ctctMobile;
      this.loading = true;
      Promise.all([
        Assistant.orderType(this.employee.organId),
        Order.orderList(item.id),
      ])
        .then(([orderType, orderList]) => {
          this.loading = false;
          this.tbodyOrder = orderList.data;
          console.log('order', orderList.data);
          this.orderType = orderType.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$refs.taskflow.hide();
    },
    openStores() {
      this.$refs.store.init();
      this.$refs.store.show();
    },
    openLid() {
      this.$refs.taskflow.init();
      this.$refs.taskflow.show();
    },
    openOrder(space, typeInfo) {
      this.sendInfo.orderSuperType = typeInfo.orderSuperType;
      this.sendInfo.orderSuperTypeName = typeInfo.name;
      this.sendInfo.spaceName = space.spaceName;
      this.sendInfo.spaceId = space.spaceId;
      this.sendInfo.spaceTypeId = space.spaceTypeId;
      this.$refs.order.initData();
      this.$refs.order.show();
    },
    openSpace(item) {
      if (item !== 'create') {
        this.sendInfo.ParentSpaceType = item.parentSpaceTypeId;
        this.sendInfo.spaceTypeId = item.spaceTypeId;
        this.sendInfo.spaceStyle = item.spaceStyleId;
        this.sendInfo.spaceName = item.spaceName;
        this.sendInfo.spaceId = item.spaceId;
      } else {
        this.sendInfo.ParentSpaceType = '';
        this.sendInfo.spaceType = '';
        this.sendInfo.spaceStyle = '';
        this.sendInfo.spaceName = '';
        this.sendInfo.spaceId = '';
      }
      this.$refs.space.show();
      this.$refs.space.init(item);
    },
    uploadFiles(item) {
      this.sendInfo.dsgnId = this.baseData.dsgnId;
      this.sendInfo.userInfoId = this.employee.id;
      this.sendInfo.tid = item.id;
      this.sendInfo.tno = item.tno;
      this.sendInfo.lid = item.lid;
      this.sendInfo.orderSubTypeStr = item.orderSubTypeStr;
      this.sendInfo.orderInfo = item.orderInfo;
      this.sendInfo.orderNum = item.orderNum;
      this.sendInfo.stcode = item.stcode;
      this.$refs.file.show();
      this.$refs.file.init(item.stcode);
    },
    closeOrder(lid) {
      this.$confirm('确认提交该流水?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.closeOrder(lid)
          .then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!',
            });
            this.loading = true;
            Promise.all([
              Taskseq.detailBase(this.lidName),
              Order.orderList(lid),
            ])
              .then(([detail, orderList]) => {
                this.loading = false;
                this.tbodyOrder = orderList.data;
                this.baseData = detail.data;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
      });
    },
    cancelOrder(lid) {
      this.$confirm('确认取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.cancelOrder(lid)
          .then(() => {
            this.$message({
              type: 'success',
              message: '取消成功!',
            });
            this.loading = true;
            Promise.all([
              Taskseq.detailBase(this.lidName),
              Order.orderList(lid),
            ])
              .then(([detail, orderList]) => {
                this.loading = false;
                this.tbodyOrder = orderList.data;
                this.baseData = detail.data;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
      });
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  components: {
    store,
    taskflow,
    order,
    spaceAlert,
    upload,
  },
};
</script>
<style scoped>
  .select-container{
    margin-bottom: 0 !important;
  }
  .upload{
    color:#3599e6;
    cursor:pointer;
  }
 .subOrders{
    margin-top: 4px;
    float: right;
  }
.orderRouter span{
      color: #3599e6;
      cursor: pointer;
  }
</style>
