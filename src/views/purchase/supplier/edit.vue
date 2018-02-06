<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{this.$route.params.id?'修改':'新增'}}供应商</div>
      </div>
      <div class="container">
        <el-form ref="ruleForm" :model="form" label-width="140px" :rules="rules">

          <el-row>
            <el-col :span="8">
              <el-form-item  label="供应商分类" prop="cateId">
                <el-col :span="12">
                  <el-col :span="23">
                    <el-select v-model.number="form.parentCateId" @change="selectSort">
                      <el-option v-for="sort in sortData" :label="sort.name" :value="sort.id" :key="sort.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <el-select v-model.number="form.cateId">
                      <el-option v-for="subSort in subSortData" :label="subSort.name" :value="subSort.id" :key="subSort.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="供应商名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="供应商等级" prop="grade">
                <el-select v-model.number="form.grade" placeholder="请选择供应商等级">
                  <el-option v-for="grade in gradeData" :label="grade.name" :value="grade.value" :key="grade.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="交货方式" prop="deliveryType">
                <el-select v-model.number="form.deliveryType" placeholder="请选择交货方式">
                  <el-option v-for="delivery in deliveryTypeData" :label="delivery.name" :value="delivery.id" :key="delivery.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="联系人" prop="contact">
                <el-input v-model="form.contact" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="联系电话" prop="contactMobile">
                <el-input v-model.number="form.contactMobile" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="职务" prop="duty">
                <el-input v-model="form.duty" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="开户银行" prop="depositBank">
                <el-input v-model.number="form.depositBank" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="开户卡号" prop="depositNo">
                <el-input v-model="form.depositNo" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="开票信息" prop="invoiceInfo">
                <el-input v-model="form.invoiceInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item  label="供应商所在地" class="required" prop="dist">
                <address-choose @choose="address" :province="form.province" :city="form.city" :dist="form.dist"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item  label="详细地址" prop="address">
                <el-col>
                  <el-input v-model="form.address"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item  label="备注">
                <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="6">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">确认{{this.$route.params.id?'修改':'新增'}}</el-button>
                <router-link :to="{path: '/basic/stores/list'}">
                  <el-button @click="back" class="my-button">取消</el-button>
                </router-link>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { Purchase, Assistant } from '../../../services/admin';
  import Rules from '../../../assets/validate/rules';
  import addressChoose from '../../../components/address.vue';

  export default {
    data() {
      return {
        flag: true,
        form: {
          parentCateId: '',
          cateId: '',
          name: '',
          grade: '',
          country: '',
          province: '',
          city: '',
          dist: '',
          address: '',
          deliveryType: '',
          contact: '',
          contactMobile: '',
          duty: '',
          depositBank: '',
          depositNo: '',
          invoiceInfo: '',
          remark: '',
        },
        sortData: '',
        subSortData: '',
        deliveryTypeData: '',
        countryData: '',
        provinceData: '',
        cityData: '',
        distData: '',
        gradeData: [
          {
            value: 1,
            name: 1,
          },
          {
            value: 2,
            name: 2,
          },
          {
            value: 3,
            name: 3,
          },
          {
            value: 4,
            name: 4,
          },
          {
            value: 5,
            name: 5,
          },
          {
            value: 6,
            name: 6,
          },
          {
            value: 7,
            name: 7,
          },
          {
            value: 8,
            name: 8,
          },
          {
            value: 9,
            name: 9,
          },
        ],
        rules: {
          name: [{ ...Rules.required, message: '请输入供应商名称' }],
          cateId: [{ ...Rules.required, message: '请选择供应商分类', type: 'number' }],
          grade: [{ ...Rules.required, message: '请选择供应商等级', type: 'number' }],
          dist: [{ ...Rules.required, message: '请输入供应商地区' }],
          address: [{ ...Rules.required, message: '请输入供应商详细地址' }],
          deliveryType: [{ ...Rules.required, message: '请选择供应商名称交货方式', type: 'number' }],
          contact: [{ ...Rules.required, message: '请输入联系人名称' }],
          contactMobile: [
            { ...Rules.required, message: '请输入联系人联系方式', type: 'number' },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的联系方式',
            },
          ],
          duty: [{ ...Rules.required, message: '请输入联系人职务' }],
          depositBank: [{ ...Rules.required, message: '请输入开户银行' }],
          depositNo: [{ ...Rules.required, message: '请输入开户卡号' }],
        },
      };
    },
    created() {
      if (this.$route.params.id) {
        this.form.id = this.$route.params.id;
        this.initialization(this.$route.params.id);
      }
      this.select();
    },
    methods: {
      initialization: function (val) {
        Purchase.supDetail(val).then(res => {
          this.form = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      select: function () {
        Purchase.supSort(0)
          .then(res => {
            this.sortData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        Assistant.supDelivery()
          .then(res => {
            this.deliveryTypeData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectSort: function () {
        if (this.flag) {
          this.flag = false;
        } else {
          this.form.cateId = '';
        }
        Purchase.supSort(this.form.parentCateId)
          .then(res => {
            this.subSortData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      onSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.$route.params.id) {
              Purchase.supAdd(this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                  });
                  this.$router.push('/purchase/supplier/list');
                })
                .catch(err => {
                  this.$message({
                    message: err.msg,
                    type: 'error',
                  });
                });
            } else {
              Purchase.supEdit(this.form.id, this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                  });
                  this.$router.push('/purchase/supplier/list');
                })
                .catch(err => {
                  this.$message({
                    message: err.msg,
                    type: 'error',
                  });
                });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      address: function (data) {
        this.form.province = data.province;
        this.form.city = data.city;
        this.form.dist = data.dist;
      },
      back: function () {
        this.$router.go(-1);
      },
    },
    components: {
      addressChoose,
    },
    computed: {
    },
    watch: {
    },
  };
</script>

<style lang="scss" scoped>
</style>
