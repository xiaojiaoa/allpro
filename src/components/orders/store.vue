<template>
   <el-dialog  v-model="alert" @click="hide" :showClose="false" :modal="false" custom-class="store-dialog">
        <div class="dis-flex container">
            <div class="dis-flex">
            <screening :screening="screening" @submit="query" class="Search" ref="screening"></screening>
            <div class="table dis-flex">
                <div class="admin-table dis-flex">
                <el-checkbox-group >
                    <table class="admin-main-table">
                    <thead>
                        <tr>
                        <th>序号</th>
                        <th v-for="value in storeThead" :title="value">
                            {{value}}
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in storeTbody"  @click="selectStore(item.id)">
                            <td>{{index + 1}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.owner}}</td>
                            <td>
                              {{item.typeName}}
                            </td>
                        </tr>
                        <tr v-if="storeTbody.length==0">
                            <td :colspan="storeThead.length + 1" class="nothing-data">暂无数据</td>
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
  </el-dialog>
</template>
<script type="text/javascript">
import screening from '../../components/screening.vue';
import { Order, Assistant } from '../../services/admin';


export default {
  data() {
    return {
      alert: false,
      storeThead: ['门店编号', '门店名称', '负责人名称', '门店类型'],
      storeTbody: [],
      paginationData: {},
      screening: [
        [
          {
            label: '门店编号',
            type: 'input',
            field: 'bid',
          },
          {
            label: '门店名称',
            type: 'input',
            field: 'name',
          },
          {
            label: '门店类型',
            type: 'select',
            field: 'type',
            data: [],
          },
        ],
      ],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init(this.conditions);
      }
    },
    alert: function (val) {
      if (val === false) {
        this.$refs.screening.resetBtn();
      }
    },
  },
  methods: {
    init(val) {
      Promise.all([Assistant.store(), Order.storeList(val)])
        .then(([store, storeList]) => {
          this.screening[0][2].data = store.data;
          this.storeTbody = storeList.data.result;
          this.paginationData = storeList.data;
          this.conditions.pageSize = storeList.data.pageSize;
          this.conditions.pageNo = storeList.data.page;
        })
        .catch(err => {
          console.log(err);
        });
    },
    show() {
      this.alert = true;
    },
    hide() {
      this.alert = false;
    },
    selectStore(id) {
      this.$emit('selectStore', id);
    },
    query(val) {
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
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange(val) {
      this.paginationData.page = val;
    },
  },
  components: {
    screening,
  },
};
</script>
<style scoped>
@import '../../scss/components/alert.scss';
.el-dialog__header {
  padding: 0;
}
tbody tr{
  cursor: pointer;
}
</style>