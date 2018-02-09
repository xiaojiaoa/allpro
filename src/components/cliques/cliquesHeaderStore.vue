<template>
  <div>
    <div class="organ-list">
      <div class="icon-oper">
        <div>
          <span class="add" @click="edit(0)">
            <i class="iconfont icon-xinjian"></i>
            <span class="hoverbtn">新增</span>
          </span>
        </div>
        <div> 
          <input type="text" name="name" placeholder="输入工厂名搜索" v-model="conditions.name">
          <input type="text" name="owner" placeholder="输入负责人姓名搜索" v-model="conditions.owner">
          <span @click="search()">
            <i class="iconfont icon-sousuo"></i>
          </span>
        </div>
      </div>
      <ul class="data">
        <li v-for="item in list" :class="{active: item.id === active, disabled: item.state === 30 || item.state === 40}" :key="item.id">
          <span @click="chooseOrgan(item)" v-if="item.state === 10 || item.state === 20">{{item.name}}</span>
          <span v-else>{{item.name}}<i class="iconfont icon-jinyong"></i></span>
          <div class="hover-oper">
            <span @click="detail(item.id)">详情</span>
            <span @click="edit(item.id)">修改</span>
            <span @click="changeState(item)" :class="{ used: item.state === 30 || item.state === 40}">{{item.state | stateType}}</span>
          </div>
        </li>
      </ul>
      <div class="block">
        <div></div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="pageChange"
        :current-page="paginationData.page"
        :page-size="paginationData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationData.totalItems">
      </el-pagination>
    </div>
    <el-dialog :title="`${submitMessage}门店`" :visible.synv="dialogShowStore" custom-class="addOrgan" :before-close="resetDialog">
      <el-form ref="form" :model="form" label-width="140px" :rules="rulesStore">

          <el-row>
            <el-col :span="12">
              <el-form-item label="门店名称" prop="name">
                <el-col>
                    <el-input v-model="form.name"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="负责人姓名" prop="owner">
                <el-input v-model="form.owner"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="负责人手机" prop="ownerMobile">
                <el-input v-model="form.ownerMobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="所属机构" prop="manageOrganization">
                <el-select v-model.number="form.manageOrganization" placeholder="请选择机构" disabled>
                  <el-option :label="selectData.organOwner.name" :value="selectData.organOwner.id" :key="selectData.organOwner.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="门店类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择门店类型">
                  <el-option v-for="typeData in selectData.storeTypes" :label="typeData.name" :value="typeData.id" :key="typeData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="经营类型" prop="addressType">
                <el-select v-model="form.addressType" placeholder="请选择经营类型">
                  <el-option v-for="manageData in selectData.manageTypes" :label="manageData.name" :value="manageData.id" :key="manageData.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="是否自带仓库" prop="isWarehouse">
                <el-select v-model="form.isWarehouse" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="最低资金" prop="minFunds">
                <el-col>
                <el-input v-model="form.minFunds">
                  <template slot="append">万</template>
                </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="预警资金" prop="warnFunds">
                <el-input v-model="form.warnFunds" type="text">
                  <template slot="append">万</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="大区类型" prop="regionCode">
                <el-col :span="12">
                  <el-col :span="23">
                    <el-select v-model="form.parentRegionCode" @change="selectDistrict">
                      <el-option v-for="region in selectData.regionData" :label="region.name" :value="region.id" :key="region.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank">
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="form.regionCode">
                    <el-option v-for="district in selectData.districtData" :label="district.name" :value="district.id" :key="district.id"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item  label="门店所在地" class="required" prop="dist">
                <address-choose @choose="address" :province="form.province" :city="form.city" :dist="form.dist"></address-choose>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="门店地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取消</el-button>
          <el-button type="primary" @click="onSubmitStore('form')">确定</el-button>
        </div>
    </el-dialog>
  </div> 
</template>
<script type="text/javascript">
import Rules from '../../assets/validate/rules';
import addressChoose from '../../components/address.vue';
import { Store, Organization, Assistant } from '../../services/admin';

export default {
  data() {
    return {
      form: {
        name: '',
        owner: '',
        ownerMobile: '',
        manageOrganization: '',
        type: '',
        addressType: '',
        isWarehouse: '',
        minFunds: '',
        warnFunds: '',
        parentRegionCode: '',
        province: '',
        city: '',
        dist: '',
        regionCode: '',
        address: '',
      },
      list: {},
      paginationData: {},
      conditions: {
        pageNo: 1,
        pageSize: 20,
        owner: '',
        name: '',
      },
      dialogShowStore: false,
      active: Number.parseInt(this.bid, 10),
      selectData: {
        organOwner: {},
        regionData: [],
        storeTypes: [],
        manageTypes: [],
        districtData: [],
      },
      districtDataFlag: false,
      submitType: 'add',
      submitMessage: '新增',
      rulesStore: {
        name: [
          { ...Rules.required, message: '请输入门店名称' }, {
            max: 32, message: '门店名称长度不能超过32个字',
          },
        ],
        owner: [
          { ...Rules.required, message: '请输入负责人姓名' }, {
            max: 16, message: '负责人名字长度不能超过16个字',
          },
        ],
        ownerMobile: [
          {
            required: true,
            message: '请填写负责人手机',
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
        isWarehouse: [
          { ...Rules.required, message: '请选择仓库' },
        ],
        warnFunds: [
          {
            ...Rules.required, message: '请输入正确的预警资金',
          }, {
            max: 10, message: '资金位数过长',
          },
        ],
        minFunds: [
          {
            ...Rules.required, message: '请输入正确的最低资金',
          }, {
            max: 10, message: '资金位数过长',
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
        address: [
          { ...Rules.required, message: '请输入地址' }, {
            max: 64, message: '详细地址不能超过64个字',
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  props: [
    'id',
    'bid',
  ],
  methods: {
    edit: function (val) {
      this.form = {
        name: '',
        owner: '',
        ownerMobile: '',
        manageOrganization: '',
        type: '',
        addressType: '',
        isWarehouse: '',
        minFunds: '',
        warnFunds: '',
        parentRegionCode: '',
        province: '',
        city: '',
        dist: '',
        regionCode: '',
        address: '',
      };
      Promise.all([
        Assistant.region(0),
        Assistant.store(),
        Assistant.addrTypes(),
        Organization.detail(this.id),
      ]).then(([regionData, storeTypes, manageTypes, organOwner]) => {
        this.selectData.regionData = regionData.data;
        this.selectData.storeTypes = storeTypes.data;
        this.selectData.manageTypes = manageTypes.data;
        this.selectData.organOwner = organOwner.data;
        this.form.manageOrganization = organOwner.data.id;
      });
      if (val === 0) {
        this.submitType = 'add';
        this.submitMessage = '新增';
        this.dialogShowStore = true;
        this.districtDataFlag = true;
        if (this.$refs.form !== undefined) {
          this.$refs.form.resetFields();
        }
      } else {
        this.submitType = 'edit';
        this.submitMessage = '修改';
        Store.detail(val).then(res => {
          this.form = res.data;
          this.form.isWarehouse = `${this.form.isWarehouse}`;
          this.form.minFunds = `${this.form.minFunds}`;
          this.form.warnFunds = `${this.form.warnFunds}`;
          Assistant.region(this.form.parentRegionCode)
            .then(ress => {
              this.selectData.districtData = ress.data;
              this.districtDataFlag = true;
              this.form.regionCode = res.data.regionCode;
              this.dialogShowStore = true;
            })
            .catch(err => {
              console.log(err);
            });
          this.dialogShowStore = true;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    resetForm: function (formName) {
      this.form = {
        name: '',
        owner: '',
        ownerMobile: '',
        manageOrganization: '',
        type: '',
        addressType: '',
        isWarehouse: '',
        minFunds: '',
        warnFunds: '',
        parentRegionCode: '',
        province: '',
        city: '',
        dist: '',
        regionCode: '',
        address: '',
      };
      this.selectData = {
        organOwner: {},
        regionData: [],
        storeTypes: [],
        manageTypes: [],
        districtData: [],
      };
      this.districtDataFlag = false;
      this.dialogShowStore = false;
      this.$refs[formName].resetFields();
    },
    resetDialog: function () {
      this.resetForm('form');
    },
    selectDistrict: function () {
      if (this.districtDataFlag) {
        this.form.regionCode = '';
        Assistant.region(this.form.parentRegionCode)
          .then(res => {
            this.selectData.districtData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onSubmitStore: function (formName) {
      const self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.submitType === 'add') {
            Store.add(this.form)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '新增成功',
                  type: 'success',
                });
                self.init();
                self.resetDialog();
                return true;
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
                self.init();
                self.resetDialog();
                return true;
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
    init: function () {
      const self = this;
      Store.byOrganization(self.id, self.conditions).then(res => {
        self.list = res.data.result;
        self.paginationData = res.data;
        self.conditions.pageSize = res.data.pageSize;
        self.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    search: function () {
      this.paginationData.page = 0;
    },
    pageChange: function (val) {
      const self = this;
      self.paginationData.page = val;
    },
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    chooseOrgan: function (val) {
      this.active = val.id;
      const data = {
        id: val.id,
        name: val.name,
      };
      this.$emit('choose', data);
    },
    address: function (data) {
      this.form.country = data.country;
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.dist = data.dist;
    },
    resetData: function () {
      this.form = {};
      this.conditions = {
        pageNo: 1,
        pageSize: 20,
      };
      this.active = 0;
    },
    detail: function (val) {
      this.$router.push(`/basic/stores/detail/${val}`);
    },
    changeState: function (data) {
      let v = 0;
      if (data.state === 40) {
        v = 10;
      } else if (data.state === 20 || data.state === 10) {
        v = 40;
      }
      Store.forbid(data.id, v).then(res => {
        console.log(res);
        this.init();
      }).catch(err => {
        console.log(err);
      });
    },
  },
  components: {
    addressChoose,
  },
  computed: {
    pageWatch: function () {
      return this.paginationData.page;
    },
  },
  filters: {
    stateType: function (val) {
      switch (val) {
        case 10:
          return '禁用';
        case 20:
          return '禁用';
        case 30:
          return '启用';
        case 40:
          return '启用';
        default:
          return '';
      }
    },
  },
  watch: {
    pageWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init();
      }
    },
    type: function () {
      this.resetData();
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-oper{
  position: absolute;
  top: -14px;
  >div{
    display: inline-block;
    >span{
      background-color: #3599e6;
      border-radius: 14px;
      display: inline-block;
      width: 28px;
      height: 28px;
      text-align: left;
      line-height: 28px;
      margin: 0 20px;
      transition:width .5s;
      cursor: pointer;
      &.add:hover{
        width: 59px;
        transition:width .5s;
        .hoverbtn{
          display:inline-block;
          transition: transform .5s;
          transform: translateX(0%);
        }
      }
      i{
        margin-left: 6px;
        color: #fff;
        font-size: 16px;
        z-index: 2;
        position: relative;
      }
      .hoverbtn{
        display: none;
        position: absolute;
        color: #fff;
        left: 44px;
      }
    }
    input{
      width: 240px;
      height: 28px;
      border: 1px solid #3599e6;
      border-radius: 14px;
      padding: 0 17px;
      &:not(:last-of-type){
        margin-right: 10px;
      }
    }
  }
}
.organ-list{
  margin-top: 24px;
  position: relative;
  .data{
    height: 132px;
    border-radius: 2px;
    border: 1px solid #dce2e5;
    width: 100%;
    padding: 14px 0;
    overflow-y: auto;
    li{
      float: left;
      margin: 10px 70px 10px 30px;
      padding: 0 5px;
      cursor: pointer;
      position: relative;
      .hover-oper{
        position: absolute;
        display:none;
        right: -112px;
        top: -8px;
        width:115.72px;
        background-color: #fff;
        border-radius: 14px;
        height: 28px;
        border: solid 1px #dce2e5;
        line-height: 28px;
        z-index: 999;
        span{
          display: inline-block;
          padding: 0 3px;
          height: 26px;
          float:left;
          &:first-of-type{
            color: #44b5e7;
            padding-left: 8px;
            padding-right: 5px;
            border-radius: 14px 0 0 14px;
            &:hover{
              background-color: #44b5e7;
            }
          }
          &:nth-of-type(2){
            color: #3599e6;
            padding:0 4px;
            &:hover{
              background-color: #3599e6;
            }
          }
          &:last-of-type{
            color: #f56767;
            padding-right: 8px;
            padding-left: 5px;
            border-radius: 0 14px 14px 0;
            &:hover{
              background-color: #f56767;
            }
          }
          &:hover{
            color: #fff;
          }
        }
        .used{
          color: #4ed987!important;
          &:hover{
            background-color: #4ed987!important;
            color: #fff!important;
          }
        }
      }
      &:hover{
        color:#3599e6;
        .hover-oper{
          display: block;
        }
      }
      &.active{
        color:#3599e6;
      }
    }
    .disabled{
      cursor: context-menu;
      span{
        color: #999;
      }
      &:hover{
        color: #000;
      }
      .iconfont{
        font-size: 16px;
        position: relative;
        top: 1px;
      }
    }
  }
  .el-pagination{
    position: absolute;
    bottom: -16px;
    width: 100%;
    span{
      background-color: #fff;
    }
  }

  .block{
    height: 16px;
    width: 100%;
    padding: 0 20px 0 1px;
    position: absolute;
    bottom: 1px;
    left: 1px;
    >div{
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
