<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">新增客户预约量尺</div>
      </div>
      <div class="container" v-loading.lock="loading">
        <el-form ref="ruleForm" :model="customersForm" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="门店" prop="storeId">
                <el-col :span="24">
                  <el-select v-model="customersForm.storeId" placeholder="请选择门店" :disabled ="readonly">
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
                  <el-select v-model="customersForm.typeId" placeholder="请选择流水类型">
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
                        <baidu-map :center="data.center" :zoom="zoom" class="map" :scroll-wheel-zoom="true">
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
                            <el-form-item label="查询城市:" :label-width="formLabelWidth">
                              <span>{{location}}</span>                         
                            </el-form-item>
                            <el-form-item label="查询楼盘:" :label-width="formLabelWidth">
                              <span>{{customersForm.estate}}</span>                        
                            </el-form-item>
                            <el-form-item label="查询经纬度:" :label-width="formLabelWidth">
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
              <el-form-item label="详细地址" prop="address">
                <el-checkbox-group v-model="customersForm.address">
                  <el-input v-model="customersForm.address" placeholder="详细地址精确到门牌号"></el-input>
                </el-checkbox-group>
              </el-form-item>
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
              <el-form-item label="希望量尺时间" prop="apptTime">
                <el-col :span="24">
                  <el-date-picker
                    v-model="customersForm.apptTime"
                    type="datetime"
                    @change="format('apptTime')"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注" prop="tskfRemark">
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
import { mapState } from 'vuex';
import { Taskseq, Order, Customers } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import addressChoose from '../../../components/address.vue';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      restWord: '',
      data: {
        center: { lng: 0, lat: 0 },
      },
      location: '',
      keyword: '',
      address: '',
      zoom: 3,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      spaceArr: [],
      stores: [],
      types: [],
      space: [],
      spaceInfo: [],
      designers: [],
      type: 'individualDetail',
      loading: true,
      request: false,
      readonly: false,
      customersForm: {
        custId: '',
        ctctMobile: '',
        ctctName: '',
        ctctGender: '',
        storeId: '',
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
      },
      rules: {
        ctctName: [
          { ...Rules.name },
          { ...Rules.range32 },
          { required: true, message: '请填写联系人姓名', trigger: 'blur' },
        ],
        ctctMobile: [
          {
            ...Rules.required,
            type: 'number',
            message: '请填写联系人手机',
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
          },
        ],
        address: [
          { ...Rules.required, message: '请填写居住详细地址' },
        ],
        districtId: [
          { ...Rules.required, type: 'number', message: '请选择地址' },
        ],
        typeId: [
          { ...Rules.required, type: 'number', message: '请选择流水类型' },
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
        apptTime: [
          { ...Rules.date, message: '请选择日期与时间' },
        ],
        estate: [
          { required: true, message: '请获取楼盘名', trigger: 'blur' },
        ],
        estateGps: [
          { required: true, message: '请获取坐标', trigger: 'blur' },
        ],
        tskfRemark: [
          { ...Rules.range255 },
        ],
        ctctGender: [
          { ...Rules.select, message: '请选择性别' },
        ],
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
      this.getSpace();
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function (val) {
      if (this.$_has8('add97')) {
        this.readonly = true;
      }
      if (this.employee.cliqueId) {
        this.getStore(this.employee.cliqueId, this.employee.organId);
        this.customersForm.storeId = this.employee.organId;
      }
      if (this.$route.query.type === 'enterprise') {
        this.type = 'enterpriseDetail';
      }
      Customers[this.type].call(this, val).then(res => {
        this.loading = false;
        this.customersForm.custId = res.data.cid;
        // 企业客户
        if (this.type === 'enterpriseDetail') {
          this.customersForm.ctctMobile = res.data.legalMobile;
          this.customersForm.ctctName = res.data.legalPerson;
          this.customersForm.provinceId = res.data.entpProvince;
          this.customersForm.cityId = res.data.entpCity;
          this.customersForm.districtId = res.data.entpDist;
        } else {
          // 个人客户
          this.customersForm.ctctMobile = res.data.mobile;
          this.customersForm.ctctName = res.data.nickName;
          this.customersForm.ctctGender = `${res.data.gender}`;
          this.customersForm.provinceId = res.data.province;
          this.customersForm.cityId = res.data.city;
          this.customersForm.districtId = res.data.dist;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    format: function (key) {
      this.customersForm[`${key}`] = this.dateHmsFormat(this.customersForm[`${key}`]);
    },
    formatSpace: function () {
      if (typeof this.spaceArr === 'object') {
        this.customersForm.spaceIds = this.spaceArr.join(',');
      }
    },
    getStore: function (cliqueId, storeId) {
      Taskseq.storeList(cliqueId).then(store => {
        this.stores = store.data;
      }).catch(errerr => {
        console.log(errerr);
      });
      Order.storeDetail(storeId).then(Response => {
        this.data.center = Response.data.cityName;
      }).catch(Error => {
        this.data.center.lng = 116.404;
        this.data.center.lat = 39.915;
        console.log(Error);
      });
      Taskseq.typeList({ cliqueId: cliqueId }).then(res => {
        this.types = res.data;
      }).catch(err => {
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
      this.spaceArr = [];
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
      this.zoom = 14;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        console.log('customersForm', this.customersForm);
        if (valid) {
          this.request = true;
          Taskseq.measure(this.customersForm).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              this.$router.push(`/order/taskseq/detail/${res.data.taskfid}`);
            }
          }).catch(err => {
            this.handleError(err);
          }).finally(() => {
            this.request = false;
          });
        }
      });
    },
    returnList: function () {
      this.$router.push('/order/taskseq/list');
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
  computed: {
    ...mapState('Global', ['employee', 'userInfo', 'permissRemark']),
  },
  watch: {
    permissRemark(val) {
      if (val) {
        this.init(this.$route.params.id);
      }
    },
    employee(val) {
      this.getStore(val.cliqueId, val.organId);
      this.customersForm.storeId = val.organId;
    },
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
  // width: 87.5%;
  margin: 0 auto;
}


</style>
