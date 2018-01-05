<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">订单列表</div>
          <ul class="page-methods">
            <!-- <li>
              <el-button type="primary">导出订单清单</el-button>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="dis-flex" v-loading.lock="loading">
        <div class="table dis-flex">
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
                    <td>{{index + 1}}</td>
                    <td class="router">
                        <span  @click="routerLink(`/basic/customers/detail/${item.orderReturnVo.cid}`)">{{item.orderReturnVo.custName}}</span>
                    </td>
                    <td class="">
                        <span >{{item.orderReturnVo.lno}}</span>
                    </td>
                    <td>{{item.orderReturnVo.tno}} </td>
                    <td>
                        {{item.orderReturnVo.orderNum}}
                    </td>
                    <td>{{item.orderReturnVo.goodsTypeStr}}</td>
                    <td>{{item.orderReturnVo.brandStr}}</td>
                    <td>{{item.orderReturnVo.prodTypeStr}}</td>
                    <td>{{item.orderReturnVo.orderInfo}}</td>
                    <td >{{item.orderReturnVo.orderSpace.spaceTypeName}}</td>
                    <td>{{item.orderReturnVo.storeSimpleVo.storeTypeStr}}</td>
                    <td>{{item.orderReturnVo.createEmp.name}}</td>
                    <td>{{unixFormat(item.orderReturnVo.createTime)}} {{dateTimeFormat(item.orderReturnVo.createTime)}}</td>
                    <td>{{item.orderReturnVo.orderStatusSimpleVo.stcodeStr}}</td>
                    <td>{{item.orderReturnVo.orderStatusSimpleVo.payedStr}}</td>
                  </tr>
                  <tr v-if="tbody.length==0 && !loading">
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
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      props: {
        value: 'id',
        label: 'name',
      },
      thead: ['客户姓名', '流水号', '订单号', '订单数量', '商品类型', '品牌', '产品类型', '订单信息',
        '空间类型', '门店类型', '建单员工', '建单日期', '订单状态', '收款状态'],
      tbody: [],
      screening: [
        [
          {
            label: '订单号',
            type: 'input',
            field: 'tid',
          },
          {
            label: '客户手机',
            type: 'input',
            field: 'custMobile',
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
      Order.orderList(val).then(res => {
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
      this.$router.history.push(`${val}`);
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
