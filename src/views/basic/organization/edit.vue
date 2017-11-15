<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{options.title}}</div>
      </div>
      <div class="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item  label="负责人姓名" class="required" prop="owner">
                <el-input v-model="form.owner"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人手机" class="required" prop="ownerMobile">
                <el-input v-model="form.ownerMobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="机构名称" class="required" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构类型" class="required" prop="type">
                <el-select v-model="form.type" placeholder="请选择类型">
                  <el-option label="先生" value="1"></el-option>
                  <el-option label="女士" value="2"></el-option>
                  <el-option label="保密" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="是否自带仓库" class="required" prop="isWarehouse">
                <el-input v-model="form.isWarehouse"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="机构地址" class="required" prop="dist">
                <address-choose @choose="address" :province="form.province" :city="form.city" :dist="form.dist"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="详细地址" class="required" prop="address">
                <el-input v-model="form.address" placeholder="详细地址"></el-input>
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

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" class="my-button">{{options.btn}}</el-button>
            <el-button @click="back" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Customers } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import addressChoose from '../../../components/address.vue';

export default {
  data() {
    return {
      form: {
        cid: '',
        mobile: '',
        nickName: '',
        gender: '',
        province: '',
        city: '',
        dist: '',
        address: '',
        birthday: '',
        income: '',
        isMarried: '',
        familyIncome: '',
        spouseName: '',
        spouseBirth: '',
        spouseMobile: '',
        familyMember: '',
        children: '',
        remarks1: '',
        remarks2: '',
        remarks3: '',
      },
      options: {
        type: 'individualAdd',
        message: '新增',
        btn: '确认新增',
        title: '新增机构信息',
      },
      rules: {
        mobile: [
          { ...Rules.required, message: '请填写客户电话' },
        ],
        nickName: [
          { ...Rules.required, message: '请填写客户姓名 ' },
        ],
        gender: [
          { ...Rules.select, message: '请选择性别' },
        ],
        birthday: [
          { ...Rules.date, message: '请填写生日' },
        ],
        dist: [
          { ...Rules.select, message: '请选择地区' },
        ],
        address: [
          { ...Rules.required, message: '请填写详细地址' },
        ],
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.options.type = 'individualEdit';
      this.options.message = '编辑';
      this.options.btn = '确认修改';
      this.options.title = '修改机构信息';
      this.form.cid = this.$route.params.id;
      this.init();
    }
  },
  methods: {
    init: function () {
      Customers.individualDetail(this.$route.params.id).then(res => {
        console.log(res);
        this.form = res.data;
        this.form.isMarried = `${this.form.isMarried}`;
        this.form.gender = `${this.form.gender}`;
        this.form.mobile = `${this.form.mobile}`;
      })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
          });
        });
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Customers[this.options.type].call(this, this.form).then(res => {
            console.log('res', res);
            this.$message({
              message: `${this.options.message}个人客户成功`,
              type: 'success',
            });
            this.$router.push('/basic/customers/list');
            return true;
          })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error',
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    format: function (key) {
      this.form[`${key}`] = this.dateFormat(this.form[`${key}`]);
    },
    back: function () {
      this.$router.go(-1);
    },
    address: function (data) {
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.dist = data.dist;
    },
  },
  components: {
    addressChoose,
  },
};
</script>

<style lang="scss" scoped>
</style>