<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">采购单列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="concat">合并</el-button>
              <el-button type="primary" @click="concatRecall">合并撤回</el-button>
              <el-button type="primary" @click="review">审核</el-button>
              <el-button type="primary" @click="recall">撤回</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button type="danger" @click="del">删除</el-button>
              <router-link :to="{path: '/purchase/purchases/edit'}">
                <el-button type="primary">新建采购单</el-button>
              </router-link>
              <!--<el-button type="primary" @click="edit()">打印</el-button>-->
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
              <td class="router"><span @click="detail(item.id)">{{item.purcNo}}</span></td>
              <td>{{item.empName}}</td>
              <td>{{item.suppName}}</td>
              <td>{{unixFormat(item.deliveryTime)}}</td>
              <td>{{item.typeName}}</td>
              <td>{{unixFormat(item.purcTime)}}</td>
              <td>{{item.reviewName}}</td>
              <td>{{item.stcodeName}}</td>
              <td>
                <el-button type="primary" v-if="item.stcode === 30" @click="openContract(item)">生成采购合同</el-button>
                <el-button type="primary" v-if="item.stcode === 40" @click="openDelivery(item)">生成收货单</el-button>
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

      <el-dialog title="生成采购合同" v-model="dialogContract" :close-on-click-modal="false" :before-close="resetContract" custom-class="purchaseDialog">
        <el-form :model="form"  ref="form" label-width="140px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item  label="采购单编号">
                <el-input v-model="form.purcNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="供应商名称">
                <el-input v-model="form.suppName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item  label="合同编号" prop="contractNo">
                <el-input v-model="form.contractNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="合同金额" prop="total">
                <el-input v-model.number="form.total"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item  label="付款方式" prop="payType">
                <el-select v-model.number="form.payType" placeholder="请选择付款方式">
                  <el-option :label="data.name" v-for="data in payData" :value="data.id" :key="data.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="运输方式" prop="transType">
                <el-select v-model.number="form.transType" placeholder="请选择运输方式">
                  <el-option :label="data.name" v-for="data in transData" :value="data.id" :key="data.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item  label="到货地址" prop="deliveryAddress">
                <el-input v-model="form.deliveryAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item  label="联系人" prop="contact">
                <el-input v-model="form.contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="联系电话" prop="contactMobile">
                <el-input v-model="form.contactMobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetContract">取 消</el-button>
          <el-button type="primary" @click="createSortP('form')">确认生成</el-button>
        </div>
      </el-dialog>
      <el-dialog title="生成收货单" v-model="dialogDelivery" :close-on-click-modal="false" :before-close="resetDelivery" custom-class="purchaseDialog">
        <el-form :model="deliveryForm"  ref="deliveryForm" label-width="140px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item  label="收货单编号" prop="receNo">
                <el-input v-model="deliveryForm.receNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="供应商名称">
                <el-input v-model="deliveryForm.suppName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--<el-col :span="12">-->
              <!--<el-form-item label="收货类型" prop="type">-->
                <!--<el-select v-model.number="deliveryForm.type" placeholder="收货类型">-->
                  <!--<el-option label="1" value="1"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item  label="应付款" prop="payables">
                <el-input v-model.number="deliveryForm.payables"></el-input>
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
                <tr v-for="(item, index) in recieveData">
                  <td>
                   {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                  </td>
                  <td>{{item.mateId}}物料名称</td>
                  <td>{{item.mateType}}</td>
                  <td style="width:200px !important;">
                    <el-input v-model="item.num" size="small"></el-input>
                  </td>
                  <td>{{item.unit}}</td>
                  <td>{{unixFormat(item.needTime)}}</td>
                </tr>
                <tr v-if="tbody.length==0 && !loading">
                  <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createDelivery('deliveryForm')">确认生成</el-button>
          <el-button @click="resetDelivery">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import screening from '../../../components/screening.vue';
  import { Purchase, Assistant } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import Rules from '../../../assets/validate/rules';

  export default {
    data() {
      return {
        thead: ['采购单编号', '采购人', '供应商名称', '预计交付时间', '采购类型', '创建时间', '审核人', '采购状态', '操作'],
        thead02: ['物料名称', '物料类型', '数量', '单位', '预计交付时间'],
        tbody: [],
        recieveData: [],
        payData: [],
        transData: [],
        checkList: [],
        form: {
          contractNo: '',
          purcId: '',
          purcNo: '',
          suppId: '',
          suppName: '',
          total: '',
          payType: '',
          transType: '',
          deliveryAddress: '',
          contact: '',
          contactMobile: '',
        },
        deliveryForm: {
          receNo: '',
          suppId: '',
          suppName: '',
          payables: '',
          purcId: '',
        },
        screening: [
          [
            {
              label: '采购单编号',
              type: 'input',
              field: 'purcNo',
            },
            {
              label: '采购状态',
              type: 'select',
              field: 'stcode',
              data: [],
            },
          ],
        ],
        paginationData: {
          page: 1,
        },
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: false,
        dialogContract: false,
        dialogDelivery: false,
        rules: {
          contractNo: [{ ...Rules.required, message: '请输入合同编号' }],
          total: [{ ...Rules.required, message: '请输入合同金额', type: 'number' }],
          payType: [{ ...Rules.required, message: '请选择付款方式', type: 'number' }],
          transType: [{ ...Rules.required, message: '请选择运输方式', type: 'number' }],
          deliveryAddress: [{ ...Rules.required, message: '请输入到货地址' }],
          contact: [{ ...Rules.required, message: '请输入联系人' }],
          contactMobile: [
            { ...Rules.required, message: '请输入联系电话' },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的联系方式',
            },
          ],
          receNo: [{ ...Rules.required, message: '请输入收货单编号' }],
          suppName: [{ ...Rules.required, message: '请输入供应商名称' }],
          //  type: [{ ...Rules.required, message: '请选择收货类型', type: 'number' }],
          payables: [{ ...Rules.required, message: '请输入应付款', type: 'number' }],
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
        Purchase.purchaseList(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
        Assistant.purStcode()
          .then(res => {
            this.screening[0][1].data = res.data;
          })
          .catch(err => {
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
      concat: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseConcat(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '合并成功',
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
      concatRecall: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseConcatRecall(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '合并已撤回',
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
      review: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseReview(this.checkList.toString())
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '审核成功',
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
      recall: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseRecall(this.checkList.toString())
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
      submit: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseSubmit(this.checkList.toString())
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
      del: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          Purchase.purchaseDel(this.checkList.toString())
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
      resetContract() {
        this.form = {
          contractNo: '',
          purcId: '',
          purcNo: '',
          suppId: '',
          suppName: '',
          total: '',
          payType: '',
          transType: '',
          deliveryAddress: '',
          contact: '',
          contactMobile: '',
        };
        this.dialogContract = false;
      },
      resetDelivery() {
        this.deliveryForm = {
          receNo: '',
          suppId: '',
          payables: '',
          purcId: '',
        };
        this.dialogDelivery = false;
      },
      openContract: function (item) {
        this.dialogContract = true;
        this.form.purcId = item.id;
        this.form.suppId = item.suppId;
        this.form.purcNo = item.purcNo;
        this.form.suppName = item.suppName;
        Assistant.purPay()
          .then(res => {
            this.payData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        Assistant.purTrans()
          .then(res => {
            this.transData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      openDelivery: function (item) {
        this.dialogDelivery = true;
        this.deliveryForm.suppName = item.suppName;
        this.deliveryForm.purcId = item.id;
        this.deliveryForm.suppId = item.suppId;
        Purchase.purchaseRecieveList(item.id).then(res => {
          this.loading = false;
          this.recieveData = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      createSortP: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log('form', this.form);
            Purchase.purContractAdd(this.form)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '生成合同成功',
                  type: 'success',
                });
                this.resetContract();
                this.init();
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      },
      createDelivery: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let arr = {};
            arr = this.deliveryForm;
            arr.receivingLists = this.recieveData;
            console.log('arr', arr);
            Purchase.purReceiveAdd(arr)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '生成收货单成功',
                  type: 'success',
                });
                this.resetDelivery();
                this.init();
                this.$router.push('/purchase/recieve/list');
              })
              .catch(err => {
                console.log(err);
              });
          }
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
      detail: function (val) {
        this.$router.push(`/purchase/purchases/detail/${val}`);
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
