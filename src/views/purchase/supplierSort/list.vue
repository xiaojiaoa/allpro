<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">供应商分类</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="addSortP()">新增分类</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex">
        <div class="admin-table dis-flex">
          <table class="admin-main-table">
            <thead>
            <tr>
              <th v-for="value in thead" :title="value">
                {{value}}
              </th>
            </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in tbody">
                <tr>
                  <td>{{item.name}}</td>
                  <td>{{item.empName}}</td>
                  <td>{{item.deptName}}</td>
                  <td>{{unixFormat(item.addTime)}}</td>
                  <td>
                    <el-button type="primary" size="small" v-if="item.isDeleted === 1" @click="openChildren(item.name,item.id)">新建子级</el-button>
                    <el-button type="primary" size="small" v-if="item.isDeleted === 1" @click="openModSup(item.name,item.cateNo,item.id)">修改</el-button>
                    <el-button :type="item.isDeleted==1?'danger':'primary'" size="small" @click="stateEdit(item.id,item.isDeleted)">{{item.isDeleted == 1?'禁用':'启用'}}</el-button>
                  </td>
                </tr>
                <tr v-if="item.children" v-for="(sub, subIndex) in item.children">
                  <td class="subTd" style="text-indent:20px;">{{sub.name}}</td>
                  <td>{{sub.empName}}</td>
                  <td>{{sub.deptName}}</td>
                  <td>{{unixFormat(sub.addTime)}}</td>
                  <td style="text-indent: 82px">
                    <el-button type="primary" size="small" @click="openModSup(sub.name,sub.cateNo,sub.id)" v-if="sub.isDeleted === 1">修改</el-button>
                    <el-button :type="sub.isDeleted==1?'danger':'info'" size="small" @click="stateEdit(sub.id, sub.isDeleted)">{{sub.isDeleted == 1?'禁用':'启用'}}</el-button>
                  </td>
                </tr>
              </template>
              <tr v-if="tbody.length==0 && !loading">
                <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <el-dialog title="新建分类" v-model="parent.dialogCreate" :close-on-click-modal="false" :before-close="resetParents">
        <el-form id="#create" :model="parent.create"  ref="create" label-width="140px">
          <el-row>
            <el-col :span="20">
              <el-form-item  label="上级分类">
                <el-select v-model="parent.create.parentId" placeholder="请选择分类" disabled>
                  <el-option label="一级分类" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类编号" prop="cateNo" :rules="{ required: true, message: '请输入分类编号', trigger: 'blur' }">
                <el-input v-model="parent.create.cateNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类名称" prop="name" :rules="{ required: true, message: '请输入分类名称', trigger: 'blur' }">
                <el-input v-model="parent.create.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="备注" prop="remark">
                <el-input type="textarea" v-model="parent.create.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('parent')">取 消</el-button>
          <el-button type="primary" @click="createSortP('create')">确 定</el-button>
        </div>
      </el-dialog>




      <el-dialog title="新建子类" v-model="children.dialogCreate" :close-on-click-modal="false" :before-close="resetChildren">
        <el-form id="#create" :model="children.create"  ref="create" label-width="140px">
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类名称：">
                {{children.create.nameP}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="子级名称" prop="name" :rules="{ required: true, message: '请输入子级名称', trigger: 'blur' }">
                <el-input v-model="children.create.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类编号" prop="cateNo" :rules="{ required: true, message: '请输入分类编号', trigger: 'blur' }">
                <el-input v-model="children.create.cateNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="备注" prop="remark">
                <el-input type="textarea" v-model="children.create.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('children')">取 消</el-button>
          <el-button type="primary" @click="createSortC('create')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改分类" v-model="dialogMod" :close-on-click-modal="false" :before-close="resetMod">
        <el-form id="#create" :model="modSort"  ref="modSort" label-width="140px">
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类名称" prop="name" :rules="{ required: true, message: '请输入分类名称', trigger: 'blur' }">
                <el-input v-model="modSort.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item  label="分类编号" prop="cateNo" :rules="{ required: true, message: '请输入分类编号', trigger: 'blur' }">
                <el-input v-model="modSort.cateNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('mod')">取 消</el-button>
          <el-button type="primary" @click="modifySort('modSort')">确 定</el-button>
        </div>
      </el-dialog>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.page"
          :page-size="paginationData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.totalItems">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import screening from '../../../components/screening.vue';
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        thead: ['供应商分类名称', '员工名称', '创建部门', '创建时间', '操作'],
        tbody: [],
        parent: {
          create: {
            name: '',
            parentId: '0',
            cateNo: '',
            remark: '',
          },
          dialogCreate: false,
        },
        children: {
          create: {
            name: '',
            nameP: '',
            cateNo: '',
            parentId: '',
            remark: '',
          },
          dialogCreate: false,
        },
        modSort: {
          name: '',
          cateNo: '',
          Id: '',
        },
        dialogMod: false,
        screening: [
          [
            {
              label: '分类名称',
              type: 'input',
              field: 'name',
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: true,
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.loading = true;
        Purchase.supSortList(val).then(res => {
          this.loading = false;
          this.paginationData = res.data;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          this.tbody = this.dataFilter(res.data.result);
        }).catch(err => {
          console.log(err);
        });
      },
      dataFilter: function (data) {
        const arr = [];
        data.forEach(state => {
          if (state.parentId === 0) {
            state.children = [];
            arr.push(state);
          }
        });
        data.forEach(v => {
          if (v.parentId !== 0) {
            arr.forEach(state => {
              if (v.parentId === state.id) {
                state.children.push(v);
              }
            });
          }
        });
        return arr;
      },
      addSortP: function () {
        this.parent.dialogCreate = true;
      },
      openChildren: function (name, id) {
        this.children.dialogCreate = true;
        this.children.create.nameP = name;
        this.children.create.parentId = id;
      },
      openModSup: function (name, cateNo, id) {
        this.dialogMod = true;
        this.modSort.name = name;
        this.modSort.cateNo = cateNo;
        this.modSort.Id = id;
      },
      createSortP: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            Purchase.supSortAdd(this.parent.create)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '新增成功',
                  type: 'success',
                });
                this.resetForm('parent');
                this.init();
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      },
      createSortC: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log('children', this.children.create);
            Purchase.supSortAdd(this.children.create)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '新增成功',
                  type: 'success',
                });
                this.resetForm('children');
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
      modifySort: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            Purchase.supSortEdit(this.modSort.Id, this.modSort)
              .then(res => {
                console.log('res', res);
                this.$message({
                  message: '修改成功',
                  type: 'success',
                });
                this.resetForm('mod');
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
      stateEdit: function (id, isDelete) {
        const isDeleted = (isDelete === 1 ? 2 : 1);
        this.$confirm('确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
        }).then(() => {
          Purchase.supSortForbid(id, isDeleted)
            .then(res => {
              console.log(res);
              let msg = '';
              if (isDelete === 1) {
                msg = '禁用成功';
              } else {
                msg = '启用成功';
              }
              this.$message({
                message: msg,
                type: 'success',
              });
              this.init();
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      query: function (val) {
        if (Object.keys(val).length === 0) {
          this.conditions = {};
          this.conditions.pageSize = this.paginationData.pageSize;
          this.conditions.pageNo = this.paginationData.page;
          this.paginationData.page = 0;
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      resetForm: function (formName) {
        if (formName === 'parent') {
          this.parent.create = {
            name: '',
            parentId: '',
            cateNo: '',
            remark: '',
          };
          this.parent.dialogCreate = false;
        } else if (formName === 'children') {
          this.children.create = {
            name: '',
            nameP: '',
            cateNo: '',
            parentId: '',
            remark: '',
          };
          this.children.dialogCreate = false;
        } else if (formName === 'mod') {
          this.modSort = {
            name: '',
            cateNo: '',
            Id: '',
          };
          this.dialogMod = false;
        }
        //  this.$refs[formName].resetFields();
      },
      resetParents() {
        this.resetForm('parent');
      },
      resetChildren() {
        this.resetForm('children');
      },
      resetMod() {
        this.resetForm('mod');
      },
      handleSizeChange: function (val) {
        this.paginationData.pageSize = val;
        this.conditions.pageSize = val;
        this.paginationData.page = 0;
      },
      handleCurrentChange: function (val) {
        this.paginationData.page = val;
      },
    },
    computed: {
      conditionsWatch: function () {
        return this.paginationData.page;
      },
    },
    components: {
      screening,
    },
    watch: {
      conditionsWatch: function (val) {
        if (val !== 0) {
          this.conditions.pageNo = val;
          this.init(this.conditions);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
