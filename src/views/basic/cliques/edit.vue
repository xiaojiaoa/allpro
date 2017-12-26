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
              <el-form-item  label="集团名称" class="required" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构类型" class="required" prop="type">
                <el-select v-model="form.type" placeholder="请选择类型" disabled>
                  <el-option v-for="item in organ" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="是否自带仓库" class="required" prop="isWarehouse">
                <el-select v-model="form.isWarehouse" placeholder="">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="集团地址" class="required" prop="dist">
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
              <el-form-item  label="备注" prop="remark">
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
import { Organization, Assistant } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import addressChoose from '../../../components/address.vue';

export default {
  data() {
    return {
      form: {
        id: '',
        owner: '',
        ownerMobile: '',
        name: '',
        type: 20,
        isWarehouse: '',
        country: '',
        province: '',
        city: '',
        dist: '',
        address: '',
        remark: '',
      },
      organ: [],
      options: {
        type: 'add',
        message: '新增',
        btn: '确认新增',
        title: '新增集团信息',
      },
      rules: {
        owner: [
          { ...Rules.required, message: '请填写负责人姓名' }, {
            max: 16, message: '负责人名字长度不能超过16个字',
          },
        ],
        ownerMobile: [
          { ...Rules.required, message: '请填写负责人手机' }, {
            ...Rules.mobile,
          },
        ],
        name: [
          { ...Rules.required, message: '请填写集团名称' }, {
            max: 32, message: '集团名称长度不能超过32个字',
          },
        ],
        type: [
          { ...Rules.select, message: '请选择集团类型', type: 'number' },
        ],
        isWarehouse: [
          { ...Rules.select, message: '请选择' },
        ],
        dist: [
          { ...Rules.select, message: '请选择地区' },
        ],
        address: [
          { ...Rules.required, message: '请填写详细地址' }, {
            max: 64, message: '详细地址不能超过64个字',
          },
        ],
        remark: [
          {
            max: 128, message: '备注信息不能超过128个字',
          },
        ],
      },
    };
  },
  created() {
    Assistant.organ().then(res => {
      this.organ = res.data;
    });
    if (this.$route.params.id) {
      this.options.type = 'edit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改集团信息';
      this.form.id = this.$route.params.id;
      this.init();
    }
  },
  methods: {
    init: function () {
      Organization.detail(this.$route.params.id).then(res => {
        this.form = res.data;
        this.form.ownerMobile = `${this.form.ownerMobile}`;
        this.form.isWarehouse = `${this.form.isWarehouse}`;
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
          Organization[this.options.type].call(this, this.form).then(res => {
            console.log('res', res);
            this.$message({
              message: `${this.options.message}集团信息成功`,
              type: 'success',
            });
            this.$router.push('/basic/cliques/list');
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
    back: function () {
      this.$router.go(-1);
    },
    address: function (data) {
      this.form.country = data.country;
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