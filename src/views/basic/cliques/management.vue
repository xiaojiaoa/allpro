<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">布兰莎家具有限公司</div>
          <ul class="page-methods">
            <li>
              <el-button @click="role()">角色管理</el-button>
            </li>
            <li>
              <el-button @click="role()">门店管理</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="cliques-list">
        <div class="icon-oper">
          <span>
            <i class="iconfont icon-xinjian"></i>
          </span>
          <span>
            <i class="iconfont icon-sousuo"></i>
          </span>
        </div>
        <ul @wheel="scrollWatch">
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居</li>
          <li>嘉善大王椰家居</li>
          <li>据说名字很长我也不知道到底有多长</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居</li>
          <li>嘉善大王椰家居</li>
          <li>据说名字很长我也不知道到底有多长</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居</li>
          <li>嘉善大王椰家居</li>
          <li>据说名字很长我也不知道到底有多长</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>aaaa</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li>嘉善大王椰家居科技有限公司</li>
          <li ref="flag">嘉善大王椰家居科技有限公司</li>
        </ul>
        <div class="block">
          <div></div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="employees.paginationData.pageSize"
          layout="prev, pager, next, jumper"
          :total="employees.paginationData.totalItems">
        </el-pagination>
      </div>
      <div class="crumb">
        嘉善大王椰家居 / 市场部 / 一部 / 员工列表
      </div>
      <div class="dis-flex employees">
        <el-row class="dis-flex direction-row">
          <el-col :span="3" class="organ border">
            <div class="icon-oper">
              <span>
                <i class="iconfont icon-xinjian"></i>
              </span>
              <span>
                <i class="iconfont icon-sousuo"></i>
              </span>
            </div>
            <ul>
              <li v-for="item in organList">
                <div class="title">{{item.name}}</div>
                <div class="data" v-for="data in item.children" @click="chooseOrgan">{{data.name}}</div>
              </li>
            </ul>
          </el-col>
          <el-col :span="21" class="main">
            <div class="dis-flex main-table">
              <div>
                <screening :screening="employees.screening" @submit="query"></screening>
                <div class="page-oper">
                  <div class="page-title main-title">员工列表</div>
                  <ul class="page-methods">
                    <li>
                      <el-button type="primary" @click="edit()">新增</el-button>
                    </li>
                    <li>
                      <el-button type="primary"  @click="check()">修改</el-button>
                    </li>
                    <li>
                      <el-button type="primary"  @click="check()">禁用</el-button>
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
                          <th v-for="value in employees.thead" :title="value">
                            {{value}}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in employees.tbody">
                          <td>
                            <el-checkbox :label="((employees.conditions.pageNo - 1) * employees.conditions.pageSize) + index + 1"></el-checkbox>
                          </td>
                          <td class="router" @click="detail(item.id)">{{item.id}}</td>
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
                    :current-page="employees.paginationData.page"
                    :page-size="employees.paginationData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="employees.paginationData.totalItems">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dis-flex store">
        <el-row class="dis-flex direction-row">
          <el-col :span="3" class="organ border">
            <div class="icon-oper">
              <span>
                <i class="iconfont icon-xinjian"></i>
              </span>
              <span>
                <i class="iconfont icon-sousuo"></i>
              </span>
            </div>
            <ul>
              <li v-for="item in organList">
                <div class="title">{{item.name}}</div>
                <div class="data" v-for="data in item.children" @click="chooseOrgan">{{data.name}}</div>
              </li>
            </ul>
          </el-col>
          <el-col :span="21" class="main">
            <div class="dis-flex main-table">
              <div>
                <screening :screening="store.screening" @submit="query"></screening>
                <div class="page-oper">
                  <div class="page-title">门店列表</div>
                  <ul class="page-methods">
                    <li>
                      <el-button type="primary" @click="edit()">新增门店</el-button>
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
                      <th v-for="value in store.thead" :title="value">
                        {{value}}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in store.tbody">
                      <td>
                        {{index +1 }}
                      </td>
                      <td class="router" @click="detail(item.id)">{{item.id}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.owner}}</td>
                      <td>{{item.ownerMobile}}</td>
                      <td>{{item.address}}</td>
                      <td>{{item.isWarehouseName}}</td>
                      <td>{{item.typeName}}</td>
                      <td>{{item.stateName}}</td>
                      <td>{{item.addressTypeName}}</td>
                      <td>{{unixFormat(item.addTime)}}</td>
                      <td>
                        <router-link :to="{path: '/basic/department/list'}">
                        <el-button type="primary">部门信息</el-button>
                        </router-link>
                        <router-link :to="{path: '/basic/role/list'}">
                        <el-button type="primary">角色信息</el-button>
                        </router-link>
                        <router-link :to="{path: '/basic/employees/list', query:{bid: item.id}}">
                          <el-button type="primary">查看员工</el-button>
                        </router-link>
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
                  :current-page="store.paginationData.page"
                  :page-size="store.paginationData.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="store.paginationData.totalItems">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
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
      cliques: {},
      organList: [
        {
          name: '市场部',
          children: [
            {
              name: '一部',
            },
            {
              name: '二部二部',
            },
            {
              name: '三部三部三部',
            },
          ],
        }, {
          name: '策划部',
          children: [
            {
              name: '一部',
            },
            {
              name: '二部二部',
            },
            {
              name: '三部三部三部',
            },
          ],
        }, {
          name: '设计部',
          children: [
          ],
        }, {
          name: '市场部',
          children: [
            {
              name: '一部',
            },
            {
              name: '二部二部',
            },
            {
              name: '三部三部三部',
            },
          ],
        },
      ],
      employees: {
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
          pageSize: '',
          pageNo: '',
          did: this.$route.query.did,
        },
      },
      store: {
        thead: ['门店编号', '门店名称', '负责人姓名', '负责人手机号', '门店地址', '是否自带仓库', '门店类型', '门店状态', '门店位置', '添加时间', '查看'],
        tbody: [],
        screening: [
          [
            {
              label: '门店名称',
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
        conditions: {
          pageSize: '',
          pageNo: '',
        },
      },
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      this.initEmployee(this.$route.query.bid);
    }
  },
  methods: {
    scrollWatch: function () {
      const direction = window.event.wheelDelta;
      console.log(direction);
      console.log(this.$refs.flag.getBoundingClientRect().top);
      if (direction < 0) {
        if (this.$refs.flag.getBoundingClientRect().top < 266) {
          console.log(1);
        }
      }
    },
    chooseOrgan: function () {
    },

    init: function (val) {
      Employees.list(val).then(res => {
        this.employees.paginationData = res.data;
        this.employees.tbody = res.data.result;
        this.employees.conditions.pageSize = res.data.pageSize;
        this.employees.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    initEmployee: function (val) {
      Employees.employeeList(val).then(res => {
        this.employees.paginationData = res.data;
        this.employees.tbody = res.data.result;
        this.employees.conditions.pageSize = res.data.pageSize;
        this.employees.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    query: function (val) {
      const obj = {};
      Object.assign(obj, this.employees.conditions, val);
      this.init(obj);
    },
    handleSizeChange: function (val) {
      this.employees.conditions.pageSize = val;
      this.init(this.employees.conditions);
    },
    handleCurrentChange: function (val) {
      this.employees.conditions.pageNo = val;
      this.init(this.employees.conditions);
    },
    detail: function (val) {
      this.$router.push(`/basic/employees/detail/${val}`);
    },
    edit: function () {
      this.$router.push('/basic/employees/edit');
    },
    check: function () {
      this.$router.push('/basic/department/list');
    },
  },
  watch: {
  },
  components: {
    screening,
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../scss/views/basic/cliques/management.scss';
</style>
<style type="text/css">
  .el-pagination span{
    background-color: #fff;
  }
</style>
