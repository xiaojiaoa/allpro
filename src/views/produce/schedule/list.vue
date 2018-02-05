<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">批次列表</div>
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
                    <td>{{item.organ}}</td>
                    <td>{{item.orderNum}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.stcodeName}}</td>
                    <td>{{unixFormat(item.createTime)}}</td>             
                    <td>{{item.emp}}</td>
                    <td>
                      <el-button type="primary">导出工件</el-button>
                      <el-button type="success">上传工件</el-button>                
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
      thead: ['批次号', '机构', '订单数量', '包装数量', '批次状态', '创建时间', '创建人', '操作'],
      tbody: [
        {
          id: '217120701',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '10',
          num: '20',
          stcode: '220',
          stcodeName: '已排料',
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '217120702',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '25',
          num: '18',
          stcode: '220',
          stcodeName: '已排料',
          emp: '卢媚娇',
          createTime: '2017-12-18',
        },
        {
          id: '217120703',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '48',
          num: '59',
          stcode: '220',
          stcodeName: '已排料',
          emp: '江夏云',
          createTime: '2017-12-19',
        },
        {
          id: '217120704',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '5',
          num: '9',
          stcode: '220',
          stcodeName: '已排料',
          emp: '洪晨',
          createTime: '2017-12-25',
        },
        {
          id: '217120705',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '9',
          num: '3',
          stcode: '220',
          stcodeName: '待排料',
          emp: '大饼',
          createTime: '2017-12-26',
        },
        {
          id: '217120706',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '18',
          num: '8',
          stcode: '220',
          stcodeName: '已排料',
          emp: '洪晨',
          createTime: '2017-12-27',
        },
        {
          id: '217120707',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '24',
          num: '14',
          stcode: '220',
          stcodeName: '待排料',
          emp: '卢媚娇',
          createTime: '2017-12-28',
        },
        {
          id: '217120708',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '28',
          num: '14',
          stcode: '220',
          stcodeName: '已排料',
          emp: '江夏云',
          createTime: '2017-12-28',
        },
        {
          id: '217120709',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '16',
          num: '17',
          stcode: '220',
          stcodeName: '待排料',
          emp: '徐杰',
          createTime: '2017-12-30',
        },
        {
          id: '217120710',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '15',
          num: '25',
          stcode: '220',
          stcodeName: '已排料',
          emp: '洪晨',
          createTime: '2017-12-31',
        },
        {
          id: '217120711',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '2',
          num: '2',
          stcode: '220',
          stcodeName: '已排料',
          emp: '大饼',
          createTime: '2018-01-08',
        },
        {
          id: '217120712',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '8',
          num: '5',
          stcode: '220',
          stcodeName: '待排料',
          emp: '徐杰',
          createTime: '2018-01-12',
        },
        {
          id: '217120713',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '81',
          num: '22',
          stcode: '220',
          stcodeName: '已排料',
          emp: '卢媚娇',
          createTime: '2018-01-12',
        },
        {
          id: '217120714',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '12',
          num: '18',
          stcode: '220',
          stcodeName: '待排料',
          emp: '大饼',
          createTime: '2018-01-18',
        },
        {
          id: '217120715',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '10',
          num: '14',
          stcode: '220',
          stcodeName: '已排料',
          emp: '洪晨',
          createTime: '2018-01-24',
        },
        {
          id: '217120718',
          organ: '嘉善大王椰家居科技有限公司',
          orderNum: '21',
          num: '25',
          stcode: '220',
          stcodeName: '待排料',
          emp: '洪晨',
          createTime: '2018-01-26',
        },
      ],
      screening: [
        [
          {
            label: '机构号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '批次号',
            type: 'input',
            field: 'ctctMobile',
          },
          {
            label: '订单号',
            type: 'select',
            field: 'cliqueId',
            data: [],
          },
          {
            label: '批次状态',
            type: 'selectLinkage',
            field: 'storeId',
            change: true,
            index: 0,
            data: [],
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 16,
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
