<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">集团列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit()">新增集团</el-button>
            </li>
          </ul>
        </div>
      </div>
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
              <td class="router" @click="detail(item.id)">{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.owner}}</td>
              <td>{{item.address}}</td>
              <!-- <td>{{item.typeName}}</td> -->
              <td>{{item.isWarehouseName}}</td>
              <td>{{item.stateName}}</td>
              <td>{{unixFormat(item.addTime)}}</td>
              <td>
                <el-button type="primary" @click="management(item.id)">集团管理</el-button>
              </td>
            </tr>
             <tr v-if="tbody.length==0">
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
</template>

<script>
import screening from '../../../components/screening.vue';
import { Organization, Assistant } from '../../../services/admin';

export default {
  data() {
    return {
      thead: ['集团编号', '集团名称', '负责人姓名', '集团地址', '是否自带仓库', '集团状态', '新建日期', '查看'],
      tbody: [],
      screening: [
        [
          {
            label: '集团名称',
            type: 'input',
            field: 'name',
          },
          {
            label: '集团编号',
            type: 'input',
            field: 'id',
          },
          {
            label: '新建日期',
            type: 'daterange',
            field: 'time',
          },
        ],
      ],
      typeData: [],
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function (val) {
      Promise.all([
        Assistant.organ(),
        Organization.cliquesList(val)])
        .then(([organ, list]) => {
          this.screening[0][2].data = organ.data;
          this.paginationData = list.data;
          this.tbody = list.data.result;
          this.conditions.pageSize = list.data.pageSize;
          this.conditions.pageNo = list.data.page;
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
        if ('time' in val) {
          [this.conditions.startDate, this.conditions.endDate] = val.time;
        }
        delete this.conditions.time;
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
    management: function (val) {
      this.$router.push(`/basic/cliques/management/${val}`);
    },
    detail: function (val) {
      this.$router.push(`/basic/cliques/detail/${val}`);
    },
    edit: function () {
      this.$router.push('/basic/cliques/edit');
    },
    department: function (val) {
      this.$router.push({ path: '/basic/department/list', query: { bid: val } });
    },
    employees: function (val) {
      this.$router.push({ path: '/basic/employees/list/', query: { bid: val } });
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
