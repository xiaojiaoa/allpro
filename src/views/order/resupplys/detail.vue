<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">基本信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">补单状态</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.stcodeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">补单号</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.tno}}</el-col>
        </el-col>
         <el-col :span="8">
          <el-col :span="8" class="label">流水号</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.lno}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">补单信息</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.orderInfo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">装修风格</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.decoStyleStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">补单规格/数量</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.quantity}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">补单类型</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.orderTypeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">订单子类型</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.orderSubTypeStr}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">原订单号</el-col>
          <el-col :span="16">{{orderResupplyBasicInfo.orgTno}}</el-col>
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
          <el-col :span="16">{{orderResupplyBasicInfo.goodsTypeStr}}</el-col>
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
            {{unixFormat(orderResupplyBasicInfo.deliveryTime)}}
          </el-col>
        </el-col>
      </el-row>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">备注</el-col>
          <el-col class="text el-8-9">
            {{orderResupplyBasicInfo.remark}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">订单数量</el-col>
          <el-col class="text el-8-9">
            <template v-if="orderResupplyBasicInfo.orderNum > 1">
               {{orderResupplyBasicInfo.orderNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <el-button type="primary" size="mini" @click="routerLink(`/order/resupplys/childOrderList/${orderResupplyBasicInfo.id}`)">查看子订单</el-button>
            </template>
            <template v-else>
              {{orderResupplyBasicInfo.orderNum}}
            </template>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">同客户订单</el-col>
          <el-col class="text el-8-9">
            <template v-for="item in baseData.orders">
              <span class="router"><span @click="routerLink(`/order/resupplys/detail/${item.id}`)">{{item.tno}}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
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
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">问题反馈</el-col>
          <el-col class="text el-8-9">
             {{orderResupplyBasicInfo.describe}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">受理意见</el-col>
          <el-col class="text el-8-9">
            {{ orderResupplyBasicInfo.acceptOpinion}}
          </el-col>
        </el-col>
      </el-row>
    </div>

      <div class="page-oper">
      <div class="page-title">退回信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/resupplys/rebackInfoAll/${baseData.orderResupplyBasicInfo.id}`)">查看所有退回信息</el-button>
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
              <tr v-for="(item, index) in returnTbody" v-if="index < 5">            
                <td>{{item.orderBackVo.backStr}}</td>                  
                <td>{{item.orderBackVo.backTypeStr}}</td>
                <td>{{unixFormat(item.orderBackVo.createTime)}} {{dateTimeFormat(item.orderBackVo.createTime)}}</td>              
                <td>{{item.orderBackVo.remark}}</td>
                <td>{{item.orderBackVo.backEmp.name}}</td>       
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>
    <div class="page-oper">
      <div class="page-title">交流信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/resupplys/communicate/${baseData.orderResupplyBasicInfo.id}`)">交流登记</el-button>
        </li>
         <li>
          <el-button type="primary" @click="routerLink(`/order/resupplys/communicateAll/${baseData.orderResupplyBasicInfo.id}`)">查看所有交流信息</el-button>
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
          <el-button type="primary" @click="routerLink(`/order/resupplys/fileCreate/${orderResupplyBasicInfo.stcode}/${orderResupplyBasicInfo.id}/${orderResupplyBasicInfo.lid}`)">文件管理</el-button>
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
        <!-- 订单审核 -->
        <template v-if="$_has8('review01') && orderResupplyBasicInfo.lockGid == employee.organId">
          <li v-if="$_has8('unlock01') && orderResupplyBasicInfo.stcode == 410">
            <el-button type="primary" size="small" @click="submitProcess('unlockReview')">解锁</el-button>
          </li>
          <li v-if="$_has8('reEdit01') && orderResupplyBasicInfo.stcode == 420">
              <el-button type="primary" size="small" @click="submitProcess('reEditReview')">重新编辑</el-button>
          </li>
        </template>
        <!-- 订单拆单 -->
        <template v-if="$_has8('apartOrder01') && orderResupplyBasicInfo.lockGid == employee.organId">
          <li v-if="$_has8('unlock01') && orderResupplyBasicInfo.stcode == 510">
            <el-button type="primary" size="small" @click="submitProcess('unlockApart')">解锁</el-button>
          </li>
          <li v-if="$_has8('reEdit01') && orderResupplyBasicInfo.stcode == 520">
              <el-button type="primary" size="small" @click="submitProcess('reEditApart')">重新编辑</el-button>
          </li>
        </template>
        <!-- 订单拆审 -->
        <template v-if="$_has8('apartReview01') && orderResupplyBasicInfo.lockGid == employee.organId">
          <li v-if="$_has8('unlock01') && orderResupplyBasicInfo.stcode == 610">
            <el-button type="primary" size="small" @click="submitProcess('unlockApartReview')">解锁</el-button>
          </li>
          <li v-if="$_has8('reEdit01') && orderResupplyBasicInfo.stcode == 620">
              <el-button type="primary" size="small" @click="submitProcess('reEditApartReview')">重新编辑</el-button> 
          </li>
        </template>
        <!-- 订单排料 -->
        <template v-if="$_has8('schedule01') && orderResupplyBasicInfo.lockGid == employee.organId">
          <li v-if="$_has8('unlock01') && orderResupplyBasicInfo.stcode == 710">
            <el-button type="primary" size="small" @click="submitProcess('unlockSchedule')">解锁</el-button>
          </li>
          <li v-if="$_has8('reEdit01') && orderResupplyBasicInfo.stcode == 720">
              <el-button type="primary" size="small" @click="submitProcess('reEditSchedule')">重新编辑</el-button>
          </li>
        </template>
         <!-- 补单受理 -->
        <template v-if="$_has8('accepted01') && orderResupplyBasicInfo.lockGid == employee.organId">
          <li v-if="$_has8('unlock01') && orderResupplyBasicInfo.stcode == 210">
            <el-button type="primary" size="small" @click="submitProcess('unlockAccept')">解锁</el-button>
          </li>
          <li v-if="$_has8('reEdit01') && orderResupplyBasicInfo.stcode == 220">
              <el-button type="primary" size="small" @click="submitProcess('reEditAccept')">重新编辑</el-button>
          </li>
        </template>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">受理时间</el-col>
          <el-col :span="16">
             {{unixFormat(statusData.acceptTime)}} {{dateTimeFormat(statusData.acceptTime)}}
             <span v-if="orderResupplyBasicInfo.stcode == 210">受理中</span>
              <template v-if="$_has8('accepted01') && orderResupplyBasicInfo.lockGid == employee.organId">
                  <el-button type="primary" size="mini" @click="openReback('processAccept')" v-if=" $_has8('process01') && orderResupplyBasicInfo.stcode == 210">提交受理</el-button>
                  <el-button type="primary" size="mini" @click="openReback('rebackAccept')" v-if=" $_has8('reback01') && orderResupplyBasicInfo.stcode == 210">受理退回</el-button>
              </template>
              <el-button type="primary" size="mini" @click="submitProcess('remarkAccept')" v-if=" $_has8('accepted01') && $_has8('remark01') && orderResupplyBasicInfo.afterStcode == 210 ">标记为受理中</el-button>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">受理人</el-col>
          <el-col :span="16">{{acceptEmp !== null ? acceptEmp.name : ''}}</el-col>
        </el-col>
      </el-row>
     <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">
             {{unixFormat(statusData.reviewTime)}} {{dateTimeFormat(statusData.reviewTime)}}
             <span v-if="orderResupplyBasicInfo.stcode == 410">审核中</span>
             <template v-if="$_has8('review01') && orderResupplyBasicInfo.lockGid == employee.organId">
                <el-button type="primary" size="mini" @click="openProcess('processReview')" v-if="$_has8('process01') && orderResupplyBasicInfo.stcode == 410">提交审核</el-button>
                <el-button type="primary" size="mini" @click="openReback('rebackReview')" v-if=" $_has8('reback01') && orderResupplyBasicInfo.stcode == 410">审核退回</el-button>
            </template>
            <el-button type="primary" size="mini" @click="submitProcess('remarkReview')" v-if="$_has8('review01') && $_has8('remark01') && orderResupplyBasicInfo.afterStcode == 410 ">标记为审核中</el-button>
          </el-col>
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
          <el-col :span="16">{{modifyPriceEmp !== null ? modifyPriceEmp.name : ''}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">收款确认</el-col>
          <el-col :span="16">{{unixFormat(statusData.receiptTime)}} {{dateTimeFormat(statusData.receiptTime)}}</el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">确认人</el-col>
          <el-col :span="16">{{ receiptEmp !== null ? receiptEmp.name : '' }}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单时间</el-col>
          <el-col :span="16" >
            {{unixFormat(statusData.apartTime)}} {{dateTimeFormat(statusData.apartTime)}}
            <span v-if="orderResupplyBasicInfo.stcode == 510">拆单中</span>
             <template v-if="$_has8('apartOrder01') && orderResupplyBasicInfo.lockGid == employee.organId">
                <el-button type="primary" size="mini" @click="openProcess('processApart')" v-if=" $_has8('process01') && orderResupplyBasicInfo.stcode == 510">提交拆单</el-button>
                <el-button type="primary" size="mini" @click="openReback('rebackApart')" v-if=" $_has8('reback01') && orderResupplyBasicInfo.stcode == 510">拆单退回</el-button>
            </template>
            <el-button type="primary" size="mini" @click="submitProcess('remarkApart')" v-if="$_has8('apartOrder01') && $_has8('remark01') && orderResupplyBasicInfo.afterStcode == 510 ">标记为拆单中</el-button>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单人</el-col>
          <el-col :span="16"  v-if="apartEmp !== null">{{apartEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">拆单审核时间</el-col>     
          <el-col :span="16">
            {{unixFormat(statusData.apartReviewTime)}} {{dateTimeFormat(statusData.apartReviewTime)}}
            <span v-if="orderResupplyBasicInfo.stcode == 610">拆审中</span>
             <template v-if="$_has8('apartReview01') && orderResupplyBasicInfo.lockGid == employee.organId">
                <el-button type="primary" size="mini" @click="submitProcess('sumitApartReview')" v-if="$_has8('process01') && orderResupplyBasicInfo.stcode == 610">提交拆审</el-button>
                <el-button type="primary" size="mini" @click="openReback('rebackApartReview')" v-if=" $_has8('reback01') && orderResupplyBasicInfo.stcode == 610">拆审退回</el-button>
             </template>
             <el-button type="primary" size="mini" @click="submitProcess('remarkApartReview')" v-if="$_has8('apartReview01') && $_has8('remark01') && orderResupplyBasicInfo.afterStcode == 610 ">标记为拆审中</el-button>
          </el-col>     
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">拆审人</el-col>
          <el-col :span="16"  v-if="apartReviewEmp !== null">{{apartReviewEmp.name}}</el-col>
          <el-col :span="16" v-else></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-col :span="8" class="label">排料时间</el-col>     
          <el-col :span="16">
            {{unixFormat(statusData.produceTime)}} {{dateTimeFormat(statusData.produceTime)}}
            <span v-if="orderResupplyBasicInfo.stcode == 710">排料中</span>
            <template v-if="$_has8('schedule01') && orderResupplyBasicInfo.lockGid == employee.organId">
                <el-button type="primary" size="mini" @click="submitProcess('submitSchedule')" v-if="$_has8('process01') && orderResupplyBasicInfo.stcode == 710">提交排料</el-button>
                <el-button type="primary" size="mini" @click="openReback('rebackSchedule')" v-if="$_has8('reback01') && orderResupplyBasicInfo.stcode == 710">排料退回</el-button>
            </template>
            <el-button type="primary" size="mini" @click="submitProcess('remarkSchedule')" v-if="$_has8('schedule01') && $_has8('remark01') && orderResupplyBasicInfo.afterStcode == 710 ">标记为排料中</el-button>
          </el-col>     
        </el-col>
        <el-col :span="12">
          <el-col :span="8" class="label">排料人</el-col>
          <el-col :span="16"  v-if="scheduleEmp !== null">{{scheduleEmp.name}}</el-col>
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
         <el-col :span="16">{{outStorageEmp !== null ? outStorageEmp.name : ''}}</el-col>   
        </el-col>       
      </el-row>
    </div>

     <div class="page-oper">
      <div class="page-title">日志信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="routerLink(`/order/resupplys/logInfoAll/${baseData.orderResupplyBasicInfo.id}`)">查看所有日志信息</el-button>
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
                    <td>{{item.roleNames}}</td>              
                    <td>{{item.mobile}}</td>
                    <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
                 </template>
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>

    <el-dialog :title="options.title" v-model="rebackDialog" :close-on-click-modal="false" :before-close="rebackResetBefore">
        <el-form  :model="backForm"  ref="backForm" label-width="30%" :rules="rules">
           <el-row>
              <el-col :span="20">
                    <el-form-item  label="补单原因" prop="causeStr" v-if=" options.type == 'processAccept' ">
                        <el-checkbox-group v-model="causeStr" @change="formatCauseStr()">
                          <el-checkbox v-for="item in resupplysReason" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item  label="退回类型" prop="backStr" v-else>
                        <el-checkbox-group v-model="backStr" @change="formatBackStr()">
                          <el-checkbox v-for="item in backReason" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-form-item  label="备注">
                        <el-input type="textarea" v-model="backForm.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('backForm')">取 消</el-button>
            <el-button type="primary" @click="confirm('backForm', 'reback')">{{ options.buttonM}}</el-button>
        </div>
    </el-dialog>

    <el-dialog :title="options.title" v-model="ProcessDialog" :close-on-click-modal="false" :before-close="processResetBefore">
        <el-form  :model="processForm"  ref="processForm" label-width="30%" :rules="rules">
           <el-row>
              <el-col :span="20">
                    <el-form-item  label="审核价" prop="retailPrice" v-if=" options.price == 'review' ">
                       <el-input  v-model="processForm.retailPrice"></el-input>
                    </el-form-item>
                     <el-form-item  label="精确价" prop="exactPrice" v-if=" options.price == 'apart' ">
                       <el-input  v-model="processForm.exactPrice"></el-input>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-form-item  label="备注">
                        <el-input type="textarea" v-model="processForm.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('processForm')">取 消</el-button>
            <el-button type="primary" @click="confirm('processForm', 'process')">确认提交</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Resupply, Assistant, Process } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      dialogJoinReback: false,
      loading: true,
      request: false,
      baseData: {},
      sendInfo: {},
      orderResupplyBasicInfo: {},
      customer: {},
      store: {},
      createEmp: {},
      reviewEmp: {},
      modifyPriceEmp: {},
      receiptEmp: {},
      apartEmp: {},
      apartReviewEmp: {},
      acceptEmp: {},
      scheduleEmp: {},
      outStorageEmp: {},
      statusData: {},
      returnThead: ['退回原因', '退回类型', '退回时间', '备注', '操作员工'],
      returnTbody: [],
      theadCommunication: ['交流信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      tbodyCommunication: [],
      relatedFilesThead: ['订单号', '文件名', '文件类型', '上传时间', '上传员工', '备注'],
      relatedFilesTbody: [],
      logThead: ['日志信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      logTbody: [],
      rebackDialog: false,
      ProcessDialog: false,
      backReason: [],
      resupplysReason: [],
      backStr: [],
      causeStr: [],
      message: '',
      backForm: {
        backType: '',
        backStr: '',
        causeStr: '',
        remark: '',
      },
      processForm: {
        retailPrice: '',
        exactPrice: '',
        remark: '',
      },
      rules: {
        backStr: [
          { required: true, message: '请至少选择一项类型', trigger: 'submit' },
        ],
        retailPrice: [
          { required: true, message: '请填写审核价格', trigger: 'submit' },
        ],
        exactPrice: [
          { required: true, message: '请填写精确价', trigger: 'submit' },
        ],
        causeStr: [
          { required: true, message: '请至少选择一项原因', trigger: 'submit' },
        ],
      },
      options: {
        type: '',
        title: '',
        price: '',
        buttonM: '',
      },
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
        Resupply.orderDetail(val), Resupply.detailCommunication(val), Resupply.orderStatus(val),
        Resupply.orderLog({ tid: val }), Resupply.returnInfo(val),
        Assistant.resupplysReason()])
        .then(([
          orderDetail, detailCommunication, orderStatus, orderLog,
          returnInfo, resupplysReason]) => {
          this.loading = false;
          this.baseData = orderDetail.data;
          this.orderResupplyBasicInfo = orderDetail.data.orderResupplyBasicInfo;
          this.customer = orderDetail.data.orderResupplyBasicInfo.customer;
          this.store = orderDetail.data.orderResupplyBasicInfo.store;
          this.createEmp = orderDetail.data.orderResupplyBasicInfo.createEmp;
          this.tbodyCommunication = detailCommunication.data.result;
          this.returnTbody = returnInfo.data.result;
          this.statusData = orderStatus.data.orderStatusDetail;
          this.reviewEmp = orderStatus.data.orderStatusDetail.reviewEmp;
          this.modifyPriceEmp = orderStatus.data.orderStatusDetail.modifyPriceEmp;
          this.apartEmp = orderStatus.data.orderStatusDetail.apartEmp;
          this.scheduleEmp = orderStatus.data.orderStatusDetail.scheduleEmp;
          this.outStorageEmp = orderStatus.data.orderStatusDetail.outStorageEmp;
          this.apartReviewEmp = orderStatus.data.orderStatusDetail.apartReviewEmp;
          this.acceptEmp = orderStatus.data.orderStatusDetail.acceptEmp;
          this.resupplysReason = resupplysReason.data;
          this.logTbody = orderLog.data.result;
          Promise.all([
            Resupply.orderAllFileInfo({
              lid: this.orderResupplyBasicInfo.lid,
              tid: val,
            }),
            Assistant.backReason(orderDetail.data.orderResupplyBasicInfo.stcode),
          ])
            .then(([fileInfo, backReason]) => {
              this.relatedFilesTbody = fileInfo.data;
              this.backReason = backReason.data;
              this.backForm.backType = backReason.data[0].reasonType;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitProcess(type) {
      let message = '';
      let title = '';
      let options = '';
      switch (type) {
        case 'unlockReview':
          title = '确认解锁？';
          message = '解锁成功';
          options = 'unlockReview';
          break;
        case 'unlockApart':
          title = '确认解锁？';
          message = '解锁成功';
          options = 'unlockApart';
          break;
        case 'unlockApartReview':
          title = '确认解锁？';
          message = '解锁成功';
          options = 'unlockApartReview';
          break;
        case 'unlockSchedule':
          title = '确认解锁？';
          message = '解锁成功';
          options = 'unlockSchedule';
          break;
        case 'reEditReview':
          title = '确认重新编辑？';
          message = '编辑成功';
          options = 'reEditReview';
          break;
        case 'reEditApart':
          title = '确认重新编辑？';
          message = '编辑成功';
          options = 'reEditApart';
          break;
        case 'reEditApartReview':
          title = '确认重新编辑？';
          message = '编辑成功';
          options = 'reEditApartReview';
          break;
        case 'reEditSchedule':
          title = '确认重新编辑？';
          message = '编辑成功';
          options = 'reEditSchedule';
          break;
        case 'remarkReview':
          title = '确认标记为审核中？';
          message = '标记成功';
          options = 'remarkReview';
          break;
        case 'remarkApart':
          title = '确认标记为拆单中？';
          message = '标记成功';
          options = 'remarkApart';
          break;
        case 'remarkApartReview':
          title = '确认标记为拆审中？';
          message = '标记成功';
          options = 'remarkApartReview';
          break;
        case 'remarkSchedule':
          title = '确认标记为排料中？';
          message = '标记成功';
          options = 'remarkSchedule';
          break;
        case 'sumitApartReview':
          title = '确认提交拆审？';
          message = '提交成功';
          options = 'processApartReview';
          break;
        case 'submitSchedule':
          title = '确认提交排料？';
          message = '提交成功';
          options = 'processSchedule';
          break;
        case 'remarkAccept':
          title = '确认标记为受理中？';
          message = '标记成功';
          options = 'remarkAccept';
          break;
        case 'unlockAccept':
          title = '确认解锁';
          message = '解锁成功';
          options = 'unlockAccept';
          break;
        case 'reEditAccept':
          title = '确认重新编辑？';
          message = '编辑成功';
          options = 'reEditAccept';
          break;
        default:
          break;
      }
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Process[options].call(this, this.$route.params.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: message,
            });
            this.init(this.$route.params.id);
          })
          .catch(err => {
            this.$message.error(`${err.msg}`);
          });
      });
    },
    formatBackStr() {
      if (typeof this.backStr === 'object') {
        this.backForm.backStr = this.backStr.join(',');
      }
    },
    formatCauseStr() {
      if (typeof this.causeStr === 'object') {
        this.backForm.causeStr = this.causeStr.join(',');
      }
    },
    openReback(type) {
      switch (type) {
        case 'rebackReview':
          this.options.title = '审核退回';
          this.options.type = 'rebackReview';
          this.message = '退回成功';
          this.options.buttonM = '确认退回';
          break;
        case 'rebackApart':
          this.options.title = '拆单退回';
          this.options.type = 'rebackApart';
          this.message = '退回成功';
          this.options.buttonM = '确认退回';
          break;
        case 'rebackApartReview':
          this.options.title = '拆审退回';
          this.options.type = 'rebackApartReview';
          this.message = '退回成功';
          this.options.buttonM = '确认退回';
          break;
        case 'rebackSchedule':
          this.options.title = '排料退回';
          this.options.type = 'rebackSchedule';
          this.message = '退回成功';
          this.options.buttonM = '确认退回';
          break;
        case 'processAccept':
          this.options.title = '提交受理';
          this.options.type = 'processAccept';
          this.message = '提交成功';
          this.options.buttonM = '确认提交';
          break;
        case 'rebackAccept':
          this.options.title = '受理退回';
          this.options.type = 'rebackAccept';
          this.message = '退回成功';
          this.options.buttonM = '确认退回';
          break;
        default:
          break;
      }
      this.rebackDialog = true;
    },
    openProcess(type) {
      switch (type) {
        case 'processReview':
          this.options.title = '提交审核';
          this.options.type = 'processReview';
          this.options.price = 'review';
          this.message = '提交成功';
          break;
        case 'processApart':
          this.options.title = '提交拆单';
          this.options.type = 'processApart';
          this.options.price = 'apart';
          this.message = '提交成功';
          break;
        default:
          break;
      }
      this.ProcessDialog = true;
    },
    confirm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          console.log(120, this.backForm);
          Process[this.options.type].call(this, type === 'reback' ? this.backForm : this.processForm, this.$route.params.id).then(() => {
            this.$message({
              message: this.message,
              type: 'success',
            });
            this.resetForm(formName);
            this.init(this.$route.params.id);
          }).catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    resetForm(formName) {
      this.backForm.backStr = '';
      this.backForm.remark = '';
      this.backForm.causeStr = '';
      this.causeStr = [];
      this.backStr = [];
      this.processForm = {
        retailPrice: '',
        exactPrice: '',
        remark: '',
      };
      if (formName === 'backForm') {
        this.rebackDialog = false;
      } else {
        this.ProcessDialog = false;
      }
      this.$refs[formName].resetFields();
    },
    rebackResetBefore() {
      this.resetForm('backForm');
    },
    processResetBefore() {
      this.resetForm('processForm');
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
};
</script>
<style scoped>
.el-checkbox{
  margin:0 15px 0 0; 
}
</style>
