<template>
  <div>
    <div class="organ-list">
      <div class="icon-oper">
        <div>
          <span class="add">
            <i class="iconfont icon-xinjian"></i>
            <span class="hoverbtn" @click="edit(0)">新增</span>
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
        <li v-for="item in list" @click="chooseOrgan(item.id)" :class="{active: item.id === active}" :key="item.id">
          {{item.name}}
          <div class="hover-oper">
            <span @click="detail(item.id)">详情</span>
            <span @click="edit(item.id)">修改</span>
            <span @click="del(item.id)">禁用</span>
          </div>
        </li>
      </ul>
      <div class="block">
        <div></div>
      </div>
      <el-pagination
        @current-change="pageChange"
        :current-page="paginationData.page"
        layout="prev, pager, next, jumper"
        :total="paginationData.totalItems">
      </el-pagination>
    </div>
    <div class="crumb">
      嘉善大王椰家居 / 市场部 / 一部 / 员工列表
    </div>
    <el-dialog :title="`${submitMessage}机构`" :visible.sync="dialogShowOrgan" custom-class="addOrgan" :before-close="resetDialog">
      <el-form :model="form" ref="form" :rules="rulesOrgan" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item  label="负责人姓名" class="required" prop="owner">
              <el-input v-model="form.owner"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人手机" class="required" prop="ownerMobile">
              <el-input v-model="form.ownerMobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item  label="机构名称" class="required" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型" class="required" prop="type">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option v-for="item in selectData.organType" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  label="是否自带仓库" class="required" prop="isWarehouse">
              <el-select v-model="form.isWarehouse" placeholder="">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  label="机构地址" class="required" prop="dist">
              <address-choose @choose="address" :province="form.province" :city="form.city" :dist="form.dist"></address-choose>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  label="详细地址" class="required" prop="address">
              <el-input v-model="form.address" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注">
              <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button type="primary" @click="onSubmitOrgan('form')">确定</el-button>
      </div>
    </el-dialog>
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
                <el-input v-model.number="form.ownerMobile"></el-input>
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
                <el-input v-model.number="form.minFunds"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="预警资金" prop="warnFunds">
                <el-input v-model.number="form.warnFunds" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="大区类型" prop="regionCode">
                <el-col :span="11">
                  <el-select v-model="form.parentRegionCode" @change="selectDistrict">
                    <el-option v-for="region in selectData.regionData" :label="region.name" :value="region.id" :key="region.id"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" class="blank"></el-col>
                <el-col :span="11">
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
import Rules from '../assets/validate/rules';
import addressChoose from '../components/address.vue';
import { Store, Organization, Assistant } from '../services/admin';

export default {
  data() {
    return {
      form: {
        province: '',
        city: '',
        dist: '',
      },
      list: {},
      paginationData: {},
      conditions: {
        pageNo: 1,
        pageSize: 20,
        owner: '',
        name: '',
      },
      dialogShowOrgan: false,
      dialogShowStore: false,
      active: 0,
      selectData: {
        organType: {},
        organOwner: {},
        regionData: [],
        storeTypes: [],
        manageTypes: [],
        districtData: [],
      },
      submitType: 'add',
      submitMessage: '新增',
      rulesOrgan: {
        owner: [
          { ...Rules.required, message: '请填写负责人姓名', trigger: 'submit' },
        ],
        ownerMobile: [
          { ...Rules.required, message: '请填写负责人手机', trigger: 'submit' },
        ],
        name: [
          { ...Rules.required, message: '请填写机构名称', trigger: 'submit' },
        ],
        type: [
          {
            ...Rules.select,
            message: '请选择机构类型',
            type: 'number',
            trigger: 'submit',
          },
        ],
        isWarehouse: [
          { ...Rules.select, message: '请选择', trigger: 'submit' },
        ],
        dist: [
          { ...Rules.select, message: '请选择地区', trigger: 'submit' },
        ],
        address: [
          { ...Rules.required, message: '请填写详细地址', trigger: 'submit' },
        ],
      },
      rulesStore: {
        name: [{ ...Rules.required, message: '请输入门店名称', trigger: 'submit' }],
        owner: [{ ...Rules.required, message: '请输入负责人姓名', trigger: 'submit' }],
        ownerMobile: [
          {
            required: true,
            message: '请填写负责人手机',
            trigger: 'submit',
          },
          {
            type: 'number',
            message: '手机须为数字值',
            trigger: 'submit',
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'submit',
          },
        ],
        addressType: [
          {
            ...Rules.select, message: '请选择经营类型', type: 'number', trigger: 'submit',
          },
        ],
        manageOrganization: [
          {
            ...Rules.select, message: '请选择机构', type: 'number', trigger: 'submit',
          },
        ],
        type: [
          {
            ...Rules.select, message: '请选择门店类型', type: 'number', trigger: 'submit',
          },
        ],
        isWarehouse: [{ ...Rules.required, message: '请选择仓库', trigger: 'submit' }],
        warnFunds: [
          {
            ...Rules.required, message: '请输入正确的预警资金', type: 'number', trigger: 'submit',
          },
        ],
        minFunds: [
          {
            ...Rules.required, message: '请输入正确的最低资金', type: 'number', trigger: 'submit',
          },
        ],
        regionCode: [
          {
            ...Rules.select, message: '请选择区域', type: 'number', trigger: 'submit',
          },
        ],
        dist: [
          {
            ...Rules.select, message: '请选择区', trigger: 'submit',
          },
        ],
        address: [{ ...Rules.required, message: '请输入地址', trigger: 'submit' }],
      },
    };
  },
  created() {
    this.init();
  },
  props: [
    'type',
    'id',
  ],
  methods: {
    edit: function (val) {
      if (this.type === 'organ') {
        Assistant.clique().then(res => {
          this.selectData.organType = res.data;
        }).catch(err => {
          console.log(err);
        });
        if (val === 0) {
          this.submitType = 'add';
          this.submitMessage = '新增';
          this.dialogShowOrgan = true;
          console.log(this.form);
        } else {
          this.submitType = 'edit';
          this.submitMessage = '修改';
          Organization.detail(val).then(res => {
            this.dialogShowOrgan = true;
            this.form = res.data;
            this.form.isWarehouse = `${this.form.isWarehouse}`;
            this.form.ownerMobile = `${this.form.ownerMobile}`;
          }).catch(err => {
            console.log(err);
          });
        }
      } else {
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
          console.log(this.form);
        } else {
          this.submitType = 'edit';
          this.submitMessage = '修改';
          Store.detail(val).then(res => {
            this.form = res.data;
            this.form.isWarehouse = `${this.form.isWarehouse}`;
            Assistant.region(this.form.parentRegionCode)
              .then(ress => {
                this.selectData.districtData = ress.data;
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
      }
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      if (this.type === 'organ') {
        this.dialogShowOrgan = false;
      } else {
        this.dialogShowStore = false;
      }
      this.form = {
        province: '',
        city: '',
        dist: '',
      };
    },
    resetDialog: function () {
      this.resetForm('form');
    },
    selectDistrict: function () {
      Assistant.region(this.form.parentRegionCode)
        .then(res => {
          this.selectData.districtData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmitOrgan: function (formName) {
      const self = this;
      self.form.parentId = self.id;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          Organization[self.submitType].call(self, self.form).then(res => {
            console.log(res);
            self.$message({
              message: `${self.submitMessage}机构成功`,
              type: 'success',
            });
            self.init();
            self.resetDialog();
            return true;
          })
            .catch(err => {
              if (err.status === 201) {
                self.init();
                self.$message({
                  message: `${self.submitMessage}机构成功`,
                  type: 'success',
                });
              } else {
                self.$message({
                  message: err.msg,
                  type: 'error',
                });
              }
            });
        } else {
          return false;
        }
        return false;
      });
    },
    onSubmitStore: function (formName) {
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
    init: function () {
      const self = this;
      if (self.type === 'organ') {
        Organization.selectList(self.id, self.conditions).then(res => {
          self.list = res.data.result;
          self.paginationData = res.data;
          self.conditions.pageSize = res.data.pageSize;
          self.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Store.byOrganization(self.id, self.conditions).then(res => {
          self.list = res.data.result;
          self.paginationData = res.data;
          self.conditions.pageSize = res.data.pageSize;
          self.conditions.pageNo = res.data.page;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    search: function () {
      this.paginationData.page = 0;
    },
    pageChange: function (val) {
      const self = this;
      self.paginationData.page = val;
    },
    chooseOrgan: function (val) {
      this.active = val;
      this.$emit('choose', val);
    },
    address: function (data) {
      this.form.country = data.country;
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.dist = data.dist;
      console.log(data);
    },
    resetData: function () {
      this.form = {
        province: '',
        city: '',
        dist: '',
      };
      this.conditions = {
        pageNo: 1,
        pageSize: 20,
      };
      this.active = 0;
    },
    detail: function (val) {
      if (this.type === 'organ') {
        this.$router.push(`/basic/cliques/detail/${val}`);
      } else {
        this.$router.push(`/basic/stores/detail/${val}`);
      }
    },
    del: function (val) {
      console.log(val);
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
        z-index: 99;
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
      cursor: pointer;
      position: relative;
      .hover-oper{
        position: absolute;
        display:none;
        right: -120px;
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
          &:first-of-type{
            color: #44b5e7;
            padding-left: 8px;
            border-radius: 14px 0 0 14px;
            &:hover{
              background-color: #44b5e7;
            }
          }
          &:nth-of-type(2){
            color: #3599e6;
            &:hover{
              background-color: #3599e6;
            }
          }
          &:last-of-type{
            color: #f56767;
            padding-right: 8px;
            border-radius: 0 14px 14px 0;
            &:hover{
              background-color: #f56767;
            }
          }
          &:hover{
            color: #fff;
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

.crumb{
  height: 13px;
  font-size: 14px;
  letter-spacing: 0px;
  color: #999999;
  margin:30px 0;
}
</style>
