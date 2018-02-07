<template>
   <el-dialog title="上传文件" v-model="alert" :close-on-click-modal="false" custom-class="uploadFiles-dialog">
        <div class="dis-flex container">
            <div class="dis-flex">
               <div class="page-oper"> 
                  <ul class="page-methods orderTitle">
                      <li>
                          订单号&nbsp;&nbsp;&nbsp;{{sendInfo.tno}}
                      </li>
                      <li>
                        订单信息&nbsp;&nbsp;&nbsp;{{sendInfo.orderSubTypeStr}}/{{sendInfo.orderInfo}}/{{sendInfo.orderNum}}
                      </li>           
                  </ul>
              </div>
              <div class="table dis-flex uploadFiles">
                <div class="admin-table dis-flex">
                    <table class="admin-main-table">
                    <thead>
                        <tr>
                        <th></th>
                        <th v-for="value in fileThead" :title="value">
                            {{value}}
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                      <template v-if="fileTbody.length !== 0">
                        <tr v-for="(item,index) in fileTbody">
                          <template v-if="index === 0">
                            <td :rowspan="fileTbody.length" >{{item.orderFileReturnVo.name}}</td>
                            <td :rowspan="fileTbody.length">
                               <el-upload
                                  class="upload-demo"
                                  :action="action"
                                  :data="uploadParams"
                                  :headers="accessToken"
                                  :before-upload="beforeUpload"
                                  :on-success="upLoadSuccess"
                                  :show-file-list="false">
                                  <el-button size="small" type="primary">上传{{item.orderFileReturnVo.name}}</el-button>
                                </el-upload>  
                            </td>
                          </template>   
                            <td>{{item.orderFileReturnVo.fileName}}</td>
                            <td>{{item.orderFileReturnVo.uploadEmp.uploadName}}</td>
                            <td>{{unixFormat(item.orderFileReturnVo.createTime)}} {{dateTimeFormat(item.orderFileReturnVo.createTime)}}</td>
                            <td class="operation">
                                <el-button v-if="$_has8('downFile01')" type="primary">
                                  <a :href="`${static}/download?originalFileName=${item.orderFileReturnVo.fileName}&url=${item.orderFileReturnVo.savePath}`" :download="`${item.orderFileReturnVo.fileName}`">下载</a>
                                </el-button>                          
                                <el-button  type="danger" @click="delFile(item.orderFileReturnVo.tid)" v-if="item.orderFileReturnVo.delFlag && $_has8('delFile01')">删除</el-button> 
                            </td> 
                        </tr>
                      </template>
                        <tr v-else-if="fileTbody.length == 0 && !fileTbodyAnother" >
                            <td>{{statusName}}</td>
                            <td>
                               <el-upload
                                  class="upload-demo"
                                  :action="action"
                                  :data="uploadParams"
                                  :headers="accessToken"
                                  :before-upload="beforeUpload"
                                  :on-success="upLoadSuccess"
                                  :show-file-list="false">
                                  <el-button size="small" type="primary">上传{{statusName}}</el-button>
                                </el-upload>  
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-if="fileTbodyAnother">
                            <td :colspan="6" class="nothing-data">当前订单状态不可上传文件</td>
                        </tr>                  
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkOrder(sendInfo.tid)" v-if="stcode == 110 && $_has8('addOrder01') && $_has8('subReview01') && sendInfo.dsgnId == sendInfo.userInfoId">提交审核</el-button>
                <el-button @click="alert = false">取 消</el-button>
            </div>
    </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import mixins from '../../components/mixins/base';
import { Order, Assistant } from '../../services/admin';

export default {
  data() {
    return {
      action: Assistant.fileupload,
      static: Assistant.static,
      alert: false,
      fileThead: ['上传', '文件名', '上传人', '上传时间', '操作'],
      fileTbody: [],
      accessToken: {},
      fileTbodyAnother: false,
      fileStcode: '',
      fileTypeId: '',
      fileName: '',
      stcode: '',
      statusName: '',
      uploadParams: {
        lid: '',
        tid: '',
      },
      file: {
        lid: '',
        tid: '',
        fileName: '',
        fileTypeId: '',
        savePath: '',
        type: '',
        remark: '',
      },
    };
  },
  mixins: [mixins],
  props: ['sendInfo'],
  computed: {
    ...mapState('Global', ['Token']),
  },
  created() {
    this.accessToken = {
      'x-auth-token': this.Token,
    };
  },
  methods: {
    show() {
      this.alert = true;
    },
    hide() {
      this.alert = false;
    },
    beforeUpload() {
      this.uploadParams.lid = this.sendInfo.lid;
      this.uploadParams.tid = this.sendInfo.tid;
    },
    upLoadSuccess(res) {
      this.file.lid = this.sendInfo.lid;
      this.file.tid = this.sendInfo.tid;
      this.file.fileName = res.data.name;
      this.file.fileTypeId = this.fileTypeId;
      this.file.savePath = res.data.url;
      this.file.type = this.fileStcode;
      Order.addOrderFile(this.file)
        .then(() => {
          Order.orderFileInfo({
            id: this.sendInfo.lid,
            typeId: this.file.type,
            tid: this.sendInfo.tid,
          })
            .then(fileInfo => {
              this.fileTbody = [];
              this.fileTbody = fileInfo.data;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    init(stcode) {
      this.fileTbody = [];
      this.fileStcode = '';
      this.fileTypeId = '';
      this.fileName = '';
      this.fileTbodyAnother = false;
      this.stcode = stcode;
      Order.orderFileType(stcode)
        .then(res => {
          if (res.data.length !== 0) {
            this.fileStcode = res.data[0].code;
            this.fileTypeId = res.data[0].id;
            this.fileName = res.data[0].name;
            Order.orderFileInfo({
              id: this.sendInfo.lid,
              typeId: res.data[0].code,
              tid: this.sendInfo.tid,
            })
              .then(value => {
                this.fileTbody = value.data;
                this.statusName = res.data[0].name;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.fileTbodyAnother = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delFile(id) {
      this.$confirm('是否删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.delFileInfo(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            Order.orderFileInfo({
              id: this.sendInfo.lid,
              typeId: this.fileStcode,
              tid: this.sendInfo.tid,
            })
              .then(fileInfo => {
                this.fileTbody = [];
                this.fileTbody = fileInfo.data;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    checkOrder(id) {
      this.$confirm('确认提交该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.checkOrder(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!',
            });
            Promise.all([
              Order.orderFileInfo({
                id: this.sendInfo.lid,
                typeId: this.fileStcode,
                tid: this.sendInfo.tid,
              }),
              Order.orderDetail(this.sendInfo.tid),
            ])
              .then(([info, list]) => {
                this.fileTbody = [];
                this.fileTbody = info.data;
                this.stcode = list.data.orderBasicInfo.stcode;
                this.$emit('initOrder', this.file.lid);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            this.$message.error(`${err.msg}`);
          });
      });
    },
  },
};
</script>
<style scoped>
@import "../../scss/components/alert.scss";
.el-dialog__header {
  padding: 0;
}
 .operation .el-button span a{
    color: #ffffff;
 }
</style>

