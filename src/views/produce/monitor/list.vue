<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query"  ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">生产监控列表</div>
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
                    <td>{{item.no}}</td>
                    <td>{{item.packageId}}</td>
                    <td>{{item.beltlineId}}</td>
                    <td>{{item.workshopId}}</td>
                    <td>{{item.device}}</td>
                    <td>{{item.stcodeName}}</td>          
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
      thead: ['工件编号', '批次号', '包装号', '生产线', '车间', '设备', '状态'],
      tbody: [
        {
          id: '180105000000000001',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '已生产',
        },
        {
          id: '180105000000000002',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间2',
          device: '大饼',
          stcodeName: '打孔中',
        },
        {
          id: '180105000000000003',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间3',
          device: '大饼',
          stcodeName: '开料中',
        },
        {
          id: '180105000000000004',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间4',
          device: '大饼',
          stcodeName: '打孔中',
        },
        {
          id: '180105000000000005',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '开料中',
        },
        {
          id: '180105000000000006',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '打孔中',
        },
        {
          id: '180105000000000007',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '已生产',
        },
        {
          id: '180105000000000008',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '封边中',
        },
        {
          id: '180105000000000009',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '封边中',
        },
        {
          id: '180105000000000010',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '开料中',
        },
        {
          id: '180105000000000011',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '封边中',
        },
        {
          id: '180105000000000012',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '开料中',
        },
        {
          id: '180105000000000013',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '开料中',
        },
        {
          id: '180105000000000014',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '封边中',
        },
        {
          id: '180105000000000015',
          no: '217120701',
          packageId: 'CB001',
          beltlineId: '生产线1',
          workshopId: '车间1',
          device: '大饼',
          stcodeName: '开料中',
        },
      ],
      screening: [
        [
          {
            label: '工件编号',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '批次号',
            type: 'input',
            field: 'ctctMobile',
          },
        ],
      ],
      paginationData: {
        page: 1,
        pageSize: 20,
        totalItems: 15,
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
