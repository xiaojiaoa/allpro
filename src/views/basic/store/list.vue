<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">门店列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit()">新增门店</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
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
                  {{index +1 }}
                </td>
                <td class="router"><span @click="detail(item.id)">{{item.id}}</span></td>
                <td>{{item.name}}</td>
                <td>{{item.owner}}</td>
                <td>{{item.ownerMobile}}</td>
                <td>{{item.address}}</td>
                <td>{{item.isWarehouseName}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.stateName}}</td>
                <td>{{item.addressTypeName}}</td>
                <td>{{unixFormat(item.addTime)}}</td>
                <td>{{item.manageOrganizationName}}</td>
                <td>
                  <router-link :to="{path: `/basic/department/list/${item.id}`}">
                  <el-button type="primary">部门信息</el-button>
                  </router-link>
                  <router-link :to="{path: '/basic/employees/list', query:{bid: item.id}}">
                    <el-button type="primary">查看员工</el-button>
                  </router-link>
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
  import { Store, Assistant } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        thead: ['门店编号', '门店名称', '负责人姓名', '负责人手机号', '门店地址', '是否自带仓库', '门店类型', '门店状态', '门店位置', '添加时间', '集团', '查看'],
        tbody: [],
        screening: [
          [
            {
              label: '门店名称',
              type: 'input',
              field: 'name',
            },
            {
              label: '门店编号',
              type: 'number',
              field: 'bid',
            },
            {
              label: '集团',
              type: 'select',
              field: 'manageOrganization',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: true,
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        Store.list(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
        Assistant.cliqueList().then(res => {
          this.loading = false;
          this.screening[0][2].data = res.data;
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
        this.$router.push(`/basic/stores/detail/${val}`);
      },
      edit: function () {
        this.$router.push('/basic/stores/edit');
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
