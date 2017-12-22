<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{this.$route.params.id?'修改':'新建'}}角色</div>
      </div>
      <div class="container">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="6" v-if="selectState">
              <el-form-item label="集团" prop="type">
                <el-col :span="24">
                  <el-col>
                    <el-select v-model="form.bid" placeholder="请选择" @change="getChange">
                      <el-option :label="item.name" v-for="item in cliqueData" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="selectState">
              <el-form-item label="机构" prop="type">
                <el-col :span="24">
                  <el-col>
                    <el-select v-model="form.bid" placeholder="请选择">
                      <el-option :label="item.name" v-for="item in organData" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" v-if="storeState">
              <el-form-item label="门店" prop="type">
                <el-col :span="24">
                  <el-col>
                    <el-select v-model="form.bid" placeholder="请选择">
                      <el-option :label="item.name" v-for="item in storeData" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="角色类型" prop="type">
                <el-col :span="24">
                  <el-col>
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option :label="item.name" v-for="item in roleType" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-col :span="24">
                <el-form-item  label="角色名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-col>
                  <el-tree
                    :data="options"
                    show-checkbox
                    default-expand-all
                    highlight-current
                    :props="defaultProps"
                    node-key="id"
                    ref="tree"
                  >
                  </el-tree>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注" prop="content">
                <el-input type="textarea" :rows="6" placeholder="角色描述" v-model="form.describe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12" :offset="4">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">保 存</el-button>
                </el-form-item>
             </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../../components/mixins/base';
import { Role, Store } from '../../../services/admin';

export default {
  data() {
    return {
      cliqueData: [],
      organData: [],
      roleType: [],
      storeData: [],
      form: {
        name: '',
        type: '',
        describe: '',
        scope: this.$route.query.scope,
        bid: '',
        permission: '',
      },
      rules: {
        name: [
          { required: true, message: '请填写角色名称' },
        ],
        permission: [
          { required: true, message: '请选择权限', trigger: 'blur' },
        ],
      },
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      selectState: true,
      storeState: false,
    };
  },
  created() {
    this.init();
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      const self = this;
      if (self.$route.query.type === 'global') {
        self.selectState = false;
      } else if (self.$route.query.scope === 99 && self.$route.query.type === 'self') {
        self.selectState = false;
        self.storeState = true;
      } else {
        self.selectState = true;
      }
      Role.cliqueList(val).then(res => {
        self.cliqueData = res.data;
      }).catch(err => {
        console.log(err);
      });
      Role.roleTypeList(self.$route.query.scope).then(res => {
        self.roleType = res.data;
      }).catch(err => {
        console.log(err);
      });
      Role.permissionList(self.$route.query.scope).then(res => {
        self.options = res.data;
      }).catch(err => {
        console.log(err);
      });
      Store.list(val).then(res => {
        self.storeData = res.data.result;
        console.log('storeData', res.data.result);
      }).catch(err => {
        console.log(err);
      });
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.permission = this.$refs.tree.getCheckedKeys().join(',');
          Role.create(this.form)
            .then(res => {
              console.log('resssssssssssss', res);
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              this.$router.push('/basic/role/list');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
        }
      });
    },


    getChange: function () {
      const self = this;
      Role.organList(self.form.bid).then(res => {
        self.organData = res.data;
        console.log('data', res.data);
      }).catch(err => {
        console.log(23333, err);
      });
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
