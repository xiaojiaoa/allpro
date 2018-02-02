<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">流水列表</div>
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
                    <td>{{item.storeId}}</td>                  
                    <td>{{item.custId}}</td>
                    <td>{{item.ctctName}}/{{item.ctctMobile}}</td>
                    <td>{{item.estate}}</td>
                    <td class="router"><span @click="taskseqDetail(item.id)">{{item.no}}</span></td>
                    <td>{{item.emplName}}</td>
                    <td>{{unixFormat(item.apptTime)}}</td>
                    <td>{{unixFormat(item.cmplTime)}}</td>
                    <td>{{unixFormat(item.deliveryDate)}}</td>
                    <td>{{item.dsgnName}}</td>
                    <td>{{item.stCodeName}}</td>             
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
import { Taskseq } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['门店号', '客户号', '联系人名称/联系人电话', '楼盘名称', '流水号', '建流水员工', '预约量尺时间', '完成量尺时间', '预期交付时间', '设计师', '流水状态'],
      tbody: [],
      screening: [
        [
          {
            label: '客户号',
            type: 'input',
            field: 'custId',
          },
          {
            label: '联系人',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '联系人电话',
            type: 'input',
            field: 'ctctMobile',
          },
          {
            label: '设计师',
            type: 'select',
            field: 'dsgnId',
            data: [],
          },
        ],
      ],
      paginationData: {
        page: 1,
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
      const ltype = this.$route.meta.type;
      const params = {
        stCodeBegin: '',
        stCodeEnd: '',
      };
      if (ltype !== 'taskseq') {
        if (ltype === 'measure') {
          params.stCodeBegin = 220;
          params.stCodeEnd = 290;
        }
        if (ltype === 'touch') {
          params.stCodeBegin = 290;
          params.stCodeEnd = 350;
        }
        if (ltype === 'contract') {
          params.stCodeBegin = 350;
          params.stCodeEnd = 490;
        }
        if (ltype === 'wardRound') {
          params.stCodeBegin = 290;
          params.stCodeEnd = 350;
        }
        Object.assign(this.conditions, params);
        this.init(params);
      } else {
        this.init();
      }
    } else {
      this.init(this.$route.query);
    }
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Taskseq.list(val).then(res => {
        this.loading = false;
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
      // Taskseq.tskStcode().then(res => {
      //   this.screening[0][4].data = res.data;
      //   this.screening[0][5].data = res.data;
      // }).catch(err => {
      //   console.log(err);
      // });
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
  mixins: [mixins],
  components: {
    screening,
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        // 删除空字符串
        // for (const key in this.conditions) {
        //   if (Object.prototype.hasOwnProperty.call(this.conditions, key)) {
        //     if (this.conditions[key] === '') {
        //       delete this.conditions[key];
        //     }
        //   }
        // }
        this.init(this.conditions);
      }
    },
  },
};
</script>
