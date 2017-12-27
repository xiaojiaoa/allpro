<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div style="border-bottom:1px solid #ccc;padding-bottom:20px;margin-bottom:20px;">
        <div class="page-oper">
          <div class="page-title">角色管理</div>
          <ul class="page-methods">
            <li>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'global'}}">
                <el-button type="success" v-if="buttonState">新建全局角色</el-button>
              </router-link>
              <router-link :to="{path: '/basic/role/edit',query: {scope: scope, type: 'self'}}">
                <el-button type="success" v-if="buttonState">新建自定义角色</el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="showOrgan">机构</el-button>
        <el-button type="primary" @click="showStore">门店</el-button>
      </div>
      <div class="table dis-flex">
        <div class="admin-table dis-flex">
          <screening
            v-if="searchType === 'organ'"
            ref="screening"
            :screening="screeningOrgan"
            @submit="query"
            @dataChange="getOrgan"
            @selectChange="buttonChange"
            :queryData="queryData"
            ></screening>
          <screening
            v-else
            ref="screening"
            :screening="screeningStore"
            @submit="query"
            @selectChange="buttonChange"
            :queryData="queryData"></screening>

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
                  <el-button type="primary" v-if="(item.state===1)?'disabled':''">修改</el-button>
                </router-link>
                <el-button :type="item.state == 1 ? 'danger' : 'success'" @click="edit(item.id, item.state)">{{(item.state == 1)?'禁用':'启用'}}</el-button>
              </td>
            </tr>
            <tr v-if="tbody.length==0">
              <td :colspan="thead.length" class="nothing-data">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import screening from '../../../components/screening.vue';
  import { Role, Store, Assistant } from '../../../services/admin';

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
        screeningOrgan: [
          [
            {
              label: '集团',
              type: 'selectLinkage',
              field: 'cliqueId',
              data: [],
              change: true,
            },
            {
              label: '机构',
              type: 'selectLinkage',
              field: 'bid',
              data: [],
              change: true,
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
              label: '门店',
              type: 'select',
              field: 'bid',
              data: [],
              change: true,
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
        buttonState: false,
        scope: '',
        queryData: {
          bid: '',
          cliqueId: '',
          state: '',
          name: '',
        },
        searchType: 'organ',
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
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        if (!this.$route.query.cliqueId && this.$route.query.bid) {
          this.storeApart();
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
        if (this.scope) {
          Role.list(params).then(res => {
            self.tbody = res.data.result;
            this.conditions = {};
            self.paginationData = res.data;
            self.conditions.pageSize = res.data.pageSize;
            self.conditions.pageNo = res.data.page;
            this.paginationData.page = 0;
            this.setquery(params);
          }).catch(err => {
            console.log(err);
          });
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      buttonChange: function (val) {
        if (this.$route.query.cliqueId || val.bid) {
          this.buttonState = true;
        }
      },
      getOrgan: function (val) {
        const self = this;
        self.buttonState = true;
        if (!val.cliqueId) {
          self.screeningOrgan[0][1].data = [];
        } else {
          if (val.bidNew) {
            self.scope = val.bidNew.scope;
          } else if (val.cliqueIdNew) {
            self.scope = val.cliqueIdNew.scope;
          }
          this.setquery({ scope: self.scope });
          Role.organList(val.cliqueId).then(res => {
            self.screeningOrgan[0][1].data = res.data;
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
      },
      storeApart: function () {
        const self = this;
        self.conditions = {};
        self.searchType = 'store';
        Store.list().then(res => {
          self.screeningStore[0][0].data = res.data.result;
        }).catch(err => {
          console.log(err);
        });
      },
      showStore: function () {
        this.resetInput();
        this.tbody = [];
        this.storeApart();
        this.scope = 99;
        this.setquery({ scope: 99 });
        this.buttonState = false;
      },
      edit: function (id, state) {
        const stcode = state === 1 ? 2 : 1;
        const params = { state: stcode };
        Role.del(id, params)
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '操作成功',
              type: 'success',
            });
            this.query(this.conditions);
          })
          .catch(err => {
            console.log(err);
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
