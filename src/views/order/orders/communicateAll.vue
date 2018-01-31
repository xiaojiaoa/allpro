<template>
  <div class="container">
      <div class="page-oper">
      <div class="page-title">交流信息</div>
      <ul class="page-methods">
        <li v-if="$route.path.indexOf('orders') > -1">
          <el-button type="primary" @click="routerLink(`/order/orders/communicate/${$route.params.id}`)">交流登记</el-button>
        </li>
        <li v-else>
          <el-button type="primary" @click="routerLink(`/order/resupplys/communicate/${$route.params.id}`)">交流登记</el-button>
        </li>
      </ul>
    </div>
     <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
          <table class="admin-main-table">
            <thead>
              <tr>
                <th>序号</th>
                <th v-for="value in theadCommunication" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tbodyCommunication">
                  <td>{{index+1}}</td>
                  <td>{{item.content}}</td>
                  <td>{{item.name}}</td> 
                  <td>{{item.roleList.name}}</td>  
                  <td>{{item.mobile}}</td>     
                  <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
              </tr>
              <tr v-if="tbodyCommunication.length==0 && !loading">
                <td :colspan="theadCommunication.length + 1" class="nothing-data">暂无数据</td>
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
</template>
<script>
import { Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      theadCommunication: ['交流信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      tbodyCommunication: [],
      loading: true,
      paginationData: {},
      conditions: {
        pageSize: '',
        pageNo: '',
        tid: this.$route.params.id,
      },
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Order.detailCommunication(val).then(res => {
        this.loading = false;
        this.tbodyCommunication = res.data.result;
        this.paginationData = res.data;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
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
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  mixins: [mixins],
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
<style scoped>
</style>
