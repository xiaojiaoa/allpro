<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <el-row>
          <el-col :span="4">
            <h1 class="material-title">工艺分流</h1>
          </el-col>
        </el-row>       
      </div>

      <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3" class="tree-wrapper">
              <div>
                <div class="tree-button">
                  <el-button  icon="plus" @click="addType" class="plus-btn"></el-button>
                  <el-button  icon="edit" @click="editType" class="edit-btn"></el-button>
                  <el-button  icon="delete" @click="deleteType" class="delete-btn"></el-button>
                  <el-dialog :title="options.title" :visible.sync="dialogFormVisible">
                    <el-form :model="form" ref="ruleForm" :rules="rules">
                      <el-form-item label="所属分流" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择">
                          <el-option label="MB_TM001" value="1"></el-option>
                          <el-option label="MB_LK001" value="2"></el-option>
                          <el-option label="MB_TM001" value="3"></el-option>
                          <el-option label="CP_TM001" value="4"></el-option>
                          <el-option label="MB_TM001" value="5"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="分流名称：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="优先级" :label-width="formLabelWidth" prop="level">
                        <el-select v-model="form.level" placeholder="请选择">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                          <el-option label="4" value="4"></el-option>
                          <el-option label="5" value="5"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="部件尺寸范围" :label-width="formLabelWidth">
                        
                        <el-row class="el-row-item">
                          <el-form-item label="长" :label-width="sizeLabelWidth">
                            <el-col :span="4">
                              <el-form-item label="" label-width="0">
                                <el-select placeholder="请选择" v-model="form.length.leftLimit">
                                  <el-option label=">=" value="1"></el-option>
                                </el-select>
                              </el-form-item>
                        
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input placeholder="100" v-model="form.length.max">
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select placeholder="请选择" v-model="form.length.or">
                                  <el-option label="且" value="1"></el-option>
                                  <el-option label="或" value="2"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select v-model="form.length.rightLimit" placeholder="请选择">
                                  <el-option label="<" value="1"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input v-model="form.length.min" placeholder="100" >
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item> 
                            </el-col>
                          </el-form-item>
                        </el-row>

                        <el-row class="el-row-item">
                          <el-form-item label="宽" :label-width="sizeLabelWidth">
                            <el-col :span="4">
                              <el-form-item label="" label-width="0">
                                <el-select placeholder="请选择" v-model="form.width.leftLimit" >
                                  <el-option label=">=" value="1"></el-option>
                                </el-select>
                              </el-form-item>
                        
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input placeholder="100" v-model="form.width.max">
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select placeholder="请选择" v-model="form.width.or" >
                                  <el-option label="且" value="1"></el-option>
                                  <el-option label="或" value="2"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select v-model="form.width.rightLimit" placeholder="请选择">
                                  <el-option label="<" value="1"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input v-model="form.width.min" placeholder="100" >
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item> 
                            </el-col>
                          </el-form-item>
                        </el-row>

                        <el-row>
                          <el-form-item label="厚" :label-width="sizeLabelWidth">
                            <el-col :span="4">
                              <el-form-item label="" label-width="0">
                                <el-select placeholder="请选择" v-model="form.thick.leftLimit" >
                                  <el-option label=">=" value="1"></el-option>
                                </el-select>
                              </el-form-item>
                        
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input placeholder="100" v-model="form.thick.max">
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select placeholder="请选择" v-model="form.thick.or" >
                                  <el-option label="且" value="1"></el-option>
                                  <el-option label="或" value="2"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-select v-model="form.thick.rightLimit" placeholder="请选择">
                                  <el-option label="<" value="1"></el-option>
                                </el-select>
                              </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="" :label-width="sizeSmallLabelWidth">
                                <el-input v-model="form.thick.min" placeholder="100" >
                                  <template slot="append">mm</template>
                                </el-input>
                              </el-form-item> 
                            </el-col>
                          </el-form-item>
                        </el-row>
                        
                      </el-form-item>
                      <el-form-item label="部件条件" :label-width="formLabelWidth" prop="condition">
                        <el-input v-model="form.condition"></el-input>
                      </el-form-item>
                      <el-form-item label="材料条件" :label-width="formLabelWidth" prop="attr">
                        <el-input v-model="form.attr"></el-input>
                      </el-form-item>
                      <el-form-item label="表达式" :label-width="formLabelWidth" prop="expression">         
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.expression"></el-input>                       
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
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
              <div class="container">
                <div class="page-oper">
                  <div class="page-title">分流信息</div>
                </div>
                <div class="default-detail"  v-loading.lock="loading">
                  <el-row>
                    <el-col :span="8">
                      <el-col :span="8" class="label">所属分流</el-col>
                      <el-col :span="16">{{data.type}}</el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-col :span="8" class="label">分流名称</el-col>
                      <el-col :span="16">{{data.name}}</el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-col :span="8" class="label">优先级</el-col>
                      <el-col :span="16">{{data.level}}</el-col>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="16">
                      <el-col :span="4" class="label">部件尺寸范围</el-col>
                      <el-col :span="20">{{data.size}}</el-col>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-col :span="8" class="label">部件条件</el-col>
                      <el-col :span="16">{{data.condition}}</el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-col :span="8" class="label">材料条件</el-col>
                      <el-col :span="16">{{data.attr}}</el-col>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="16">
                      <el-col :span="4" class="label">表达式</el-col>
                      <el-col :span="20">{{data.expression}}</el-col>
                    </el-col>            
                  </el-row>                                                               
                </div>
              </div>
            </el-col>
          </el-row>
        </div>    
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      treeLoading: true,
      loading: true,
      dialogFormVisible: false,
      paginationData: {},
      treeData: [
        {
          id: 1,
          name: 'MB_TM001',
        },
        {
          id: 2,
          name: 'MB_TM002',
        },
        {
          id: 3,
          name: 'MB_XS001',
        },
        {
          id: 4,
          name: 'MB_XC002',
        },
        {
          id: 5,
          name: 'CP_TM001',
        },
        {
          id: 6,
          name: 'CP_TM002',
        },
        {
          id: 7,
          name: 'CP_TM003',
        },
        {
          id: 8,
          name: 'LK_XC001',
        },
        {
          id: 9,
          name: 'LK_XC002',
        },
        {
          id: 10,
          name: 'LK_XC004',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'stCode',
      },
      data: {
        type: 'LK_XC002',
        name: '工艺MF',
        level: '2',
        size: 'L<1200 & W>50',
        condition: 'TM55H',
        attr: 'XFA吧台脚',
        expression: 'L >= 1000 and name.contains(TM55H) and  material.contains(XFA)',
      },
      options: {
        type: 'addType',
        message: '新增类别',
        btn: '确认新增',
        title: '新增类别',
      },
      form: {
        type: '',
        name: '',
        level: '',
        size: '',
        condition: '',
        attr: '',
        expression: '',
        length: {
          leftLimit: '1',
          max: '',
          or: '1',
          rightLimit: '1',
          min: '',
        },
        width: {
          leftLimit: '1',
          max: '',
          or: '1',
          rightLimit: '1',
          min: '',
        },
        thick: {
          leftLimit: '1',
          max: '',
          or: '1',
          rightLimit: '1',
          min: '',
        },
      },
      formLabelWidth: '134px',
      sizeLabelWidth: '40px',
      sizeSmallLabelWidth: '10px',
      typeParams: {},
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '请填写编码', trigger: 'blur' },
        ],
        leftLimit: [
          { type: 'number', required: true, message: '请选择填写长度' },
        ],
        max: [
          { type: 'number', required: true, message: '请填写部件条件' },
        ],
        condition: [
          { required: true, message: '请填写部件条件', trigger: 'blur' },
        ],
        attr: [
          { required: true, message: '请填写材料条件', trigger: 'blur' },
        ],
        expression: [
          { required: true, message: '请填写表达式', trigger: 'blur' },
        ],
      },
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
    init: function () {
      this.loading = false;
      this.treeLoading = false;
    },
    addType: function () {
      this.options = {
        type: 'addType',
        message: '新增分流',
        btn: '确认新增',
        title: '新增分流',
      };
      this.dialogFormVisible = true;
    },
    editType: function () {
      if (this.typeParams.id) {
        this.dialogFormVisible = true;
        this.options = {
          type: 'editType',
          message: '编辑分流',
          btn: '确认提交',
          title: '编辑分流',
        };
      } else {
        this.$message.error('请选中类别');
      }
    },
    handleNodeClick(data) {
      this.typeParams = data;
    },
    typeSave: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    deleteType: function () {
      if (this.typeParams.id) {
        this.$confirm('此操作将删除该类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success',
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
  },
  // computed: {
  //   dialogFormVisible: function () {
  //     return this.dialogFormVisible;
  //   },
  // },
  watch: {
    dialogFormVisible: function (val) {
      if (!val) {
        this.options.title = '';
        for (const key in this.form) {
          if (Object.prototype.hasOwnProperty.call(this.form, key)) {
            this.form[key] = '';
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row-item{
  margin-bottom: 20px;
}
.cascader{
  width: 100%;
}

.material-title{
  font-size: 26px;
}

.tree-wrapper{
  margin: 20px 20px 0 0;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #d1dbe5;
  border-top: none;
}

.tree-wrapper .el-tree{
  border: none !important;
}

.tree-button{
  padding: 15px;
  border-bottom: 1px solid #d1dbe5;
  border-top: 1px solid #d1dbe5;
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
  width: 50%;
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
