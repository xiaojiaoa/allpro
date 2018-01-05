<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">机构列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit()">新增机构</el-button>
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
              <td class="router"><span @click="detail(item.id)">{{item.id}}</span></td>
              <td>{{item.name}}</td>
              <td>{{item.owner}}</td>
              <td>{{item.address}}</td>
              <td>{{item.typeName}}</td>
              <td>{{item.isWarehouseName}}</td>
              <td>{{item.stateName}}</td>
              <td>{{unixFormat(item.addTime)}}</td>
              <td>
                <el-button type="primary" @click="department(item.id)">部门信息</el-button>
                <el-button type="primary" @click="employees(item.id)">查看员工</el-button>
              </td>
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
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['机构编号', '机构名称', '负责人姓名', '机构地址', '机构类型', '是否自带仓库', '机构状态', '新建日期', '查看'],
      tbody: [],
      screening: [
        [
          {
            label: '机构名称',
            type: 'input',
            field: 'name',
          },
          {
            label: '机构编号',
            type: 'input',
            field: 'id',
          },
          {
            label: '机构类型',
            type: 'select',
            field: 'type',
            data: [
              {
                name: '区域一',
                value: 'shanghai',
              }, {
                name: '区域一',
                value: 'shanghai',
              },
            ],
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
  mixins: [mixins],
  methods: {
    init: function (val) {
      Promise.all([
        Assistant.organ(),
        Organization.list(val)])
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
      const obj = {};
      if ('time' in val) {
        [obj.startDate, obj.endDate] = val.time;
      }
      Object.assign(obj, this.conditions, val);
      this.init(obj);
    },
    handleSizeChange: function (val) {
      this.conditions.pageSize = val;
      this.init(this.conditions);
    },
    handleCurrentChange: function (val) {
      this.conditions.pageNo = val;
      this.init(this.conditions);
    },
    detail: function (val) {
      this.$router.push(`/basic/organization/detail/${val}`);
    },
    edit: function () {
      this.$router.push('/basic/organization/edit');
    },
    department: function (val) {
      this.$router.push({ path: '/basic/department/list', query: { bid: val } });
    },
    employees: function (val) {
      this.$router.push({ path: '/basic/employees/list', query: { bid: val, type: 'organ', from: 'organ' } });
    },
  },
  components: {
    screening,
  },
};
</script>

<style lang="scss" scoped>

</style>
