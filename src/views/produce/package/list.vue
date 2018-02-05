<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">包装列表</div>
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
                    <td>{{item.order}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.typeName}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.emp}}</td>
                    <td>{{unixFormat(item.createTime)}}</td>  
                    <td>
                      <el-button type="primary">包装清单</el-button>           
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
      thead: ['包装编号', '所属订单', '所属批次', '包装类型', '工件数量', '包装人', '包装时间', '操作'],
      tbody: [
        {
          id: '217120701',
          order: '1330100021712100014',
          no: '217120701',
          typeName: 'CB',
          num: 2,
          emp: '大饼',
          createTime: '2017-12-06',
        },
        {
          id: '217120702',
          order: '1330100011712220001',
          no: '217120701',
          typeName: 'GL',
          num: 3,
          emp: '洪晨',
          createTime: '2017-12-07',
        },
        {
          id: '217120703',
          order: '1330100021712100006',
          no: '217120703',
          typeName: 'GM',
          num: 5,
          emp: '大饼',
          createTime: '2017-12-17',
        },
        {
          id: '217120704',
          order: '1330100021712100010',
          no: '217120705',
          typeName: 'CB',
          num: 6,
          emp: '洪晨',
          createTime: '2017-12-08',
        },
        {
          id: '217122001',
          order: '1330100021712100011',
          no: '217120701',
          typeName: 'GM',
          num: 8,
          emp: '大饼',
          createTime: '2017-12-08',
        },
        {
          id: '217120801',
          order: '1330100021712100015',
          no: '217120712',
          typeName: 'CB',
          num: 10,
          emp: '洪晨',
          createTime: '2017-12-09',
        },
        {
          id: '217120806',
          order: '1330100021712100017',
          no: '217120701',
          typeName: 'GM',
          num: 8,
          emp: '大饼',
          createTime: '2017-12-09',
        },
        {
          id: '217120807',
          order: '1330100021712100019',
          no: '217120715',
          typeName: 'CB',
          num: 2,
          emp: '洪晨',
          createTime: '2017-12-10',
        },
        {
          id: '217120809',
          order: '1330100021712100020',
          no: '217120718',
          typeName: 'CB',
          num: 5,
          emp: '大饼',
          createTime: '2017-12-10',
        },
        {
          id: '217120815',
          order: '1330100021712100021',
          no: '217120720',
          typeName: 'GM',
          num: 9,
          emp: '大饼',
          createTime: '2017-12-11',
        },
        {
          id: '217120818',
          order: '1330100021712100022',
          no: '217120701',
          typeName: 'CB',
          num: 7,
          emp: '洪晨',
          createTime: '2017-12-12',
        },
        {
          id: '217122001',
          order: '1330100021712100024',
          no: '217120701',
          typeName: 'GM',
          num: 5,
          emp: '大饼',
          createTime: '2017-12-12',
        },
        {
          id: '217122001',
          order: '1330100021712100025',
          no: '217120733',
          typeName: 'CB',
          num: 3,
          emp: '洪晨',
          createTime: '2017-12-15',
        },
        {
          id: '217122010',
          order: '1330100021712100026',
          no: '217120702',
          typeName: 'GM',
          num: 8,
          emp: '洪晨',
          createTime: '2017-12-15',
        },
        {
          id: '217122018',
          order: '1330100021712100027',
          no: '217120705',
          typeName: 'CB',
          num: 10,
          emp: '大饼',
          createTime: '2017-12-27',
        },
        {
          id: '217122210',
          order: '1330100021712100028',
          no: '217120708',
          typeName: 'GM',
          num: 1,
          emp: '洪晨',
          createTime: '2017-12-27',
        },
        {
          id: '217120705',
          order: '1330100021712100016',
          no: '217120706',
          typeName: 'CB',
          num: 5,
          emp: '大饼',
          createTime: '2017-12-27',
        },
        {
          id: '217122001',
          order: '1330100021712100030',
          no: '217120702',
          typeName: 'GL',
          num: 7,
          emp: '洪晨',
          createTime: '2017-12-30',
        },
      ],
      screening: [
        [
          {
            label: '包装编号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '所属批次',
            type: 'input',
            field: 'ctctMobile',
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 18,
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
    if (Object.keys(this.$route.query).length === 7) {
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
