<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">生产线列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary">新增</el-button>
            </li>
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
                    <td>{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</td>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.levelName}}</td>
                    <td>{{item.emp}}</td>
                    <td>{{unixFormat(item.createTime)}}</td>   
                    <td>{{item.stcodeName}}</td>          
                    <td>                                      
                      <el-button type="primary">编辑</el-button>                     
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
      thead: ['生产线编号', '生产线名称', '优先级', '创建人', '创建时间', '状态', '操作'],
      tbody: [
        {
          id: '18000001',
          name: '生产线1',
          level: '10',
          levelName: '高',
          stcode: 0,
          stcodeName: '禁用',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000002',
          name: '生产线2',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000003',
          name: '生产线3',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000004',
          name: '生产线4',
          level: '10',
          levelName: '高',
          stcode: 0,
          stcodeName: '禁用',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000005',
          name: '生产线5',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000006',
          name: '生产线6',
          level: '10',
          levelName: '高',
          stcode: 0,
          stcodeName: '禁用',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000007',
          name: '生产线7',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000008',
          name: '生产线8',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000009',
          name: '生产线9',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000010',
          name: '生产线10',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000011',
          name: '生产线11',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000012',
          name: '生产线12',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000013',
          name: '生产线13',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000014',
          name: '生产线14',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000015',
          name: '生产线15',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000016',
          name: '生产线16',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000017',
          name: '生产线17',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000018',
          name: '生产线18',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '18000019',
          name: '生产线19',
          level: '10',
          levelName: '高',
          stcode: 1,
          stcodeName: '开启',
          emp: '大饼',
          createTime: '2017-12-11',
        },
      ],
      screening: [
        [
          {
            label: '生产线编号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '生产线名称',
            type: 'input',
            field: 'ctctMobile',
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 19,
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
