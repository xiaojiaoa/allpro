<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">新建请购单</div>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <el-form ref="ruleForm" :model="formTop" label-width="140px" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="请购单编号" prop="reqNo">
              <el-col>
                <el-input v-model="formTop.reqNo"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货地址" prop="deliveryAddress">
              <el-col>
                <el-input v-model="formTop.deliveryAddress"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="截止日期" prop="needTime">
              <el-col>
                <el-date-picker
                  v-model="formTop.needTime"
                  type="date"
                  placeholder="选择截止日期"
                  @change="dateformat('needTime')"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                >
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="admin-table">
          <table class="admin-main-table">
            <thead>
            <tr>
              <th v-for="value in thead" :title="value">
                {{value}}
              </th>
            </tr>
            </thead>
            <tbody>
            <template>
              <tr v-for="(item,index) in showList">
                <td>{{item.mateName}}</td>
                <td>{{item.suppName}}</td>
                <td>{{item.mateTypeName}}</td>
                <td style="width:200px !important;">
                  <el-input v-model="item.num" placeholder="请输入数量" size="small"></el-input>
                </td>
                <td style="width:200px !important;">
                  <el-select v-model="item.unit" placeholder="请选择单位" size="small">
                    <el-option v-for="unit in item.matrUnits" :label="unit.name" :value="unit.id" key="unit.id"></el-option>
                  </el-select>
                </td>
                <td style="width:200px !important;">
                  <el-input v-model="item.quote" class="requisition-input" size="small" placeholder="请输入报价"></el-input>
                </td>
                <td>0</td>
                <td>0</td>
              </tr>
            </template>
            </tbody>
          </table>
          <el-row style="margin-top:20px;">
            <el-col :span="6" :offset="6">
              <el-form-item>
                <el-button type="primary" @click="submit('ruleForm')">确认提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';
  import storage from '../../../libs/storage/';
  import Rules from '../../../assets/validate/rules';

  export default {
    data() {
      return {
        thead: ['物料名称', '供应商名称', '分类名称', '数量', '单位', '报价', '单价', '总价'],
        tbody: [],
        showList: [],
        units: [],
        formTop: {
          reqNo: '',
          deliveryAddress: '',
          needTime: '',
        },
        rules: {
          reqNo: [{ ...Rules.required, message: '请输入请购单编号' }],
          deliveryAddress: [{ ...Rules.required, message: '请输入收货地址' }],
          needTime: [{ ...Rules.required, message: '请输入截止日期' }],
        },
        loading: true,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        Purchase.supMateAbleList(val).then(res => {
          let arr = [];
          this.loading = false;
          this.tbody = res.data.result;
          res.data.result.forEach(state => {
            this.$set(state, 'discount', 0);
            this.$set(state, 'taxRate', 0);
            this.$set(state, 'price', 0);
            this.$set(state, 'taxPrice', 0);
            this.$set(state, 'taxAmount', 0);
            this.$set(state, 'total', 0);
            this.$set(state, 'taxTotal', 0);
            this.$set(state, 'disAmount', 0);
          });

          if (storage.get('REQMATE')) {
            arr = storage.get('REQMATE');
            this.showList = [];
            this.showList = this.tbody.filter((item) => {
              return arr.includes(item.uniqueCode);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      submit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let arr = {};
            arr = this.formTop;
            arr.requestList = this.showList;
            console.log('arr', arr);
            Purchase.reqAdd(arr)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '新建成功',
                  type: 'success',
                });
                storage.set('REQMATE', []);
                this.$router.push('/purchase/requisition/list');
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log('error submit!!');
          }
        });
      },
      dateformat: function (key) {
        this.formTop[`${key}`] = this.dateFormat(this.formTop[`${key}`]);
      },
    },
    computed: {
    },
    components: {
    },
    watch: {
    },
  };
</script>

<style lang="scss" scoped>
  .el-form-item{
    margin-bottom:20px;
  }
  .default-detail{
    border-bottom:0;
      .el-row{
        border:0;
          .el-col:not(:last-of-type){
            border-right:0;
          }
      }
  }
</style>
