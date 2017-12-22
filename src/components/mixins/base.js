const mixin = {
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    dateFormat: function (time) {
      if (time) {
        const target = new Date(time);
        if (typeof target === 'object' && target) {
          return `${target.getFullYear()}-${target.getMonth() + 1}-${target.getDate()}`;
        }
        return time;
      }
      return time;
    },
    dateTimeFormat: function (time) {
      if (time) {
        const target = new Date(time);
        if (typeof target === 'object' && target) {
          const HH = target.getHours() < 10 ? `0${target.getHours()}` : target.getHours();
          const mm = target.getMinutes() < 10 ? `0${target.getMinutes()}` : target.getMinutes();
          const ss = target.getSeconds() < 10 ? `0${target.getSeconds()}` : target.getSeconds();
          return `${HH}:${mm}:${ss}`;
        }
        return time;
      }
      return time;
    },
    HHmmFormat: function (time) {
      if (time) {
        const target = this.dateTimeFormat(time);
        if (typeof target === 'string') {
          return target.substring(0, target.length - 3);
        }
        return time;
      }
      return time;
    },
    unixFormat: function (time) {
      const date = new Date(time);
      return time ? this.unixForDate(date, 'yyyy-MM-dd') : '';
    },
    unixForDate: function (date, fmt) {
      let fmtNew = fmt;
      if (/(y+)/.test(fmt)) {
        fmtNew = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
      };
      for (const k of Object.keys(o)) {
        const str = `${o[k]}`;
        if (new RegExp(`(${k})`).test(fmtNew)) {
          fmtNew = fmtNew.replace(
            RegExp.$1,
            (RegExp.$1.length === 1) ? str : this.padLeftZero(str),
          );
        }
      }
      return fmtNew;
    },
    padLeftZero: function (str) {
      return (`00${str}`).substr(str.length);
    },
    // 计算文件大小
    renderSize: function (value) {
      if (!value || value === '') {
        return '0 Bytes';
      }
      const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const srcsize = parseFloat(value);
      const index = Math.floor(Math.log(srcsize) / Math.log(1024));
      const size = (srcsize / (1024 ** index)).toFixed(2);
      return size + unitArr[index];
    },
    // 处理错误
    handleError: function (err) {
      console.log(err);
      this.$message({
        message: err.msg,
        type: 'error',
      });
    },
  },
};
export default mixin;
