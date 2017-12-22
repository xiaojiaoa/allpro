<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">流水列表</div>
        </div>
      </div>
      <div class="table dis-flex">
        <div class="admin-table dis-flex">
          <el-checkbox-group v-model="checkList">
            <table class="admin-main-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th v-for="value in thead" :title="value">
                    {{value}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tbody">
                  <td>{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</td>
                  <td>{{item.channelId}}</td>                  
                  <td class="router"><span @click="custDetail(item.custId)">{{item.custId}}</span></td>
                  <td>{{item.custName}}/{{item.custMobile}}</td>
                  <td>{{item.realEstate}}</td>
                  <td class="router"><span @click="taskseqDetail(item.seqId)">{{item.seqId}}</span></td>
                  <td>{{item.emplName}}</td>
                  <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
                  <td>{{unixFormat(item.apptTime)}} {{dateTimeFormat(item.apptTime)}}</td>
                  <td>{{unixFormat(item.finishTime)}} {{dateTimeFormat(item.finishTime)}}</td>
                  <td>{{unixFormat(item.deliveryDate)}}</td>
                  <td>{{item.dsgnName}}</td>
                  <td>{{item.stCode}}</td>               
                </tr>
                <tr v-if="tbody.length==0">
                  <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
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
import screening from '../../../components/screening.vue';
import { Taskseq } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['门店号', '客户号', '客户名称/客户电话', '楼盘名称', '流水号', '建流水员工', '建流水时间', '预约量尺时间', '完成量尺时间', '预期交付时间', '设计师', '流水状态'],
      tbody: [],
      screening: [
        [
          {
            label: '客户号',
            type: 'input',
            field: 'custId',
          },
          {
            label: '客户电话',
            type: 'input',
            field: 'custMobile',
          },
          {
            label: '客户名称',
            type: 'input',
            field: 'custName',
          },
          {
            label: '设计师',
            type: 'select',
            field: 'dsgnIds',
            data: [],
          },
        ],
      ],
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
        did: this.$route.query.did,
      },
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      this.init(this.$route.query);
    }
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Taskseq.list(val).then(res => {
        console.log('569874', res);
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
      Taskseq.designer().then(res => {
        this.screening[0][3].data = res.data;
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
    custDetail: function (val) {
      this.$router.push(`/basic/customers/detail/${val}`);
    },
    taskseqDetail: function (val) {
      this.$router.push(`/order/taskseq/detail/${val}`);
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
