<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div style="border-bottom:1px solid #ccc;padding-bottom:20px;margin-bottom:20px;">
        <div class="page-oper">
          <div class="page-title">角色管理</div>
          <ul class="page-methods">
            <li>

              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'global'}}">
                <el-button type="success" v-if="buttonState && Number(scope) !== 99 && $_has8('add29')">新建全局角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'self'}}">
                <el-button type="success" v-if="buttonState && Number(scope) !== 99 && $_has8('add29')">新建自定义角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'global'}}">
                <el-button type="success" v-if="buttonState && Number(scope) !== 99 && $_has8('add28')">新建全局角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'self'}}">
                <el-button type="success" v-if="buttonState && Number(scope) !== 99 && $_has8('add28')">新建自定义角色</el-button>
              </router-link>

              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'global'}}">
                <el-button type="success" v-if="buttonState && Number(scope) === 99 && $_has8('addStore29')">新建全局角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'self'}}">
                <el-button type="success" v-if="buttonState && Number(scope) === 99 && $_has8('addStore29')">新建自定义角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'global'}}">
                <el-button type="success" v-if="buttonState && Number(scope) === 99 && $_has8('addStore28')">新建全局角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'self'}}">
                <el-button type="success" v-if="buttonState && Number(scope) === 99 && $_has8('addStore28')">新建自定义角色</el-button>
              </router-link>

            </li>
          </ul>
        </div>
      </div>
      <div class="buttonSelect">
        <el-button @click="showOrgan" :class="{'el-button--primary': searchType === 'organ'}">机构</el-button>
        <el-button @click="showStore" :class="{'el-button--primary': searchType === 'store'}">门店</el-button>
      </div>
      <screening
        v-if="searchType === 'organ'"
        ref="screening"
        :screening="screeningOrgan"
        :flag="screeningFlag"
        @submit="query"
        @dataChange="getOrgan"
        :queryData="queryData"
      ></screening>
      <screening
        v-else
        ref="screening"
        :screening="screeningStore"
        @submit="query"
        :flag="screeningFlag"
        @dataChange="getOrgan"
        :queryData="queryData">
      </screening>
      <div class="dis-flex z1-table" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th v-for="value in thead" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in tbody">
                <td>
                  {{index+1}}
                </td>
                <td>{{item.name}}</td>
                <td>{{item.overall}}</td>
                <td>{{item.stateName}}</td>
                <td>
                  <router-link :to="{path: '/basic/role/edit/'+item.id,query: {scope: item.scope}}">
                    <el-button type="primary" v-if="Number(scope) !== 99 && $_has8('edit49')">修改</el-button>
                    <el-button type="primary" v-if="Number(scope) !== 99 && $_has8('edit48')">修改</el-button>
                    <el-button type="primary" v-if="Number(scope) === 99 && $_has8('editStore49')">修改</el-button>
                    <el-button type="primary" v-if="Number(scope) === 99 && $_has8('editStore48')">修改</el-button>
                  </router-link>
                  <el-button :type="item.state == 1 ? 'danger' : 'success'" v-if="Number(scope) !== 99 && $_has8('forbid39')" @click="edit(item.id, item.state)">{{(item.state == 1)?'禁用':'启用'}}</el-button>
                  <el-button :type="item.state == 1 ? 'danger' : 'success'" v-if="Number(scope) !== 99 && $_has8('forbid38')" @click="edit(item.id, item.state)">{{(item.state == 1)?'禁用':'启用'}}</el-button>
                  <el-button :type="item.state == 1 ? 'danger' : 'success'" v-if="Number(scope) === 99 && $_has8('forbidStore39')" @click="edit(item.id, item.state)">{{(item.state == 1)?'禁用':'启用'}}</el-button>
                  <el-button :type="item.state == 1 ? 'danger' : 'success'" v-if="Number(scope) === 99 && $_has8('forbidStore38')" @click="edit(item.id, item.state)">{{(item.state == 1)?'禁用':'启用'}}</el-button>
                </td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                <td :colspan="thead.length+1" class="nothing-data">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pagination" v-if="tbody.length !== 0">
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
  import { Role, Assistant } from '../../../services/admin';

  export default {
    data() {
      return {
        thead: ['序号', '角色名', '是否是全局', '状态', '操作'],
        tbody: [],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        screeningFlag: false,
        screeningOrgan: [
          [
            {
              label: '集团',
              type: 'selectLinkage',
              field: 'cliqueId',
              data: [],
              change: true,
              defaultValue: null,
              index: 0,
            },
            {
              label: '机构',
              type: 'selectLinkage',
              field: 'bid',
              data: [],
              change: true,
              index: 1,
            },
            {
              label: '角色名',
              type: 'input',
              field: 'name',
              data: [],
            },
            {
              label: '状态',
              type: 'select',
              field: 'state',
              data: [
                {
                  name: '启用',
                  value: '1',
                }, {
                  name: '禁用',
                  value: '2',
                },
              ],
            },
          ],
        ],
        screeningStore: [
          [
            {
              label: '集团',
              type: 'selectLinkage',
              field: 'cliqueId',
              data: [],
              change: true,
              defaultValue: null,
              index: 0,
            },
            {
              label: '门店',
              type: 'select',
              field: 'bid',
              data: [],
              index: 1,
            },
            {
              label: '角色名',
              type: 'input',
              field: 'name',
              data: [],
            },
            {
              label: '状态',
              type: 'select',
              field: 'state',
              data: [
                {
                  name: '启用',
                  value: '1',
                }, {
                  name: '禁用',
                  value: '2',
                },
              ],
            },
          ],
        ],
        searchType: 'organ',
        buttonState: false,
        queryData: {
          bid: '',
          cliqueId: '',
          state: '',
          name: '',
        },
        scope: '',
        loading: false,
      };
    },
    created() {
      this.scope = this.$route.query.scope;
      this.queryData = this.$route.query;
      this.queryData = {
        cliqueId: this.queryData.cliqueId ? parseInt(this.queryData.cliqueId, 10) : null,
        bid: this.queryData.bid ? parseInt(this.queryData.bid, 10) : null,
        name: this.queryData.name ? this.queryData.name : '',
        state: this.queryData.state ? this.queryData.state : '',
      };
      if (this.$route.query.bid || this.$route.query.cliqueId) {
        this.buttonState = true;
      }
      this.defaultValue();
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        if (Number(this.$route.query.scope) === 99) {
          this.storeApart();
          if (this.$route.query.cliqueId) {
            Role.storeList(this.$route.query.cliqueId).then(res => {
              this.screeningStore[0][1].data = res.data;
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          this.organApart();
          if (this.$route.query.cliqueId) {
            Role.organList(this.$route.query.cliqueId).then(res => {
              this.screeningOrgan[0][1].data = res.data;
            }).catch(err => {
              console.log(err);
            });
          }
        }
        this.query(this.$route.query);
      },
      setquery: function (params) {
        this.$router.push({
          path: '/basic/role/list',
          query: params,
        });
      },
      query: function (val) {
        const self = this;
        const params = val;
        params.scope = this.scope;
        if (Number(this.$route.query.scope) === 99 && !val.bid) {
          this.$message({
            message: '请选择门店进行查询',
          });
          return;
        }
        if (this.scope && val.cliqueId) {
          self.loading = true;
          Role.list(params).then(res => {
            self.tbody = res.data.result;
            this.conditions = {};
            self.paginationData = res.data;
            self.conditions.pageSize = res.data.pageSize;
            self.conditions.pageNo = res.data.page;
            this.paginationData.page = 0;
            this.setquery(params);
            self.loading = false;
          }).catch(err => {
            console.log(err);
          });
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      defaultValue: function () {
        const flag = this.$_has8('select18');
        const flag2 = this.$_has8('selectStore18');
        const eid = this.employee.cliqueId;
        if (flag === true && Number(this.$route.query.scope) !== 99) {
          this.screeningOrgan[0][0].defaultValue = this.employee.cliqueId;
          this.scope = this.employee.scope;
          if (eid !== undefined) {
            Role.organList(eid).then(res => {
              this.screeningOrgan[0][1].data = res.data;
              this.buttonState = true;
            }).catch(err => {
              console.log(err);
            });
          }
          this.screeningFlag = !this.screeningFlag;
        }
        if (flag2 === true && Number(this.$route.query.scope) === 99) {
          this.screeningStore[0][0].defaultValue = this.employee.cliqueId;
          if (eid !== undefined) {
            Role.storeList(eid).then(res => {
              this.screeningStore[0][1].data = res.data;
              this.buttonState = true;
            }).catch(err => {
              console.log(err);
            });
          }
          this.screeningFlag = !this.screeningFlag;
        }
      },
      getOrgan: function (val) {
        const self = this;
        if (Number(this.$route.query.scope) !== 99) {
          if (val.cliqueId) {
            if (val.bidNew) {
              self.scope = val.bidNew.scope;
            } else if (val.cliqueIdNew) {
              self.scope = val.cliqueIdNew.scope;
            }
            self.buttonState = true;
            this.setquery({ scope: self.scope });
            Role.organList(val.cliqueId).then(res => {
              self.screeningOrgan[0][1].data = res.data;
            }).catch(err => {
              console.log(err);
            });
          }
        } else if (val.cliqueId) {
          self.buttonState = true;
          Role.storeList(val.cliqueId).then(res => {
            this.screeningStore[0][1].data = res.data;
          }).catch(err => {
            console.log(err);
          });
        }
      },
      resetInput: function () {
        this.queryData = {};
      },
      organApart: function () {
        const self = this;
        self.conditions = {};
        self.searchType = 'organ';
        Assistant.cliqueList().then(res => {
          self.screeningOrgan[0][0].data = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      showOrgan: function () {
        this.resetInput();
        this.organApart();
        this.tbody = [];
        this.buttonState = false;
        this.scope = '';
        this.setquery({ scope: '' });
        this.defaultValue();
      },
      storeApart: function () {
        const self = this;
        self.conditions = {};
        self.searchType = 'store';
        Assistant.cliqueList().then(res => {
          self.screeningStore[0][0].data = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      showStore: function () {
        this.resetInput();
        this.storeApart();
        this.tbody = [];
        this.scope = 99;
        this.setquery({ scope: 99 });
        this.buttonState = false;
        this.defaultValue();
      },
      edit: function (id, state) {
        const stcode = state === 1 ? 2 : 1;
        const params = { state: stcode };
        this.$confirm('确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
        }).then(() => {
          Role.del(id, params)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '操作成功',
                type: 'success',
              });
              this.query(this.queryData);
            })
            .catch(err => {
              console.log(err);
            });
        });
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
    components: {
      screening,
    },
    computed: {
      conditionsWatch: function () {
        return this.paginationData.page;
      },
      ...mapState('Global', ['employee']),
      cliqueIdWatch: function () {
        return this.employee.cliqueId;
      },

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
  .buttonSelect{
    margin-bottom:20px;
  }
</style>
