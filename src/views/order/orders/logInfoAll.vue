<template>
  <div class="dis-flex container">
    <div class="dis-flex">
        <div class="page-oper">
          <div class="page-title">日志信息</div>
        </div>
         <div class="dis-flex" v-loading.lock="loading">
            <div class="table dis-flex" >
              <div class="admin-table dis-flex">
                  <table class="admin-main-table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th v-for="value in logThead" :title="value">
                          {{value}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in logTbody">    
                        <td>{{index+1}}</td>              
                        <td>{{item.content}}</td>                  
                        <td>{{item.name}}</td>
                        <td>{{item.roleList.name}}</td>              
                        <td>{{item.mobile}}</td>
                        <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
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
  </div>
</template>

<script>
import { Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      logThead: ['日志信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      logTbody: [],
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
    this.init({ tid: this.$route.params.id });
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Order.orderLog(val).then(res => {
        console.log(11, res.data.result);
        this.loading = false;
        this.paginationData = res.data;
        this.logTbody = res.data.result;
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

