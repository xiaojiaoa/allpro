<template>
  <transition>
    <div class="dis-flex main-table">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title main-title">员工列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit()">新增员工</el-button>
            </li>
          </ul>
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
                <tr v-for="(item, index) in tbody" :key="index">
                  <td>
                    <el-checkbox :label="((conditions.pageNo - 1) * conditions.pageSize) + index + 1"></el-checkbox>
                  </td>
                  <td class="router"><span @click="detail(item.id)">{{item.id}}</span></td>
                  <td>{{item.name}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.empTypeName}}</td>
                  <td>{{item.deptName}}</td>
                  <td>
                    <span v-for="data in item.roleList">
                      {{data}}
                    </span>
                  </td>
                  <td>{{item.stateName}}</td>
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
  </transition>
</template>
<script type="text/javascript">
import screening from '../../components/screening.vue';
import { Employees } from '../../services/admin';

export default {
  data() {
    return {
      thead: ['员工编号', '员工名称', '手机号', '员工属性', '所属部门', '员工角色', '账号状态'],
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
      paginationData: {},
      checkList: [],
      conditions: {
        pageNo: 1,
        pageSize: 20,
        bid: 0,
        did: 0,
      },
    };
  },
  created() {
    this.init();
  },
  props: [
    'type',
    'bid',
    'did',
  ],
  methods: {
    init: function () {
      const self = this;
      if (this.type === 'organ') {
        Employees.list(self.conditions).then(res => {
          self.tbody = res.data.result;
          self.paginationData = res.data;
          self.conditions.pageSize = res.data.pageSize;
          self.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Employees.listOfStore(self.conditions).then(res => {
          self.tbody = res.data.result;
          self.paginationData = res.data;
          self.conditions.pageSize = res.data.pageSize;
          self.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    edit: function () {
      this.$router.push('/basic/employees/edit');
    },
    query: function (val) {
      const self = this;
      if (Object.keys(val).length === 0) {
        self.conditions = {
          bid: this.bid,
          did: this.did,
        };
        self.conditions.pageSize = self.paginationData.pageSize;
        self.conditions.pageNo = self.paginationData.page;
        self.paginationData.page = 0;
      } else {
        Object.assign(self.conditions, val);
        self.paginationData.page = 0;
      }
    },
    handleSizeChange: function (val) {
      const self = this;
      self.paginationData.pageSize = val;
      self.conditions.pageSize = val;
      self.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      const self = this;
      self.paginationData.page = val;
    },
    detail: function (val) {
      this.$router.push(`/basic/employees/detail/${val}`);
    },
  },
  components: {
    screening,
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  watch: {
    bid: function (val) {
      this.conditions.bid = val;
      this.init();
    },
    did: function (val) {
      this.conditions.did = val;
      this.init();
    },
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init();
      }
    },
  },
};
</script>
