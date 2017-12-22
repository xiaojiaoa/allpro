<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">修改密码</div>
      </div>
      <div class="container">
        <el-form ref="form" :model="data" :rules="rules" label-width="140px">

          <el-row>
            <el-col :span="8">
              <el-form-item label="当前密码">
                <el-input v-model="data.oldPassword" type="text" placeholder="请输入当前密码" icon="edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="新密码">
                <el-input v-model="checkPass" type="password" placeholder="请输入新密码" icon="edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="data.password" type="password" placeholder="请再次输入密码" icon="edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" class="my-button" :loading="request">提交</el-button>
            <el-button @click="back" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { Employees } from '../../../services/admin';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.data.password === '') {
        callback(new Error('请再次输入密码'));
      } else if (this.data.password !== this.checkPass) {
        console.log(this.data.password, this.checkPass);
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      data: {
        oldPassword: '',
        password: '',
      },
      request: false,
      checkPass: '',
      rules: {
        checkPass: [
          { validator: validatePass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          Employees.changePassword(this.data).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '修改成功,请重新登录',
                type: 'success',
              });
              this.$router.push('/login');
            }
          }).catch(err => {
            console.log(err);
            this.$message({
              message: err.msg,
              type: 'error',
            });
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    back: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .set-password{
    background: #fff;
    z-index: 999;
    >div{
      width:30%;
      margin-top: 10%;
      margin-left: 30%;
    }
  }
</style>
