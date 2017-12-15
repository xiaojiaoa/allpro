<template>
  <div class="dis-flex">
    <div class="dis-flex siteMsgWrap">
      <div class="siteMsgTop">
        <div class="page-oper">
          <div class="page-title">站内通知</div>
        </div>
        <screening :screening="screening" @submit="query"></screening>
      </div>
      <div class="siteMsgBottom">
        <ul v-for="(msgData,index) in msgData" class="siteMsgList">
          <li>
            <span  :class="index === 0 ? '' : 'display-none'" class="latest">[最新]</span>
            <span class="strong">{{msgData.title}}</span>
            <span class="small-size color9" style="padding-left:30px;">发送者：{{msgData.senderName}}</span>
            <span class="small-size color9" style="padding-left:30px;">{{unixFormat(msgData.sendTime)}}</span>
          </li>
          <li class="inBoxContent">{{msgData.content}}</li>
        </ul>
        <ul class="center" :class="msgData.length === 0 ? '' : 'display-none'">
          <li style="line-height: 35px;">暂无数据</li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.page"
          :page-size="paginationData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.totalItems">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { SiteMsg } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import screening from '../../../components/screening.vue';

  export default {
    data() {
      return {
        msgData: [],
        screening: [
          [
            {
              label: '发送时间',
              type: 'daterange',
              field: 'date',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        SiteMsg.msgList(val).then(res => {
          this.paginationData = res.data;
          this.msgData = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      query: function (val) {
        if (Object.keys(val).length === 0) {
          this.conditions = {};
          this.conditions.pageSize = this.paginationData.pageSize;
          this.conditions.pageNo = this.paginationData.page;
          this.paginationData.page = 0;
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      handleSizeChange: function (val) {
        this.paginationData.pageSize = val;
        this.conditions.pageSize = val;
        this.paginationData.page = 0;
      },
      handleCurrentChange: function (val) {
        this.paginationData.page = val;
      },
    },
    computed: {
      conditionsWatch: function () {
        return this.paginationData.page;
      },
    },
    components: {
      screening,
    },
    watch: {
      conditionsWatch: function (val) {
        if (val !== 0) {
          this.conditions.pageNo = val;
          this.init(this.conditions);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
