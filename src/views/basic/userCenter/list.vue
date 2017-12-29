<template>
  <div class="user-info-container">
    <div class="dis-flex container">
      <div class="dis-flex">
        <div class="page-oper">
          <div class="page-title">个人中心</div>
        </div>
        <el-row>
          <div class="big-size" style="padding:20px 0 20px 20px">个人信息</div>
        </el-row>
        <div class="default-detail user-info-cont">
          <el-row>
            <el-col :span="8">
              <el-col :span="6" class="label">门店编号</el-col>
              <el-col :span="16" class="mid-size">{{employee.organId}}</el-col>
            </el-col>
            <el-col :span="8">
              <el-col :span="6" class="label">门店名称</el-col>
              <el-col :span="16">{{employee.organName}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-col :span="6" class="label">员工编号</el-col>
              <el-col :span="16" class="biggest-size speColor">{{employee.id}}</el-col>
            </el-col>
            <el-col :span="8">
              <el-col :span="6" class="label">员工姓名</el-col>
              <el-col :span="16"> <span class="mid-size strong">{{employee.name}}</span>&nbsp;{{employee.genderName}}</el-col>
            </el-col>
            <el-col :span="8">
              <el-col :span="6" class="label">员工手机</el-col>
              <el-col :span="16" class="mid-size">{{employee.mobile}}</el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-col :span="6" class="label el-1-9">员工角色</el-col>
              <el-col :span="16" class="text el-8-9"> <span class="strong" v-for="data in employee.roleList">{{data}}&nbsp;</span></el-col>
            </el-col>
          </el-row>
        </div>


        <div class="user-center-bottom">
          <el-row>
            <div class="page-oper ">
              <div class="big-size" style="padding-left:20px;">站内通知</div>
              <router-link :to="{path: '/basic/siteMsg/list'}">
                <el-button type="primary" round>查看更多</el-button>
              </router-link>
            </div>
          </el-row>
          <el-row :gutter="24" style="margin:0">
            <el-col :span="14" class="user-bottom-left" style="padding-left:0;padding-right:40px">
              <ul v-for="(msgData,index) in msgData" class="inBox">
                <li class="strong">{{msgData.title}}
                  <span  :class="index === 0 ? 'inBoxSpan' : 'display-none' "></span>
                </li>
                <li class="inBoxContent">{{msgData.content}}</li>
                <li class="small-size color9">
                  <span>发送者：{{msgData.senderName}}</span>
                  <span style="padding-left:30px;">{{unixFormat(msgData.sendTime)}}</span>
                </li>
              </ul>
              <ul :class="msgData.length === 0 ? 'inBox' : 'display-none' ">
                <li class="center color6 base-size">暂无数据</li>
              </ul>
            </el-col>
            <el-col :span="10" class="user-bottom-right">
              <div class="page-oper">
                <div class="big-size">文档共享</div>
                <router-link :to="{path: '/basic/noticeInfo/list'}">
                  <el-button type="primary" round>查看更多</el-button>
                </router-link>
              </div>
              <table class="admin-table docShare">
                <thead>
                <tr class="base-size">
                  <th>文档名称</th>
                  <th>类型</th>
                  <th>日期</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in tableData">
                  <router-link :to="{path: `/basic/noticeInfo/detail/${data.id}`}">
                    <td>{{data.title}}</td>
                  </router-link>
                  <td>{{data.typeName}}</td>
                  <td>{{unixFormat(data.addTime)}}</td>
                </tr>
                <tr :class="tableData.length === 0 ? 'center' : 'display-none' ">
                  <td colspan="3">暂无数据</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { NoticeInfo, SiteMsg } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        tableData: [],
        msgData: [],
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        Promise.all([NoticeInfo.list(val), SiteMsg.msgList(val)])
          .then(([noticeInfo, msgList]) => {
            this.tableData = noticeInfo.data.result;
            this.msgData = msgList.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    computed: {
      ...mapState('Global', ['employee']),
    },
    components: {
    },
  };
</script>

<style lang="scss" scoped>

</style>
