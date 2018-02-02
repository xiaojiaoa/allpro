<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">图形报表</h1>
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
              <div class="dis-flex" v-loading.lock="loading">
                <div class="table dis-flex">
                  <div class="admin-table dis-flex">
                    <div id="myChart"></div>
                  </div>
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
// 引入基本模板
const echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
// require('echarts/lib/chart/legend');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/dataset');

export default {
  data() {
    return {
      screening: [
        [
          {
            label: '年份',
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
          name: '图形报表',
          children: [
            {
              id: 2,
              name: '客户统计报表',
            }, {
              id: 3,
              name: '订单统计报表',
            }, {
              id: 4,
              name: '资金统计报表',
            },
          ],
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: { text: '2018客户统计' },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ['新增客户', '成交客户', '预约量尺'],
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '新增客户',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
              ],
            },
          },
          {
            name: '成交客户',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [{
                name: '年最高', value: 182.2, xAxis: 7, yAxis: 183,
              }, {
                name: '年最低', value: 2.3, xAxis: 11, yAxis: 3,
              }],
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
              ],
            },
          },
          {
            name: '预约量尺',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [{
                name: '年最高', value: 182.2, xAxis: 7, yAxis: 183,
              }, {
                name: '年最低', value: 2.3, xAxis: 11, yAxis: 3,
              }],
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
              ],
            },
          },
        ],
      });
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
  mounted() {
    this.drawLine();
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

#myChart{
  width: 100%;
  height: 100%;
}

</style>