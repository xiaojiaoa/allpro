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
                    <el-select v-model="form.cliqueId" placeholder="请选择" @change="getChange">
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
                    :default-checked-keys="checkedData"
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
        permissionMap: '',
        permissionMap2: '',
        storeData: [],
        form: {
          name: '',
          type: '',
          describe: '',
          scope: this.$route.query.scope,
          bid: '',
          cliqueId: '',
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
        checkedData: [],
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
        } else if (this.$route.params.id) {
          self.selectState = false;
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
          self.mapped(self.options);
        }).catch(err => {
          console.log(err);
        });
        Store.list(val).then(res => {
          self.storeData = res.data.result;
          console.log('storeData', res.data.result);
        }).catch(err => {
          console.log(err);
        });
        if (this.$route.params.id) {
          Role.detail(this.$route.params.id).then(res => {
            this.form = res.data;
            const arr = res.data.permissionList;
            const array = [];
            for (const i in arr) {
              if (i) {
                array.push(arr[i].id);
              }
            }
            this.checkedData = array;
            let min = array[0];
            for (const j in array) {
              if (j) {
                if (array[j] < min) {
                  min = array[j];
                }
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      mapped: function (data) {
        const map = new Map();
        const map2 = new Map();
        const traversal = function (val, flag) {
          const arr = [];
          val.forEach((v) => {
            if (v.children !== undefined && v.children.length > 0) {
              traversal(v.children, v.id);
            }
            arr.push(v.id);
            if (flag !== undefined) {
              map.set(v.id, flag);
            }
          });
          if (flag !== undefined) {
            map2.set(flag, arr);
          }
        };
        traversal(data);
        this.permissionMap = map;
        this.permissionMap2 = map2;
        console.log(111, this.permissionMap);
        console.log(222, this.permissionMap2);
      },
      onSubmit: function (formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.permissionMap);
            self.form.permission = this.$refs.tree.getCheckedKeys();
            const target = this.$refs.tree.getCheckedKeys();
            target.forEach(v => {
              const n = self.permissionMap.get(v);
              console.log(n);
              if (!self.form.permission.some(m => m === n)) {
                self.form.permission.push(n);
              }
            });
            this.form.permission = self.form.permission.join(',');
            if (!this.$route.params.id) {
              Role.create(this.form)
                .then(res => {
                  console.log('res', res);
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
              Role.modify(this.form)
                .then(res => {
                  console.log('res2', res);
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                  });
                  this.$router.push('/basic/role/list');
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
