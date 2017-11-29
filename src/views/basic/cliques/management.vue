<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">{{name}}</div>
          <ul class="page-methods">
            <li>
              <el-button @click="role()">角色管理</el-button>
            </li>
            <li>
              <el-button @click="changeType()">{{type === 'organ' ? '门店管理' : '机构管理'}}</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex">
        <cliquesHeader :type="type" :id="cliques" @choose="chooseOrgan"></cliquesHeader>
        <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3" class="organ">
              <cliquesLeft :type="type" :id="organization"></cliquesLeft>
            </el-col>
            <el-col :span="21" class="main dis-flex">
              <cliquesMain :type="type" :bid="organization" :did="department"></cliquesMain>
            </el-col>
          </el-row>
        </div>
      </div>
<!--       <div class="dis-flex" v-show="sign === 'store'">
        <div class="organ-list store">
          <div class="icon-oper">
            <span>
              <i class="iconfont icon-xinjian" @click="add('Store')"></i>
            </span>
            <span>
              <i class="iconfont icon-sousuo"></i>
            </span>
          </div>
          <ul>
            <li v-for="item in store.organList.result" @click="chooseOrgan(item.id)" :class="{active: item.id === store.organActive}">{{item.name}}</li>
          </ul>
          <div class="block">
            <div></div>
          </div>
          <el-pagination
            @current-change="pageChange"
            :page-size="store.organList.pageSize"
            layout="prev, pager, next, jumper"
            :total="store.organList.totalItems">
          </el-pagination>
        </div>
        <div class="crumb">
          嘉善大王椰家居 / 市场部 / 一部 / 员工列表
        </div>
        <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3" class="organ border">
              <div class="icon-oper">
                <span>
                  <i class="iconfont icon-xinjian" @click="add('Department')"></i>
                </span>
                <span>
                  <i class="iconfont icon-sousuo"></i>
                </span>
              </div>
              <ul>
                <li v-for="item in store.departmentList">
                  <div class="title" @click="chooseDepart(item.id)" :class="{active: item.id === store.departActive}">{{item.name}}</div>
                  <div class="data" v-for="data in item.children" @click="chooseDepart(item.id)" :class="{active: item.id === store.departActive}">{{data.name}}</div>
                </li>
              </ul>
            </el-col>
            <el-col :span="21" class="main">
              <div class="dis-flex main-table">
                <div>
                  <screening :screening="store.screening" @submit="query"></screening>
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
                    <el-checkbox-group v-model="store.checkList">
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
                              <el-checkbox :label="((store.conditions.pageNo - 1) * store.conditions.pageSize) + index + 1"></el-checkbox>
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
      </div> -->
      
    </div>
  </div>
</template>

<script>
import cliquesHeader from '../../../components/cliquesHeader.vue';
import cliquesLeft from '../../../components/cliquesLeft.vue';
import cliquesMain from '../../../components/cliquesMain.vue';
import { Organization } from '../../../services/admin';

export default {
  data() {
    return {
      cliques: this.$route.params.id || 0,
      name: '',
      type: 'organ',
      organization: 0,
      department: 0,
      // organ: {
      //   thead: ['员工编号', '员工名称', '手机号', '员工属性', '所属部门', '员工角色', '账号状态'],
      //   tbody: [],
      //   screening: [
      //     [
      //       {
      //         label: '员工姓名',
      //         type: 'input',
      //         field: 'name',
      //       },
      //       {
      //         label: '员工手机',
      //         type: 'input',
      //         field: 'mobile',
      //       },
      //     ],
      //   ],
      //   paginationData: {},
      //   checkList: [],
      //   conditions: {
      //     pageNo: 1,
      //     pageSize: 20,
      //   },
      //   departConditions: {
      //     pageNo: 1,
      //     pageSize: 20,
      //   },
      //   departmentList: [],
      //   organList: [],
      //   cliques: {},
      //   organActive: 0,
      //   departActive: 0,
      // },
      // store: {
      //   thead: ['员工编号', '员工名称', '手机号', '员工属性', '所属部门', '员工角色', '账号状态'],
      //   tbody: [],
      //   screening: [
      //     [
      //       {
      //         label: '员工姓名',
      //         type: 'input',
      //         field: 'name',
      //       },
      //       {
      //         label: '员工手机',
      //         type: 'input',
      //         field: 'mobile',
      //       },
      //     ],
      //   ],
      //   paginationData: {},
      //   conditions: {
      //     pageNo: 1,
      //     pageSize: 20,
      //   },
      //   departConditions: {
      //     pageNo: 1,
      //     pageSize: 20,
      //   },
      //   departmentList: [],
      //   organList: [],
      //   cliques: {},
      //   organActive: 0,
      //   departActive: 0,
      // },
    };
  },
  created() {
    // this.chooseInit();
    Organization.detail(this.$route.params.id).then(res => {
      this.name = res.name;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    // scrollWatch: function () {
    //   const direction = window.event.wheelDelta;
    //   console.log(direction);
    //   console.log(this.$refs.flag.getBoundingClientRect().top);
    //   if (direction < 0) {
    //     if (this.$refs.flag.getBoundingClientRect().top < 266) {
    //       console.log(1);
    //     }
    //   }
    // },
    changeType: function () {
      if (this.type === 'organ') {
        this.type = 'store';
      } else {
        this.type = 'organ';
      }
    },
    // chooseInit: function () {
    //   const self = this;
    //   if (self.sign === 'organ') {
    //     self.initFunction.push(Organization.selectList(self.cliques));
    //     self.initParams.push('organList');
    //   } else {
    //     self.initFunction.push(Store.byOrganization({ id: self.cliques }));
    //     self.initParams.push('organList');
    //   }
    //   self.initFunction.push(Organization.detail(self.cliques));
    //   self.initParams.push('cliques');
    //   self.init();
    // },
    chooseOrgan: function (val) {
      const self = this;
      self.organization = val;
    },
    // chooseDepart: function (val) {
    //   const self = this;
    //   self[`${self.sign}`].conditions.did = val;
    //   self[`${self.sign}`].departActive = val;
    //   self.initEmployee(self[`${self.sign}`].conditions);
    // },
    // init: function () {
    //   const self = this;
    //   Promise.all(self.initFunction)
    //     .then((res) => {
    //       self.initParams.forEach((v, k) => {
    //         self[`${self.sign}`][`${v}`] = res[k].data;
    //       });
    //       console.log(self.organ);
    //       console.log(self.store);
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // },
    // initDepart: function (val) {
    //   const self = this;
    //   Department[self.departmentSign].call(self, val).then(res => {
    //     self[`${self.sign}`].departmentList = res.data;
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },
    // initEmployee: function (val) {
    //   const self = this;
    //   Employees[self.employeesSign].call(self, val).then(res => {
    //     self[`${self.sign}`].tbody = res.data.result;
    //     self[`${self.sign}`].paginationData = res.data;
    //     self[`${self.sign}`].conditions.pageSize = res.data.pageSize;
    //     self[`${self.sign}`].conditions.pageNo = res.data.page;
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },
    // pageChange: function (val) {
    //   const self = this;
    //   self[`${self.sign}`].paginationData.page = val;
    // },
    // query: function (val) {
    //   const self = this;
    //   if (Object.keys(val).length === 0) {
    //     self[`${self.sign}`].conditions = {};
    //     self[`${self.sign}`].conditions.pageSize = self[`${self.sign}`].paginationData.pageSize;
    //     self[`${self.sign}`].conditions.pageNo = self[`${self.sign}`].paginationData.page;
    //     self[`${self.sign}`].paginationData.page = 0;
    //   } else {
    //     Object.assign(self[`${self.sign}`].conditions, val);
    //     self[`${self.sign}`].paginationData.page = 0;
    //   }
    // },
    // handleSizeChange: function (val) {
    //   const self = this;
    //   self[`${self.sign}`].paginationData.pageSize = val;
    //   self[`${self.sign}`].conditions.pageSize = val;
    //   self[`${self.sign}`].paginationData.page = 0;
    // },
    // handleCurrentChange: function (val) {
    //   const self = this;
    //   self[`${self.sign}`].paginationData.page = val;
    // },
    // add: function (val) {
    //   this[`dialog${val}`] = true;
    //   this.dialogMark = val;
    //   if (val === 'Organization') {
    //     Assistant.clique().then(res => {
    //       this.organType = res.data;
    //     }).catch(err => {
    //       console.log(err);
    //     });
    //   }
    // },
    // onSubmit: function (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       `${this.dialogMark}`.add(this[`form${this.dialogMark}`]).then(res => {
    //         console.log('res', res);
    //         this.$message({
    //           message: `${this.options.message}个人客户成功`,
    //           type: 'success',
    //         });
    //         return true;
    //       })
    //         .catch(err => {
    //           this.$message({
    //             message: err.msg,
    //             type: 'error',
    //           });
    //         });
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //     return false;
    //   });
    // },
    // address: function (data) {
    //   this[`form${this.dialogMark}`].country = data.country;
    //   this[`form${this.dialogMark}`].province = data.province;
    //   this[`form${this.dialogMark}`].city = data.city;
    //   this[`form${this.dialogMark}`].dist = data.dist;
    // },
    // detail: function (val) {
    //   this.$router.push(`/basic/employees/detail/${val}`);
    // },
    // edit: function () {
    //   this.$router.push('/basic/employees/edit');
    // },
    // check: function () {
    //   this.$router.push('/basic/department/list');
    // },
  },
  components: {
    cliquesHeader,
    cliquesLeft,
    cliquesMain,
  },
  computed: {
    conditionsWatch: function () {
      return this[`${this.sign}`].paginationData.page;
    },
    organWatch: function () {
      return this[`${this.sign}`].paginationData.page;
    },
  },
  watch: {
    // conditionsWatch: function (val) {
    //   if (val !== 0) {
    //     this[`${this.sign}`].conditions.pageNo = val;
    //     this.initEmployee(this[`${this.sign}`].conditions);
    //   }
    // },
    // organWatch: function (val) {
    //   if (val !== 0) {
    //     this[`${this.sign}`].departConditions.pageNo = val;
    //     this.init(this[`${this.sign}`].departConditions);
    //   }
    // },
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
  .el-dialog__body{
    padding: 30px 60px 30px 30px;
  }
  .addOrgan{
    top: 10%!important;
    width: 1100px!important;
  }
</style>
