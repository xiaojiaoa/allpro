<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">已选中物料</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="relateMaterial">关联物料</el-button>
          <el-button type="primary" @click="setEndDate">合同截止日期</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
    <div class="admin-table">

      <el-checkbox-group v-model="checkList" @change="checkChange">
        <table class="admin-main-table">
          <thead>
          <tr>
            <th>序号</th>
            <th v-for="value in thead01" :title="value">
              {{value}}
            </th>
          </tr>
          </thead>
          <tbody>
          <template>
            <tr v-for="(item,index) in showList">
              <td>
                <el-checkbox :label="item.id">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
              </td>
              <td>{{item.no}}</td>
              <td>{{item.name}}</td>
              <td>{{item.standard}}</td>
              <td style="width:280px !important;">
                <el-date-picker
                  v-model="item.endDate"
                  type="date"
                  placeholder="选择截止日期"
                  @change="dateformat('endDate', index)"
                  format="yyyy-MM-dd"
                  size="small"
                  :picker-options="pickerOptions0"
                >
                </el-date-picker>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </el-checkbox-group>
    </div>
  </div>

    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">供应商物料关联</div>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
          <el-checkbox-group v-model="checkList" @change="checkChange">
          <table class="admin-main-table">
            <thead>
            <tr>
              <th>序号</th>
              <th v-for="value in thead02" :title="value">
                {{value}}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tbody">
              <td>
                  <el-checkbox :label="item.id">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
              </td>
              <td>{{item.no}}</td>
              <td>{{item.name}}</td>
              <td>{{item.standard}}</td>
            </tr>
            <tr v-if="tbody.length==0 && !loading">
              <td :colspan="thead02.length + 1" class="nothing-data">暂无数据</td>
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
    <el-dialog title="设置日期" v-model="dialogSet" :close-on-click-modal="false" :before-close="resetMod">
      <el-form label-width="140px">
        <el-row>
          <el-col :span="20">
            <el-form-item  label="合同截止日期">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择截止日期"
                @change="dateformat2('date')"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetMod">取 消</el-button>
        <el-button type="primary" @click="editDate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import screening from '../../../components/screening.vue';
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import storage from '../../../libs/storage/';

  export default {
    data() {
      return {
        thead01: ['物料编号', '物料名称', '物料规格', '合同截止日期'],
        thead02: ['物料编号', '物料名称', '物料规格'],
        tbody: [],
        checkList: [],
        showList: [],
        screening: [
          [
            {
              label: '物料名称',
              type: 'input',
              field: 'name',
            },
            {
              label: '物料编号',
              type: 'number',
              field: 'bid',
            },
            {
              label: '物料分类',
              type: 'select',
              field: 'bid',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: true,
        dialogSet: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        form: {
          date: '',
        },
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        Purchase.supMateList(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          res.data.result.forEach(state => {
            this.$set(state, 'endDate', '');
            this.$set(state, 'mateType', '');
            this.$set(state, 'mateId', state.id);
            this.$set(state, 'suppId', this.$route.query.sid);
          });
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          if (storage.get('SUPOFFERMATE')) {
            this.checkList = storage.get('SUPOFFERMATE');
            this.showList = [];
            this.showList = this.tbody.filter((item) => {
              return this.checkList.includes(item.id);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      checkChange: function () {
        this.showList = [];
        this.showList = this.tbody.filter((item) => {
          return this.checkList.includes(item.id);
        });
        storage.set('SUPOFFERMATE', []);
        storage.set('SUPOFFERMATE', this.checkList);
      },
      relateMaterial: function () {
        const arr = {};
        const endDate = [];
        arr.list = this.showList;
        this.showList.forEach(state => {
          state.mateType = state.typeId;
          endDate.push(state.endDate);
        });
        if (endDate.includes('')) {
          this.$message({
            message: '请填写日期',
            type: 'error',
          });
        } else {
          Purchase.supMateAdd(arr)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '关联成功',
                type: 'success',
              });
              storage.set('SUPOFFERMATE', []);
              this.$router.push(`/purchase/supplier/detail/${this.$route.query.sid}`);
            })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        }
      },
      resetMod() {
        this.dialogSet = false;
        this.form = {
          date: '',
        };
      },
      setEndDate: function () {
        this.dialogSet = true;
      },
      editDate: function () {
        this.showList.forEach(v => {
          v.endDate = this.form.date;
        });
        this.resetMod();
      },
      dateformat: function (key, index) {
        this.showList[index][`${key}`] = this.dateFormat(this.showList[index][`${key}`]);
      },
      dateformat2: function (key) {
        this.form[`${key}`] = this.dateFormat(this.form[`${key}`]);
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
      detail: function () {
        // 还不完整
        this.$router.push('/basic/material/detail');
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

</style>
