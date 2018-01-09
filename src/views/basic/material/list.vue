<template>
  <div class="dis-flex container">
    <edit :type="materialEditInfo" :show="materialEditShow" @change="initFlag"></edit>
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">物料管理</h1>
          </el-col>
          <el-col :span="20">
            <screening :screening="screening" @submit="query"></screening>
          </el-col>
        </el-row>       
      </div>

      <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3">
              <div class="tree-wrapper">
                <div class="tree-button">
                  <el-button  icon="plus" @click="addType" class="plus-btn"></el-button>
                  <el-button  icon="edit" @click="editType" class="edit-btn"></el-button>
                  <el-button  icon="delete" @click="deleteType" class="delete-btn"></el-button>
                  <el-dialog :title="typeForm.options.title" :visible.sync="typeForm.dialogFormVisible">
                    <el-form :model="typeForm.form" ref="ruleForm" :rules="typeForm.rules">
                      <el-form-item label="所属分类：" :label-width="typeForm.formLabelWidth" v-if="typeForm.create">
                        <el-cascader
                          class="cascader"
                          :options="typeForm.types"
                          :value="typeForm.types.name"
                          :props="typeForm.props"
                          change-on-select
                          @change="addTypeId"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item label="类别名称：" :label-width="typeForm.formLabelWidth" prop="name">
                        <el-input v-model="typeForm.form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="物料分类编码：" :label-width="typeForm.formLabelWidth" prop="no">
                        <el-input v-model="typeForm.form.no"></el-input>
                      </el-form-item>
                      <el-form-item label="物料编码规则：" :label-width="typeForm.formLabelWidth" prop="rule">
                        <el-input v-model="typeForm.form.rule"></el-input>
                      </el-form-item>
                      <el-form-item label="助记码：" :label-width="typeForm.formLabelWidth">
                        <el-input v-model="typeForm.form.searchNo"></el-input>
                      </el-form-item>
                      <el-form-item label="备注" :label-width="typeForm.formLabelWidth">
                        <el-input v-model="typeForm.form.remark"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="typeForm.dialogFormVisible = false" size="medium">取 消</el-button>
                      <el-button type="primary" @click="typeSave('ruleForm')">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
                <el-tree 
                  ref="tree"
                  :data="treeData"
                  :props="defaultProps"               
                  @node-click="handleNodeClick"                                 
                  highlight-current
                  v-loading.lock="treeLoading">
                </el-tree>
              </div>
            </el-col>
            <el-col :span="21" class="dis-flex">
              <div>
                <div class="page-oper">
                  <div class="page-title">物料列表</div>
                  <ul class="page-methods">
                    <li>
                      <el-button type="primary" @click="editMaterial(0)">新建</el-button>
                    </li>
                    <li>
                      <!-- <el-button type="success"  @click="editMaterial(0)">编辑</el-button> -->
                    </li>
                    <li>
                      <!-- <el-button type="danger">禁用</el-button> -->
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dis-flex" v-loading.lock="loading">
                <div class="table dis-flex">
                  <div class="admin-table dis-flex">
                    <el-checkbox-group>
                      <table class="admin-main-table">
                        <thead>
                          <tr>
                            <th>序号</th>
                            <th v-for="value in thead" :title="value">
                              {{value}}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in tbody">
                            <td>
                              {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                            </td>
                            <td class="router"><span @click="detail(item.id, item.no)">{{item.no}}</span></td>
                            <td>{{item.name}}</td>
                            <td>{{item.standard}}</td>              
                            <td>{{item.unitName}}</td>
                            <td>{{item.purchasableName}}</td>
                            <td>{{item.marketableName}}</td>
                            <td>{{item.homemadeName}}</td>
                          </tr>
                          <tr v-if="tbody.length==0 && !loading">
                            <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                          </tr>
                        </tbody>
                      </table>
                    </el-checkbox-group>
                  </div>
                </div>
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
            </el-col>
          </el-row>
        </div>    
    </div>
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Material } from '../../../services/admin';
import edit from './edit.vue';

export default {
  data() {
    return {
      thead: ['物料编号', '物料名称', '物料规格', '单位', '可外购', '可销售', '可自制'],
      tbody: [],
      screening: [
        [
          {
            label: '物料名称',
            type: 'input',
            field: 'name',
          },
        ],
      ],
      treeLoading: true,
      loading: true,
      paginationData: {},
      conditions: {
        pageSize: '',
        pageNo: '',
        did: this.$route.query.did,
        bid: this.$route.query.bid,
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'stCode',
      },
      typeForm: {
        typeParams: {},
        dialogFormVisible: false,
        create: 'true',
        form: {
          name: '',
          id: '',
          parentId: '',
          rule: '',
          remark: '',
          searchNo: '',
        },
        options: {
          type: 'addType',
          message: '新增类别',
          btn: '确认新增',
          title: '新增类别',
        },
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
        formLabelWidth: '134px',
        types: [],
        rules: {
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' },
          ],
          no: [
            { required: true, message: '请填写编码', trigger: 'blur' },
          ],
          rule: [
            { required: true, message: '请填写编码规则', trigger: 'blur' },
          ],
        },
      },
      materialEditInfo: {
        title: '新增物料',
        btn: '确定新增',
        type: 'add',
        id: null,
      },
      materialEditShow: false,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.init();
    } else {
      this.init(this.$route.query);
    }
  },
  methods: {
    init: function (val) {
      this.loading = true;
      this.treeLoading = true;
      this.getList(val);
      Material.typeList().then(res => {
        this.treeLoading = false;
        this.treeData = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    getList(params) {
      this.loading = true;
      Material.list(params).then(res => {
        this.loading = false;
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    addTypeId: function (val) {
      if (val.length === 2) {
        const a = val[1];
        this.typeForm.form.parentId = a;
      } else {
        const a = val[0];
        this.typeForm.form.parentId = a;
      }
    },
    addType: function () {
      this.typeForm.options = {
        type: 'addType',
        message: '新增类别',
        btn: '确认新增',
        title: '新增类别',
      };
      this.typeForm.types = this.treeData;
      this.filterInfo(this.typeForm.types);
      this.typeForm.dialogFormVisible = true;
      this.typeForm.create = true;
    },
    filterInfo(data) {
      let i = 1;
      const filter = function (array) {
        array.forEach(state => {
          if (state.children) {
            if (state.children.length === 0 || i === 2) {
              delete state.children;
            } else {
              i += 1;
              filter(state.children);
            }
          }
        });
        i = 1;
      };
      filter(data);
    },
    editType: function () {
      if (this.typeForm.typeParams.id) {
        this.typeForm.dialogFormVisible = true;
        this.typeForm.options = {
          type: 'editType',
          message: '编辑类别',
          btn: '确认提交',
          title: '编辑类别',
        };
        this.typeForm.create = false;
        this.typeForm.form.name = this.typeForm.typeParams.name;
        this.typeForm.form.id = this.typeForm.typeParams.id;
        Material.detailType(this.typeForm.typeParams.id).then(res => {
          this.typeForm.form = res.data;
          delete this.typeForm.form.empId;
          delete this.typeForm.form.createTime;
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.$message.error('请选中类别');
      }
    },
    typeSave: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          Material[this.typeForm.options.type].call(this, this.typeForm.form).then(res => {
            if (res.status === 201) {
              this.$message({
                message: `${this.typeForm.options.message}成功`,
                type: 'success',
              });
              this.typeForm.dialogFormVisible = false;
              this.init();
            }
            return true;
          }).catch(err => {
            console.log(err);
            this.$message({
              message: err.msg,
              type: 'error',
            });
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    deleteType: function () {
      if (this.typeForm.typeParams.id) {
        this.$confirm('此操作将删除该类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          Material.deleteType(this.typeForm.typeParams.id).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '操作成功',
                type: 'success',
              });
              this.init();
            }
          }).catch(err => {
            this.handleError(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作',
          });
        });
      } else {
        this.$message.error('请选中类别');
      }
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
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      this.paginationData.page = val;
    },
    handleNodeClick(data) {
      this.typeForm.typeParams = data;
      this.getList({ typeId: data.id });
    },
    editMaterial: function (val) {
      this.materialEditShow = !this.materialEditShow;
      if (val !== 0) {
        this.materialEditInfo = {
          title: '修改物料',
          btn: '确定修改',
          type: 'edit',
        };
      }
    },
    detail(id, no) {
      this.$router.push(`/basic/material/detail/${id}/${no}`);
    },
    initFlag: function (val) {
      console.log(val);
      if (val) {
        this.init();
      }
    },
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
    dialogFormVisible: function () {
      return this.typeForm.dialogFormVisible;
    },
  },
  components: {
    screening,
    edit,
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init(this.conditions);
      }
    },
    dialogFormVisible: function (val) {
      if (!val) {
        this.typeForm.options.title = '';
        this.typeForm.title = '';
        for (const key in this.typeForm.form) {
          if (Object.prototype.hasOwnProperty.call(this.typeForm.form, key)) {
            this.typeForm.form[key] = '';
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cascader{
  width: 100%;
}

.material-title{
  font-size: 26px;
}

.tree-wrapper{
  margin-right: 16px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #d1dbe5;
}

.tree-wrapper .el-tree{
  border: none !important;
}

.tree-button{
  padding: 15px;
  border-bottom: 1px solid #d1dbe5;
}

.tree-button .el-form{
  padding: 0 40px 0 20px;
}

.tree-button button.plus-btn,
.tree-button button.edit-btn,
.tree-button button.delete-btn{
  border: none;
  font-size: 20px;
  height: 20px;
  padding-left: 6px;
  padding-right: 6px;
}

.tree-button button.plus-btn{
  color: #3599e6;
}

.tree-button button.edit-btn{
  color: #f2c46c;
}

.tree-button button.delete-btn{
  color: #f56767;
}

.page-oper .page-title{
  font-size: 18px;
}

</style>
<style>
.tree-button .el-input__inner{
  height: 40px;
}

.tree-button .el-dialog{
  width: 33%;
  margin-top: -150px;
}

.tree-button .el-dialog__body{
  padding-bottom: 0px !important;
}

.tree-button .el-dialog__footer{
  margin-bottom: 30px;
}

.tree-button .el-dialog__footer .el-button{
  height: 36px;
  width: 64px;
}
</style>
