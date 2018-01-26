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
							<el-form-item  label="货位编号" class="required" prop="spaceCode">
								<el-input v-model="form.spaceCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属区域" class="required" prop="regionId">
								<el-input v-model="form.regionId"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="所属集团" class="required" prop="cliqueId">
								<el-input v-model="form.cliqueId"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属机构" class="required" prop="orgId">
								<el-input v-model="form.orgId"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="最大承受重量" class="required" prop="maxWeight">
								<el-input v-model="form.maxWeight"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="最大数量" class="required" prop="maxAmount">
								<el-input v-model="form.maxAmount"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
           <el-row>
						<el-col :span="8">
							<el-form-item  label="重量范围" class="required" prop="weightRange">
								<el-input v-model="form.weightRange"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="数量范围" class="required" prop="amountRange">
								<el-input v-model="form.amountRange"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="16">
              <el-col :span="10">
                <el-form-item label="货架长宽高" class="required" prop="sizeLength">
                  <el-col :span="24">
                    <el-col :span="22">
                      <el-input v-model="form.sizeLength">
                        <template slot="append">长</template>
                      </el-input>
                    </el-col>
                    <el-col :span="2" class="blank"></el-col>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="" class="required" prop="sizeWidth" label-width="0">    
                  <el-col :span="24" :offset="3">
                    <el-col :span="24">
                      <el-input v-model="form.sizeWidth">
                         <template slot="append">宽</template>
                      </el-input>
                    </el-col>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="" class="required" prop="sizeHeight" label-width="0">    
                  <el-col :span="24" :offset="8">
                    <el-col :span="24">
                      <el-input v-model="form.sizeHeight">
                         <template slot="append">高</template>
                      </el-input>
                    </el-col>
                  </el-col>
                </el-form-item>
              </el-col>
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
        spaceCode: '',
        regionId: '',
        name: '',
        whseId: '',
        cliqueId: '',
        orgId: '',
        maxWeight: '',
        maxAmount: '',
        weightRange: '',
        amountRange: '',
        sizeLength: '',
        sizeWidth: '',
        sizeHeight: '',
        remark: '',
      },
      loading: false,
      request: false,
      options: {
        type: 'cargospaceEdit',
        message: '新建',
        btn: '确认新建',
        title: '新建货位',
      },
    };
  },
  created() {
    if (this.$route.params.spaceId) {
      this.options.type = 'cargospaceEdit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改货位信息';
      this.form.spaceId = this.$route.params.spaceId;
      this.init();
    } else {
      this.form.whseId = this.$route.params.whseId;
      this.loading = false;
    }
  },
  methods: {
    init: function () {
      Storage.regionDetail(this.$route.params.spaceId).then(res => {
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
              message: `${this.options.message}货位成功`,
              type: 'success',
            });
            this.$router.push(`/storage/cargospace/list?whseId=${this.form.whseId}&regionId=${this.form.regionId}`);
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