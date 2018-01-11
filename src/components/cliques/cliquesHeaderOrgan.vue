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
              <el-select v-model="form.type" placeholder="请选择类型" v-if="submitType !== 'add'" disabled>
                <el-option v-for="item in selectData.organType" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="form.type" placeholder="请选择类型" v-else>
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
            <el-form-item  label="备注" prop="remark">
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
  </div> 
</template>
<script type="text/javascript">
import Rules from '../../assets/validate/rules';
import addressChoose from '../../components/address.vue';
import { Organization, Assistant } from '../../services/admin';

export default {
  data() {
    return {
      form: {
        owner: '',
        ownerMobile: '',
        name: '',
        type: '',
        isWarehouse: '',
        address: '',
        remark: '',
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
      active: Number.parseInt(this.bid, 10),
      selectData: {
        organType: {},
      },
      submitType: 'add',
      submitMessage: '新增',
      rulesOrgan: {
        owner: [
          { ...Rules.required, message: '请填写负责人姓名' }, {
            max: 16, message: '负责人名字长度不能超过16个字',
          },
        ],
        ownerMobile: [
          { ...Rules.required, message: '请填写负责人手机' }, {
            ...Rules.mobile,
          },
        ],
        name: [
          { ...Rules.required, message: '请填写机构名称' }, {
            max: 32, message: '机构名称长度不能超过32个字',
          },
        ],
        type: [
          {
            ...Rules.select,
            message: '请选择机构类型',
            type: 'number',
          },
        ],
        isWarehouse: [
          { ...Rules.select, message: '请选择' },
        ],
        dist: [
          { ...Rules.select, message: '请选择地区' },
        ],
        address: [
          { ...Rules.required, message: '请填写详细地址' }, {
            max: 64, message: '详细地址不能超过64个字',
          },
        ],
        remark: [
          {
            max: 128, message: '备注信息不能超过128个字',
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
        owner: '',
        ownerMobile: '',
        name: '',
        type: '',
        isWarehouse: '',
        address: '',
        remark: '',
        province: '',
        city: '',
        dist: '',
      };
      Assistant.clique().then(res => {
        this.selectData.organType = res.data;
      }).catch(err => {
        console.log(err);
      });
      if (val === 0) {
        this.submitType = 'add';
        this.submitMessage = '新增';
        this.dialogShowOrgan = true;
        if (this.$refs.form !== undefined) {
          this.$refs.form.resetFields();
        }
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
    },
    resetForm: function (formName) {
      const self = this;
      this.form = {
        owner: '',
        ownerMobile: '',
        name: '',
        type: '',
        isWarehouse: '',
        address: '',
        remark: '',
        province: '',
        city: '',
        dist: '',
      };
      this.selectData = {
        organType: {},
      };
      this.dialogShowOrgan = false;
      self.$refs[formName].resetFields();
    },
    resetDialog: function () {
      this.resetForm('form');
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
                self.$message({
                  message: `${self.submitMessage}机构成功`,
                  type: 'success',
                });
                self.init();
                self.resetDialog();
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
    init: function () {
      const self = this;
      Organization.selectList(self.id, self.conditions).then(res => {
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
      this.$router.push(`/basic/cliques/detail/${val}`);
    },
    changeState: function (data) {
      let v = 0;
      if (data.state === 40) {
        v = 10;
      } else if (data.state === 20 || data.state === 10) {
        v = 40;
      }
      Organization.forbid(data.id, v).then(res => {
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
