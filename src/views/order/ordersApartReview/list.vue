<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
        <div class="join_list" >
          <div class="list-option">
              <div class="page-oper title">
                <div class="page-title">拆单审核中（当前最多选取30个任务）</div>
             </div>
          </div>
          <div class="table " v-loading.lock="oneLoading">
            <div class="admin-table dis-flex">
                <table class="admin-main-table">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th v-for="value in theadOne" :title="value">
                        {{value}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tbodyOne">
                      <td>{{index + 1}}</td>
                        <td> {{ item.orderReturnVo.brandStr }}</td>
                        <td> {{ item.orderReturnVo.decoColorStr }}</td>
                        <td>{{item.orderReturnVo.prodTypeStr}}</td>
                        <td class="router">
                            <span @click="routerLink(`/order/orders/detail/${item.orderReturnVo.id}`)">{{item.orderReturnVo.tno}}</span>
                        </td>
                        <td>{{ item.orderReturnVo.storeSimpleVo.name }}</td>       
                        <td>{{ item.orderReturnVo.custName }}</td>
                        <td>{{ item.orderReturnVo.orderInfo }} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-if="tbodyOne.length==0 && !oneLoading">
                      <td :colspan="theadOne.length + 1" class="nothing-data">暂无数据</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
                @size-change="handleSizeChangeOne"
                @current-change="handleCurrentChangeOne"
                :current-page="paginationDataOne.page"
                :page-size="paginationDataOne.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationDataOne.totalItems">
            </el-pagination>
          </div>
      </div>

        <div class="join_list">
            <div class="list-option">
              <div class="page-oper title">
                <div class="page-title">已拆单审核</div>
              </div>
            </div>
            <div class="table " v-loading.lock="twoLoading">
              <div class="admin-table dis-flex">
                  <table class="admin-main-table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th v-for="value in theadTwo" :title="value">
                          {{value}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in tbodyTwo">
                        <td>{{index + 1}}</td>
                        <td> {{ item.orderReturnVo.brandStr }}</td>
                        <td> {{ item.orderReturnVo.decoColorStr }}</td>
                        <td>{{item.orderReturnVo.prodTypeStr}}</td>
                        <td class="router">
                            <span @click="routerLink(`/order/orders/detail/${item.orderReturnVo.id}`)">{{item.orderReturnVo.tno}}</span>
                        </td>
                        <td>{{ item.orderReturnVo.storeSimpleVo.name }}</td>       
                        <td>{{ item.orderReturnVo.custName }}</td>
                        <td>{{ item.orderReturnVo.orderInfo }} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-if="tbodyTwo.length==0 && !twoLoading">
                        <td :colspan="theadTwo.length + 1" class="nothing-data">暂无数据</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                  @size-change="handleSizeChangeTwo"
                  @current-change="handleCurrentChangeTwo"
                  :current-page="paginationDataTwo.page"
                  :page-size="paginationDataTwo.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="paginationDataTwo.totalItems">
              </el-pagination>
            </div>
      </div>

      <div class="join_list">
          <div class="list-option">
              <div class="page-oper title">
                <div class="page-title">可拆单审核</div>
              </div>
              <screening :screening="screening" ></screening>
          </div>
            <div class="table " v-loading.lock="threeLoading">
              <div class="admin-table dis-flex">
                  <table class="admin-main-table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th v-for="value in theadThree" :title="value">
                          {{value}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in tbodyThree">
                        <td>{{index + 1}}</td>
                        <td> {{ item.orderReturnVo.brandStr }}</td>
                        <td> {{ item.orderReturnVo.decoColorStr }}</td>
                        <td>{{item.orderReturnVo.prodTypeStr}}</td>
                        <td class="router">
                            <span @click="routerLink(`/order/orders/detail/${item.orderReturnVo.id}`)">{{item.orderReturnVo.tno}}</span>
                        </td>
                        <td>{{ item.orderReturnVo.storeSimpleVo.name }}</td>       
                        <td>{{ item.orderReturnVo.custName }}</td>
                        <td>{{ item.orderReturnVo.orderInfo }} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{unixFormat()}} {{dateTimeFormat()}}</td>
                        <td></td>
                      </tr>
                      <tr v-if="tbodyThree.length==0 && !threeLoading">
                        <td :colspan="theadThree.length + 1" class="nothing-data">暂无数据</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                  @size-change="handleSizeChangeThree"
                  @current-change="handleCurrentChangeThree"
                  :current-page="paginationDataThree.page"
                  :page-size="paginationDataThree.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="paginationDataThree.totalItems">
              </el-pagination>
            </div>
            </div>
        </div>
      </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Process } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      theadOne: ['品牌', '颜色', '类别', '订单号', '专卖店', '客户名称', '订单信息', '模型文件',
        '拆单人', '拆单日期'],
      theadTwo: ['品牌', '颜色', '类别', '订单号', '专卖店', '客户名称', '订单信息', '拆单人', '拆单日期',
        '状态'],
      theadThree: ['品牌', '颜色', '类别', '订单号', '专卖店', '客户名称', '订单信息', '模型文件',
        '拆单人', '审核日期', '拆单审核人', '收款状态'],
      tbodyOne: [],
      tbodyTwo: [],
      tbodyThree: [],
      screening: [
        [
          {
            label: '门店品牌',
            type: 'input',
            field: 'cid',
          },
          {
            label: '品牌',
            type: 'input',
            field: 'custName',
          },
          {
            label: '是否下单完毕',
            type: 'select',
            field: 'lid',
            data: [],
          },
          {
            label: '收款状态',
            type: 'select',
            field: 'custName',
            data: [],
          },
        ],
      ],
      oneLoading: true,
      twoLoading: true,
      threeLoading: true,
      paginationDataOne: {},
      paginationDataTwo: {},
      paginationDataThree: {},
      checkList: [],
      conditionsOne: {
        pageSize: '',
        pageNo: '',
      },
      conditionsTwo: {
        pageSize: '',
        pageNo: '',
      },
      conditionsThree: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  created() {
    this.initAll();
  },
  methods: {
    initAll() {
      this.oneLoading = true;
      this.twoLoading = true;
      this.threeLoading = true;
      Promise.all([
        Process.orderApartReviewing(),
        Process.orderApartReviewed(),
        Process.orderApartReviewable(),
      ])
        .then(([one, two, three]) => {
          this.oneLoading = false;
          this.twoLoading = false;
          this.threeLoading = false;
          // 拆单审核中
          this.paginationDataOne = one.data;
          this.tbodyOne = one.data.result;
          this.conditionsOne.pageSize = one.data.pageSize;
          this.conditionsOne.pageNo = one.data.page;
          // 已拆单审核
          this.paginationDataTwo = two.data;
          this.tbodyTwo = two.data.result;
          this.conditionsTwo.pageSize = two.data.pageSize;
          this.conditionsTwo.pageNo = two.data.page;
          // 可拆单审核
          this.paginationDataThree = three.data;
          this.tbodyThree = three.data.result;
          this.conditionsThree.pageSize = three.data.pageSize;
          this.conditionsThree.pageNo = three.data.page;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initOne: function () {
      this.oneLoading = true;
      Process.orderApartReviewing().then(one => {
        this.oneLoading = false;
        this.paginationDataOne = one.data;
        this.tbodyOne = one.data.result;
        this.conditionsOne.pageSize = one.data.pageSize;
        this.conditionsOne.pageNo = one.data.page;
      }).catch(err => {
        console.log(err);
        this.$message.error(`${err.msg}`);
        this.oneLoading = false;
      });
    },
    initTwo: function () {
      this.twoLoading = true;
      Process.orderApartReviewed().then(two => {
        this.twoLoading = false;
        this.paginationDataTwo = two.data;
        this.tbodyTwo = two.data.result;
        this.conditionsTwo.pageSize = two.data.pageSize;
        this.conditionsTwo.pageNo = two.data.page;
      }).catch(err => {
        console.log(err);
        this.$message.error(`${err.msg}`);
        this.twoLoading = false;
      });
    },
    initThree: function (val) {
      this.threeLoading = true;
      Process.orderApartReviewable(val).then(three => {
        this.threeLoading = false;
        this.paginationDataThree = three.data;
        this.tbodyThree = three.data.result;
        this.conditionsThree.pageSize = three.data.pageSize;
        this.conditionsThree.pageNo = three.data.page;
      }).catch(err => {
        console.log(err);
        this.$message.error(`${err.msg}`);
        this.threeLoading = false;
      });
    },
    query: function (val) {
      if (Object.keys(val).length === 0) {
        this.conditionsThree = {};
        this.conditionsThree.pageSize = this.paginationDataThree.pageSize;
        this.conditionsThree.pageNo = this.paginationDataThree.page;
        this.paginationDataThree.page = 0;
      } else {
        Object.assign(this.conditionsThree, val);
        this.paginationDataThree.page = 0;
      }
    },
    handleSizeChangeOne: function (val) {
      this.paginationDataOne.pageSize = val;
      this.conditionsOne.pageSize = val;
      this.paginationDataOne.page = 0;
    },
    handleSizeChangeTwo: function (val) {
      this.paginationDataTwo.pageSize = val;
      this.conditionsTwo.pageSize = val;
      this.paginationDataTwo.page = 0;
    },
    handleSizeChangeThree: function (val) {
      this.paginationDataThree.pageSize = val;
      this.conditionsThree.pageSize = val;
      this.paginationDataThree.page = 0;
    },
    handleCurrentChangeOne: function (val) {
      this.paginationDataOne.page = val;
    },
    handleCurrentChangeTwo: function (val) {
      this.paginationDataTwo.page = val;
    },
    handleCurrentChangeThree: function (val) {
      this.paginationDataThree.page = val;
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  computed: {
    conditionsWatchOne: function () {
      return this.paginationDataOne.page;
    },
    conditionsWatchTwo: function () {
      return this.paginationDataTwo.page;
    },
    conditionsWatchThree: function () {
      return this.paginationDataThree.page;
    },
  },
  components: {
    screening,
  },
  mixins: [mixins],
  watch: {
    conditionsWatchOne: function (val) {
      if (val !== 0) {
        this.conditionsOne.pageNo = val;
        this.initOne(this.conditionsOne);
      }
    },
    conditionsWatchTwo: function (val) {
      if (val !== 0) {
        this.conditionsTwo.pageNo = val;
        this.initTwo(this.conditionsTwo);
      }
    },
    conditionsWatchThree: function (val) {
      if (val !== 0) {
        this.conditionsThree.pageNo = val;
        this.initThree(this.conditionsThree);
      }
    },
  },
};
</script>

<style lang="scss">
.join_list {
  border: 1px solid #dce2e6;
  padding: 10px 20px 20px 20px;
  margin-bottom: 60px;
  // overflow-y: auto;
  position: relative;
  .el-pagination {
    position: absolute;
    bottom: -16px;
    width: 100%;
    span {
      background-color: #fff;
    }
  }
}
  .title{
    margin-bottom:10px;
  }
</style>


