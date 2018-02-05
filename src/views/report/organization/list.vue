<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">工厂相关报表</h1>
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
                  <div class="page-title">工厂对账单列表</div>
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
                            <td>{{item.mateId}}</td>
                            <td>{{item.mateName}}</td>
                            <td>{{item.name}}</td>  
                            <td>{{item.standard}}</td>            
                            <td>{{item.amount}}</td>
                            <td>{{item.batchNumber}}</td>
                            <td>{{item.tid}}</td>
                            <td>{{item.apartTime}}</td>
                            <td>{{item.scheduleTime}}</td>
                            <td>{{item.statusName}}</td>
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
      thead: ['物料编码', '物料名称', '配件名', '规格', '数量', '批次号', '订单号', '排料时间', '拆单时间', '订单状态'],
      tbody: [
        {
          mateId: '14010004000009',
          mateName: '层板托连接件杆',
          name: '二合一杆',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290010',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000008',
          mateName: '白色层板托偏心件',
          name: '二合一扣',
          standard: 'Φ20x12mm白',
          amount: 5,
          batchNumber: 517093001,
          tid: '1330400071709290027',
          apartTime: '2017-09-24',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14020012000001',
          mateName: '上翻门气压撑',
          name: '气动支撑',
          standard: 'FLL塑料头',
          amount: 3,
          batchNumber: 517093001,
          tid: '1330400071709290010',
          apartTime: '2017-09-29',
          scheduleTime: '2017-10-9',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '玻璃夹',
          name: '玻璃夹',
          standard: 'Φ5XH12mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290023',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000008',
          mateName: '鱼嘴夹',
          name: '鱼嘴夹',
          standard: '25mm板',
          amount: 5,
          batchNumber: 517093001,
          tid: '1330400071709290022',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '鱼嘴夹',
          name: '二合一杆',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290021',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '封口贴一号',
          name: '三合一盖帽贴',
          standard: 'Φ20mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290020',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '门板反弹器安装底座',
          name: '门板反弹器安装底座',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290019',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-3',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '门板反弹器',
          name: '门板反弹器',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290018',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '塑料胶塞',
          name: '塑料胶塞',
          standard: 'Φ6mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290017',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '加固角码',
          name: '加固角码',
          standard: '80X80mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290016',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: 'M8*80膨胀螺丝',
          name: '膨胀肖',
          standard: 'Φ8X80mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290015',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: 'φ8*40mm木榫',
          name: '圆榫',
          standard: 'Φ8x40mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290014',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '层板托连接件杆',
          name: '二合一杆',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290013',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '白色层板托偏心件',
          name: '二合一扣',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290012',
          apartTime: '2017-09-23',
          scheduleTime: '2017-9-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '三合一杆',
          name: '三合一单头杆',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290011',
          apartTime: '2017-10-23',
          scheduleTime: '2017-10-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '三合一偏心件',
          name: '三合一连接轮',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290010',
          apartTime: '2017-10-28',
          scheduleTime: '2017-10-31',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '海福乐450mm全拉带三节路轨',
          name: '18寸三节轨',
          standard: 'HFL450',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290012',
          apartTime: '2017-11-13',
          scheduleTime: '2017-11-20',
          statusName: '已发货',
        }, {
          mateId: '14010004000009',
          mateName: '百隆压印铰链装饰盖（半盖/内嵌）',
          name: '百隆压印铰链装饰盖（半盖/内嵌）',
          standard: 'Φ6x16mm',
          amount: 4,
          batchNumber: 517093001,
          tid: '1330400071709290015',
          apartTime: '2017-11-20',
          scheduleTime: '2017-11-29',
          statusName: '已发货',
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
        totalItems: 19,
      },
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      treeData: [
        {
          id: 17,
          name: '工厂相关报表',
          children: [{
            id: 1,
            name: '批次物料计价',
          }, {
            id: 2,
            name: '订单物料计价',
          }, {
            id: 3,
            name: '物料计价(按月)',
          }, {
            id: 4,
            name: '五金汇总',
          }, {
            id: 5,
            name: '五金汇总(按月)',
          }, {
            id: 6,
            name: '领料单',
          }, {
            id: 7,
            name: '出库',
          }, {
            id: 8,
            name: '入库',
          }, {
            id: 9,
            name: '排料工件',
          }, {
            id: 10,
            name: '排料工件汇总',
          }, {
            id: 11,
            name: '排料配件',
          }, {
            id: 12,
            name: '排料配件汇总',
          }, {
            id: 13,
            name: '拆单工件',
          }, {
            id: 14,
            name: '拆单工件汇总',
          }, {
            id: 15,
            name: '拆单配件',
          }, {
            id: 16,
            name: '拆单配件汇总',
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
    dialogFormVisible: function () {
      return this.typeForm.dialogFormVisible;
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