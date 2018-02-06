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
							<el-form-item  label="区域编号" class="required" prop="regionCode">
								<el-input v-model="form.regionCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item  label="区域助记码" class="whseMnemonicCode" prop="regionMnemonicCode">
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
							<el-form-item  label="所属仓库" class="required" prop="whseName">
								<el-input v-model="form.whseName" disabled></el-input>
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
                  <el-form-item label="存储类型" prop="regionType">  
                      <el-select v-model="form.regionType" placeholder="请选择存储类型" @change="clearType">
                          <el-option label="物料" value="1"></el-option>
                          <el-option label="包装" value="2"></el-option>                   
                      </el-select> 
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物料存储类型" prop="cargoType" v-if="form.regionType == 1">
                    <el-cascader
                      class="cascader"
                      :options="options.types"
                      :value="options.types.name"
                      :props="options.props"
                      v-model="options.typeId"
                      @change="addTypeId"
                      clearable
                      change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="包装存储类型" prop="cargoType" v-if="form.regionType == 2">
                  <el-select v-model="form.cargoType" placeholder="请选择机构">
                      <el-option v-for="item in PackageType" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
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
import { Storage, Material } from '../../../services/admin';

export default {
  data() {
    return {
      PackageType: [],
      form: {
        regionCode: '',
        regionMnemonicCode: '',
        name: '',
        whseId: '',
        whseName: '',
        cliqueName: '',
        cliqueId: '',
        orgName: '',
        orgId: '',
        regionType: '1',
        cargoType: '',
        stcode: '',
        remark: '',
      },
      loading: true,
      request: false,
      flag: true,
      options: {
        type: 'regionAdd',
        message: '新建',
        btn: '确认新建',
        title: '新建仓库区域',
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
        typeId: [],
        types: [],
      },
      rules: {
        regionCode: [
          { required: true, message: '请输入区域编码', triggle: 'submit' },
        ],
        regionMnemonicCode: [
          { required: true, message: '请输入区域助记码', triggle: 'submit' },
        ],
        name: [
          { required: true, message: '请输入区域名称', triggle: 'submit' },
        ],
        regionType: [
          {
            required: true,
            message: '请选择类型',
            triggle: 'submit',
            type: 'string',
          },
        ],
        cargoType: [
          {
            required: true,
            message: '请选择类型',
            triggle: 'submit',
            type: 'number',
          },
        ],
      },
    };
  },
  created() {
    this.selectData();
    if (this.$route.params.regionId) {
      this.options.type = 'regionEdit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改仓库区域信息';
      this.form.regionId = this.$route.params.regionId;
      this.init();
    } else {
      this.loading = false;
      this.StorageDetail({ whseId: this.$route.params.whseId });
    }
  },
  methods: {
    init: function () {
      Storage.regionDetail(this.$route.params.regionId).then(res => {
        this.loading = false;
        this.form = res.data;
        this.form.regionType = `${res.data.regionType}`;
      })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
          });
        });
    },
    StorageDetail(val) {
      Storage.storageList(val).then(res => {
        this.form.whseId = res.data.result[0].whseId;
        this.form.whseName = res.data.result[0].name;
        this.form.cliqueId = res.data.result[0].cliqueId;
        this.form.cliqueName = res.data.result[0].cliqueName;
        this.form.orgId = res.data.result[0].orgId;
        this.form.orgName = res.data.result[0].orgName;
      }).catch(err => {
        console.log(err);
      });
    },
    selectData() {
      Promise.all([Material.typeList(), Storage.PackageType()])
        .then(([material, packageType]) => {
          this.options.types = material.data;
          this.filterInfo(this.options.types);
          this.PackageType = packageType.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearType() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.form.cargoType = '';
        this.options.typeId = [];
      }
    },
    addTypeId: function (val) {
      this.form.cargoType = val[val.length - 1];
    },
    filterInfo(data) {
      let i = 1;
      const filter = function (array) {
        array.forEach(state => {
          if (state.children) {
            if (state.children.length === 0 || i === 3) {
              delete state.children;
            } else {
              i += 1;
              filter(state.children);
            }
          }
        });
        i = 1;
      };
      filter(data);
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
.cascader{
  width: 100%;
}
</style>