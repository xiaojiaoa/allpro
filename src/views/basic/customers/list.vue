<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query" :flag="screeningFlag"></screening>
        <div class="page-oper">
          <div class="page-title">客户列表</div>
          <ul class="page-methods">
          </ul>
        </div>
      </div>
      <div class="dis-flex z1-table" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
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
                  <td>
                    {{index + 1}}
                  </td>
                  <td class="router"><span @click="detail(item)">{{item.cid}}</span></td>
                  <td>{{item.nickName}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.ctypeName}}</td>
                  <td>{{item.cliqueName}}</td>
                  <td>{{item.lid}}</td>
                  <td>{{item.stcode}}</td>
                  <td>{{item.stoName}}</td>
                  <td>{{item.empName}}</td>
                </tr>
                 <tr v-if="tbody.length==0 && !loading">
                    <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import screening from '../../../components/screening.vue';
import { Customers, Assistant } from '../../../services/admin';

export default {
  data() {
    return {
      thead: ['客户号', '客户名', '客户电话', '客户类型', '集团名称', '流水号', '流水状态', '建客门店', '建档人'],
      tbody: [],
      screeningFlag: false,
      screening: [
        [
          {
            label: '客户号',
            type: 'input',
            field: 'cid',
          }, {
            label: '客户手机',
            type: 'input',
            field: 'mobile',
          }, {
            label: '集团名称',
            type: 'select',
            field: 'cliqueId',
            data: [],
          }, {
            label: '客户类型',
            type: 'select',
            field: 'ctype',
            data: [
              {
                name: '个人客户',
                value: '10',
              }, {
                name: '企业客户',
                value: '50',
              },
            ],
          },
        ],
      ],
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
    };
  },
  created() {
    this.init();
    this.defaultValue();
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Promise.all([Customers.list(val), Assistant.cliqueList()])
        .then(([customers, cliques]) => {
          this.loading = false;
          this.paginationData = customers.data;
          this.tbody = customers.data.result;
          this.conditions.pageSize = customers.data.pageSize;
          this.conditions.pageNo = customers.data.page;
          this.screening[0][2].data = cliques.data;
        })
        .catch(err => {
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
    defaultValue: function () {
      const flag = this.$_has8('select00');
      if (flag === false) {
        this.screening[0][2].defaultValue = this.employee.cliqueId;
        this.screeningFlag = !this.screeningFlag;
      }
    },
    detail: function (data) {
      if (data.ctype === 10) {
        this.$router.push(`/basic/customers/detail/${data.cid}`);
      } else {
        this.$router.push(`/basic/customers/detail_enterprise/${data.cid}`);
      }
    },
    edit: function (val) {
      if (val === 'enterprise') {
        this.$router.push('/basic/customers/edit_enterprise');
      } else {
        this.$router.push('/basic/customers/edit');
      }
    },
  },
  computed: {
    ...mapState('Global', ['employee']),
    conditionsWatch: function () {
      return this.paginationData.page;
    },
    cliqueIdWatch: function () {
      return this.employee.cliqueId;
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
    cliqueIdWatch: function (val) {
      if (val !== 0) {
        this.defaultValue();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
