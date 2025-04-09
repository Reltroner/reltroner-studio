// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date" },
    slug: { type: "string" },
    image: { type: "string" },
    author: { type: "string" },
    published: { type: "boolean" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  disableImportAliasWarning: true
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KXV6N7BE.mjs.map
