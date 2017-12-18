<template>
  <div class="user-info-container">
    <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">个人中心</div>
        </div>
      </div>
      <div class="table">
        <div class="admin-table dis-flex">
          <table class="user-center-table">
            <thead>
              <tr>
                <th colspan="6">个人信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>门店编号</td>
                <td class="strong mid-size">{{userInfo.organId}}</td>
                <td>门店名称</td>
                <td colspan="3" class="strong">{{userInfo.organName}}</td>
              </tr>
              <tr>
                <td>员工编号</td>
                <td class="strong biggest-size speColor">{{userInfo.id}}</td>
                <td>员工姓名</td>
                <td>
                  <span class="mid-size strong">{{userInfo.name}}</span>&nbsp;{{userInfo.genderName}}
                </td>
                <td>员工手机</td>
                <td class="mid-size strong">{{userInfo.mobile}}</td>
              </tr>
              <tr>
                <td>员工角色</td>
                <td colspan="5">
                  <span class="strong" v-for="data in userInfo.roleList">{{data}}&nbsp;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
            <!--<el-table :data="tableData" style="width: 100%" class="docShare">-->
              <!--<el-table-column prop="title" label="文档名称" width="180"></el-table-column>-->
              <!--<el-table-column prop="typeName" label="类型" width="180"></el-table-column>-->
              <!--<el-table-column prop="addTime" label="日期"></el-table-column>-->
            <!--</el-table>-->
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
              <tr :class="tableData.length === 0 ? 'inBox center' : 'display-none' ">
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
    ...mapState('Global', ['userInfo']),
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>

</style>
