<template>
  <transition>
    <div class="dis-flex config-list template-textarea" @input="textarea($event.target.innerText)" contenteditable="plaintext-only" v-focus="focus" @click="position">{{data}}</div>
  </transition>
</template>
<script type="text/javascript">

export default {
  data() {
    return {
      data: this.value,
      length: this.value ? this.value.length : 0,
      remark: true,
      startOffset: this.start,
      endOffset: this.end,
    };
  },
  props: [
    'value',
    'focus',
    'start',
    'end',
  ],
  computed: {
  },
  directives: {
    focus: {
      update: function (el, { value }) {
        if (value) {
          el.focus();
          if (el.setSelectionRange) {
            el.setSelectionRange(this.startOffset, this.startOffset);
          }
        }
      },
    },
  },
  methods: {
    textarea: function (val) {
      const self = this;
      const newlength = val.length;
      console.log(self.length);
      console.log(newlength);
      console.log(val);
      if (self.length < newlength) {
        console.log('一分支');
        self.startOffset = self.endOffset + (newlength - self.length);
        self.endOffset = self.startOffset;
      } else if (self.startOffset !== self.endOffset) {
        if ((self.endOffset - self.startOffset) === (self.length - newlength)) {
          console.log('二分支');
          self.endOffset = self.startOffset;
        } else {
          console.log('三分支');
          self.startOffset += (newlength - self.length);
          self.endOffset = self.startOffset;
        }
      } else {
        console.log('四分支');
        self.startOffset += (newlength - self.length);
        self.endOffset = self.startOffset;
      }
      self.length = newlength;
      const data = {
        text: val,
        startOffset: self.startOffset,
        endOffset: self.endOffset,
      };
      self.remark = false;
      self.$emit('input', data);
    },
    position: function () {
      const position = window.getSelection();
      this.startOffset = Math.min(position.anchorOffset, position.focusOffset);
      this.endOffset = Math.max(position.anchorOffset, position.focusOffset);
      const data = {
        startOffset: this.startOffset,
        endOffset: this.endOffset,
      };
      this.$emit('inputPosition', data);
      console.log(this.startOffset);
      console.log(this.endOffset);
    },
  },
  watch: {
    value: function (val) {
      if (this.remark) {
        this.data = val;
        this.length = val.length;
      }
      this.remark = true;
    },
    start: function (val) {
      this.startOffset = val;
    },
    end: function (val) {
      this.endOffset = val;
    },
  },
};
</script>
<style lang="scss">
  .template-textarea{
    line-height: 25px;
    overflow-y: auto;
    // -webkit-user-modify: read-write-plaintext-only;
    word-wrap : break-word;
  }
</style>
