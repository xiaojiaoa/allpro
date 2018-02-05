<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">订单相关报表</h1>
          </el-col>
          <el-col :span="20">
            <screening :screening="screening" @submit="query"></screening>
          </el-col>
        </el-row>       
      </div>

      <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3">
              <div class="tree-wrapper">
                <el-tree 
                  ref="tree"
                  :data="treeData"
                  :props="defaultProps" 
                  default-expand-all
                  node-key="id"
                  highlight-current
                  v-loading.lock="treeLoading">
                </el-tree>
              </div>
            </el-col>
            <el-col :span="21" class="dis-flex">
              <div>
                <div class="page-oper">
                  <div class="page-title">订单对账单列表</div>
                  <ul class="page-methods">
                    <li>
                      <el-button type="primary">导出清单</el-button>
                    </li>                    
                  </ul>
                </div>
              </div>
              <div class="dis-flex" v-loading.lock="loading">
                <div class="table dis-flex">
                  <div class="admin-table dis-flex">
                    <el-checkbox-group>
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
                              {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.submitCount}}</td>
                            <td>{{item.reviewCount}}</td>  
                            <td>{{item.reviewSum}}</td>            
                            <td>{{item.recepitSum}}</td>
                            <td>{{item.sendMoneySum}}</td>
                            <td>{{item.unreviewCount}}</td>
                            <td>{{item.buildCount}}</td>
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
            </el-col>
          </el-row>
        </div>    
    </div>
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';

export default {
  data() {
    return {
      thead: ['项目', '提交数量', '已审核数量', '已审金额', '已收款金额', '已发货金额', '未审核订单数量', '建单中订单数量'],
      tbody: [
        {
          name: '直营店',
          submitCount: 58,
          reviewCount: 50,
          reviewSum: 124770,
          recepitSum: 124770,
          sendMoneySum: 14770,
          unreviewCount: 8,
          buildCount: 2,
        }, {
          name: '加盟店',
          submitCount: 45,
          reviewCount: 45,
          reviewSum: 58741,
          recepitSum: 58741,
          sendMoneySum: 58741,
          unreviewCount: 0,
          buildCount: 0,
        }, {
          name: '样品部',
          submitCount: 32,
          reviewCount: 31,
          reviewSum: 78544,
          recepitSum: 68744,
          sendMoneySum: 68744,
          unreviewCount: 1,
          buildCount: 1,
        }, {
          name: '研发部',
          submitCount: 38,
          reviewCount: 35,
          reviewSum: 45871,
          recepitSum: 38774,
          sendMoneySum: 38774,
          unreviewCount: 3,
          buildCount: 3,
        }, {
          name: '其他类型',
          submitCount: 2,
          reviewCount: 2,
          reviewSum: 47228,
          recepitSum: 47228,
          sendMoneySum: 47228,
          unreviewCount: 0,
          buildCount: 0,
        },
      ],
      screening: [
        [
          {
            label: '门店名',
            type: 'input',
            field: 'storeName',
          },
        ],
      ],
      treeLoading: true,
      loading: true,
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 5,
      },
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      treeData: [
        {
          id: 1,
          name: '订单来源分类报表',
          children: [{
            id: 5,
            name: '订单来源分类',
          }],
        }, {
          id: 2,
          name: '生产明细',
          children: [{
            id: 6,
            name: '审单',
          }, {
            id: 7,
            name: '拆单',
          }, {
            id: 8,
            name: '拆审',
          }, {
            id: 9,
            name: '排料',
          }, {
            id: 10,
            name: '退单明细',
          }],
        }, {
          id: 3,
          name: '半成品仓库收发存明细',
        }, {
          id: 4,
          name: '成品仓库收发存明细',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'stCode',
      },
    };
  },
  created() {
    this.init(this.$route.query);
  },
  methods: {
    init: function () {
      this.loading = false;
      this.treeLoading = false;
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
    handleNodeClick(data) {
      this.typeForm.typeParams = data;
      this.getList({ typeId: data.id });
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
.cascader{
  width: 100%;
}

.material-title{
  font-size: 26px;
}

.tree-wrapper{
  margin-right: 16px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #d1dbe5;
}

.tree-wrapper .el-tree{
  border: none !important;
}

.page-oper .page-title{
  font-size: 18px;
}

</style>