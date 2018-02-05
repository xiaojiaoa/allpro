<template>
  <div class="container">
    <!-- 基本信息 -->
    <div class="content-info" v-if="permissions.getBase && dataVisible.base">
      <div class="page-oper">
        <div class="page-title">基本信息</div>
        <!-- <ul class="page-methods">
          <li v-if="btnVisible.base && baseData.dsgnId === employee.id  && btnPermissions.updateBase">
            <el-button type="success" @click="routerLink(`/order/taskseq/modify/${baseData.id}/${baseData.custId}`)">编辑信息</el-button>
          </li>
          <li v-if="contractsData.contNo && contractsData.residualAmount!=0 && $_has8('gather99')">
            <el-button type="success" @click="routerLink(`/order/contracts/gather/${contractsData.lid}/${contractsData.contNo}`)">收款</el-button>
          </li>
          <li v-if="dataVisible.contract">
            <el-button type="primary" @click="routerLink(`/order/taskseq/income/${baseData.id}`)">收款信息</el-button>
          </li>
          <li v-if="baseData.stCode != 999 && $_hasMulti8('submitFail95,submitFail96,submitFail97,submitFail98,submitFail99')">
            <el-button type="warning" @click="routerLink(`/order/measure/cancle/${baseData.id}`)">未成交</el-button>
          </li>
        </ul> -->
      </div>
      <div class="default-detail" v-loading.lock="loading">
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">流水状态</el-col>
            <el-col :span="16">{{baseData.stCodeName}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">流水号</el-col>
            <el-col :span="16">{{baseData.no}}</el-col>
          </el-col> 
          <el-col :span="8">
            <el-col :span="8" class="label">流水类型</el-col>
            <el-col :span="16">{{baseData.typeName}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">客户号</el-col>
            <el-col :span="16">{{baseData.custId}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">客户姓名</el-col>
            <el-col :span="16">{{baseData.custName}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">客户电话</el-col>
            <el-col :span="16">{{baseData.custMobile}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">联系人</el-col>
            <el-col :span="16">{{baseData.ctctName}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">联系方式</el-col>
            <el-col :span="16">{{baseData.ctctMobile}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">建档日期</el-col>
            <el-col :span="16">{{unixFormat(baseData.createTime)}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">建档人</el-col>
            <el-col :span="16">{{baseData.emplName}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">提交量尺时间</el-col>
            <el-col :span="16">{{unixFormat(baseData.isMarrige)}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">设计师</el-col>     
            <el-col :span="16">{{baseData.dsgnName}}</el-col>     
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">门店地址</el-col>
            <el-col :span="16">{{baseData.storeAddress}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">门店编号</el-col>
            <el-col :span="16">{{baseData.storeId}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-col :span="4" class="label">量尺空间</el-col>     
            <el-col :span="20">{{baseData.spaceStr}}</el-col>     
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">希望量尺时间</el-col>
            <el-col :span="16">{{unixFormat(baseData.apptTime)}}</el-col>
          </el-col>       
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">楼盘名称</el-col>     
            <el-col :span="16">{{baseData.estate}}</el-col>     
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">楼盘位置</el-col>
            <el-col :span="16">{{baseData.estateGps}}</el-col>
          </el-col>       
        </el-row>
        
        <el-row class="textarea">
          <el-col>
            <el-col class="label el-1-9">客户地址</el-col>
            <el-col class="text el-8-9">
              {{baseData.address}}
            </el-col>
          </el-col>
        </el-row>
        <el-row class="textarea">
          <el-col>
            <el-col class="label el-1-9">备注</el-col>
            <el-col class="text el-8-9">
              {{baseData.remark}}
            </el-col>
          </el-col>
        </el-row>

      </div>
    </div>
    <!--量尺信息  -->
    <div class="content-info" v-if="permissions.getMeasure && dataVisible.measure">
      <div class="page-oper">
        <div class="page-title">量尺信息</div>
        <!-- <ul class="page-methods">
          <li v-if="btnVisible.measure && btnPermissions.measureCreate">
            <el-button type="success" @click="routerLink(`/order/measure/create/${baseData.id}`)">量尺登记</el-button>
          </li> 
        </ul> -->
      </div>
      <div class="default-detail" v-loading.lock="loading">
        <el-row>
          <el-col :span="16">
            <el-col :span="4" class="label">完成量尺时间</el-col>
            <el-col :span="20">{{unixFormat(measureData.cmplTime)}} {{dateTimeFormat(measureData.cmplTime)}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">计划首次沟通时间</el-col>
            <el-col :span="16">{{unixFormat(measureData.touchTime)}} {{dateTimeFormat(measureData.touchTime)}}</el-col>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">装修阶段</el-col>
            <el-col :span="16">{{measureData.decoStageStr}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">计划入住时间</el-col>
            <el-col :span="16">{{unixFormat(measureData.planDate)}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">量尺性质</el-col>
            <el-col :span="16">{{measureData.propertyStr}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">客户职业</el-col>
            <el-col :span="16">{{measureData.custOccupation}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">面积</el-col>
            <el-col :span="16">{{measureData.houseArea}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">房价</el-col>
            <el-col :span="16">{{measureData.housePrice}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">户型</el-col>
            <el-col :span="16">{{measureData.houseTypeBed}}室{{measureData.houseTypeLiving}}厅{{measureData.houseTypeToilet}}卫{{measureData.houseTypeKitchen}}厨</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">预算</el-col>
            <el-col :span="16">{{measureData.budget}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">家庭成员</el-col>     
            <el-col :span="16">{{measureData.familyNumStr}}</el-col>     
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">孩子性别</el-col>
            <el-col :span="16">{{measureData.childGender}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">装修风格</el-col>
            <el-col :span="16">{{measureData.decoStyleStr}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-col :span="4" class="label">预购家具</el-col>     
            <el-col :span="20">{{measureData.wantPurchaseStr}}</el-col>     
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">喜欢主材颜色</el-col>
            <el-col :span="16">{{measureData.decoColorStr}}</el-col>
          </el-col>       
        </el-row>  
        <el-row class="textarea">
          <el-col>
            <el-col class="label el-1-9">量尺备注</el-col>
            <el-col class="text el-8-9">
              {{measureData.remark}}
            </el-col>
          </el-col>
        </el-row>

      </div>
    </div>
    
    <!--文件信息  -->
    <div class="content-info" v-if="permissions.uploadFile && dataVisible.measure">
      <div class="page-oper">
        <div class="page-title">相关文件</div>
        <!-- <ul class="page-methods">
          <li v-if="btnVisible.measure && btnPermissions.uploadFileCreate">
            <el-button type="success" @click="routerLink(`/order/file/create/${baseData.id}`)">上传量尺文件</el-button>
          </li>
        </ul> -->
      </div>
      <div class="default-detail no-bot-border" v-loading.lock="loading">
        <div class="admin-table">
          <el-checkbox-group>
            <table class="admin-main-table">
              <thead>
                <tr>
                  <th v-for="value in theadFile" :title="value">
                    {{value}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tbodyFile">               
                  <td>{{item.spaceStr}}</td>                  
                  <td>{{item.typeStr}}</td>
                  <td>{{item.spacePrice}}</td>              
                  <td>{{item.name}}</td>
                  <td>{{renderSize(item.size)}}</td>
                  <td>{{unixFormat(item.createTime)}}</td>
                  <td>{{item.remark}}</td>
                  <td class="operation">
                   <el-button type="primary">
                      <a :href="`http://192.2.17.74:8088/download?originalFileName=${item.fileName}&url=${item.savePath}`" :download="`${item.fileName}`">下载</a>
                   </el-button>                          
                </td> 
                </tr>
                <tr v-if="tbodyFile.length==0 && !loading">
                    <td :colspan="theadFile.length" class="nothing-data">暂无数据</td>
                  </tr>
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <!--查房信息  -->
    <div class="content-info" v-if="permissions.getWardRound && dataVisible.wardRound">
      <div class="page-oper">
        <div class="page-title">查房信息</div>
        <!-- <ul class="page-methods">
          <li v-if="btnVisible.wardRound && btnPermissions.wardRoundCreate">
            <el-button type="success" @click="routerLink(`/order/wardRound/create/${baseData.id}`)">查房登记</el-button>
          </li>
        </ul> -->
      </div>
      <div class="default-detail no-bot-border" v-loading.lock="loading">
        <div class="admin-table">
          <el-checkbox-group>
            <table class="admin-main-table">
              <thead>
                <tr>
                  <th v-for="value in theadInfo" :title="value">
                    {{value}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tbodyInfo">  
                  <td>{{item.emplName}}</td>  
                  <td>{{unixFormat(item.createTime)}}</td>                                                      
                  <td>{{item.summary}}</td>               
                </tr>
                 <tr v-if="tbodyInfo.length==0 && !loading">
                    <td :colspan="theadInfo.length" class="nothing-data">暂无数据</td>
                  </tr>
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <!--沟通信息  -->
    <div class="content-info" v-if="permissions.getTouch && dataVisible.touch">
      <div class="page-oper">
        <div class="page-title">客户跟进</div>
        <!-- <ul class="page-methods">
          <li v-if="btnVisible.touch && btnPermissions.touchCreate">
            <el-button type="success" @click="routerLink(`/order/touch/create/${baseData.id}`)">沟通登记</el-button>
          </li>
        </ul> -->
      </div>
      <div class="default-detail no-bot-border" v-loading.lock="loading">
        <div class="admin-table">
          <el-checkbox-group>
            <table class="admin-main-table">
              <thead>
                <tr>
                  <th v-for="value in theadTouch" :title="value">
                    {{value}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tbodyTouch">  
                  <td>{{unixFormat(item.time)}} {{dateTimeFormat(item.time)}}</td>
                  <td>{{item.summary}}</td>
                  <td>{{item.remark}}</td>                                                     
                  <td>{{item.unsetKeyPoints}}</td>
                  <td>{{unixFormat(item.nextTime)}} {{dateTimeFormat(item.nextTime)}}</td>     
                </tr>
                <tr v-if="tbodyTouch.length==0 && !loading">
                    <td :colspan="theadTouch.length" class="nothing-data">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <!--合同信息  -->
    <div class="content-info"  v-if="permissions.getContract && dataVisible.contract">
      <div class="page-oper">
        <div class="page-title">合同</div>
          <!-- <ul class="page-methods">
            <li v-if="btnVisible.contract && btnPermissions.contractCreate">
              <el-button type="success" size="small" @click="routerLink(`/order/contract/create/${baseData.id}`)">合同登记</el-button>
            </li>
          </ul> -->
      </div>
      <div class="default-detail " v-loading.lock="loading">
        <el-row class="textarea">
          <el-col>
            <el-col class="label el-1-9">合同编号</el-col>
            <el-col class="text el-8-9">
              {{contractsData.no}}
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">合同登记时间</el-col>
            <el-col :span="16">{{unixFormat(contractsData.createTime)}}</el-col>
          </el-col> 
          <el-col :span="8">
            <el-col :span="8" class="label">合同总金额</el-col>
            <el-col :span="16">{{contractsData.amount}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">合同剩余金额</el-col>
            <el-col :span="16">{{contractsData.arrearage}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">预付款</el-col>
            <el-col :span="16">{{contractsData.imprest}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">订单交付日期</el-col>
            <el-col :span="16">{{unixFormat(contractsData.deliveryTime)}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="label">最晚下单时间</el-col>
            <el-col :span="16">{{unixFormat(contractsData.latestPlaceTime)}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="8" class="label">创建合同员工名称</el-col>
            <el-col :span="16">{{contractsData.emplName}}</el-col>
          </el-col>
          <el-col :span="16">
            <el-col :span="4" class="label">门店名称</el-col>
            <el-col :span="16">{{contractsData.storeName}}</el-col>
          </el-col>
        </el-row>      
        <el-row class="textarea">
          <el-col>
            <el-col class="label el-1-9">备注</el-col>
            <el-col class="text el-8-9">
              {{contractsData.remark}}
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>

    <order @initOrder="initOrder" :sendInfo="sendInfo" ref="order"></order>
    <space-alert @initOrder="initOrder" :sendInfo="sendInfo" ref="space"></space-alert>
    <upload :sendInfo="sendInfo" ref="file"></upload>
     
     <div class="content-info">
      <div class="page-oper">
        <div class="page-title">订单列表</div>
        <ul class="page-methods">
            <li v-if="btnVisible.order && baseData.stCode < 500">
                <el-button type="primary" size="small" @click="permitOrdered(baseData.id)">允许下单</el-button>
            </li>
            <li v-if="baseData.stCode >= 500 && baseData.stCode <= 520 && $_has8('addSpace01') && baseData.dsgnId == employee.id">
              <el-button type="success" size="small" @click="openSpace('create')">新增空间</el-button>
            </li>
            <li v-if="baseData.stCode == 520 && $_has8('confirmOrder01') && baseData.dsgnId == employee.id">
              <el-button type="success" size="small" @click="closeOrder($route.params.id)">下单完毕</el-button>
            </li>
            <template v-if="baseData.stCode > 520 && baseData.stCode <= 560 && $_has8('confirmOrder01') && baseData.dsgnId == employee.id">
              <li>
                <span style="color: red">下单完毕日期：{{unixFormat(baseData.sequenceEndTime)}} {{dateTimeFormat(baseData.sequenceEndTime)}}</span>
              </li>
              <li>
                <el-button type="success" size="small" @click="cancelOrder($route.params.id)">取消下单完毕</el-button>
              </li>
            </template>
            <li>
              <el-button :type="isShow.buttonColor" size="small" @click="showOrder($route.params.id)">{{isShow.text}}</el-button>
            </li>
        </ul>
      </div>
        <div class="default-detail" v-loading.lock="loading">
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
                            <el-button type="success" size="small"   @click="openOrder(item.space,type)" v-if="$_has8('addOrder00') && type.orderSuperType == 1">新增{{type.name}}</el-button>
                            <el-button type="success" size="small"   @click="openOrder(item.space,type)" v-if="$_has8('addProOrder01') && type.orderSuperType == 3">新增{{type.name}}</el-button>
                            <!-- <el-button type="success" size="small" v-if="type.orderSuperType == 2 && $_has8('addResupplyOrder01')">新增补单</el-button> -->
                            <!-- <el-button type="success" size="small" v-if="type.orderSuperType == 4 && $_has8('addProResupplyOrder01')">新增工程单补单</el-button> -->
                         </template>
                            <el-button type="primary" size="small" @click="openSpace(item.space)" v-if="$_has8('edit01') && baseData.dsgnId == employee.id && baseData.stCode >= 500 && baseData.stCode <= 520">修改空间</el-button>
                      </td>  
                    </tr>
                    <template v-else>
                      <tr v-for="(orderItem ,orderIndex) in item.orders">  
                          <template v-if="orderIndex == 0 && baseData.stCode >= 500 && baseData.stCode <= 520 && baseData.dsgnId == employee.id">
                            <td :rowspan="item.orders.length + 1" >{{item.space.parentSpaceTypeName}}/{{item.space.spaceName}}</td>
                            <td :rowspan="item.orders.length + 1" >{{item.space.spaceTypeName}}</td>
                            <td :rowspan="item.orders.length + 1" >{{item.space.spaceStyleName}}</td>
                          </template>
                          <template v-else-if="orderIndex == 0">
                            <td :rowspan="item.orders.length " >{{item.space.parentSpaceTypeName}}/{{item.space.spaceName}}</td>
                            <td :rowspan="item.orders.length " >{{item.space.spaceTypeName}}</td>
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
    <div class="content-info">
    <div class="page-oper">
      <div class="page-title">补单列表</div>
       <ul class="page-methods">
           <li>
              <el-button :type="isShow.buttonColorRe" size="small" @click="showResupplys($route.params.id)">{{isShow.textRe}}</el-button>
            </li>
       </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th v-for="value in theadSuppleOrder" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>      
              <template v-for="(item, index) in tbodySuppleOrder">
                <tr v-for="(orderItem, orderIndex) in item.orders">         
                  <td v-if="orderIndex === 0" :rowspan="item.orders.length">{{item.space.spaceName}}</td>                  
                  <td>{{orderItem.orgTno}}</td>
                  <td>{{orderItem.tno}}</td>              
                  <td>{{orderItem.causeStr}}</td>           
                  <td>{{orderItem.retailPrice}}</td>
                  <td>{{unixFormat(orderItem.createTime)}} {{dateTimeFormat(orderItem.createTime)}}</td>
                  <td>{{orderItem.orderStatusSimpleVo.stcodeStr}}</td>
                </tr>         
              </template>
               <tr v-if="tbodySuppleOrder.length == 0 && !loading">
                    <td :colspan="theadSuppleOrder.length" class="nothing-data">暂无数据</td>
               </tr>  
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>
  </div>
   
    <!--交流信息  -->
    <div class="content-info" v-if="permissions.getCommu && dataVisible.communicate">
      <div class="page-oper">
        <div class="page-title">交流信息</div>
        <ul class="page-methods">
          <li v-if="btnVisible.communicate && btnPermissions.commuCreate">
            <el-button type="success" @click="routerLink(`/order/taskseq/communicate/${baseData.id}`)">交流登记</el-button>
          </li>
        </ul>
      </div>
      <div class="default-detail no-bot-border" v-loading.lock="loading">
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
                  <td>{{index+1}}</td>
                  <td>{{item.summary}}</td>
                  <td>{{item.emplName}}</td> 
                  <td>{{item.emplRoles}}</td>  
                  <td>{{item.emplMobile}}</td>     
                  <td>{{unixFormat(item.createTime)}}</td>
                </tr>
                <tr v-if="tbodyCommunication.length == 0 && !loading">
                    <td :colspan="theadCommunication.length + 1" class="nothing-data">暂无数据</td>
               </tr> 
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Taskseq, Order, Assistant, Resupply } from '../../../services/admin';
import mixins from '../../../components/mixins/base';
import order from '../../../components/orders/order.vue';
import spaceAlert from '../../../components/orders/space.vue';
import upload from '../../../components/orders/upload.vue';

export default {
  data() {
    return {
      baseData: {},
      measureData: {},
      orderType: [],
      theadFile: ['空间', '文件类型', '单空间价格（元）', '文件名称', '文件大小', '上传时间', '备注', '操作'],
      tbodyFile: [],
      theadInfo: ['查房人姓名', '查房时间', '查房意见'],
      tbodyInfo: [],
      theadTouch: ['沟通时间', '修改意见', '备注', '待成交关键点', '下次沟通时间'],
      tbodyTouch: [],
      contractsData: [],
      theadCommunication: ['交流信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      tbodyCommunication: [],
      theadOrder: ['空间名', '空间类型', '空间风格', '订单号', '品牌', '主材颜色', '订单信息', '下单员工', '零售价(元)', '约定交付日期', '收款状态', '订单状态', '上传'],
      tbodyOrder: [],
      theadSuppleOrder: ['空间名', '原订单号', '补单号', '补单原因', '零售价', '补单日期', '订单状态'],
      tbodySuppleOrder: [],
      loading: true,
      sendInfo: {},
      isShow: {
        type: true,
        text: '显示已删除订单',
        buttonColor: 'danger',
        typeRe: true,
        textRe: '显示已删除补单',
        buttonColorRe: 'danger',
      },
      permissions: {
        getBase: false,
        getMeasure: false,
        uploadFile: false,
        getWardRound: false,
        getTouch: false,
        getContract: false,
        getCommu: false,
      },
      btnPermissions: {
        updateBase: false,
        measureCreate: false,
        uploadFileCreate: false,
        wardRoundCreate: false,
        touchCreate: false,
        contractCreate: false,
        commuCreate: false,
      },
      btnVisible: {
        base: false,
        measure: false,
        touch: false,
        contract: false,
        wardRound: false,
        communicate: false,
        order: false,
      },
      dataVisible: {
        base: false,
        measure: false,
        touch: false,
        contract: false,
        wardRound: false,
        communicate: false,
        order: false,
      },
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  computed: {
    ...mapState('Global', ['employee', 'permissRemark']),
  },
  methods: {
    init: function (val) {
      this.permissions.getBase = this.$_hasMulti8('getBase95,getBase96,getBase97,getBase98,getBase99');
      this.permissions.getMeasure = this.$_hasMulti8('getMeasure95,getMeasure96,getMeasure97,getMeasure98,getMeasure99');
      this.permissions.uploadFile = this.$_hasMulti8('uploadFile95,uploadFile96,uploadFile97,uploadFile98,uploadFile99');
      this.permissions.getWardRound = this.$_hasMulti8('getWardRound95,getWardRound96,getWardRound97,getWardRound98,getWardRound99');
      this.permissions.getTouch = this.$_hasMulti8('getTouch95,getTouch96,getTouch97,getTouch98,getTouch99');
      this.permissions.getContract = this.$_hasMulti8('getContract95,getContract96,getContract97,getContract98,getContract99');
      this.permissions.getCommu = this.$_hasMulti8('getCommu95,getCommu96,getCommu97,getCommu98,getCommu99');
      this.btnPermissions = {
      // updateBase: this.$_hasMulti8('update95,update96,update97,update98,update99'),
      // measureCreate: this.$_hasMulti8('measure95,measure96,measure97,measure98,measure99'),
      // uploadFileCreate: this.$_hasMulti8('uploadFile95,...,uploadFile99'),
      // wardRoundCreate: this.$_hasMulti8('wardRound97,wardRound98,wardRound99'),
      // touchCreate: this.$_hasMulti8('touch95,touch96,touch97,touch98,touch99'),
      // contractCreate: this.$_hasMulti8('addContract99,...,addContract95'),
        commuCreate: this.$_hasMulti8('submitCommu95,submitCommu96,submitCommu97,submitCommu98,submitCommu99'),
      };
      // this.btnPermissions.updateBase = true;
      // this.btnPermissions.measureCreate = true;
      // this.btnPermissions.uploadFileCreate = true;
      // this.btnPermissions.wardRoundCreate = true;
      // this.btnPermissions.touchCreate = true;
      // this.btnPermissions.contractCreate = true;
      // this.btnPermissions.commuCreate = true;
      Taskseq.detailStcode(val).then(res => {
        res.data.forEach((state) => {
          this.switch(state.id, 'btnVisible');
        });
      }).catch(err => {
        console.log(err);
      });
      Taskseq.detailAllStcode(val).then(res => {
        res.data.forEach((state) => {
          this.switch(state.id, 'dataVisible');
        });
      }).catch(err => {
        console.log(err);
      });
      if (this.permissions.getBase) {
        Taskseq.detailBase(val).then(res => {
          this.sendInfo.cid = res.data.custId;
          this.sendInfo.lid = res.data.id;
          this.sendInfo.custName = res.data.ctctName;
          this.sendInfo.custMobile = res.data.ctctMobile;
          this.baseData = res.data;
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getBase = false;
          }
        });
      }
      if (this.permissions.getMeasure) {
        Taskseq.detailMeasure(val).then(res => {
          this.measureData = res.data;
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getMeasure = false;
          }
        });
      }
      if (this.permissions.uploadFile) {
        Taskseq.detailFile(val).then(res => {
          this.tbodyFile = res.data;
          console.log('res', res.data);
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.uploadFile = false;
          }
        });
      }
      if (this.permissions.getWardRound) {
        Taskseq.detailWardround(val).then(res => {
          this.tbodyInfo = res.data;
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getWardRound = false;
          }
        });
      }
      if (this.permissions.getTouch) {
        Taskseq.detailTouch(val).then(res => {
          this.tbodyTouch = res.data;
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getTouch = false;
          }
        });
      }
      if (this.permissions.getContract) {
        Taskseq.detailContracts(val).then(res => {
          this.contractsData = res.data;
          console.log('合同', res.data);
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getContract = false;
          }
        });
      }
      if (this.permissions.getCommu) {
        Taskseq.detailCommunication(val).then(res => {
          this.tbodyCommunication = res.data;
        }).catch(err => {
          if (err.code === 90999995) {
            this.permissions.getCommu = false;
          }
        });
      }
      Promise.all([
        Order.orderList(val),
        Resupply.resupplysList(val),
        Assistant.orderType(this.employee.organId)])
        .then(([orderList, resupplyList, orderType]) => {
          this.loading = false;
          this.tbodyOrder = orderList.data;
          this.tbodySuppleOrder = resupplyList.data;
          this.orderType = orderType.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
    switch: function (id, key) {
      switch (id) {
        case 0:
          this[key].order = true; break;
        case 1:
          this[key].base = true; break;
        case 2:
          this[key].measure = true; break;
        case 3:
          this[key].touch = true; break;
        case 4:
          this[key].contract = true; break;
        case 5:
          this[key].wardRound = true; break;
        case 6:
          this[key].communicate = true; break;
        default: break;
      }
    },
    initOrder(lid) {
      Order.orderList(lid).then(res => {
        this.tbodyOrder = res.data;
      }).catch(err => {
        console.log(err);
      });
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
      this.sendInfo.lid = this.$route.params.id;
      this.sendInfo.orderSubTypeStr = item.orderSubTypeStr;
      this.sendInfo.orderInfo = item.orderInfo;
      this.sendInfo.orderNum = item.orderNum;
      this.sendInfo.stcode = item.stcode;
      this.$refs.file.show();
      this.$refs.file.init(item.stcode);
    },
    permitOrdered(lid) {
      this.$confirm('确认允许下单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Taskseq.permitOrdered(lid)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.loading = true;
            this.init(this.$route.params.id);
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
      });
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
          this.isShow.type = true;
          this.isShow.text = '显示已删除订单';
          this.isShow.buttonColor = 'danger';
        }).catch(err => {
          console.log(err);
        });
      }
    },
    showResupplys(lid) {
      if (this.isShow.typeRe) {
        Resupply.undeletedOrder({ stcode: '999', lid: lid }).then((res) => {
          this.tbodySuppleOrder = res.data;
          this.isShow.typeRe = false;
          this.isShow.textRe = '隐藏已删除补单';
          this.isShow.buttonColorRe = 'success';
        }).catch(err => {
          console.log(err);
        });
      } else {
        Resupply.resupplysList(lid).then((res) => {
          this.tbodySuppleOrder = res.data;
          this.isShow.typeRe = true;
          this.isShow.textRe = '显示已删除补单';
          this.isShow.buttonColorRe = 'danger';
        }).catch(err => {
          console.log(err);
        });
      }
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
              Order.orderList(lid),
              Taskseq.detailBase(this.$route.params.id),
            ])
              .then(([orderList, baseData]) => {
                this.loading = false;
                this.tbodyOrder = orderList.data;
                this.baseData = baseData.data;
                this.sendInfo.cid = baseData.data.custId;
                this.sendInfo.lid = baseData.data.id;
                this.sendInfo.custName = baseData.data.ctctName;
                this.sendInfo.custMobile = baseData.data.ctctMobile;
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
              Order.orderList(lid),
              Taskseq.detailBase(this.$route.params.id),
            ])
              .then(([orderList, baseData]) => {
                this.loading = false;
                this.tbodyOrder = orderList.data;
                this.baseData = baseData.data;
                this.sendInfo.cid = baseData.data.custId;
                this.sendInfo.lid = baseData.data.id;
                this.sendInfo.custName = baseData.data.ctctName;
                this.sendInfo.custMobile = baseData.data.ctctMobile;
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
  },
  watch: {
    permissRemark(val) {
      if (val) {
        this.init(this.$route.params.id);
        console.log('58878', this.permissions);
      }
    },
  },
  mixins: [mixins],
  components: {
    order,
    spaceAlert,
    upload,
  },
};
</script>

<style lang="scss" scoped>
.el-message-box__message p {
  white-space: pre-wrap;
  line-height: 26px;
}
.upload {
  color: #3599e6;
  cursor: pointer;
}
.subOrders {
  margin-top: 4px;
  float: right;
}
.orderRouter span {
  color: #3599e6;
  cursor: pointer;
}
.operation .el-button span a{
    color: #ffffff;
 }
</style>
