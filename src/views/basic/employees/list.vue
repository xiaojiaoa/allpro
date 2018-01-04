<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">员工列表</div>
          <ul class="page-methods">
            <li v-if="$_has8('add27')">
              <el-button type="primary" @click="edit()">新增员工</el-button>
            </li>
            <li v-if="$_has8('checkAll17')">
              <el-button type="primary" @click="check()">查看所有部门信息</el-button>
            </li>
          </ul>
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
                    <td>
                      {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                    </td>
                    <td class="router"><span @click="detail(item.id)">{{item.id}}</span></td>
                    <td>{{item.name}}</td>
                    <td>{{item.mobile}}</td>              
                    <td>{{item.deptName}}</td>
                    <td>{{item.organName}}</td>
                    <td>
                      <span v-for="data in item.roleList">
                        {{data}}
                      </span>
                    </td>
                    <td>{{item.stateName}}</td>
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
import { Employees } from '../../../services/admin';

export default {
  data() {
    return {
      thead: ['员工编号', '员工名称', '手机号', '所属部门', '所属机构', '员工角色', '账号状态'],
      tbody: [],
      screening: [
        [
          {
            label: '员工姓名',
            type: 'input',
            field: 'name',
          },
          {
            label: '员工手机',
            type: 'input',
            field: 'mobile',
          },
        ],
      ],
      loading: true,
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
        did: this.$route.query.did,
        bid: this.$route.query.bid,
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
  methods: {
    init: function (val) {
      this.loading = true;
      if (!this.$route.query.bid) {
        Employees.list(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Employees.listOfStore(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      }
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
    detail: function (val) {
      this.$router.push({ path: `/basic/employees/detail/${val}`, query: this.$route.query });
    },
    edit: function () {
      this.$router.push('/basic/employees/edit');
    },
    check: function () {
      this.$router.push('/basic/department/list');
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
