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
            <li>
              <el-button type="primary">查看所有部门信息</el-button>
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
              <tr v-for="(item, index) in tbody">
                <td>
                  <el-checkbox :label="((conditions.pageNo - 1) * conditions.pageSize) + index + 1"></el-checkbox>
                </td>
                <td class="router" @click="detail(item.id)">{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.owner}}</td>
                <td>{{item.ownerMobile}}</td>
                <td>{{item.address}}</td>
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
  import { Store } from '../../../services/admin';

  export default {
    data() {
      return {
        thead: ['门店编号', '门店名称', '负责人姓名', '负责人手机号', '门店地址'],
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
        checkList: [],
        conditions: {
          pageSize: '',
          pageNo: '',
        },
      };
    },
    created() {
      this.init();
    },
    methods: {
      init: function (val) {
        Store.list(val).then(res => {
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      },
      query: function (val) {
        const obj = {};
        Object.assign(obj, this.conditions, val);
        this.init(obj);
      },
      handleSizeChange: function (val) {
        this.conditions.pageSize = val;
        this.init(this.conditions);
      },
      handleCurrentChange: function (val) {
        this.conditions.pageNo = val;
        this.init(this.conditions);
      },
      detail: function (val) {
        this.$router.push(`/basic/stores/detail/${val}`);
      },
      edit: function () {
        this.$router.push('/basic/stores/edit');
      },
    },
    components: {
      screening,
    },
  };
</script>

<style lang="scss" scoped>

</style>
