<template>
   <el-dialog  v-model="alert" @click="hide" :showClose="false" :modal="false" custom-class="lid-dialog">
        <div class="dis-flex container">
          <screening :screening="screening" @submit="query" class="Search" ref="screening"></screening>
            <div class="dis-flex" v-loading.lock="loading">
             <div class="table dis-flex" >
                <div class="admin-table dis-flex">
                    <table class="admin-main-table">
                    <thead>
                        <tr>
                        <th>序号</th>
                        <th v-for="value in lidThead" :title="value">
                            {{value}}
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in lidTbody" @click="selectLid(item)">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.no }}</td>
                            <td>{{ item.stCodeName }}</td>
                            <td>{{ item.ctctName }}</td>
                            <td>
                              {{ item.ctctMobile }}
                            </td>
                            <td>{{ unixFormat(item.createTime) }} {{ dateTimeFormat(item.createTime) }}</td>
                        </tr>
                        <tr v-if="lidTbody.length==0">
                            <td :colspan="lidThead.length + 1" class="nothing-data">暂无数据</td>
                        </tr>
                    </tbody>
                    </table>
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
  </el-dialog>
</template>
<script type="text/javascript">
import screening from '../../components/screening.vue';
import { Taskseq } from '../../services/admin';
import mixins from '../../components/mixins/base';

export default {
  data() {
    return {
      alert: false,
      lidThead: ['流水号', '流水状态', '客户姓名', '客户电话', '交易时间'],
      lidTbody: [],
      paginationData: {},
      loading: true,
      screening: [
        [
          {
            label: '客户号',
            type: 'input',
            field: 'custId',
          },
          {
            label: '联系人手机',
            type: 'input',
            field: 'ctctMobile',
          },
          {
            label: '流水号',
            type: 'input',
            field: 'no',
          },
          {
            label: '流水状态',
            type: 'cascader',
            field: 'status',
            data: [],
          },
          {
            label: '交易时间',
            type: 'daterange',
            field: 'time',
          },
        ],
      ],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init(this.conditions);
      }
    },
    alert: function (val) {
      if (val === false) {
        this.$refs.screening.resetBtn();
      }
    },
  },
  methods: {
    init(val) {
      this.loading = true;
      Promise.all([Taskseq.list(val), Taskseq.detailFlowStatus()])
        .then(([list, status]) => {
          this.loading = false;
          this.screening[0][3].data = this.NestData(status.data);
          this.lidTbody = list.data.result;
          this.paginationData = list.data;
          this.conditions.pageSize = list.data.pageSize;
          this.conditions.pageNo = list.data.page;
        })
        .catch(err => {
          console.log(err);
        });
    },
    show() {
      this.alert = true;
    },
    hide() {
      this.alert = false;
    },
    selectLid(item) {
      this.$emit('selectLid', item);
    },
    query(val) {
      if (Object.keys(val).length === 0) {
        this.conditions = {};
        this.conditions.pageSize = this.paginationData.pageSize;
        this.conditions.pageNo = this.paginationData.page;
        this.paginationData.page = 0;
      } else {
        Object.assign(this.conditions, val);
        if ('time' in val && val.time[0] !== null && val.time[1] !== null) {
          const [a, b] = val.time;
          this.conditions.createTimeBegin = `${a} 00:00:00`;
          this.conditions.createTimeEnd = `${b} 00:00:00`;
        } else if ('status' in val) {
          [this.conditions.stCodeBegin, this.conditions.stCodeEnd] = val.status;
        }
        delete this.conditions.time;
        delete this.conditions.status;
        this.paginationData.page = 0;
      }
    },
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange(val) {
      this.paginationData.page = val;
    },
    filterData(data) {
      const a = [];
      for (let i = 0; i < data.length; i += 1) {
        const b = {};
        b.value = data[i].stCode;
        b.label = data[i].name;
        a.push(b);
      }
      return a;
    },
    NestData(data) {
      const a = [];
      for (let i = 0; i < data.length; i += 1) {
        const b = {};
        b.children = this.filterData(data);
        b.value = data[i].stCode;
        b.label = data[i].name;
        a.push(b);
      }
      return a;
    },
  },
  mixins: [mixins],
  components: {
    screening,
  },
};
</script>
<style scoped>
@import '../../scss/components/alert.scss';
.el-dialog__header {
  padding: 0;
}
tbody tr{
  cursor: pointer;
}
</style>