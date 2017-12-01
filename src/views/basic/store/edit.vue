<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{this.$route.params.id?'修改':'新增'}}门店信息</div>
      </div>
      <div class="container">
        <el-form ref="ruleForm" :model="form" label-width="140px" :rules="rules">

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店名称" prop="name">
                <el-col>
                    <el-input v-model="form.name"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="负责人姓名" prop="owner">
                <el-input v-model="form.owner"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="负责人手机" prop="ownerMobile">
                <el-input v-model.number="form.ownerMobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="所属机构" prop="manageOrganization">
                <el-select v-model.number="form.manageOrganization" placeholder="请选择机构">
                  <el-option v-for="organization in organizationData" :label="organization.name" :value="organization.id" :key="organization.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="门店类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择门店类型">
                  <el-option v-for="typeData in storeTypes" :label="typeData.name" :value="typeData.id" :key="typeData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="经营类型" prop="addressType">
                <el-select v-model="form.addressType" placeholder="请选择经营类型">
                  <el-option v-for="manageData in manageTypes" :label="manageData.name" :value="manageData.id" :key="manageData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="是否自带仓库" prop="isWarehouse">
                <el-select v-model="form.isWarehouse" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="最低资金" prop="minFunds">
                <el-col>
                <el-input v-model.number="form.minFunds"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="预警资金" prop="warnFunds">
                <el-input v-model.number="form.warnFunds" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="大区类型" prop="regionCode">
                <el-col :span="10">
                  <el-select v-model="form.parentRegionCode" @change="selectDistrict">
                    <el-option v-for="region in regionData" :label="region.name" :value="region.id" :key="region.id"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4" class="blank"></el-col>
                <el-col :span="10">
                  <el-select v-model="form.regionCode">
                    <el-option v-for="district in districtData" :label="district.name" :value="district.id" :key="district.id"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item  label="门店所在地" class="required" prop="dist">
                <address-choose @choose="address" :province="form.province" :city="form.city" :dist="form.dist"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" :offset="6">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">确认{{this.$route.params.id?'修改':'新增'}}</el-button>
                <router-link :to="{path: '/basic/stores/list'}">
                  <el-button class="my-button">取消</el-button>
                </router-link>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { Store, Assistant } from '../../../services/admin';
  import Rules from '../../../assets/validate/rules';
  import addressChoose from '../../../components/address.vue';

  export default {
    data() {
      return {
        form: {
          country: '',
          province: '',
          city: '',
          dist: '',
          address: '',
          name: '',
          owner: '',
          ownerMobile: '',
          type: '',
          isWarehouse: '',
          addressType: '',
          manageOrganization: '',
          warnFunds: '',
          minFunds: '',
          regionCode: '',
          parentRegionCode: '',
        },
        countryData: '',
        provinceData: '',
        cityData: '',
        distData: '',
        regionData: '',
        districtData: '',
        organizationData: '',
        storeTypes: '',
        manageTypes: '',
        rules: {
          name: [{ ...Rules.required, message: '请输入门店名称' }],
          owner: [{ ...Rules.required, message: '请输入负责人姓名' }],
          ownerMobile: [
            {
              required: true,
              message: '请填写负责人手机',
            },
            {
              type: 'number',
              message: '手机须为数字值',
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ],
          addressType: [
            {
              ...Rules.select, message: '请选择经营类型', type: 'number',
            },
          ],
          manageOrganization: [
            {
              ...Rules.select, message: '请选择机构', type: 'number',
            },
          ],
          type: [
            {
              ...Rules.select, message: '请选择门店类型', type: 'number',
            },
          ],
          isWarehouse: [{ ...Rules.required, message: '请选择仓库' }],
          warnFunds: [
            {
              ...Rules.required, message: '请输入正确的预警资金', type: 'number',
            },
          ],
          minFunds: [
            {
              ...Rules.required, message: '请输入正确的最低资金', type: 'number', trigger: 'blur',
            },
          ],
          regionCode: [
            {
              ...Rules.select, message: '请选择区域', type: 'number',
            },
          ],
          dist: [
            {
              ...Rules.select, message: '请选择区',
            },
          ],
          address: [{ ...Rules.required, message: '请输入地址' }],
        },
      };
    },
    created() {
      if (this.$route.params.id) {
        this.form.id = this.$route.params.id;
        this.initialization(this.$route.params.id);
      }
      this.select();
    },
    methods: {
      initialization: function (val) {
        Store.detail(val).then(res => {
          this.form = res.data;
          this.form.isWarehouse += '';
        }).catch(err => {
          console.log(err);
        });
      },
      select: function (val) {
        Promise.all([
          Store.region(0),
          Assistant.organ(),
          Assistant.store(val),
          Assistant.addrTypes(val),
        ]).then(([regionData, organizationData, storeTypes, manageTypes]) => {
          this.regionData = regionData.data;
          this.organizationData = organizationData.data;
          this.storeTypes = storeTypes.data;
          this.manageTypes = manageTypes.data;
        });
      },
      selectDistrict: function () {
        Store.region(this.form.parentRegionCode)
          .then(res => {
            this.districtData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      onSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.$route.params.id) {
              Store.add(this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                  });
                  this.$router.push('/basic/stores/list');
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              Store.edit(this.form.id, this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                  });
                  this.$router.push('/basic/stores/list');
                })
                .catch(err => {
                  console.log(err);
                });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      address: function (data) {
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
