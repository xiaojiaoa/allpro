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
							<el-form-item  label="仓储助记码" class="required" prop="whseMnemonicCode">
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
                  <el-select v-model="form.type" placeholder="请选择仓库类型" >
                      <el-option v-for="item in whTypes" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="所属集团" prop="cliqueId">
                  <el-select v-model="form.cliqueId" placeholder="请选择" @change="getChange" v-if="$_hasMulti8('add99,add98')">
                    <el-option :label="item.name" v-for="item in cliqueData" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                  <el-select v-model="form.cliqueId" placeholder="请选择" v-if="$_has8('add97')" disabled>
                    <el-option :label="item.name" v-for="item in cliqueData" :value="item.id" :key="item.id" ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属机构" class="required" prop="orgId">
                <el-select v-model="form.orgId" placeholder="请选择机构" :disabled="permitOrg">
                  <el-option v-for="item in organData" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
import { mapState } from 'vuex';
import { Storage, Assistant } from '../../../services/admin';

export default {
  data() {
    return {
      organData: [],
      cliqueData: [],
      whTypes: [],
      form: {
        whseCode: '',
        whseMnemonicCode: '',
        cliqueId: '',
        orgId: '',
        name: '',
        type: '',
        remark: '',
      },
      loading: true,
      request: false,
      permitOrg: false,
      flag: true,
      options: {
        type: 'storageAdd',
        message: '新建',
        btn: '确认新建',
        title: '新建仓库',
      },
      rules: {
        whseCode: [
          { required: true, message: '请填写仓库编号', trigger: 'blur' },
        ],
        whseMnemonicCode: [
          { required: true, message: '请填写仓储助记码', trigger: 'blur' },
        ],
        cliqueId: [
          {
            required: true,
            message: '请选择集团',
            trigger: 'blur',
            type: 'number',
          },
        ],
        orgId: [
          {
            required: true,
            message: '请选择机构',
            trigger: 'blur',
            type: 'number',
          },
        ],
        name: [
          { required: true, message: '请填写仓库名称', trigger: 'blur' },
        ],
        type: [
          {
            required: true,
            message: '请选择仓库类型',
            trigger: 'blur',
            type: 'number',
          },
        ],
      },
    };
  },
  created() {
    this.selectData();
    this.defaultValue();
    if (this.$route.params.id) {
      this.options.type = 'storageEdit';
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改仓库信息';
      this.form.cid = this.$route.params.id;
      this.init(this.$route.params.id);
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function (val) {
      Storage.storageDetail(val).then(res => {
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
    selectData() {
      Promise.all([Assistant.cliqueList(), Assistant.whTypes()])
        .then(([cliqueList, typeList]) => {
          this.cliqueData = cliqueList.data;
          this.whTypes = typeList.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    defaultValue() {
      const self = this;
      const remark = this.$_has8('add97');
      if (remark === true && this.employee.cliqueId !== undefined) {
        this.form.cliqueId = this.employee.cliqueId;
        Storage.organList(this.form.cliqueId).then(res => {
          this.permitOrg = true;
          self.organData = res.data;
          this.form.orgId = this.employee.organId;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    getChange: function (val) {
      if (this.flag) {
        this.flag = false;
      } else {
        this.form.orgId = '';
      }
      const self = this;
      Storage.organList(val).then(res => {
        self.organData = res.data;
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
    back: function () {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState('Global', ['employee']),
    cliqueIdWatch: function () {
      return this.employee.cliqueId;
    },
  },
  watch: {
    cliqueIdWatch: function (val) {
      if (val !== 0) {
        this.defaultValue();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>