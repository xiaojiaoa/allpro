const mixin = {
  data() {
    return {};
  },
  methods: {
    dateFormat: function (time) {
      const target = new Date(time);
      if (typeof target === 'object') {
        return `${target.getFullYear()}-${target.getMonth() + 1}-${target.getDate()}`;
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
  },
};
export default mixin;
