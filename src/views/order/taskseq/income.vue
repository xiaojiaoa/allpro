<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
        <div>
          <!-- <screening :screening="screening" @submit="query"></screening> -->
          <div class="page-oper">
            <div class="page-title">收款信息</div>
          </div>
        </div>
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
            <el-checkbox-group>
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
                    <td>{{item.contId}}</td>                  
                    <td class="router"><span @click="custDetail(item.custId)">{{item.no}}</span></td>
                    <td>{{item.money}}</td>
                    <td>合同收款</td>
                    <td>{{item.designer}}</td>
                    <td>{{unixFormat(item.contDate)}}</td>
                    <td>{{unixFormat(item.deliveryDate)}}</td>                            
                  </tr>
                  <tr v-if="tbody.length==0">
                    <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                  </tr>
                </tbody>
              </table>
            </el-checkbox-group>
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
// import screening from '../../../components/screening.vue';
import { Contracts } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['合同编号', '流水号', '收款金额（元）', '资金类型', '设计师', '登记日期', '约定交付日期'],
      tbody: [],
      paginationData: {
        page: 1,
      },
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      // screening: [
      //   [
      //     {
      //       label: '资金类型',
      //       type: 'input',
      //       field: 'payType',
      //     },
      //   ],
      // ],
    };
  },
  created() {
    this.init(this.$route.params.lid);
  },
  methods: {
    init: function (val) {
      Contracts.serialsComDetail(val).then(res => {
        this.loading = false;
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
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
    custDetail: function (val) {
      this.$router.push(`/basic/customers/detail/${val}`);
    },
    taskseqDetail: function (val) {
      this.$router.push(`/order/taskseq/detail/${val}`);
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
  mixins: [mixins],
  // components: {
  //   screening,
  // },
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
  },
};
</script>
