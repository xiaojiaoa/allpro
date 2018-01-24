<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">新增交流信息</div>
      </div>
      <div class="container">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="交流信息" prop="content">
                <el-col :span="24">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.content"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">保 存</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Order } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';

export default {
  data() {
    return {
      form: {
        tid: this.$route.params.id,
        type: '1',
        content: '',
      },
      rules: {
        content: [
          { ...Rules.required, message: '请填写交流信息 ' },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.path);
  },
  computed: {
    ...mapState('Global', ['routerActive']),
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Order.communication(this.form).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '操作成功',
                type: 'success',
              });
              this.$router.push(`/order/${this.routerActive[1]}/detail/${this.$route.params.id}`);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    returnList: function () {
      this.$router.push(`/order/${this.routerActive[1]}/detail/${this.$route.params.id}`);
    },
  },
};
</script>
