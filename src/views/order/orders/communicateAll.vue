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
        <el-checkbox-group>
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
            </tbody>
          </table>
        </el-checkbox-group>
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
      theadCommunication: ['交流信息', '新增员工', '员工角色', '员工手机', '新增日期'],
      tbodyCommunication: [],
      loading: true,
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
      }).catch(err => {
        console.log(err);
      });
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  mixins: [mixins],
};
</script>
<style scoped>
</style>
