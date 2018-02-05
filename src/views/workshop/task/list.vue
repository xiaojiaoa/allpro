<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">任务列表</div>
        </div>
      </div>
      <div class="dis-flex" v-loading.lock="loading">
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
                    <td>{{item.id}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.totalNum}}</td>
                    <td>{{item.restNum}}</td>
                    <td>{{item.doneNum}}</td>
                    <td>{{unixFormat(item.createTime)}}</td>   
                    <td>{{item.stcodeName}}</td>          
                  </tr>
                  <tr v-if="tbody.length==0 && !loading">
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
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
// import { Taskseq, Assistant } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['任务编号', '批次号', '工件数量', '已完成数量', '未完成数量', '开始时间', '任务状态'],
      tbody: [
        {
          id: '10002178',
          no: '217120701',
          totalNum: '30',
          restNum: '20',
          doneNum: '10',
          stcode: '220',
          stcodeName: '待执行',
          emp: '大饼',
          createTime: '2017-12-29',
        },
        {
          id: '10002180',
          no: '217120701',
          totalNum: '10',
          restNum: '0',
          doneNum: '10',
          stcode: '220',
          stcodeName: '待执行',
          emp: '大饼',
          createTime: '2017-12-31',
        },
        {
          id: '10002181',
          no: '217120701',
          totalNum: '25',
          restNum: '12',
          doneNum: '13',
          stcode: '220',
          stcodeName: '执行中',
          emp: '大饼',
          createTime: '2018-01-04',
        },
        {
          id: '10002182',
          no: '217120701',
          totalNum: '15',
          restNum: '8',
          doneNum: '7',
          stcode: '220',
          stcodeName: '待执行',
          emp: '大饼',
          createTime: '2018-01-05',
        },
        {
          id: '10002183',
          no: '217120701',
          totalNum: '22',
          restNum: '20',
          doneNum: '2',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-13',
        },
        {
          id: '10002184',
          no: '217120701',
          totalNum: '40',
          restNum: '20',
          doneNum: '20',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-15',
        },
        {
          id: '10002185',
          no: '217120701',
          totalNum: '20',
          restNum: '2',
          doneNum: '18',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-15',
        },
        {
          id: '10002186',
          no: '217120701',
          totalNum: '42',
          restNum: '24',
          doneNum: '18',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-16',
        },
        {
          id: '10002187',
          no: '217120701',
          totalNum: '48',
          restNum: '20',
          doneNum: '28',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-16',
        },
        {
          id: '10002188',
          no: '217120701',
          totalNum: '24',
          restNum: '12',
          doneNum: '12',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-16',
        },
        {
          id: '10002189',
          no: '217120701',
          totalNum: '36',
          restNum: '16',
          doneNum: '20',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-16',
        },
        {
          id: '10002190',
          no: '217120701',
          totalNum: '40',
          restNum: '20',
          doneNum: '20',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-17',
        },
        {
          id: '10002191',
          no: '217120701',
          totalNum: '30',
          restNum: '15',
          doneNum: '15',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-17',
        },
        {
          id: '10002192',
          no: '217120701',
          totalNum: '70',
          restNum: '50',
          doneNum: '20',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-18',
        },
        {
          id: '10002193',
          no: '217120701',
          totalNum: '35',
          restNum: '25',
          doneNum: '10',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-20',
        },
        {
          id: '10002194',
          no: '217120701',
          totalNum: '38',
          restNum: '20',
          doneNum: '18',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-23',
        },
        {
          id: '10002195',
          no: '217120701',
          totalNum: '38',
          restNum: '18',
          doneNum: '20',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-25',
        },
        {
          id: '10002198',
          no: '217120701',
          totalNum: '20',
          restNum: '10',
          doneNum: '10',
          stcode: '220',
          stcodeName: '已执行',
          emp: '大饼',
          createTime: '2018-01-25',
        },
      ],
      screening: [
        [
          {
            label: '任务编号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '批次号',
            type: 'input',
            field: 'ctctMobile',
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 18,
      },
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      console.log(this.$route.query);
      this.init(this.$route.query);
    }
  },
  methods: {
    init: function (val) {
      this.loading = false;
      console.log(val);
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
  mixins: [mixins],
  components: {
    screening,
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        console.log(this.conditions);
        this.init(this.conditions);
      }
    },
  },
};
</script>
