<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">收货单列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="review">审核</el-button>
              <el-button type="primary" @click="recall">撤回</el-button>
              <el-button type="danger" @click="del">删除</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
          <el-checkbox-group v-model="checkList">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th><el-checkbox label="序号" name="allCheck" @change="checkAllChange"></el-checkbox></th>
                <th v-for="value in thead" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in tbody">
                <td>
                  <el-checkbox :label="item.id">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                </td>
                <td class="router"><span @click="detail(item.id)">{{item.receNo}}</span></td>
                <!--<td>{{item.typeName}}</td>-->
                <td>{{item.suppName}}</td>
                <td>{{item.payables}}</td>
                <td>{{item.empName}}</td>
                <td>{{unixFormat(item.receTime)}}</td>
                <td>{{item.whseName}}</td>
                <td>{{item.reviewEmpName}}</td>
                <td>{{unixFormat(item.reviewTime)}}</td>
                <td>
                  {{item.stcodeName}}
                </td>
                <td>
                  <el-button type="primary" v-if="item.stcode === 50" @click="openCheck(item)">生成检验单</el-button>
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

    <el-dialog title="生成检验单" v-model="checkDialog" :close-on-click-modal="false" :before-close="resetCheck" custom-class="purchaseDialog">
      <el-form id="#create" :model="form"  ref="form" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item  label="检验单编号" :rules="{ required: true, message: '请输入检验单编号', trigger: 'blur' }">
              <el-input v-model="form.checkNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="所属收货单">
              <el-input v-model="form.receNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
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
            <tr v-for="(item, index) in checkData">
              <td>
                {{index + 1}}
              </td>
              <td>{{item.mateName}}物料名称</td>
              <td>{{item.mateType}}</td>
              <td>{{item.num}}</td>
              <td>{{item.unit}}</td>
            </tr>
            <tr v-if="tbody.length==0 && !loading">
              <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCheck('form')">确认生成</el-button>
        <el-button @click="resetCheck">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import screening from '../../../components/screening.vue';
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        thead: ['收货单编号', '供应商', '应付款', '收货人', '收货时间', '收货人部门对应仓库', '审核人', '审核时间', '状态', '操作'],
        thead02: ['物料名称', '物料类型', '数量', '单位'],
        tbody: [],
        checkData: [],
        form: {
          checkNo: '',
          receId: '',
          receNo: '',
        },
        screening: [
          [
            {
              label: '收货单编号',
              type: 'input',
              field: 'receNo',
            },
          ],
        ],
        paginationData: {},
        checkList: [],
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: false,
        checkDialog: false,
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        Purchase.purRecieveList(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      },
      checkAllChange(val) {
        if (val.target.checked) {
          const arry = [];
          this.tbody.forEach((item) => {
            arry.push(item.id);
          });
          this.checkList = [...arry, '序号'];
        } else {
          this.checkList = [];
        }
      },
      getCheckList: function () {
        const index = this.checkList.indexOf('序号');
        if (index > -1) {
          this.checkList.splice(index, 1);
        }
      },
      review: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purReceiveReview(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '审核成功',
                type: 'success',
              });
              this.init();
            }).catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        }
      },
      recall: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purReceiveRecall(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '撤回成功',
                type: 'success',
              });
              this.init();
            })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        }
      },
      del: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purReceiveDel(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.init();
            })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        }
      },
      submit: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purReceiveSubmit(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '提交成功',
                type: 'success',
              });
              this.init();
            })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        }
      },

      openCheck: function (item) {
        console.log(item);
        this.checkDialog = true;
        this.form.checkNo = item.checkNo;
        this.form.receNo = item.receNo;
        this.form.receId = item.id;
        Purchase.purchaseCheckDetail(item.id)
          .then(res => {
            this.loading = false;
            this.checkData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      resetCheck() {
        this.form = {
          checkNo: '',
          receId: '',
        };
        this.checkDialog = false;
      },
      createCheck: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log('form', this.form);
            Purchase.purCheckAdd(this.form)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '生成检验单成功',
                  type: 'success',
                });
                this.resetCheck();
                this.init();
              })
              .catch(err => {
                console.log(err);
              });
          }
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
      handleSizeChange: function (val) {
        this.paginationData.pageSize = val;
        this.conditions.pageSize = val;
        this.paginationData.page = 0;
      },
      handleCurrentChange: function (val) {
        this.paginationData.page = val;
      },
      detail: function (val) {
        this.$router.push(`/purchase/recieve/detail/${val}`);
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
