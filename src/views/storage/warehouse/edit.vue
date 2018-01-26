<template>
  <div class="container">
		<div class="dis-flex">
			<div class="page-oper">
				<div class="page-title">{{options.title}}</div>
			</div>
			<div class="container" v-loading.lock="loading">
				<el-form ref="form" :model="form" :rules="rules" label-width="140px">
					<el-row>
						<el-col :span="8">
							<el-form-item  label="仓库编号" class="required" prop="whseCode">
								<el-input v-model="form.whseCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="仓储助记码" class="whseMnemonicCode" prop="mobile">
								<el-input v-model="form.whseMnemonicCode"></el-input>
							</el-form-item>
						</el-col>
                    </el-row>
                    <el-row>
						<el-col :span="8">
							<el-form-item  label="仓库名称" class="required" prop="name">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="仓库类型" class="required" prop="type">
								<el-input v-model="form.type"></el-input>
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
                        <el-button type="primary" @click="onSubmit('form')" class="my-button" :loading="request">{{options.btn}}</el-button>
                        <el-button @click="back" class="my-button">取 消</el-button>
                    </el-form-item>
				</el-form>
			</div>
		</div>
  </div>
</template>

<script>
import { Storage } from '../../../services/admin';

export default {
  data() {
    return {
      form: {
        whseCode: '',
        whseMnemonicCode: '',
        name: '',
        type: '',
        remark: '',
      },
      loading: true,
      request: false,
      options: {
        type: 'storageAdd',
        message: '新建',
        btn: '确认新建',
        title: '新建仓库',
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.options.type = 'storageEdit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改仓库信息';
      this.form.cid = this.$route.params.id;
      this.init();
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function () {
      Storage.storageDetail(this.$route.params.id).then(res => {
        this.loading = false;
        this.form = res.data;
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
          this.request = true;
          Storage[this.options.type].call(this, this.form).then(() => {
            this.$message({
              message: `${this.options.message}仓库成功`,
              type: 'success',
            });
            this.$router.push('/storage/warehouse/list');
            return true;
          }).catch(err => {
            this.$message({
              message: err.msg,
              type: 'error',
            });
          }).finally(() => {
            this.request = false;
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
};
</script>

<style lang="scss" scoped>

</style>