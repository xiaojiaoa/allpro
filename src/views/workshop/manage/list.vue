<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">车间列表</div>
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
                    <td>{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</td>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.emp}}</td>
                    <td>{{item.stcodeName}}</td>          
                    <td>
                      <el-button type="danger">编辑</el-button>
                      <el-button type="primary" v-if="item.stcode === 0">启用</el-button>
                      <el-button type="danger" v-else>禁用</el-button>                
                    </td>
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
// import { Taskseq, Assistant } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['车间编号', '车间名称', '负责人', '状态', '操作'],
      tbody: [
        {
          id: 'C20181',
          name: '车间1',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
        },
        {
          id: 'C20182',
          name: '车间2',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20183',
          name: '车间3',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20184',
          name: '车间4',
          level: '10',
          levelName: '高',
          stcode: 0,
          stcodeName: '禁用',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20185',
          name: '车间5',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20186',
          name: '车间5',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20187',
          name: '车间5',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: 'C20188',
          name: '车间5',
          level: '10',
          levelName: '高',
          stcode: 0,
          stcodeName: '禁用',
          emp: '大饼',
          createTime: '2017-12-11',
        },
      ],
      screening: [
        [
          {
            label: '车间编号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '车间名称',
            type: 'input',
            field: 'ctctMobile',
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 8,
      },
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      console.log(this.$route.query);
      this.init(this.$route.query);
    }
  },
  methods: {
    init: function (val) {
      this.loading = false;
      console.log(val);
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
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  mixins: [mixins],
  components: {
    screening,
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        console.log(this.conditions);
        this.init(this.conditions);
      }
    },
  },
};
</script>
