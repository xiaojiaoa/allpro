<template>
    <div class="container">
        <div class="dis-flex">
            <div class="page-oper">
                <div class="page-title">部门列表</div>
                <ul class="page-methods">
                    <li>
                    <el-button type="primary" @click="dialogCreate = true">新建部门</el-button>
                    </li>
                </ul>
            </div>
            <div class="table dis-flex">
                <div class="admin-table dis-flex">
                    <table class="admin-main-table">
                    <thead>
                        <tr>
                        <th width="300">
                            部门
                        </th>
                        <th > 操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in tbody">
                            <tr>
                                <td>{{item.name}}</td>
                                <td>
                                    <el-button type="info" size="small" @click="openChildren(item.name,item.id)">新建子级</el-button>
                                    <el-button type="warning" size="small" @click="openModDep(item.name,item.id)">修改</el-button>
                                    <el-button type="danger" size="small" @click="open2(item.id)">删除</el-button>
                                </td>
                            </tr>
                            <tr v-for="(sub, subIndex) in item.subDepartment"z>
                                <td class="subTd">{{sub.name}}</td>
                                <td>
                                    <el-button type="info" size="small" @click="checkEmployee(sub.id)">查看员工</el-button>
                                    <el-button type="warning" size="small" @click="openModDep(sub.name,sub.id)">修改</el-button>
                                    <el-button type="danger" size="small" @click="open2(sub.id)">删除</el-button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                    </table>
                </div>
            </div>

          <el-dialog title="新建部门" v-model="dialogCreate" :close-on-click-modal="false" >
            <el-form id="#create" :model="create"  ref="create" label-width="30%">
                <el-row>
                    <el-col :span="20">
                       <el-form-item  label="部门名称" prop="name" :rules="{ required: true, message: '请输入部门名称', trigger: 'blur' }">
                            <el-input v-model="create.name"></el-input>
                        </el-form-item>
                        <el-input v-model="create.parentId" type="hidden"  value="0"></el-input>
                    </el-col>
                </el-row>
               	<el-row>
                    <el-col :span="20">
                        <el-form-item  label="部门类型">
                            <el-select v-model="create.type" placeholder="请选择部门" >
                                <el-option label="普通部门" value="1"></el-option>
                                <el-option label="安装部门" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreate = false">取 消</el-button>
                <el-button type="primary" @click="createDepartment('create')">确 定</el-button>
            </div>
        </el-dialog>

           <el-dialog title="新建子级" v-model="dialogCreateChildren" :close-on-click-modal="false" >
            <el-form id="#create" :model="createChildren"  ref="createChildren" label-width="30%">
                <el-row>
                    <el-col :span="20">
                       <el-form-item  label="部门名称" >
                            <el-input v-model="createChildren.DepName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-input v-model="createChildren.parentId" type="hidden"  value=""></el-input>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="20">
                       <el-form-item  label="子级名称" prop="name" :rules="{ required: true, message: '请输入子级名称', trigger: 'blur' }">
                            <el-input v-model="createChildren.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateChildren = false">取 消</el-button>
                <el-button type="primary" @click="addChildren('createChildren')">确 定</el-button>
            </div>
        </el-dialog>

         <el-dialog title="修改部门" v-model="dialogMod" :close-on-click-modal="false" >
            <el-form id="#create" :model="modDep"  ref="modDep" label-width="30%">
                <el-row>
                    <el-col :span="20">
                       <el-form-item  label="部门名称" prop="name" :rules="{ required: true, message: '请输入部门名称', trigger: 'blur' }">
                            <el-input v-model="modDep.name"></el-input>
                        </el-form-item>
                        <el-input v-model="modDep.ID" type="hidden"  value=""></el-input>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMod = false">取 消</el-button>
                <el-button type="primary" @click="modDepartment('modDep')">确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import { Department } from '../../../services/admin';

export default {
  data() {
    return {
      tbody: [],
      dialogCreate: false,
      dialogCreateChildren: false,
      dialogMod: false,
      create: {
        name: '',
        parentId: '',
        type: '',
      },
      createChildren: {
        DepName: '',
        name: '',
        parentId: '',
      },
      modDep: {
        name: '',
        ID: '',
      },
      delete: {
        id: '',
        state: '2',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function (val) {
      Department.list(val).then(res => {
        this.tbody = res.data;
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    // 增加部门
    createDepartment: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Department.add(this.create)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              this.create.name = '';
              this.dialogCreate = false;
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
    // 打开新建子级框
    openChildren: function (name, id) {
      console.log(name);
      this.dialogCreateChildren = true;
      this.createChildren.DepName = name;
      this.createChildren.parentId = id;
    },
    // 新建子级
    addChildren: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Department.add(this.createChildren)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              this.createChildren.name = '';
              this.dialogCreateChildren = false;
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
    // 删除部门
    open2(id) {
      this.delete.id = id;
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
      }).then(() => {
        Department.delete(this.delete)
          .then(() => {
            console.log('res1', this.delete);
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.init();
          }).catch(err => {
            console.log('err', err);
          });
      });
    },
    openModDep: function (name, id) {
      this.dialogMod = true;
      this.modDep.name = name;
      this.modDep.ID = id;
    },
    // 修改部门
    modDepartment: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Department.mod(this.modDep)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.dialogMod = false;
              this.init();
            })
            .catch(err => {
              console.log('err', err);
            });
        } else {
          console.log('error submit!!');
        }
      });
    },
    checkEmployee: function (val) {
      this.$router.push(`/basic/employees/list?did=${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.subTd{
  text-indent:2.3em;
  color:#5a5a5a;
}
</style>

