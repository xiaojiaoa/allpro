<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">门店相关报表</h1>
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
                  <div class="page-title">门店对账单列表</div>
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
                            <td>{{item.storeName}}</td>
                            <td>{{item.designerName}}</td>
                            <td>{{item.meased}}</td>  
                            <td>{{item.customerNum}}</td>            
                            <td>{{item.percent}}</td>
                            <td>{{item.dealTime}}</td>
                            <td>{{item.orderSum}}</td>
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
      thead: ['店名', '设计师', '期间量尺数', '成交客户数', '成交率（%）', '平均成交时间', '单客户平均成交额'],
      tbody: [
        {
          storeName: '湖南省长沙市芙蓉区万家丽广场店',
          designerName: '张芳',
          meased: 23,
          customerNum: 21,
          percent: 93.18,
          dealTime: 0.16,
          orderSum: 15088.82,
        }, {
          storeName: '广东省广州市番禺区番禺广场体验馆',
          designerName: '曾鑫',
          meased: 1,
          customerNum: 1,
          percent: 100,
          dealTime: 0.05,
          orderSum: 20000,
        }, {
          storeName: '四川省攀枝花市米易县博美建材店',
          designerName: '胡长俊',
          meased: 15,
          customerNum: 14,
          percent: 92.31,
          dealTime: 0.02,
          orderSum: 32822.15,
        }, {
          storeName: '湖北省黄冈市麻城市桃盛建材市场店',
          designerName: '周倩',
          meased: 6,
          customerNum: 5,
          percent: 83.33,
          dealTime: 0.07,
          orderSum: 13548,
        }, {
          storeName: '浙江省宁波市余姚市红星店',
          designerName: '朱勇',
          meased: 1,
          customerNum: 1,
          percent: 100,
          dealTime: 0.02,
          orderSum: 9000,
        }, {
          storeName: '湖南省常德市汉寿县建材店',
          designerName: '谢艳芳',
          meased: 2,
          customerNum: 1,
          percent: 95.87,
          dealTime: 0.03,
          orderSum: 14210,
        }, {
          storeName: '河南省南阳市卧龙区华隆布兰莎',
          designerName: '崔运转',
          meased: 1,
          customerNum: 1,
          percent: 100,
          dealTime: 0.01,
          orderSum: 5000,
        }, {
          storeName: '新疆省石河子市温州商城',
          designerName: '李凯',
          meased: 1,
          customerNum: 1,
          percent: 100,
          dealTime: 0.04,
          orderSum: 6500,
        }, {
          storeName: '山东省聊城市阳谷县建材店',
          designerName: '胥健',
          meased: 1,
          customerNum: 0,
          percent: 0,
          dealTime: 0,
          orderSum: 0,
        }, {
          storeName: '浙江省衢州市衢江区旗舰店',
          designerName: '王勇彬',
          meased: 3,
          customerNum: 3,
          percent: 99.87,
          dealTime: 0.05,
          orderSum: 9800,
        }, {
          storeName: '河南省商丘市梁园区中意建材市场店',
          designerName: '王娓',
          meased: 2,
          customerNum: 2,
          percent: 95.89,
          dealTime: 0.02,
          orderSum: 15740,
        }, {
          storeName: '河南省商丘市梁园区中意建材市场店',
          designerName: '黄超杰',
          meased: 3,
          customerNum: 3,
          percent: 99.87,
          dealTime: 0.05,
          orderSum: 4871,
        }, {
          storeName: '陕西省安康市汉滨区天贸城店',
          designerName: '樊书兵',
          meased: 3,
          customerNum: 3,
          percent: 99.87,
          dealTime: 0.05,
          orderSum: 26585,
        }, {
          storeName: '安徽省宣城市宣州区红星店',
          designerName: '刘永亮',
          meased: 6,
          customerNum: 6,
          percent: 97.57,
          dealTime: 0.05,
          orderSum: 25674,
        }, {
          storeName: '山东省青岛市城阳区建材市场店',
          designerName: '王鹏飞',
          meased: 3,
          customerNum: 3,
          percent: 95.58,
          dealTime: 0.05,
          orderSum: 9800,
        }, {
          storeName: '河南省信阳市平桥区新二十四大街国际商城',
          designerName: '王登辉',
          meased: 5,
          customerNum: 5,
          percent: 98.87,
          dealTime: 0.05,
          orderSum: 15800,
        }, {
          storeName: '广东省佛山市禅城区布兰莎建材店',
          designerName: '庞海鹏',
          meased: 1,
          customerNum: 1,
          percent: 100,
          dealTime: 0.05,
          orderSum: 2500,
        }, {
          storeName: '广东省广州市番禺区番禺广场体验馆',
          designerName: '冯嘉辉',
          meased: 0,
          customerNum: 0,
          percent: 0,
          dealTime: 0,
          orderSum: 0,
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
        totalItems: 18,
      },
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      treeData: [
        {
          id: 1,
          name: '成交情况报表',
          children: [{
            id: 7,
            name: '设计师成交情况',
          }, {
            id: 8,
            name: '家居顾问成交情况',
          }, {
            id: 9,
            name: '查房成交情况',
          }],
        }, {
          id: 2,
          name: '补单率报表',
          children: [{
            id: 10,
            name: '门店补单率',
          }, {
            id: 11,
            name: '下单员补单率',
          }],
        }, {
          id: 3,
          name: '成本率报表',
          children: [{
            id: 12,
            name: '部门成本率',
          }],
        }, {
          id: 4,
          name: '门店对账单报表',
          children: [{
            id: 13,
            name: '门店资金流转',
          }],
        }, {
          id: 5,
          name: '门店销售报表',
          children: [{
            id: 14,
            name: '门店销售',
          }],
        }, {
          id: 6,
          name: '销售区域报表',
          children: [{
            id: 15,
            name: '门店销售区域统计',
          }],
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