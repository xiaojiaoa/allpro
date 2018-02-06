<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">已选中物料</div>
      <ul class="page-methods">
        <li>
          <router-link :to="{path: '/purchase/purchases/editTwo'}">
            <el-button type="primary">填写采购信息</el-button>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group v-model="checkList" @change="checkChange">
          <table class="admin-main-table">
            <thead>
            <tr>
              <th>序号</th>
              <th v-for="value in thead01" :title="value">
                {{value}}
              </th>
            </tr>
            </thead>
            <tbody>
            <template>
              <tr v-for="(item,index) in showList">
                <td>
                  <el-checkbox :label="item.uniqueCode">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                </td>
                <td>{{item.mateNo}}</td>
                <td>{{item.mateName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td>{{item.suppName}}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>

    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">正常物料</div>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
          <el-checkbox-group v-model="checkList" @change="checkChange">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th>序号</th>
                <th v-for="value in thead02" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in tbody">
                <td>
                  <el-checkbox :label="item.uniqueCode">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                </td>
                <td>{{item.mateNo}}</td>
                <td>{{item.mateName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td>{{item.suppName}}</td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                <td :colspan="thead02.length + 1" class="nothing-data">暂无数据</td>
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
</template>
<script>
  import screening from '../../../components/screening.vue';
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import storage from '../../../libs/storage/';

  export default {
    data() {
      return {
        thead01: ['物料编号', '物料名称', '分类名称', '供应商名称'],
        thead02: ['物料编号', '物料名称', '分类名称', '供应商名称'],
        tbody: [],
        checkList: [],
        showList: [],
        screening: [
          [
            {
              label: '物料名称',
              type: 'input',
              field: 'name',
            },
            {
              label: '物料编号',
              type: 'number',
              field: 'bid',
            },
            {
              label: '物料分类',
              type: 'select',
              field: 'bid',
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
        Purchase.supMateAbleList(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          if (storage.get('PURCMATE')) {
            this.checkList = storage.get('PURCMATE');
            this.showList = [];
            this.showList = this.tbody.filter((item) => {
              return this.checkList.includes(item.uniqueCode);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      checkChange: function () {
        this.showList = [];
        this.showList = this.tbody.filter((item) => {
          return this.checkList.includes(item.uniqueCode);
        });
        storage.set('PURCMATE', []);
        storage.set('PURCMATE', this.checkList);
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
      //      detail: function () {
      //        this.$router.push('/basic/material/detail');
      //      },
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
