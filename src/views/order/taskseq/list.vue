<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div class="list-option">
        <screening :screening="screening" @submit="query" @dataChange="getDesigner" ref="screening"></screening>
        <div class="page-oper">
          <div class="page-title">流水列表</div>
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
                    <td>{{item.storeId}}</td>
                    <td>{{item.ctctName}}</td>
                    <td>{{item.ctctMobile}}</td>
                    <td>{{item.estate}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.emplName}}</td>
                    <td>{{unixFormat(item.createTime)}} {{dateTimeFormat(item.createTime)}}</td>
                    <td>{{unixFormat(item.apptTime)}} {{dateTimeFormat(item.apptTime)}}</td>
                    <td>{{unixFormat(item.cmplTime)}} {{dateTimeFormat(item.cmplTime)}}</td>
                    <td>{{unixFormat(item.deliveryDate)}}</td>
                    <td>{{item.dsgnName}}</td>
                    <td>{{item.stCodeName}}</td>
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
import { Taskseq, Assistant } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['门店号', '联系人', '联系人电话', '楼盘名称', '流水号', '建流水员工', '建流水时间', '预约量尺时间', '完成量尺时间', '预期交付时间', '设计师', '流水状态'],
      tbody: [],
      screening: [
        [
          {
            label: '联系人',
            type: 'input',
            field: 'ctctName',
          },
          {
            label: '联系人电话',
            type: 'input',
            field: 'ctctMobile',
          },
          {
            label: '集团',
            type: 'selectSingle',
            field: 'cliqueId',
            data: [],
          },
          {
            label: '门店',
            type: 'select',
            field: 'storeId',
            change: true,
            data: [],
          },
          {
            label: '设计师',
            type: 'selectSingle',
            field: 'dsgnId',
            data: [],
          },
        ],
      ],
      paginationData: {},
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
      this.loading = true;
      Promise.all([
        Taskseq.list(val),
        Assistant.cliqueList(),
        Assistant.storeList()])
        .then(([taskseqData, cliqueData, storeData]) => {
          this.loading = false;
          this.paginationData = taskseqData.data;
          this.tbody = taskseqData.data.result;
          this.conditions.pageSize = taskseqData.data.pageSize;
          this.conditions.pageNo = taskseqData.data.page;
          this.screening[0][2].data = cliqueData.data;
          this.screening[0][3].data = storeData.data;
        }).catch(err => {
          console.log(err);
        });
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
    getDesigner: function (val) {
      this.$refs.screening.resetValue('dsgnId');
      const self = this;
      Taskseq.designer(val.storeId).then(res => {
        self.screening[0][4].data = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      this.paginationData.page = val;
    },
    custDetail: function (val) {
      this.$router.push(`/basic/customers/detail/${val}`);
    },
    // taskseqDetail: function (val) {
    //   this.$router.push(`/order/taskseq/detail/${val}`);
    // },
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
