<template>
  <transition-group>
    <el-dialog :title="type.title" :visible.synv="dialogShow" :before-close="resetDialog" :key="1" custom-class="materialDialog">
      <el-form :model="form"  ref="form" label-width="140px" :rules="rules">
        <div class="material dis-flex">
          <el-row class="fixedPosition">
            <el-col :span="8">
              <el-form-item  label="物料编码" prop="no">
                <el-input v-model="form.no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item  label="物料名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <div class="tab100">
              <div class="tab">
                <ul>
                  <li v-for="(item, index) in tabList" @click="choose(item.mark, index)"><span ref="tab">{{item.name}}</span></li>
                </ul>
                <div class="bar" :style="{left:bar.left}">
                  <div :style="{width:bar.width}"></div>
                </div>
              </div>
            </div>
          </el-row>
          <div class="main dis-flex">
            <div class="content" v-show="infoType === 'basicInfo'">
              <ul>
                <li>
                  <div class="content-title">
                    <span class="name">基本信息</span>
                    <span class="line"></span>
                  </div>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item  label="助记码" prop="searchNo">
                        <el-input v-model="form.searchNo"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item  label="类别名称" prop="typeId">
                        <el-cascader
                          :options="selectData.typeList"
                          v-model="form.typeIdArray"
                          :props="selectData.typeListProp"
                          @change="handleChange">
                        </el-cascader>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item  label="计价方式" prop="priceType">
                        <el-select v-model="form.priceType" placeholder="请选择">
                          <el-option label="全月平均" value="1"></el-option>
                          <el-option label="移动平均" value="2"></el-option>
                          <el-option label="先进先出" value="3"></el-option>
                          <el-option label="个别计价" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14" v-if="false">
                      <el-form-item  label="物料规则" prop="rule">
                        <el-popover
                          ref="popover2"
                          placement="bottom"
                          width="374"
                          trigger="click"
                          >
                          <div class="rulesList">
                            <el-checkbox v-model="materRuleList.length">长</el-checkbox>
                            <el-checkbox v-model="materRuleList.width">宽</el-checkbox>
                            <el-checkbox v-model="materRuleList.thickness">厚</el-checkbox>
                            <el-checkbox v-model="materRuleList.density">密度</el-checkbox>
                            <el-checkbox v-model="materRuleList.colorId">颜色</el-checkbox>
                            <el-checkbox v-model="materRuleList.weight">质量</el-checkbox>
                          </div>
                        </el-popover>
                        <el-input v-popover:popover2 v-model="form.rule" @keyup.native="deleteWord($event)"></el-input> 
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item  label="品牌" prop="brandId">
                        <el-select v-model="form.brandId" placeholder="请选择">
                          <el-option
                            v-for="item in selectData.brandList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </li>
                <li>
                  <div class="content-title">
                    <span class="name">规格信息</span>
                    <span class="line"></span>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item  label="物料规格" prop="standard">
                        <el-input v-model="form.standard"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item  label="长" prop="length">
                        <el-input v-model="form.length">
                          <template slot="append">mm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item  label="宽" prop="width">
                        <el-input v-model="form.width">
                          <template slot="append">mm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item  label="厚" prop="thickness">
                        <el-input v-model="form.thickness">
                          <template slot="append">mm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item  label="密度" prop="density">
                        <el-input v-model="form.density">
                          <template slot="append">g/m³</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item  label="颜色" prop="colorId">
                        <el-select v-model="form.colorId" placeholder="请选择">
                          <el-option
                            v-for="item in selectData.colorList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item  label="质量" prop="weight">
                        <el-input v-model="form.weight">
                          <template slot="append">kg</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </li>
                <li>
                  <div class="content-title">
                    <span class="name">存货属性</span>
                    <span class="line"></span>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item  label="">
                        <el-checkbox v-model="this.form.purchasable">外购</el-checkbox>
                        <el-checkbox v-model="this.form.marketable">销售</el-checkbox>
                        <el-checkbox v-model="this.form.homemade">自制</el-checkbox>
                        <el-checkbox v-model="this.form.consumption">生成耗用</el-checkbox>
                        <el-checkbox v-model="this.form.labourService">劳动服务</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </li>
                <li>
                  <div class="content-title">
                    <span class="name">物料单位</span>
                    <span class="line"></span>
                  </div>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item  label="主单位" prop="units">
                        <el-select v-model="form.units" placeholder="请选择">
                          <el-option
                            v-for="item in selectData.unitList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item  label="附属单位">
                        <el-input v-model="form.extraUnits"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
            <div class="pic dis-flex direction-row" v-show="infoType === 'picInfo'">
              <div class="pic-set dis-flex">
                <div class="pic-oper">
                  <span>设置封面</span>
                  <span>
                    <span>确定</span>
                    <span>取消</span>
                  </span>
                </div>
                <div class="pic-content">
                  img
                </div>
              </div>
              <div class="pic-list dis-flex">
                <div class="pic-oper">
                  <span>批量删除</span>
                  <span>
                    <span>确定</span>
                    <span>取消</span>
                  </span>
                </div>
                <div class="pic-content">
                  <el-upload
                    class="avatar-uploader"
                    :action="picAction"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handlePhotoSuccess"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('form')">{{type.btn}}</el-button>
        <el-button type="primary" @click="submit('form')">{{type.btn}}并复制</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </div>
    </el-dialog>
  </transition-group>
</template>
<script type="text/javascript">
import Rules from '../../../assets/validate/rules';
import { Material } from '../../../services/admin';

const tabOptions = [
  {
    name: '基本信息',
    mark: 'basicInfo',
  }, {
    name: '图片',
    mark: 'picInfo',
  },
];
const rulesListMap = new Map([
  ['长', 'length'],
  ['宽', 'width'],
  ['厚', 'thickness'],
  ['密度', 'density'],
  ['颜色', 'colorId'],
  ['质量', 'weight'],
]);
export default {
  data() {
    return {
      form: {
        list: [],
      },
      picAction: Material.picUpload,
      materRuleList: {
        length: false,
        width: false,
        thickness: false,
        density: false,
        colorId: false,
        weight: false,
      },
      fileList: [],
      deleteMark: false,
      rulesListMap: rulesListMap,
      infoType: 'basicInfo',
      dialogShow: false,
      tabList: tabOptions,
      bar: {
        left: '0px',
        width: '56px',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      selectData: {
        typeListProp: {
          label: 'name',
          value: 'id',
          children: 'children',
        },
        typeList: [],
        unitList: [],
        colorList: [],
        brandList: [],
      },
      rules: {
        no: [
          { ...Rules.required, message: '请填写物料编号' }, { max: 32, message: '物料编号长度不能超过32个字' },
        ],
        name: [
          { ...Rules.required, message: '请填写物料名称' }, { max: 32, message: '物料名称长度不能超过32个字' },
        ],
        searchNo: [
          { max: 32, message: '助记码长度不能超过32个字' },
        ],
        typeId: [
          { ...Rules.required, message: '请选择类别名称', type: 'number' },
        ],
        priceType: [
          { ...Rules.required, message: '请选择计价方式' },
        ],
        rule: [
          { max: 64, message: '物料规则长度不能超过64个字' },
        ],
        brandId: [
          { ...Rules.required, message: '请选择品牌', type: 'number' },
        ],
        standard: [
          { ...Rules.required, message: '请填写物料规格' }, { max: 64, message: '物料规格长度不能超过64个字' },
        ],
        units: [
          { ...Rules.required, message: '请选择物料单位', type: 'number' },
        ],
        weight: [
          { ...Rules.number2 },
        ],
        width: [
          { ...Rules.number2 },
        ],
        length: [
          { ...Rules.number2 },
        ],
        thickness: [
          { ...Rules.number2 },
        ],
        density: [
          { ...Rules.number2 },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  props: [
    'type',
    'show',
  ],
  methods: {
    init() {
      Promise.all([
        Material.typeListAdd(),
        Material.unitList(),
        Material.brandList(),
        Material.colorList(),
      ])
        .then(([typeList, unitList, brandList, colorList]) => {
          this.selectData.typeList = typeList.data;
          this.selectData.unitList = unitList.data;
          this.selectData.brandList = brandList.data;
          this.selectData.colorList = colorList.data;
          console.log(this.selectData.typeList);
          this.filterInfo(this.selectData.typeList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit: function (formName) {
      const self = this;
      this.form.typeId = this.form.typeIdArray[`${this.form.typeIdArray.length - 1}`];
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.picListData();
          Material[`${self.type.type}Material`].call(self, self.form).then(res => {
            console.log(res);
            self.$message({
              message: `${self.type.title}成功`,
              type: 'success',
            });
            self.init();
            self.resetDialog();
            return true;
          })
            .catch(err => {
              if (err.status === 201) {
                self.init();
                self.$message({
                  message: `${self.type.title}成功`,
                  type: 'success',
                });
                self.init();
                self.resetDialog();
              } else {
                self.$message({
                  message: err.msg,
                  type: 'error',
                });
              }
            });
        } else {
          return false;
        }
        return false;
      });
    },
    picListData: function () {
      console.log(this.fileList);
      this.fileList.forEach(v => {
        const t = v.response.data;
        const data = {
          savePath: t.url,
          isCover: t.isCover !== undefined ? 1 : 0,
        };
        this.form.list.push(data);
      });
    },
    deleteWord(ev) {
      if (ev.code === 'Backspace') {
        this.deleteMark = true;
      } else {
        this.deleteMark = false;
      }
    },
    filterInfo(data) {
      const filter = function (array) {
        array.forEach(state => {
          if (state.children.length === 0) {
            delete state.children;
          } else {
            filter(state.children);
          }
        });
      };
      filter(data);
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePhotoSuccess(file, fileList) {
      this.fileList.push(fileList);
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('上传照片大小不能超过 5MB!');
      }
      return isLt5M;
    },
    choose(val, index) {
      this.infoType = val;
      this.barAnimation(index);
    },
    barAnimation(index) {
      this.bar.left = `${this.$refs.tab[index].offsetLeft}px`;
      this.bar.width = `${this.$refs.tab[index].offsetWidth}px`;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form = {
        list: [],
      };
      this.fileList = [];
      this.dialogShow = false;
      this.materRuleList = {
        length: false,
        width: false,
        thickness: false,
        density: false,
        colorId: false,
        weight: false,
      };
    },
    resetDialog() {
      this.resetForm('form');
    },
  },
  computed: {
    rulesWatch() {
      return this.form.rule;
    },
  },
  watch: {
    rulesWatch(val) {
      const reg = /(长(?!})|宽(?!})|厚(?!})|密度(?!})|颜色(?!})|质量(?!}))/g;
      const arr = val.match(reg);
      const reg2 = /(长}|宽}|厚}|密度}|颜色}|质量})/g;
      const arr2 = val.match(reg2);
      console.log(arr);
      console.log(arr2);
      if (!this.deleteMark) {
        this.form.rule = val.replace(reg, '{$1}');
        if (arr !== null) {
          arr.forEach(v => {
            this.materRuleList[`${this.rulesListMap.get(v)}`] = true;
          });
        }
      } else {
        this.materRuleList = {
          length: false,
          width: false,
          thickness: false,
          density: false,
          colorId: false,
          weight: false,
        };
        if (arr2 !== null) {
          arr2.forEach(v => {
            console.log(v);
            const t = v.substring(0, v.length - 1);
            console.log(t);
            this.materRuleList[`${this.rulesListMap.get(t)}`] = true;
          });
        }
      }
    },
    show() {
      this.dialogShow = true;
    },
  },
};
</script>
<style lang="scss">
  .materialDialog{
    width: 1100px!important;
    height: 80%;
    top: 5%!important;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    .el-dialog__body{
      -ms-flex: 1;
      -webkit-box-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }
  }
  .rulesList{
    .el-checkbox{
      margin: 10px 0;
      margin-right: 40px;
    }
  }
</style>
<style lang="scss" scoped>
  .el-form{
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .material{
    padding: 0 40px;
    .fixedPosition{
      position: relative;
      .tab100{
        width:100%;
        padding: 0 20px;
        position: absolute;
        top: 60px;
        left: 0px;
        z-index: 4;
        .tab{
          position: relative; 
          width: 100%;
          background-color: #fff;
          height: 100%;
          ul{
            float: left;
            border-bottom: 2px solid #f0f2f5;
            width: 100%;
            background-color: #fff;
            li{
              float: left;
              padding: 20px 0 10px 0;
              margin-right: 30px;
              cursor: pointer;
            }
          }
          .bar{
            // width: 25%;
            height: 2px;
            position:absolute;
            bottom:-45px;
            transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
            div{
              position: relative;
              height: 2px;
              background:#3599e6;
              margin:auto;
              transition: width 0.3s cubic-bezier(0.35, 0, 0.25, 1);
            }
          }
        }
      }
    }
    .main{
      border-radius: 4px;
      border: solid 1px #dce3e6;
      overflow-y: auto;
      position: relative;
      .content{
        margin-top: 46px;
        li{
          padding: 0 40px;
          .content-title{
            position: relative;
            .name{
              padding: 20px 5px 20px 0;
              display: inline-block;
              background-color: #fff;
              z-index: 3;
              position: relative;
            }
            .line{
              width: 100%;
              display: inline-block;
              height: 1px;
              background-color: #dce1e6;
              position: absolute;
              left: 0;
              top: 27px;
            }
          }
        }
      }
      .pic{
        margin-top: 46px;
        >div{
          padding:0 20px;
          margin: 30px 0;
          float:left;
        }
        .pic-set{
          flex: 0 0 37%;
          border-right: 1px solid #dce1e6;
          overflow-y: auto;
          .pic-content{
            width: 100%;
            height: 320px;
          }
        }
        .pic-list{
          .pic-oper{
            span{
              color: #f56767;
            }
            >span{
              &:last-of-type{
                float: none;
                margin-left: 140px;
                >span{
                  &:last-of-type{
                    margin-left: 15px;
                  }
                }
              }
            }
          }
        }
        .pic-oper{
          width: 100%;
          padding-bottom: 10px;
          span{
            cursor: pointer;
            color: #3599e6;
            font-size: 14px;
          }
          >span{
            &:last-of-type{
              float: right;
              >span{
                &:last-of-type{
                  margin-left: 15px;
                  color: #999999;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
 