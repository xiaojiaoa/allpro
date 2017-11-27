<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">{{this.$route.params.id?'修改':'新建'}}公告</div>
      </div>
      <div class="container">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">

          <el-row>
            <el-col :span="6">
              <el-form-item  label="标题" prop="title">
                <el-input v-model.number="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公告类型" prop="type">
                <el-col :span="24">
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="23">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option :label="item.name" v-for="item in type" :value="item.id" :key="item.id"></el-option>                    
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  label="发布范围">
                  <el-form-item class="itemWrap">
                     <el-col :span="24">
                        <el-form-item label="门店类型">
                            <el-col :span="4">
                                <el-checkbox  v-model="allStore" @change="CheckAllStore(allStore)">全选</el-checkbox>
                            </el-col>
                            <el-col :span="20">
                                <el-checkbox-group v-model="showStore" @change="CheckedStore">
                                    <el-checkbox v-for="type in store" :label="type" :key="type.id" :value="type">{{type.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-form-item>

                         <el-form-item label="位置类型" >
                            <el-col :span="4">
                                <el-checkbox  v-model="allPlace" @change="CheckAllPlace(allPlace)">全选</el-checkbox>
                            </el-col>
                            <el-col :span="20">
                                <el-checkbox-group v-model="showPlace" @change="CheckedPlace">
                                    <el-checkbox v-for="type in place" :label="type" :key="type.id">{{type.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-form-item>

                         <el-form-item label="机构类型">
                            <el-col :span="4">
                                <el-checkbox  v-model="allOrg" @change="CheckAllOrg(allOrg)">全选</el-checkbox>
                            </el-col>
                            <el-col :span="20">
                                <el-checkbox-group v-model="showOrg" @change="CheckedOrg">
                                    <el-checkbox v-for="type in org" :label="type" :key="type.id">{{type.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-form-item>
                     </el-col>
                </el-form-item>
            </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="内容" prop="content">
                  <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="附件"> 
                <template  v-if="form.adjuncts.length !==0">
                      <div class="file1" v-for="item in form.adjuncts">
                        <el-col :span="14" >
                            <el-input  :disabled="true" :value="item.name"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <i class="el-icon-delete" @click="handleFileRemove(item.name)"></i>
                        </el-col>
                      </div>
                </template>  
                <template v-else>
                     <el-col :span="14" >
                            <el-input  :disabled="true"></el-input>
                    </el-col>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item>
                <el-col :span="8">
                    <el-upload
                      class="uploader"
                      action="http://192.2.17.74:8088/api/statics/file/share"
                      :on-success="handleFileSuccess"
                      :show-file-list="false"
                      :before-upload="beforeUpload">
                      <el-button size="small" type="primary" class="my-button">点击上传</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="14" style="color:red">
                   备注：如需继续上传，请继续点击该按钮
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
             <el-col :span="12" :offset="4">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button">保 存</el-button>
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
import { NoticeInfo } from '../../../services/admin';

export default {
  data() {
    return {
      allStore: false,
      allPlace: false,
      allOrg: false,
      showStore: [],
      showPlace: [],
      showOrg: [],
      store: [],
      place: [],
      org: [],
      sendValue: '',
      scopes: [],
      allScopes: [],
      sendType: '',
      comb: [],
      input1: '',
      docId: '',
      form: {
        title: '',
        type: '',
        content: '',
        scopes: [],
        adjuncts: [],
      },
      type: [],
      rules: {
        title: [
          { required: true, message: '请填写标题' },
        ],
        type: [
          { required: true, message: '请选择公告类型' },
        ],
        content: [
          { required: true, message: '请选择公告内容', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.select();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    init(val) {
      NoticeInfo.detail(val).then(res => {
        this.docId = res.data.id;
        this.form.title = res.data.title;
        this.form.type = res.data.type;
        this.form.content = res.data.content;
        this.allScopes = res.data.docScopes;
        this.setformat(this.allScopes);
        this.form.adjuncts = res.data.docAdjuncts;
      }).catch(err => {
        console.log(err);
      });
    },
    handleFileRemove(name) {
      for (const i in this.form.adjuncts) {
        if (this.form.adjuncts[i].name === name) {
          this.form.adjuncts.splice(i, 1);
        }
      }
    },
    handleFileSuccess(res) {
      const a = {};
      a.name = res.data.name;
      a.path = res.data.url;
      this.form.adjuncts.push(a);
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    beforeUpload(file) {
      console.log('file', file);
    },
    setformat(data) {
      for (const i in data) {
        if (data[i].sendValue === -1) {
          switch (data[i].sendType) {
            case 1:
              this.allStore = true;
              this.showStore = this.store;
              break;
            case 2:
              this.allPlace = true;
              this.showPlace = this.place;
              break;
            case 3:
              this.allOrg = true;
              this.showOrg = this.org;
              break;
            default:
              break;
          }
        } else {
          switch (data[i].sendType) {
            case 1:
              for (const k in this.store) {
                if (data[i].sendValue === parseFloat(this.store[k].id)) {
                  this.showStore.push(this.store[k]);
                  if (this.showStore.length === this.store.length) {
                    this.allStore = true;
                  }
                }
              }
              break;
            case 2:
              for (const k in this.place) {
                if (data[i].sendValue === parseFloat(this.place[k].id)) {
                  this.showPlace.push(this.place[k]);
                  if (this.showPlace.length === this.place.length) {
                    this.allPlace = true;
                  }
                }
              }
              break;
            case 3:
              for (const k in this.org) {
                if (data[i].sendValue === parseFloat(this.org[k].id)) {
                  this.showOrg.push(this.org[k]);
                  if (this.showOrg.length === this.org.length) {
                    this.allPlace = true;
                  }
                }
              }
              break;
            default:
              break;
          }
        }
      }
    },
    getFormat(number, ischecked, show) {
      switch (number) {
        case 1:
          this.sendType = 1;
          break;
        case 2:
          this.sendType = 2;
          break;
        case 3:
          this.sendType = 3;
          break;
        default:
          break;
      }
      if (ischecked === true) {
        const a = {};
        a.sendType = this.sendType;
        a.sendValue = -1;
        this.scopes.push(a);
      } else {
        if (show.length !== 0) {
          for (let i = 0; i < show.length; i += 1) {
            const a = {};
            a.sendType = this.sendType;
            a.sendValue = parseFloat(show[i].id);
            this.scopes.push(a);
          }
        }
        console.log('scopes', this.scopes);
      }
    },
    CheckAllStore(val) {
      this.showStore = val ? this.store : [];
    },
    CheckedStore(value) {
      const checkedCount = value.length;
      this.allStore = checkedCount === this.store.length;
    },
    CheckAllPlace(val) {
      this.showPlace = val ? this.place : [];
    },
    CheckedPlace(value) {
      const checkedCount = value.length;
      this.allPlace = checkedCount === this.place.length;
    },
    CheckAllOrg(val) {
      this.showOrg = val ? this.org : [];
    },
    CheckedOrg(value) {
      const checkedCount = value.length;
      this.allOrg = checkedCount === this.org.length;
    },
    select: function () {
      Promise.all([NoticeInfo.noticeTypes(), NoticeInfo.storeInfo(),
        NoticeInfo.placeInfo(), NoticeInfo.orgInfo()])
        .then(([noticeTypes, storeInfo, placeInfo, orgInfo]) => {
          this.type = noticeTypes.data;
          this.place = placeInfo.data;
          this.org = orgInfo.data;
          this.store = storeInfo.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    mergeScope: function () {
      this.getFormat(1, this.allStore, this.showStore);
      this.getFormat(2, this.allPlace, this.showPlace);
      this.getFormat(3, this.allOrg, this.showOrg);
      this.form.scopes = this.scopes;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            this.mergeScope();
            if (this.form.scopes.length !== 0) {
              this.form.docId = this.docId;
              console.log('编辑提交', this.form);
              NoticeInfo.edit(this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                  });
                  this.$router.push('/basic/noticeInfo/list');
                })
                .catch(err => {
                  console.log(err);
                  this.scopes = [];
                });
            } else {
              this.$message({
                message: '请至少选择一项发布范围',
              });
            }
          } else {
            this.mergeScope();
            if (this.form.scopes.length !== 0) {
              NoticeInfo.add(this.form)
                .then(res => {
                  console.log('res', res);
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                  });
                  this.$router.push('/basic/noticeInfo/list');
                })
                .catch(err => {
                  console.log('err', err);
                  this.scopes = [];
                });
            } else {
              this.$message({
                message: '请至少选择一项发布范围',
              });
            }
          }
        } else {
          console.log('error submit!!');
        }
      });
    },
    returnList: function () {
      this.$router.push('/basic/noticeInfo/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 0 15px 0 0;
}
.itemWrap {
  border: 1px solid #ccc;
}
.el-icon-delete {
  cursor: pointer;
}
.file1{
  margin-bottom:10px;
  height: 36px; 
}
// @import '../scss/views/index.scss';
</style>
