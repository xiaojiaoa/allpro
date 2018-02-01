<template>
  <div class="container">
		<div class="dis-flex">
			<div class="page-oper">
				<div class="page-title">{{options.title}}</div>
			</div>
			<div class="container" v-loading.lock="loading">
				<el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-row>
						<el-col :span="16">
							<el-form-item  label="货位编号" class="required" prop="spaceCode">
								<el-input v-model="form.spaceCode"></el-input>
							</el-form-item>
						</el-col>
          </el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item  label="所属仓库" class="required" prop="whseName">
								<el-input v-model="form.whseName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属区域" class="required" prop="regionName">
								<el-input v-model="form.regionName" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="所属集团" class="required" prop="cliqueName">
								<el-input v-model="form.cliqueName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="所属机构" class="required" prop="orgName">
								<el-input v-model="form.orgName" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row>
						<el-col :span="8">
							<el-form-item  label="最大承受重量" class="required" prop="maxWeight">
								<el-input v-model="form.maxWeight">
                  <template slot="append">kg</template>
                </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="最大数量" class="required" prop="maxAmount">
								<el-input v-model="form.maxAmount">
                  <template slot="append">件</template>
                </el-input>
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
              <el-col :span="9">
                <el-form-item label="货架长宽高" class="required" prop="sizeLength">  
                      <el-input v-model="form.sizeLength">
                        <template slot="append">长(mm)</template>
                      </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="blank"></el-col>
              <el-col :span="6">
                <el-form-item label="" class="required" prop="sizeWidth" label-width="0">    
                      <el-input v-model="form.sizeWidth">
                         <template slot="append">宽(mm)</template>
                      </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="1" class="blank"></el-col>
              <el-col :span="7">
                <el-form-item label="" class="required" prop="sizeHeight" label-width="0">    
                      <el-input v-model="form.sizeHeight">
                         <template slot="append">高(mm)</template>
                      </el-input>
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
        regionName: '',
        whseId: '',
        whseName: '',
        cliqueName: '',
        cliqueId: '',
        orgName: '',
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
        type: 'cargospaceAdd',
        message: '新建',
        btn: '确认新建',
        title: '新建货位',
      },
      rules: {
        spaceCode: [
          {
            required: true,
            message: '请填写货位编号',
            triggle: 'submit',
          },
        ],
        maxWeight: [
          {
            type: 'number',
            required: true,
            message: '请填写最大重量',
            triggle: 'submit',
          },
        ],
        maxAmount: [
          {
            type: 'number',
            required: true,
            message: '请填写最大数量',
            triggle: 'submit',
          },
        ],
        weightRange: [
          {
            type: 'number',
            required: true,
            message: '请填写重量范围',
            triggle: 'submit',
          },
        ],
        amountRange: [
          {
            type: 'number',
            required: true,
            message: '请填写数量范围',
            triggle: 'submit',
          },
        ],
        sizeLength: [
          {
            type: 'number',
            required: true,
            message: '请填写长度',
            triggle: 'submit',
          },
        ],
        sizeWidth: [
          {
            type: 'number',
            required: true,
            message: '请填写宽度',
            triggle: 'submit',
          },
        ],
        sizeHeight: [
          {
            type: 'number',
            required: true,
            message: '请填写高度',
            triggle: 'submit',
          },
        ],
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
      this.region(this.$route.params);
      this.loading = false;
    }
  },
  methods: {
    init: function () {
      Storage.cargospaceDetail(this.$route.params.spaceId).then(res => {
        this.loading = false;
        this.form = res.data;
        console.log('12', res.data);
      })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
          });
        });
    },
    region(val) {
      Storage.regionList(val).then(res => {
        this.form.whseId = res.data.result[0].whseId;
        this.form.whseName = res.data.result[0].whseName;
        this.form.cliqueId = res.data.result[0].cliqueId;
        this.form.cliqueName = res.data.result[0].cliqueName;
        this.form.orgId = res.data.result[0].orgId;
        this.form.orgName = res.data.result[0].orgName;
        this.form.regionId = res.data.result[0].regionId;
        this.form.regionName = res.data.result[0].name;
      }).catch(err => {
        console.log(err);
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