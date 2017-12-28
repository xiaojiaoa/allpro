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
              <el-form-item label="集团" prop="cliqueId">
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
              <el-form-item label="机构" prop="bid">
                <el-col :span="24">
                  <el-col>
                    <el-select v-model="form.bid" placeholder="请选择" @change="getScope">
                      <el-option :label="item.name" v-for="item in organData" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" v-if="storeState">
              <el-form-item label="门店" prop="bid">
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
              <el-form-item  label="权限">
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
                <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">{{this.$route.params.id?'确认修改':'确认新增'}}</el-button>
                <el-button @click="returnList" class="my-button">取 消</el-button>
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
  import { Role, Store, Assistant } from '../../../services/admin';
  import Rules from '../../../assets/validate/rules';

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
          scope: '',
          bid: '',
          cliqueId: '',
          permission: '',
        },
        rules: {
          name: [
            { required: true, message: '请填写角色名称' },
          ],
          type: [
            { ...Rules.select, message: '请选择角色类型', type: 'number' },
          ],
          permission: [
            { required: true, message: '请选择权限', trigger: 'blur' },
          ],
          cliqueId: [
            { ...Rules.select, message: '请选择集团', type: 'number' },
          ],
          bid: [
            { ...Rules.select, message: '请选择', type: 'number' },
          ],
        },
        options: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        selectState: false,
        storeState: false,
        checkedData: null,
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        const self = this;
        if (self.$route.query.scope !== 99 && self.$route.query.type === 'self') {
          self.selectState = true;
        }
        if (self.$route.query.scope === 99 && self.$route.query.type === 'self') {
          self.storeState = true;
        }
        Promise.all([
          Assistant.cliqueList(val),
          Role.roleTypeList(self.$route.query.scope),
          Role.permissionList(self.$route.query.scope),
          Store.list(val),
        ]).then(([cliqueList, roleTypeList, permissionList, list]) => {
          self.cliqueData = cliqueList.data;
          self.roleType = roleTypeList.data;
          self.options = permissionList.data;
          self.storeData = list.data.result;
          self.mapped(self.options);
        });
      },
      detail: function () {
        const self = this;
        Role.detail(self.$route.params.id).then(res => {
          self.form = res.data;
          const arr = res.data.permissionList;
          const array = [];
          for (const i in arr) {
            if (i) {
              array.push(Number(arr[i].id));
            }
          }
          self.checkedData = self.filterInfo(array);
          self.$refs.tree.setCheckedKeys(self.checkedData);
        }).catch(err => {
          console.log(err);
        });
      },
      filterInfo: function (data) {
        const self = this;
        const total = [];
        const loop = function (array) {
          const t = Math.min(...array);
          const u = self.permissionMap2.get(t);
          let l = 0;
          let t2 = [];
          if (u !== undefined) {
            array.forEach(v => {
              if (u.find(n => n === v) !== undefined && self.permissionMap2.get(v) === undefined) {
                total.push(v);
                l += 1;
              } else if (v !== t) {
                t2.push(v);
              }
            });
            if (l === u.length) {
              total.push(t);
            }
          } else {
            t2 = array;
            t2.splice(array.indexOf(t), 1);
          }
          if (t2.length !== 0) {
            loop(t2);
          }
        };
        loop(data);
        return total;
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
      },
      getScope(val) {
        this.organData.forEach(v => {
          console.log(v);
          if (v.id === val) {
            this.form.scope = v.scope;
          }
        });
      },
      onSubmit: function (formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.form.permission = this.$refs.tree.getCheckedKeys();
            const target = this.$refs.tree.getCheckedKeys();
            target.forEach(v => {
              const n = self.permissionMap.get(v);
              if (n !== undefined && !self.form.permission.some(m => m === n)) {
                self.form.permission.push(n);
              }
            });
            this.form.permission = self.form.permission.join(',');
            console.log(this.form);
            if (!this.$route.params.id) {
              Role.create(this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                  });
                  this.$router.back(-1);
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
                  this.$router.back(-1);
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
      getChange: function (val) {
        const self = this;
        Role.organList(val).then(res => {
          self.organData = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      handleChange(value) {
        console.log(value);
      },
      returnList: function () {
        this.$router.back(-1);
      },
    },
    watch: {
      permissionMap2: function () {
        if (this.$route.params.id) {
          this.detail();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
