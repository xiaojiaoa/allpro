<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">补单列表</div>
          <ul class="page-methods">
            <!-- <li>
              <el-button type="primary">导出补单清单</el-button>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="dis-flex" v-loading.lock="loading">
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
                    <td>{{index + 1}}</td>
                    <td class="router">
                        <span  @click="routerLink(`/basic/customers/detail/${item.orderResupplyReturnVo.cid}`)">{{item.orderResupplyReturnVo.custName}}</span>
                    </td>
                    <td class="router">
                        <span @click="routerLink(`/order/taskseq/detail/${item.orderResupplyReturnVo.lid}`)">{{item.orderResupplyReturnVo.lno}}</span>
                    </td>
                    <td>{{item.orderResupplyReturnVo.storeSimpleVo.name}}</td>              
                    <td>{{item.orderResupplyReturnVo.brandStr}}</td>
                    <td class="router">
                        <span @click="routerLink(`/order/resupplys/detail/${item.orderResupplyReturnVo.id}`)">{{item.orderResupplyReturnVo.tno}}</span>
                    </td>
                    <td class="router">
                        <span @click="routerLink(`/order/orders/detail/${item.orderResupplyReturnVo.orgTid}`)">{{item.orderResupplyReturnVo.orgTno}} </span> 
                    </td>
                    <td>{{item.orderResupplyReturnVo.prodTypeStr}}</td>
                    <td>{{item.orderResupplyReturnVo.orderInfo}}</td>
                    <td>{{item.orderResupplyReturnVo.createEmp.name}}</td>
                    <td>{{unixFormat(item.orderResupplyReturnVo.createTime)}} {{dateTimeFormat(item.orderResupplyReturnVo.createTime)}}</td>
                    <td >{{item.orderResupplyReturnVo.orderStatusSimpleVo.stcodeStr}}</td>
                    <td>{{item.orderResupplyReturnVo.revFranchisePrice}}</td>
                    <td>{{item.orderResupplyReturnVo.priceAfterDiscount}}</td>
                    <td>{{item.orderResupplyReturnVo.retailPrice}}</td>
                    <td>{{unixFormat(item.orderResupplyReturnVo.sendOutTime)}} {{dateTimeFormat(item.orderResupplyReturnVo.sendOutTime)}}</td>
                  </tr>
                  <tr v-if="tbody.length==0 && !loading">
                    <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
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
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Resupply } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['客户姓名', '流水号', '门店名称', '品牌', '补单号', '原订单号', '产品类型', '订单信息',
        '补单建单员工', '补单建单时间', '补单当前状态', '结算价(元)', '折后价(元)', '零售价(元)', '发货日期'],
      tbody: [],
      screening: [
        [
          {
            label: '流水号',
            type: 'input',
            field: 'lid',
          },
          {
            label: '门店号',
            type: 'input',
            field: 'bid',
          },
          {
            label: '客户姓名',
            type: 'input',
            field: 'custName',
          },
        ],
      ],
      loading: true,
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
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
  methods: {
    init: function (val) {
      this.loading = true;
      Resupply.resupplyListQuery(val).then(res => {
        this.loading = false;
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
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
    routerLink: function (val) {
      this.$router.push(`${val}`);
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

<style lang="scss" scoped>

</style>
