<template>
  <div class="dis-flex">
    <div class="dis-flex siteMsgWrap">
      <div class="siteMsgTop">
        <div class="page-oper">
          <div class="page-title">站内通知</div>
        </div>
        <screening :screening="screening" @submit="query"></screening>
      </div>
      <div class="siteMsgBottom" v-loading.lock="loading">
        <ul v-for="(msgData,index) in msgData" class="siteMsgList">
          <li>
            <span  v-if="index === 0" class="latest">[最新]</span>
            <span class="strong">{{msgData.title}}</span>
            <span class="small-size color9" style="padding-left:30px;">发送者：{{msgData.senderName}}</span>
            <span class="small-size color9" style="padding-left:30px;">{{unixFormat(msgData.sendTime)}}</span>
          </li>
          <li class="inBoxContent color6">{{msgData.content}}</li>
        </ul>
        <ul class="center color6 base-size" v-if="msgData.length === 0">
          <li style="line-height: 35px;">暂无数据</li>
        </ul>
      </div>
      <div class="pagination" v-if="msgData.length !== 0">
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
              type: 'datepicker',
              field: 'startDate',
              data: [],
            },
            {
              type: 'datepicker',
              field: 'endDate',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: true,
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        SiteMsg.msgPage(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          this.msgData = res.data.result;
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
