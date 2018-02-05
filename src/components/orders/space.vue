<template>
   <el-dialog title="新增空间" v-model="alert" :close-on-click-modal="false" custom-class="addSpace-dialog">
            <el-form id="#create" :model="space"  :rules="spaceRules" ref="space" label-width="140px">
                <el-row>
                   <el-col :span="11" >
                       <el-form-item  label="客户号">
                           <el-input v-model="space.custId" :disabled="true"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col :span="11" >
                       <el-form-item  label="客户姓名">
                           <el-input v-model="space.custName" :disabled="true"></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="11" >
                       <el-form-item  label="客户电话">
                           <el-input v-model="space.custMobile" :disabled="true"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col  :span="11" >
                       <el-form-item  label="空间风格" prop="spaceStyle">
                           <el-select v-model="space.spaceStyle">
                                <el-option :label="item.name" v-for="item in spaceStyle" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                </el-row>
                 <el-row>
                      <el-col :span="7">
                         <el-form-item  label="空间类型" prop="ParentSpaceType">
                              <el-select v-model="space.ParentSpaceType" @change="childrenSpaceType(space.ParentSpaceType)">
                                    <el-option :label="item.name" v-for="item in ParentSpaceType" :key="item.id" :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                       </el-col>
                       <el-col :span="4">
                          <el-form-item  label="" label-width="15px" prop="spaceType">
                              <el-select v-model="space.spaceType" @change="createSpaceName">
                                   <el-option :label="item.name" v-for="item in spaceType" :key="item.id" :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                       </el-col>                 
                    <el-col :span="11">
                       <el-form-item  label="空间名" prop="spaceName">
                           <el-input v-model="space.spaceName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSpace('space')">确认{{ Message }}</el-button>
                <el-button @click="alert = false">取 消</el-button>
            </div>
    </el-dialog>
</template>
<script>
import { Assistant, Order } from '../../services/admin';

export default {
  data() {
    return {
      flag: false,
      alert: false,
      spaceStyle: [],
      spaceType: [],
      ParentSpaceType: [],
      create: '新增',
      mod: '修改',
      space: {
        id: '',
        lid: '',
        custName: '',
        custMobile: '',
        custId: '',
        spaceName: '',
        ParentSpaceType: '',
        spaceType: '',
        spaceStyle: '',
        // id: '',空间id存在即更新，不存在则新增
      },
      spaceRules: {
        spaceName: [
          { required: true, message: '请选择空间名称', trigger: 'submit' },
        ],
        spaceType: [
          {
            type: 'number',
            required: true,
            message: '请选择空间类型',
            trigger: 'blur',
          },
        ],
        spaceStyle: [
          {
            type: 'number',
            required: true,
            message: '请选择空间风格',
            trigger: 'blur',
          },
        ],
        ParentSpaceType: [
          {
            type: 'number',
            required: true,
            message: '请选择空间类型',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  props: ['sendInfo'],
  computed: {
    Message: function () {
      if (this.space.id === '') {
        return this.create;
      }
      return this.mod;
    },
  },
  created() {},
  methods: {
    show() {
      this.alert = true;
    },
    hide() {
      this.alert = false;
    },
    init(receive) {
      if (receive !== 'create') {
        this.space.ParentSpaceType = this.sendInfo.ParentSpaceType;
        this.space.spaceStyle = this.sendInfo.spaceStyle;
        this.space.spaceName = this.sendInfo.spaceName;
        this.space.id = this.sendInfo.spaceId;
        this.space.spaceType = this.sendInfo.spaceTypeId;
        this.space.custId = this.sendInfo.cid;
        this.space.custName = this.sendInfo.custName;
        this.space.custMobile = this.sendInfo.custMobile;
        this.space.lid = this.sendInfo.lid;
      } else {
        this.space.spaceType = '';
        this.space.id = '';
        this.space.ParentSpaceType = '';
        this.space.spaceStyle = '';
        this.space.spaceName = '';
        this.space.custId = this.sendInfo.cid;
        this.space.custName = this.sendInfo.custName;
        this.space.custMobile = this.sendInfo.custMobile;
        this.space.lid = this.sendInfo.lid;
      }
      Promise.all([
        Assistant.spaceStyle(),
        Assistant.spaceType({ parentId: 0 }),
      ])
        .then(([spaceStyle, spaceType]) => {
          this.spaceStyle = spaceStyle.data;
          this.ParentSpaceType = spaceType.data;
          if (receive !== 'create') {
            this.childrenSpaceType(this.space.ParentSpaceType);
            this.space.spaceType = this.sendInfo.spaceTypeId;
          } else {
            this.spaceType = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    childrenSpaceType(ParentSpaceType) {
      this.space.spaceType = '';
      if (ParentSpaceType) {
        Assistant.spaceType({ parentId: ParentSpaceType }).then(res => {
          this.flag = true;
          this.spaceType = res.data;
        });
      }
    },
    createSpaceName(id) {
      if (this.flag && id) {
        for (let i = 0; i < this.spaceType.length; i += 1) {
          if (id === this.spaceType[i].id) {
            this.space.spaceName = this.spaceType[i].name;
          }
        }
      } else if (this.flag && !id) {
        this.space.spaceName = '';
      }
    },
    addSpace(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Order.addSpace(this.space).then(() => {
            this.$message({
              message: `${this.Message}成功`,
              type: 'success',
            });
            this.$emit('initOrder', this.space.lid);
            this.alert = false;
          }).catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
        }
      });
    },
  },
  watch: {
    alert: function (val) {
      if (val === false) {
        this.$refs.space.resetFields();
        this.flag = false;
        this.space.spaceType = '';
        this.space.id = '';
        this.space.ParentSpaceType = '';
        this.space.spaceStyle = '';
        this.space.spaceName = '';
      }
    },
  },
};
</script>
<style scoped>
@import "../../scss/components/alert.scss";
.el-dialog__header {
  padding: 0;
}
</style>
