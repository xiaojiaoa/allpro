<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{options.title}}</div>
      </div>
      <div class="container" v-loading.lock="loading">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item  label="员工手机" prop="mobile">
                <el-input v-model.number="form.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-col :span="16">
                <el-form-item label="员工姓名" class="required" prop="name">
                  <el-col :span="24">
                    <el-col :span="23">
                      <el-input v-model="form.name"></el-input>
                    </el-col>
                    <el-col :span="1" class="blank"></el-col>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" class="required" prop="gender" label-width="0">
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="先生" value="1"></el-option>
                        <el-option label="女士" value="2"></el-option>
                        <el-option label="保密" value="3"></el-option>                   
                      </el-select>
                    </el-col>
                  </el-col>
                </el-form-item>
              </el-col>
						</el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="员工固定电话">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="证件类型" prop="idcardType">
                <el-select v-model="form.idcardType" placeholder="请选择证件类型">
                  <el-option :label="item.name" v-for="item in idcardType" :key="item.id" :value="item.id"></el-option>               
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" prop="idcard">
                <el-input v-model="form.idcard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col :span="1" class="blank"></el-col>
              <el-col :span="11">
                <el-upload
                  class="avatar-uploader"
                  action="http://192.2.17.74:8088/api/statics//file/card"
                  :show-file-list="false"
                  :on-success="handlePhotoOneSuccess"
                  :before-upload="beforeUpload">
                  <img v-if="form.idPhotoOne" :src="'http://192.2.17.74:8088/'+form.idPhotoOne" class="idCard">
                  <el-button size="small" type="primary" class="my-button">证件照片正面</el-button>
                </el-upload>
                
              </el-col>
              <el-col :span="11">
                  <el-upload
                  class="avatar-uploader"
                  action="http://192.2.17.74:8088/api/statics//file/card"
                  :show-file-list="false"
                  :on-success="handlePhotoTwoSuccess"
                  :before-upload="beforeUpload">
                  <img v-if="form.idPhotoTwo" :src="'http://192.2.17.74:8088/'+form.idPhotoTwo" class="idCard">
                  <el-button size="small" type="primary" class="my-button">证件照片背面</el-button>
                </el-upload>
              </el-col>
              
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="所属部门" prop="did">
                <el-select v-model="form.did" placeholder="请选择" filterable>
                  <div v-for="group in departmentInfo">
                    <el-option
                      v-if="!group.subDepartment"                   
                      :key="group.id"
                      :label="group.name"
                      :value="group.id">
                    </el-option>
                    <el-option-group                     
                      :key="group.id"
                      :label="group.name"
                      :value="group.id">
                      <el-option
                        v-for="item in group.subDepartment"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-option-group>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="16">
              <el-form-item label="角色" prop="roleList">
                <el-checkbox-group v-model="form.roleList">
                  <el-checkbox :label="item.id" v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="8">
              <el-form-item  label="员工类型" prop="empType">
                <el-select v-model="form.empType" placeholder="请选择员工类型">
                  <el-option :label="item.name" v-for="item in empType" :key="item.id" :value="item.id"></el-option>   
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item  label="生日" prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;" format="yyyy-MM-dd" @change="format('birthday')">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="学历">
                <el-select v-model="form.education"  placeholder="请选择员工学历">
                  <el-option v-for="item in educationInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item  label="婚否">
                <el-select v-model="form.isMarrige" placeholder="请选择是否已婚">
                  <el-option label="未婚" value="1" ></el-option>
                  <el-option label="已婚" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="出生所在地">
                <address-choose @choose="birthAddress" :province="form.birthProvince" :city="form.birthCity" :dist="form.birthDist"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="居住所在地">
                <address-choose @choose="resideAddress" :province="form.resideProvince" :city="form.resideCity" :dist="form.resideDist"></address-choose>
              </el-form-item>             
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="居住详细地址">
                <el-checkbox-group v-model="form.address">
                  <el-input v-model="form.address"></el-input>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button" :loading="request">{{options.btn}}</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Employees, Assistant } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import addressChoose from '../../../components/address.vue';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      form: {
        gender: '',
        empType: '',
        isMarrige: '',
        idcardType: 1,
        idcard: '',
        birthday: '',
        telephone: '',
        education: '',
        birthCountry: '',
        birthProvince: '',
        birthCity: '',
        birthDist: '',
        resideCountry: '',
        resideProvince: '',
        resideCity: '',
        roleList: [],
        resideDist: '',
        idPhotoOne: '',
        idPhotoTwo: '',
        did: '',
        bid: '',
        mobile: '',
        name: '',
        address: '',
      },
      educationInfo: {
      },
      departmentInfo: [],
      roleList: [],
      options: {
        type: 'add',
        message: '新增',
        btn: '确认新增',
        title: '新增员工信息',
      },
      detail: 'detail',
      loading: true,
      request: false,
      rules: {
        name: [
          { required: true, message: '请填写员工姓名', trigger: 'blur' },
        ],
        gender: [
          { ...Rules.select, message: '请选择性别' },
        ],
        mobile: [
          {
            ...Rules.required,
            type: 'number',
            message: '请填写员工手机',
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
          },
        ],
        idcardType: [
          {
            type: 'number',
            required: true,
            message: '请选择证件类型',
            trigger: 'change',
          },
        ],
        idcard: [
          { ...Rules.required, message: '请填写证件号' },
        ],
        did: [
          {
            type: 'number',
            required: true,
            message: '请选择所属部门',
            trigger: 'change',
          },
        ],
        roleList: [
          {
            type: 'array',
            required: true,
            message: '请至少选择选择一个角色',
            trigger: 'blur',
          },
        ],
        empType: [
          {
            type: 'number',
            required: true,
            message: '请选择员工类型',
            trigger: 'change',
          },
        ],
      },
      idcardType: [
        { id: 1, name: '身份证' },
        { id: 2, name: '护照' },
        { id: 3, name: '军官证' },
      ],
      empType: [
        { id: 10, name: '企业' },
        { id: 20, name: '加盟店' },
      ],
    };
  },
  created() {
    if (this.$route.query.bid) {
      this.form.bid = this.$route.query.bid;
      if (this.$route.query.type === 'store') {
        this.options.type = 'addStore';
        this.detail = 'detailStore';
      }
      if (this.$route.query.did) {
        this.form.did = this.$route.query.did;
      }
      this.select(this.$route.query.bid);
    } else {
      this.select();
    }
    if (this.$route.params.id) {
      if (this.$route.query.type === 'store') {
        this.options.type = 'editStore';
      } else {
        this.options.type = 'edit';
      }
      this.options.message = '修改';
      this.options.btn = '确认修改';
      this.options.title = '修改员工信息';
      this.init(this.$route.params.id);
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function (val) {
      Employees[this.detail].call(this, val).then(res => {
        this.loading = false;
        this.form = res.data;
        this.form.gender = `${res.data.gender}`;
        if (res.data.isMarrige) {
          this.form.isMarrige = `${res.data.isMarrige}`;
        }
        const arr = [];
        for (let i = 0; i < res.data.roleList.length; i += 1) {
          arr.push(res.data.roleList[i].id);
        }
        this.form.roleList = arr;
      }).catch(err => {
        console.log(err);
      });
    },
    select: function (val) {
      Promise.all([Assistant.education(),
        Employees.departmentInfo({ organId: val }),
        Employees.roleInfo({ bid: val })])
        .then(([educationData, departmentData, roleData]) => {
          this.educationInfo = educationData.data;
          this.departmentInfo = departmentData.data;
          this.roleList = roleData.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlePhotoOneSuccess(res) {
      this.form.idPhotoOne = res.data.url;
    },
    handlePhotoTwoSuccess(res) {
      this.form.idPhotoTwo = res.data.url;
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('上传照片大小不能超过 5MB!');
      }
      return isLt5M;
    },
    format: function (key) {
      this.form[`${key}`] = this.dateFormat(this.form[`${key}`]);
    },
    birthAddress: function (data) {
      this.form.birthCountry = data.country;
      this.form.birthProvince = data.province;
      this.form.birthCity = data.city;
      this.form.birthDist = data.dist;
    },
    resideAddress: function (data) {
      this.form.resideCountry = data.country;
      this.form.resideProvince = data.province;
      this.form.resideCity = data.city;
      this.form.resideDist = data.dist;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          this.form.roleList = this.form.roleList.join(',');
          Employees[this.options.type].call(this, this.form).then(res => {
            if (res.status === 201) {
              this.$message({
                message: `${this.options.message}员工成功`,
                type: 'success',
              });
              if (this.$route.query.bid) {
                this.$router.push({ path: `/basic/cliques/management/${this.$route.query.bid}`, query: this.$route.query });
              } else {
                this.$router.push('/basic/employees/list');
              }
            }
            return true;
          }).catch(err => {
            this.form.roleList = this.form.roleList.split(',');
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
          return false;
        }
        return false;
      });
    },
    returnList: function () {
      this.$router.push('/basic/employees/list');
    },
  },
  components: {
    addressChoose,
  },
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
.idCard{
  width: 170px;
}
  // @import '../scss/views/index.scss';
</style>
