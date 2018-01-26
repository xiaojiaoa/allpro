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
							<el-form-item  label="区域编号" class="required" prop="whseCode">
								<el-input v-model="form.regionCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="区域助记码" class="whseMnemonicCode" prop="mobile">
								<el-input v-model="form.regionMnemonicCode"></el-input>
							</el-form-item>
						</el-col>
            </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="区域名称" class="required" prop="name">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属仓库" class="required" prop="type">
								<el-input v-model="form.whseId"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="所属集团" class="required" prop="name">
								<el-input v-model="form.cliqueId"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属机构" class="required" prop="type">
								<el-input v-model="form.orgId"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="一级区域分类" class="required" prop="name">
								<el-input v-model="form.regionType"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="二级区域分类" class="required" prop="type">
								<el-input v-model="form.cargoType"></el-input>
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
        regionCode: '',
        regionMnemonicCode: '',
        name: '',
        whseId: '',
        cliqueId: '',
        orgId: '',
        regionType: '',
        cargoType: '',
        remark: '',
      },
      loading: true,
      request: false,
      options: {
        type: 'regionAdd',
        message: '新建',
        btn: '确认新建',
        title: '新建仓库区域',
      },
    };
  },
  created() {
    if (this.$route.params.regionId) {
      this.options.type = 'regionEdit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改仓库区域信息';
      this.form.regionId = this.$route.params.regionId;
      this.init();
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function () {
      Storage.regionDetail(this.$route.params.regionId).then(res => {
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
              message: `${this.options.message}仓库区域成功`,
              type: 'success',
            });
            this.$router.push(`/storage/region/list?whseId=${this.$route.params.whseId}`);
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
    back: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>