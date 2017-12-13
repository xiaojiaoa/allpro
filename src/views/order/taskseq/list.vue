<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">流水列表</div>
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
                  <td>{{item.custId}}</td>
                  <td>{{item.custName}}</td>
                  <td>{{item.seqId}}</td>             
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
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Taskseq } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['客户号', '客户姓名', '流水号'],
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
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      this.init(this.$route.query);
    }
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Taskseq.list(val).then(res => {
        console.log('927386', res);
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
      this.$router.push(`/basic/employees/detail/${val}`);
    },
    edit: function () {
      this.$router.push('/basic/employees/edit');
    },
    check: function () {
      this.$router.push('/basic/department/list');
    },
  },
  components: {
    screening,
  },
};
</script>

<style lang="scss" scoped>

</style>
