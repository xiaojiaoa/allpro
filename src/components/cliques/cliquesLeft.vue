<template>
  <transition-group>
    <div class="icon-oper" :key="1">
      <div>
        <span>
          <i class="iconfont icon-xinjian"></i>
          <span class="hoverbtn" @click="add()">新增</span>
        </span>
      </div>
<!--       <div> 
        <input type="text" name="name" placeholder="输入机构名搜索" v-model="conditions.name">
        <span @click="search()">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </div> -->
    </div>
      <ul :key="2">
        <li v-for="item in list" :key="item.id">
          <div class="title" @click="chooseOrgan(item)" :class="{active: item.id === active}">{{item.name}}
            <div class="hover-oper">
              <span @click="detail(item.id)">详情</span>
              <span @click="forbid(item.id)">禁用</span>
            </div>
          </div>
          <div class="data" v-for="data in item.subDepartment" @click="chooseOrgan(data, item)" :class="{active: data.id === active}">{{data.name}}
            <div class="hover-oper">
              <span @click="detail(data.id)">详情</span>
              <span @click="forbid(data.id)">禁用</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="新建部门" :visible.synv="dialogShow" :before-close="resetDialog" :key="1">
      <el-form :model="form"  ref="form" label-width="140px" :rules="rules">
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item  label="部门归属">
              <el-radio class="radio" v-model="part" label="1">部门</el-radio>
              <el-radio class="radio" v-model="part" label="2">子级</el-radio>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row v-if="part === '2'"> -->
        <el-row>
          <el-col :span="24">
            <!-- <el-form-item  label="上级部门" prop="parentId"> -->
            <el-form-item  label="上级部门">
              <el-select v-model="form.parentId" placeholder="请选择部门" >
                <el-option label="顶级部门" value=""></el-option>
                <el-option v-for="item in list" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="部门名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </transition-group>
</template>
<script type="text/javascript">
import Rules from '../../assets/validate/rules';
import { Department } from '../../services/admin';

export default {
  data() {
    return {
      form: {
        parentId: '',
      },
      list: {},
      conditions: {
        name: '',
      },
      dialogShow: false,
      active: 0,
      part: '1',
      rules: {
        name: [
          { ...Rules.required, message: '请填写部门名称' },
        ],
        type: [
          { ...Rules.select, message: '请选择部门类型', type: 'number' },
        ],
        parentId: [
          { ...Rules.select, message: '请选择归属部门', type: 'number' },
        ],
      },
    };
  },
  created() {
    // this.init();
  },
  props: [
    'type',
    'id',
  ],
  methods: {
    add: function () {
      this.dialogShow = true;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.bid = this.id;
          Department.add(this.form)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              this.resetForm('form');
              this.init();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
        }
      });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.form = {
        parentId: '',
      };
      this.part = '1';
      this.dialogShow = false;
    },
    resetDialog: function () {
      this.resetForm('form');
    },
    init: function () {
      const self = this;
      self.active = 0;
      if (this.type === 'organ') {
        Department.listByOrgan(self.id, self.conditions).then(res => {
          self.list = res.data;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Department.listByStore(self.id, self.conditions).then(res => {
          self.list = res.data;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    search: function () {
      this.init(this.conditions);
    },
    forbid: function (val) {
      const data = {
        id: val,
        state: 0,
      };
      Department.delete(data).then(res => {
        console.log(res);
        this.$message({
          message: '禁用成功',
          type: 'success',
        });
        this.init();
      }).catch(err => {
        console.log(err);
      });
    },
    chooseOrgan: function (...val) {
      this.active = val[0].id;
      const data = [];
      val.forEach(v => {
        const t = {
          id: v.id,
          name: v.name,
        };
        data.push(t);
      });
      this.$emit('choose', data);
    },
  },
  watch: {
    id: function () {
      this.init();
    },
  },
};
</script>
<style type="text/css">
  .organ{
    margin-right: 16px;
    width: 160px;
    border: 1px solid #dce2e5;
  }
</style>
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
      &:hover{
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
.organ{
  margin-right: 16px;
  width: 160px;
  border: 1px solid #dce2e5;
  ul{
    height: 100%;
    padding: 24px 20px;
    padding-right: 0;
    overflow-y: auto;
    overflow-x: hidden;
    li{
      >div{
        padding-bottom: 5px;
        &:not(:last-of-type){
          margin-bottom: 10px;
        }
      }
      .title{
        font-size: 14px;
        color: #212121;
        cursor: pointer;
        position: relative;
        &.active{
          font-weight: bold;
          color: #212121;
        }
        &:hover{
          color:#212121;
          .hover-oper{
            display: block;
          }
        }
      }
      .data{
        margin-left: 14px;
        font-size: 13px;
        color: #666;
        cursor: pointer;
        position: relative;
        &:hover{
          color: #212121;
          .hover-oper{
            display: block;
          }
        }
        &.active{
          font-weight: bold;
          color: #212121;
          &:after{
            content: "";
            position: absolute;
            width: 4px;
            height: 16px;
            background-color: #3599e6;
            border-radius: 2px;
            top: -1px;
            left: -18px;
          }
        }
      }
      

      &:not(:last-of-type){
        margin-bottom: 16px;
      }
    }
  }
  .hover-oper{
    position: absolute;
    display:none;
    left: 15px;
    top: 18px;
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
}
</style>
