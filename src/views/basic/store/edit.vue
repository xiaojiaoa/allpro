<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">新增门店信息</div>
      </div>
      <div class="container">
        <el-form ref="form" :model="form" label-width="140px">

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店名称" class="required">
                <el-col>
                    <el-input v-model="form.name"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="负责人姓名" class="required">
                <el-input v-model="form.owner"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="负责人手机" class="required">
                <el-input v-model="form.ownerMobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="所属机构" class="required">
                <el-select v-model="form.manageOrganization" placeholder="请选择机构">
                  <el-option v-for="organization in organizationData" :label="organization.name" :value="organization.id" :key="organization.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="门店类型" class="required">
                <el-select v-model="form.type" placeholder="请选择门店类型">
                  <el-option v-for="typeData in storeTypes" :label="typeData.name" :value="typeData.id" :key="typeData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="经营类型" class="required">
                <el-select v-model="form.addressType" placeholder="请选择经营类型">
                  <el-option v-for="manageData in manageTypes" :label="manageData.name" :value="manageData.id" :key="manageData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="是否自带仓库" class="required">
                <el-select v-model="form.isWarehouse" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="最低资金" class="required">
                <el-col>
                <el-input v-model="form.minFunds"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="预警资金" class="required">
                <el-input v-model="form.warnFunds"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="大区类型" class="required">
                <el-col :span="10">
                  <el-select v-model="region" @change="selectDistrict">
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
              <el-form-item  label="门店所在地">
                <el-col :span="12">
                  <el-col :span="10">
                    <el-select  v-model="form.country" placeholder="国家" @change="selectCountry">
                      <el-option label="中国" value="100000" ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="10">
                    <el-select v-model="form.province" placeholder="省" @change="selectProvince">
                      <el-option v-for="data in provinceData" :label="data.name" :value="data.id" :key="data.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="11">
                    <el-select v-model="form.city" placeholder="市" @change="selectCity">
                      <el-option v-for="data in cityData" :label="data.name" :value="data.id" :key="data.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="11">
                    <el-select v-model="form.dist" placeholder="区" @click="selectDist">
                      <el-option v-for="data in distData" :label="data.name" :value="data.id" :key="data.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店地址">
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
            <el-col :span="6" :offset="8">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="my-button">确认添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { Store } from '../../../services/admin';

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
        },
        provinceData: '',
        cityData: '',
        distData: '',
        regionData: '',
        region: '',
        districtData: '',
        organizationData: '',
        storeTypes: '',
        manageTypes: '',
      };
    },
    created() {
      this.init();
    },
    methods: {
      onSubmit: function () {
        console.log('11111formData', this.form);
        Store.edit(this.form)
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '新增成功',
              type: 'success',
            });
            this.$router.push('/basic/store/list');
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectCountry: function () {
        Store.select(this.form.country)
          .then(res => {
            this.provinceData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectProvince: function () {
        Store.select(this.form.province)
          .then(res => {
            this.cityData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectCity: function () {
        Store.select(this.form.city)
          .then(res => {
            this.distData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectDist: function () {

      },
      init: function (val) {
        Store.region(0)
          .then(res => {
            this.regionData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        Store.organization(val)
          .then(res => {
            this.organizationData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        Store.storeTypes(val)
          .then(res => {
            this.storeTypes = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        Store.addrTypes(val)
          .then(res => {
            this.manageTypes = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      selectDistrict: function () {
        Store.region(this.region)
          .then(res => {
            this.districtData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
