<template>
  <div :class="[bem(), className]">
    <file-upload
      class="btn-upload"
      :post-action="actionApi"
      :extensions="extensions"
      :accept="accept"
      :multiple="multiple"
      :headers="headers"
      :data="postData"
      :size="1024 * 1024 * 10"
      v-model="files"
      :maximum="9"
      :timeout="600 * 1000"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload"
    >
      <c-icon name="addition" class="upload-icon"></c-icon>
      <div class="info">上传申请单</div>
    </file-upload>
    <slot></slot>
  </div>
</template>

<script>
import create from 'utils/create/basic'
import FileUpload from 'vue-upload-component'

export default create({
  name: 'upload',
  props: {
    className: String,
    action: String,
    extensions: {
      type: String,
      default () {
        return 'gif,jpg,jpeg,png,webp'
      }
    },
    accept: {
      type: String,
      default () {
        return 'image/png,image/gif,image/jpeg,image/webp'
      }
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    postData: {
      type: Object,
      default () {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      files: []
    }
  },
  computed: {
    actionApi () {
      return `${process.env.VUE_APP_serverUrl}${process.env.VUE_APP_serverPath}${this.action}`
    }
  },
  methods: {
    // eslint-disable-next-line
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        // Automatic compression
        // 自动压缩
        // if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
        //   newFile.error = 'compressing';
        //   const imageCompressor = new ImageCompressor(null, {
        //     convertSize: Infinity,
        //     maxWidth: 512,
        //     maxHeight: 512
        //   });
        //   imageCompressor.compress(newFile.file)
        //     .then((file) => {
        //       this.$refs.upload.update(newFile, {
        //         error: '',
        //         file,
        //         size: file.size,
        //         type: file.type
        //       });
        //     })
        //     .catch((err) => {
        //       this.$refs.upload.update(newFile, { error: err.message || 'compress' });
        //     });
        // }
      }
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile, oldFile)
        this.$refs.upload.active = true
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile, oldFile)
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', newFile, oldFile)
      }
      console.log(newFile)
      if (newFile.success) {
        if (newFile.response.status === '200') {
          this.$emit('getFile', { ...newFile.response.data, fileUrl: `${process.env.VUE_APP_serverUrl}${newFile.response.data.fileUrl}` })
        } else {
          this.$emit('getFile', null)
        }
      }
    }
  },
  components: {
    FileUpload
  }
})
</script>

<style lang='less'>
.c-upload {
  border: 1px solid @default-border;
  width: 99px;
  height: 99px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  text-align: center;
  color: @sub-title-color;

  .upload-icon{
    margin-top: 20px;
    font-size: @f30;
  }
  .info {
    font-size: @f12;
  }
  .up-input {
    display: none;
  }
}
.tip {
  margin-top: 28px;
  font-size: @f12;
  color: @text-sub-color;
}
</style>
