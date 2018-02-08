<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">合同列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="review" v-if="$_has8('review01')">审核</el-button>
              <el-button type="primary" @click="recall" v-if="$_has8('review01')">撤回</el-button>
              <el-button type="danger" @click="del" v-if="$_has8('add00')">删除</el-button>
              <el-button type="primary" @click="submit" v-if="$_has8('sub02')">提交</el-button>
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
              <td class="router"><span @click="purDetail(item.id)">{{item.purcNo}}</span></td>
              <td class="router"><span @click="detail(item.id)">{{item.contractNo}}</span></td>
              <td>{{item.suppName}}</td>
              <td>{{item.total}}</td>
              <td>{{item.payTypeName}}</td>
              <td>{{item.transTypeName}}</td>
              <td>{{item.deliveryAddress}}</td>
              <td>{{item.contact}}</td>
              <td>{{item.contactMobile}}</td>
              <td>{{item.reviewEmpName}}</td>
              <td>{{unixFormat(item.reviewTime)}}</td>
              <td>{{item.stcodeName}}</td>
              <td>
                <el-button type="primary" @click="openContract(item)">修改</el-button>
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
    <el-dialog title="修改采购合同" v-model="dialogContract" :close-on-click-modal="false" :before-close="resetContract" custom-class="purchaseDialog">
      <el-form :model="form"  ref="form" label-width="140px" :rules="rules">
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
              <el-input v-model.number="form.contactMobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetContract">取 消</el-button>
        <el-button type="primary" @click="editContract('form')">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import screening from '../../../components/screening.vue';
  import { Purchase, Assistant } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import Rules from '../../../assets/validate/rules';

  export default {
    data() {
      return {
        thead: ['采购单编号', '合同编号', '供应商名称', '合同金额', '付款方式', '运输方式', '到货地址', '联系人', '联系电话', '审核人', '审核时间', '状态', '操作'],
        tbody: [],
        checkList: [],
        payData: [],
        transData: [],
        form: {
          id: '',
          contractNo: '',
          total: '',
          payType: '',
          transType: '',
          deliveryAddress: '',
          contact: '',
          contactMobile: '',
        },
        screening: [
          [
            {
              label: '采购单编号',
              type: 'input',
              field: 'purcNo',
            },
            {
              label: '合同编号',
              type: 'input',
              field: 'contractNo',
            },
            {
              label: '付款方式',
              type: 'select',
              field: 'payType',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: false,
        dialogContract: false,
        rules: {
          contractNo: [{ ...Rules.required, message: '请输入合同编号' }],
          total: [{ ...Rules.required, message: '请输入合同金额', type: 'number' }],
          payType: [{ ...Rules.required, message: '请选择付款方式', type: 'number' }],
          transType: [{ ...Rules.required, message: '请选择运输方式', type: 'number' }],
          deliveryAddress: [{ ...Rules.required, message: '请输入到货地址' }],
          contact: [{ ...Rules.required, message: '请输入联系人' }],
          contactMobile: [
            { ...Rules.required, message: '请输入联系电话', type: 'number' },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的联系电话',
            },
          ],
        },
        permissions: {
          getList: false,
        },
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.permissions.getList = this.$_hasMulti8('get00,get01,get02,get03');
        if (this.permissions.getList) {
          this.loading = true;
          Purchase.purContractList(val).then(res => {
            this.loading = false;
            this.paginationData = res.data;
            this.tbody = res.data.result;
            this.conditions.pageSize = res.data.pageSize;
            this.conditions.pageNo = res.data.page;
          }).catch(err => {
            console.log(err);
          });
        }
        Assistant.purPay()
          .then(res => {
            this.screening[0][2].data = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      openContract: function (item) {
        this.dialogContract = true;
        //        this.form = Object.assign({}, item);
        this.form.id = item.id;
        this.form.contractNo = item.contractNo;
        this.form.total = item.total;
        this.form.payType = item.payType;
        this.form.transType = item.transType;
        this.form.deliveryAddress = item.deliveryAddress;
        this.form.contact = item.contact;
        this.form.contactMobile = item.contactMobile;
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
      resetContract() {
        this.form = Object.assign({}, {});
        //        this.form = {
        //          contractNo: '',
        //          total: '',
        //          payType: '',
        //          transType: '',
        //          deliveryAddress: '',
        //          contact: '',
        //          contactMobile: '',
        //        };
        this.dialogContract = false;
      },
      checkAllChange(val) {
        if (val.target.checked) {
          const arry = [];
          this.tbody.forEach((item) => {
            arry.push(item.id);
          });
          console.log('arr', arry);
          this.checkList = [...arry, '序号'];
        } else {
          this.checkList = [];
          console.log('else');
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
          let data = [];
          Purchase.purContractList().then(res => {
            data = res.data.result.filter((item) => {
              return this.checkList.includes(item.id);
            });
            const stcode = [];
            data.forEach(state => {
              stcode.push(state.stcode);
            });
            if (stcode.toString().includes(30) ||
              stcode.toString().includes(50)) {
              this.$message({
                message: '只能审核未审核采购合同',
                type: 'error',
              });
            } else {
              Purchase.purContractReview(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
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
          }).catch(err => {
            console.log(err);
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
          let data = [];
          Purchase.purContractList().then(res => {
            data = res.data.result.filter((item) => {
              return this.checkList.includes(item.id);
            });
            const stcode = [];
            data.forEach(state => {
              stcode.push(state.stcode);
            });
            if (stcode.toString().includes(30) ||
              stcode.toString().includes(50)) {
              this.$message({
                message: '只能删除未审核采购合同',
                type: 'error',
              });
            } else {
              Purchase.purContractDel(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
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
          }).catch(err => {
            console.log(err);
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
          let data = [];
          Purchase.purContractList().then(res => {
            data = res.data.result.filter((item) => {
              return this.checkList.includes(item.id);
            });
            const stcode = [];
            data.forEach(state => {
              stcode.push(state.stcode);
            });
            if (stcode.toString().includes(10) ||
              stcode.toString().includes(50)) {
              this.$message({
                message: '只能撤回已审核采购合同',
                type: 'error',
              });
            } else {
              Purchase.purContractRecall(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
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
          }).catch(err => {
            console.log(err);
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
          let data = [];
          Purchase.purContractList().then(res => {
            data = res.data.result.filter((item) => {
              return this.checkList.includes(item.id);
            });
            const stcode = [];
            data.forEach(state => {
              stcode.push(state.stcode);
            });
            if (stcode.toString().includes(10) ||
              stcode.toString().includes(50)) {
              this.$message({
                message: '只能提交已审核采购合同',
                type: 'error',
              });
            } else {
              Purchase.purContractSubmit(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
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
          }).catch(err => {
            console.log(err);
          });
        }
      },
      editContract: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.form);
            Purchase.purContractEdit(this.form)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '修改合同成功',
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
        this.$router.push(`/purchase/contract/detail/${val}`);
      },
      purDetail: function (val) {
        this.$router.push(`/purchase/purchases/detail/${val}`);
      },
    },
    computed: {
      conditionsWatch: function () {
        return this.paginationData.page;
      },
      ...mapState('Global', ['permissRemark']),
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
      permissRemark(val) {
        if (val) {
          this.init(this.$route.params.id);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
