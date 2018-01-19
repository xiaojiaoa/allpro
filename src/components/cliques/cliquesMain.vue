<template>
  <transition>
    <div class="dis-flex main-table">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title main-title">员工列表</div>
          <ul class="page-methods">
            <li v-if="permissionAdd">
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
      permissionAdd: false,
      thead: ['员工编号', '员工名称', '手机号', '所属部门', '员工角色', '账号状态'],
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
        bid: this.bid,
        did: this.did,
      },
    };
  },
  created() {
    console.log(this.type);
    this.init();
  },
  props: [
    'type',
    'cliques',
    'bid',
    'did',
  ],
  methods: {
    init: function () {
      const self = this;
      if (this.type === 'organ') {
        self.permissionAdd = self.$_has8('addOrgan29');
        Employees.list(self.conditions).then(res => {
          self.tbody = res.data.result;
          self.paginationData = res.data;
          self.conditions.pageSize = res.data.pageSize;
          self.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      } else {
        self.permissionAdd = self.$_has8('addStore29');
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
      this.$router.push({
        path: '/basic/employees/edit',
        query: {
          type: this.type,
          bid: this.bid,
          did: this.did,
          cliques: this.cliques,
        },
      });
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
      this.$router.push({
        path: `/basic/employees/detail/${val}`,
        query: {
          type: this.type,
          bid: this.bid,
          did: this.did,
          cliques: this.cliques,
        },
      });
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
