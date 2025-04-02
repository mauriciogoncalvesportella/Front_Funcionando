<template>
  <div>
    <v-textarea
      :disabled="disabled"
      :value="value"
      outlined
      auto-grow
      rows="8"
      placeholder="Descreva em detalhes..."
      @input="change"
    />
    <div :class="`text-right text-caption ${dataUsage.color}`">
      {{ dataUsage.percentText }}
    </div>
  </div>
</template>
<!--script src="https://cdn.ckeditor.com/ckeditor5/20.0.0/classic/translations/pt.js"></script-->
<script>
  // Comentando todas as importações do CKEditor para evitar erros
  // import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
  // import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
  // import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
  // import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
  // import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
  // import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
  // import Image from '@ckeditor/ckeditor5-image/src/image'
  // import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
  // import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
  // import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
  // import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
  // import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'
  // import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
  // import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
  // import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
  // import ListUI from '@ckeditor/ckeditor5-list/src/listui'
  // import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'
  import vue from '@/main'

  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      disableToolbar: {
        type: Boolean,
        default: false,
      },
      imgUploadUrl: {
        type: String,
        default: () => `${process.env.VUE_APP_BACKEND_URL}/ticket/upload/image`,
      },
      extraHeaders: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        key: 0,
        text: '',
        changed: false,
        // editor: ClassicEditor, // comentado
        editorData: '',
        interval: null,
        ready: true, //definido como true para o textarea
        // Comentando a configuração do CKEditor
        
        editorConfig: {
          ready: false,
          height: '300px',
          placeholder: 'Descreva em detalhes...',
          plugins: [
            // Base64UploadAdapter,
            // SimpleUploadAdapter,
            // EssentialsPlugin,
            // BoldPlugin,
            // ItalicPlugin,
            // LinkPlugin,
            // ParagraphPlugin,
            // Image,
            // ImageResize,
            // ImageToolbar,
            // ImageStyle,
            // ImageUpload,
            // LinkImage,
            // Alignment,
            // TodoList,
            // ListUI,
          ],
          font_style: {
            styles: {
              color: 'black',
            },
          },
          alignment: {
            options: ['left', 'center', 'right'],
          },
          toolbar: [
            'bold',
            'italic',
            'link',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            'todolist',
            '|',
            'imageUpload',
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'undo',
            'redo',
          ],
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: this.imgUploadUrl,

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              'X-CSRF-TOKEN': 'CSRF-Token',
              Authorization: `Bearer ${vue.$store.getters.token}`,
              ...this.extraHeaders,
            },
          },
        },

        language: 'pt',
      }
    },

    computed: {
      dataUsage: function () {
        let color = ''
        // Usamos value do textarea em vez de editorData
        const percent = ((this.value ? this.value.length : 0) * 100) / 921600
        if (percent > 100) {
          color = 'red--text'
        }

        return {
          percentValue: percent,
          percentText: `${percent.toFixed(0)}%`,
          color,
        }
      },
    },

    created () {
      if (this.value) {
        this.editorData = this.value
      }
    },

    mounted () {
      this.interval = setInterval(() => {
        if (this.changed) {
          this.changed = false
          this.$emit('input', this.text)
        }
      }, 1000) // usando 1000 em vez de 1e3 para clareza
    },

    beforeDestroy () {
      // Limpa o intervalo quando o componente é destruído
      if (this.interval) {
        clearInterval(this.interval)
      }
    },

    methods: {
      getDataUsage () {
        return this.dataUsage.percentValue
      },

      change (val) {
        // Sempre emite o valor, já que o textarea está sempre "ready"
        this.changed = true
        this.text = val
      },

      onReady () {
        // Mantido para compatibilidade com código existente
        this.ready = true
      },

      async restart () {
        // Mantido para compatibilidade com código existente
        this.key++
      },
    },
  }
</script>

<style>
  /* Podemos manter ou remover os estilos do CKEditor */
   .ck-editor__editable {
    min-height: 200px;
    max-height: 600px;
  }
</style>
