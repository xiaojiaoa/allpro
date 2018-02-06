<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">编辑客户预约量尺</div>
      </div>
      <div class="container" v-loading.lock="loading">
        <el-form ref="ruleForm" :model="customersForm" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="门店" prop="storeId">
                <el-col :span="24">
                  <el-select v-model="customersForm.storeId" placeholder="请选择门店" disabled>
                    <el-option :label="item.name" v-for="item in stores" :value="item.id" :key="item.id"></el-option>                    
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="流水类型" prop="typeId">
                <el-col :span="24">
                  <el-select v-model="customersForm.typeId" placeholder="请选择流水类型" disabled>
                    <el-option :label="item.name" v-for="item in types" :value="item.id" :key="item.id"></el-option>                    
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="联系人电话" prop="ctctMobile">
                <el-input v-model="customersForm.ctctMobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-col :span="16">
                <el-form-item label="联系人姓名" class="required" prop="ctctName">
                  <el-col :span="24">
                    <el-col :span="23">
                      <el-input v-model="customersForm.ctctName"></el-input>
                    </el-col>
                    <el-col :span="1" class="blank"></el-col>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" class="required" prop="ctctGender" label-width="0">    
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-select v-model="customersForm.ctctGender" placeholder="请选择性别">
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
            <el-col :span="16">
              <el-form-item  label="所在地" prop="districtId">
                <address-choose @choose="birthAddress" :province="customersForm.provinceId" :city="customersForm.cityId" :dist="customersForm.districtId"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="居住详细地址" prop="address">
                <el-checkbox-group v-model="customersForm.address">
                  <el-input v-model="customersForm.address"></el-input>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>     

          <el-row>
            <el-col :span="8">
              <el-form-item  label="楼盘名" prop="estate">
                <el-input v-model="customersForm.estate" placeholder="请点击获取定位" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="楼盘坐标" prop="estateGps">
                <el-col :span="24">
                  <el-col :span="24">
                    <el-input v-model="customersForm.estateGps" placeholder="请点击获取定位" readonly></el-input>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col  prop="estateGps">
                <el-col :span="1" class="blank"></el-col>
                <el-col :span="8">  
                  <el-button size="small" type="primary" class="my-button" @click="getLocation()">获取定位</el-button>
                  <el-dialog title="定位" :visible.sync="dialogFormVisible" custom-class="map-dialog">
                    <el-row>
                      <el-col :span="16">                                              
                        <baidu-map :center="center" :zoom="zoom" class="map" :scroll-wheel-zoom="true">
                          <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-city-list>
                          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
                          <bm-view class="map"></bm-view>
                          <bm-local-search :keyword="keyword" 
                            :auto-viewport="true" 
                            :location="location" 
                            :selectFirstResult="true" 
                            :panel="false" 
                            @infohtmlset="infohtmlset">
                          </bm-local-search>
                        </baidu-map>
                      </el-col>
                      <el-col :span="8"> 
                        <el-row> 
                          <el-col :span="1" class="blank"></el-col>
                          <el-col :span="23"> 
                            <el-form-item label="详细地址" :label-width="formLabelWidth">
                              <el-col :span="18" class="blank">
                                <el-input v-model="address" auto-complete="off"></el-input>
                              </el-col>
                              <el-col :span="1" class="blank"></el-col>
                              <el-col :span="2" class="blank">
                                <el-button type="primary" class="my-button" @click="searchMap()">搜索</el-button>
                              </el-col>                                                        
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row> 
                          <el-col :span="1" class="blank"></el-col>
                          <el-col :span="23" class="city-info"> 
                            <el-form-item label="查询城市" :label-width="formLabelWidth">
                              <span>{{location}}</span>                         
                            </el-form-item>
                            <el-form-item label="查询楼盘" :label-width="formLabelWidth">
                              <span>{{customersForm.estate}}</span>                        
                            </el-form-item>
                            <el-form-item label="查询经纬度" :label-width="formLabelWidth">
                              <span>{{customersForm.estateGps}}</span>                         
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
                </el-col>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="量尺空间" prop="spaceIds">
                <el-col :span="4">
                  <el-select v-model="customersForm.parentSpaceId" placeholder="请选择空间" @change="selectSpace()">
                    <el-option :label="item.name" v-for="item in space" :value="item.id" :key="item.id" v-if="item.parentId==0" ></el-option>                    
                  </el-select>
                </el-col>
                <el-col :span="1" class="blank"></el-col>
                <el-col :span="19">
                  <el-checkbox-group v-model="spaceArr" @change="formatSpace()">
                    <el-checkbox v-for="item in spaceInfo" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="设计师" prop="dsgnId">
                <el-col :span="24">
                  <el-select v-model="customersForm.dsgnId" placeholder="请选择设计师">
                    <el-option :label="item.name" v-for="item in designers" :value="item.id" :key="item.id"></el-option>                    
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="希望量尺时间" prop="apptTimeDate">
                <el-col :span="24">
                   <!-- <el-date-picker
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker> -->
                  <el-col :span="12">
                    <el-date-picker type="date" placeholder="选择日期" 
                      v-model="customersForm.apptTimeDate" 
                      format="yyyy-MM-dd" 
                      @change="format('apptTimeDate')">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="11">
                    <el-time-select
                      placeholder="选择时间"
                      format="HH-mm-ss" 
                      v-model="customersForm.apptTimeHms"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }">
                    </el-time-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="customersForm.tskfRemark"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button" :loading="request">保 存</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script src="../../../assets/map/getscript"></script>
<script>

import { Taskseq } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import addressChoose from '../../../components/address.vue';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      flag: true,
      location: '',
      keyword: '',
      address: '',
      province: '',
      city: '',
      country: '',
      dist: '',
      center: { lng: 0, lat: 0 },
      zoom: 3,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      loading: true,
      request: false,
      customersForm: {
        custId: '',
        ctctMobile: '',
        ctctName: '',
        ctctGender: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        address: '',
        spaceIds: '',
        parentSpaceId: '',
        apptTime: '',
        dsgnId: '',
        seqRemark: '',
        estate: '',
        estateGps: '',
        taskType: '10',
        source: '10',
        apptTimeDate: '',
        apptTimeHms: '10:00',
      },
      rules: {
        ctctName: [
          { required: true, message: '请填写员工姓名', trigger: 'blur' },
        ],
        ctctMobile: [
          {
            ...Rules.required,
            // type: 'number',
            message: '请填写员工手机',
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
          },
        ],
        spaceIds: [
          {
            type: 'string',
            required: true,
            message: '请至少选择选择一个空间',
            trigger: 'blur',
          },
        ],
        dsgnId: [
          { ...Rules.required, type: 'number', message: '请选择设计师' },
        ],
        apptTimeDate: [
          { ...Rules.date, message: '请选择日期与时间' },
        ],
        estate: [
          { required: true, message: '请获取楼盘名', trigger: 'blur' },
        ],
        estateGps: [
          { required: true, message: '请获取坐标', trigger: 'blur' },
        ],
        address: [
          { ...Rules.required, message: '请填写居住详细地址' },
        ],
        districtId: [
          { ...Rules.required, type: 'number', message: '请选择地址' },
        ],
      },
      space: [],
      stores: [],
      types: [],
      spaceArr: [],
      spaceInfo: [],
      designers: [],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id, this.$route.params.cid);
      this.getSpace();
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function (val1, val2) {
      Taskseq.detailBase(val1).then(res => {
        this.loading = false;
        this.customersForm = res.data;
        this.customersForm.ctctGender = `${res.data.ctctGender}`;
        this.customersForm.custId = val2;
        this.customersForm.id = this.$route.params.id;
        this.spaceArr = res.data.spaceIds.split(',');
        for (let i = 0; i < this.spaceArr.length; i += 1) {
          this.spaceArr[i] = parseInt(this.spaceArr[i], 10);
        }
        this.customersForm.apptTimeDate = res.data.apptTime;
        this.customersForm.tskfRemark = res.data.remark;
        this.customersForm.apptTimeHms = this.HHmmFormat(res.data.apptTime);
        this.getStore(res.data.cliqueId);
      }).catch(err => {
        console.log(err);
      });
    },
    format: function () {
      this.customersForm.apptTimeDate = this.dateFormat(this.customersForm.apptTimeDate);
    },
    formatSpace: function () {
      if (typeof this.spaceArr === 'object') {
        this.customersForm.spaceIds = this.spaceArr.join(',');
      }
    },
    getStore: function (cliqueId) {
      Promise.all([
        Taskseq.storeList(cliqueId),
        Taskseq.typeList({ cliqueId: cliqueId }),
      ])
        .then(([store, type]) => {
          this.loading = false;
          this.stores = store.data;
          this.types = type.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSpace: function () {
      Taskseq.spaceInfo().then(res => {
        for (let i = 0; i < res.data.length; i += 1) {
          this.space.push(res.data[i]);
        }
      }).catch(err => {
        console.log(err);
      });
      Taskseq.designer().then(res => {
        this.designers = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    selectSpace: function () {
      if (this.flag) {
        this.flag = false;
      } else {
        this.spaceArr = [];
      }
      const params = { parentId: this.customersForm.parentSpaceId };
      Taskseq.spaceInfo(params).then(res => {
        this.spaceInfo = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    birthAddress: function (data) {
      this.customersForm.provinceId = data.province;
      this.customersForm.cityId = data.city;
      this.customersForm.distId = data.dist;
    },
    getLocation: function () {
      this.dialogFormVisible = true;
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 14;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          this.customersForm.apptTimeHms = `${this.customersForm.apptTimeHms}:00`;
          this.customersForm.apptTime = `${this.customersForm.apptTimeDate} ${this.customersForm.apptTimeHms}`;
          console.log('customersForm', this.customersForm);
          Taskseq.measureUpdate(this.customersForm).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '更新成功',
                type: 'success',
              });
              this.returnList();
            }
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            this.request = false;
          });
        }
      });
    },
    returnList: function () {
      this.$router.push(`/order/taskseq/detail/${this.$route.params.id}`);
    },
    mapAddress: function (data) {
      this.country = data.country;
      this.province = data.province;
      this.city = data.city;
      this.dist = data.dist;
    },
    infohtmlset: function (LocalResultPoi) {
      this.location = LocalResultPoi.city;
      this.customersForm.estate = LocalResultPoi.title;
      this.customersForm.estateGps = `${LocalResultPoi.point.lat},${LocalResultPoi.point.lng}`;
    },
    locationSuccess: function (point) {
      this.location = point.addressComponent.city;
    },
    searchMap: function () {
      this.keyword = this.address;
    },
  },
  components: {
    addressChoose,
  },
  mounted() {
  },
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
.idCard{
  width: 170px;
}

.map {
  width: 100%;
  height: 500px;
}

.city-info{
  border: 1px dashed #dbdbdb;
  margin: 0 auto;
}


</style>
