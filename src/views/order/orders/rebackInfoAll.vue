<template>
  <div class="dis-flex container">
    <div class="dis-flex">
        <div class="page-oper">
          <div class="page-title">退回信息</div>
        </div>
         <div class="dis-flex" v-loading.lock="loading">
            <div class="table dis-flex" >
              <div class="admin-table dis-flex">
                  <table class="admin-main-table">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="value in returnThead" :title="value">
                            {{value}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in returnTbody"> 
                            <td>{{index+1}}</td>              
                            <td>{{item.orderBackVo.backStr}}</td>                  
                            <td>{{item.orderBackVo.backTypeStr}}</td>
                            <td>{{unixFormat(item.orderBackVo.createTime)}} {{dateTimeFormat(item.orderBackVo.createTime)}}</td>              
                            <td>{{item.orderBackVo.remark}}</td>
                            <td>{{item.orderBackVo.backEmp.name}}</td>        
                        </tr>
                        <tr v-if="returnTbody.length==0 && !loading">
                           <td :colspan="returnThead.length + 1" class="nothing-data">暂无数据</td>
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
      returnThead: ['退回原因', '退回类型', '退回时间', '备注', '操作员工'],
      returnTbody: [],
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
      Order.returnInfo(val).then(res => {
        this.loading = false;
        this.returnTbody = res.data.result;
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
