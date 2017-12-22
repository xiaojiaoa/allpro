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
              <el-button type="primary">修改角色</el-button>
              <el-button type="danger" @click="edit()">删除角色</el-button>
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
          <screening ref="screening" :screening="screening" @submit="query" @dataChange="getOrgan" @selectChange="buttonChange"></screening>
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
                  <el-checkbox :key="item.id" :value="item.id"></el-checkbox>
                  {{index+1}}
                </td>
                <td>{{item.name}}</td>
                <td>{{item.overall}}</td>
                <td>{{item.stateName}}</td>
              </tr>
              <tr v-if="tbody.length==0">
                <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
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
  import { Role, Store } from '../../../services/admin';

  export default {
    data() {
      return {
        thead: ['序号', '角色名', '是否是全局', '状态'],
        tbody: [],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        roleState: [
          {
            id: 1,
            name: '启用',
          },
          {
            id: 2,
            name: '禁用',
          },
        ],
        screening: [],
        buttonState: false,
        scope: '',
      };
    },
    created() {
    },
    methods: {
      init: function () {
        const self = this;
        self.screening[0][2].data = self.roleState;
      },
      query: function (val) {
        const self = this;
        if (Object.keys(val).length !== 0) {
          Role.list(val).then(res => {
            self.tbody = res.data.result;
            this.conditions = {};
            self.paginationData = res.data;
            self.conditions.pageSize = res.data.pageSize;
            self.conditions.pageNo = res.data.page;
            this.paginationData.page = 0;
          }).catch(err => {
            console.log(23333, err);
          });
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      buttonChange: function () {
        this.buttonState = true;
        this.scope = 99;
      },
      getOrgan: function (val) {
        const self = this;
        self.buttonState = true;
        if (val.bidNew) {
          self.scope = val.bidNew.scope;
        } else {
          self.scope = val.cliqueIdNew.scope;
        }
        Role.organList(val.cliqueId).then(res => {
          self.screening[0][1].data = res.data;
        }).catch(err => {
          console.log(23333, err);
        });
      },
      showOrgan: function () {
        const self = this;
        this.$refs.screening.resetBtn();
        self.buttonState = false;
        self.screening = [];
        self.conditions = {};
        self.screening = [
          [
            {
              label: '集团',
              type: 'select',
              field: 'cliqueId',
              data: [],
              change: true,
            },
            {
              label: '机构',
              type: 'select',
              field: 'bid',
              data: [],
              change: true,
            },
            {
              label: '状态',
              type: 'selectSingle',
              field: 'state',
              data: [],
            },
          ],
        ];
        self.screening[0][2].data = self.roleState;
        Role.cliqueList().then(res => {
          self.screening[0][0].data = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      showStore: function () {
        const self = this;
        this.$refs.screening.resetBtn();
        self.buttonState = false;
        self.screening = [];
        self.conditions = {};
        self.screening = [
          [
            {
              label: '门店',
              type: 'selectSingle',
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
              type: 'selectSingle',
              field: 'state',
              data: [],
            },
          ],
        ];
        self.screening[0][2].data = self.roleState;
        Store.list().then(res => {
          self.screening[0][0].data = res.data.result;
        }).catch(err => {
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
