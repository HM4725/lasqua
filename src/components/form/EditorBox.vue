<template>
  <div class="editor">
    <div class="menubar">
      <button type="button"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        <img :src="require(`../../assets/svg/editor/h1.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        <img :src="require(`../../assets/svg/editor/h2.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
        <img :src="require(`../../assets/svg/editor/h3.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()">
        <img :src="require(`../../assets/svg/editor/bold.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()">
        <img :src="require(`../../assets/svg/editor/italic.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()">
        <img :src="require(`../../assets/svg/editor/strike.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()">
        <img :src="require(`../../assets/svg/editor/underline.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()">
        <img :src="require(`../../assets/svg/editor/ul.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()">
        <img :src="require(`../../assets/svg/editor/ol.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()">
        <img :src="require(`../../assets/svg/editor/quote.svg`)"/>
      </button>

      <button type="button"
          @click="editor.chain().focus().setHorizontalRule().run()">
        <img :src="require(`../../assets/svg/editor/hr.svg`)"/>
      </button>

      <span class="seperator"></span>

      <button type="button" @click="$refs.upload.click()">
        <img :src="require(`../../assets/svg/editor/image.svg`)"/>
      </button>
      <input ref="upload" class="hidden" type="file" @change="addImage"/>

      <button type="button"
          @click="openLinkModal" :class="{ 'is-active': editor.isActive('link') }">
        <img :src="require(`../../assets/svg/editor/link.svg`)"/>
      </button>
      <modal-slot ref="linkModal">
        <template v-slot:header>
          링크 연결
        </template>
        <template v-slot:body>
          <input-box type="text" id="editor-link" placeholder="URL"
             v-model="link" @keyup.enter.prevent="setLink" focus/>
        </template>
        <template v-slot:footer>
          <default-button class="footer-button" value="취소" @click="closeLinkModal"/>
          <default-button class="footer-button" value="확인" @click="setLink"/>
        </template>
      </modal-slot>

      <span class="seperator"></span>

      <button type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()" >
        <img :src="require(`../../assets/svg/editor/alignleft.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()" >
        <img :src="require(`../../assets/svg/editor/aligncenter.svg`)"/>
      </button>

      <button type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()" >
        <img :src="require(`../../assets/svg/editor/alignright.svg`)"/>
      </button>
      
      <span class="seperator"></span>

      <button type="button"
          @click="editor.chain().focus().undo().run()">
        <img :src="require(`../../assets/svg/editor/undo.svg`)"/>
      </button>

      <button type="button"
          @click="editor.chain().focus().redo().run()">
        <img :src="require(`../../assets/svg/editor/redo.svg`)"/>
      </button>
    </div>

    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import ModalSlot from '../utils/ModalSlot.vue'
import InputBox from './InputBox.vue'
import DefaultButton from '../buttons/DefaultButton.vue'

export default {
  name: 'Editor',
  components: {
    EditorContent,
    ModalSlot,
    InputBox,
    DefaultButton
  },
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '<em>editable text</em>',
    },
  },
  data() {
    return {
      editor: null,
      link: ''
    };
  },
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },
  methods: {
    // Menu API
    async addImage(e) {
      if(e.target.files[0]) {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        await this._upload(formData)
        e.target.value = ''
      }
    },
    openLinkModal() {
      this.link = this.editor.getAttributes('link').href
      this.$refs.linkModal.show()
    },
    closeLinkModal() {
      this.$refs.linkModal.close()
    },
    setLink() {
      if (this.link === undefined || this.link.length === 0) {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()
      } else {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: this.link })
          .run()
      }
      this.closeLinkModal()
    },
    // Private
    async _upload(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        const link = response.data.link
        this.editor.chain().focus().setImage({ src: link }).run()
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    this.editor = new Editor({
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())
      },
      extensions: [
        StarterKit,
        Underline,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link.configure({
          openOnClick: true,
        }),
      ]
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style>
  @import "../../assets/css/tiptap.css";

  .editor {
    width: 100%;
    text-align: left;
  }
  .editor > .menubar {
    border-top: 1px solid var(--base-color);
    border-left: 1px solid var(--base-color);
    border-right: 1px solid var(--base-color);
    background-color: var(--active-bg-color);
  }
  .editor > .menubar > button {
    background: transparent;
    border: 0;
    padding: .2em .5em;
    margin: .2em .1em;
    border-radius: 4px;
    cursor: pointer;
  }
  .editor > .menubar > button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .editor > .menubar > button.is-active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .editor > .menubar > button > img {
    width: 1em;
    height: 1em;
  }
  .editor > .menubar .hidden {
    display: none;
  }
  .editor > .menubar > span.seperator {
    display: inline-block;
    width: 1px;
    height: 1em;
    background-color: var(--active-color);
  }
  .editor > .menubar .footer-button {
    margin-left: 8px;
  }
  .editor > .editor-content {
    border: 1px solid var(--base-color);
    -webkit-user-select: text;
    user-select: text;
  }
</style>