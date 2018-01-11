<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">订单类型列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit(0)">新增</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex z1-table" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
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
              <!-- <tr v-for="(item, index) in tbody" :class="{'forbid-bg':item.state === 0}"> -->
              <tr v-for="(item, index) in tbody">
                <td>
                  {{index + 1}}
                </td>
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.orderSuperTypeName}}</td>
                <td>{{item.orderFlowCodeStr}}</td>
                <td>
                  <el-button type="primary" @click="edit(item.id)">修改</el-button>
                  <el-button type="danger" v-if="item.state === 1" @click="changeState(item)">禁用</el-button>
                  <el-button type="success" v-else @click="changeState(item)">启用</el-button>
                </td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="`${submitMessage}订单类型`" :visible.sync="dialogShowOrder" custom-class="addOrder" :before-close="resetDialog">
      <el-form :model="form" ref="form" :rules="rulesOrder" label-width="140px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="订单所属大类" class="required" prop="orderSuperType">
              <el-select v-model="form.orderSuperType" placeholder="请选择订单所属大类">
                <el-option v-for="item in superTypeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="订单类型名称" class="required" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="submitType === 'edit'">
          <el-col :span="24">
            <el-form-item label="订单流程">
              <el-checkbox-group v-model="form.orderFlowCodes">
                <el-checkbox v-for="item in flowCodeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button type="primary" @click="onSubmitOrder('form')">确定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>
<script type="text/javascript">
import Rules from '../../assets/validate/rules';
import { Order, Assistant } from '../../services/admin';

export default {
  data() {
    return {
      form: {
        orderSuperType: '',
        name: '',
        orderFlowCodes: [],
      },
      flowCodeList: [],
      superTypeList: [],
      thead: ['订单类型编号', '订单类型名称', '订单大类名称', '流程', '操作'],
      tbody: [],
      loading: true,
      cliqueId: this.id,
      dialogShowOrder: false,
      submitType: 'add',
      submitMessage: '新增',
      rulesOrder: {
        name: [
          { ...Rules.required, message: '请填写订单类型名称' }, {
            max: 16, message: '订单类型名称长度不能超过16个字',
          },
        ],
        orderSuperType: [
          {
            ...Rules.select,
            message: '请选择订单所属大类',
            type: 'number',
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  props: [
    'id',
  ],
  methods: {
    init: function () {
      this.loading = true;
      Promise.all([
        Assistant.orderTypeByClique({ id: this.id }),
        Assistant.flowCode({ id: this.id }),
        Assistant.superType({ id: this.id })])
        .then(([list, flowCode, superType]) => {
          this.loading = false;
          this.tbody = list.data;
          this.flowCodeList = flowCode.data;
          this.superTypeList = superType.data;
          console.log(this.flowCodeList);
        }).catch(err => {
          console.log(err);
        });
    },
    edit: function (val) {
      this.form = {
        orderSuperType: '',
        name: '',
        orderFlowCodes: [],
      };
      if (val === 0) {
        console.log(1);
        this.submitType = 'add';
        this.submitMessage = '新增';
        this.dialogShowOrder = true;
        if (this.$refs.form !== undefined) {
          this.$refs.form.resetFields();
        }
      } else {
        this.submitType = 'edit';
        this.submitMessage = '修改';
        const data = {
          orderType: val,
        };
        Promise.all([
          Assistant.orderTypeById(data),
          Assistant.flowCodeDetail(data)])
          .then(([orderTypeById, flowCodeDetail]) => {
            this.loading = false;
            this.form.id = orderTypeById.data.id;
            this.form.name = orderTypeById.data.name;
            this.form.orderSuperType = orderTypeById.data.orderSuperType;
            this.form.orderFlowCodes = this.filterData(flowCodeDetail.data);
            this.dialogShowOrder = true;
          }).catch(err => {
            console.log(err);
          });
      }
    },
    changeState: function (data) {
      const str = data.state === 1 ? '禁用' : '启用';
      const t = {
        id: data.id,
        state: data.state === 1 ? 0 : 1,
      };
      Order.editOrderType(t).then(res => {
        console.log(res);
        this.$message({
          message: `${str}成功`,
          type: 'success',
        });
        this.init();
      }).catch(err => {
        console.log(err);
        this.$message({
          message: `${str}成功`,
          type: 'error',
        });
      });
    },
    filterData: function (data) {
      const t = [];
      data.forEach(v => {
        t.push(v.flowCode);
      });
      return t;
    },
    onSubmitOrder: function (formName) {
      const self = this;
      if (this.submitType === 'add') {
        this.form.cliqueId = this.cliqueId;
      } else {
        this.form.orderFlowCodesStr = this.form.orderFlowCodes.sort().join(',');
      }
      console.log(this.form);
      self.$refs[formName].validate((valid) => {
        if (valid) {
          Order[`${self.submitType}OrderType`].call(self, self.form).then(res => {
            console.log(res);
            self.$message({
              message: `${self.submitMessage}订单类型成功`,
              type: 'success',
            });
            self.init();
            self.resetDialog();
            return true;
          })
            .catch(err => {
              if (err.status === 201) {
                self.$message({
                  message: `${self.submitMessage}订单类型成功`,
                  type: 'success',
                });
                self.init();
                self.resetDialog();
              } else {
                self.$message({
                  message: err.msg,
                  type: 'error',
                });
              }
            });
        } else {
          return false;
        }
        return false;
      });
    },
    resetForm: function (formName) {
      const self = this;
      self.form = {
        orderSuperType: '',
        name: '',
        orderFlowCodes: [],
      };
      self.dialogShowOrder = false;
      self.$refs[formName].resetFields();
    },
    resetDialog: function () {
      this.resetForm('form');
    },
  },
  components: {
  },
  watch: {
  },
};
</script>
<style lang="scss" scoped>

</style>
