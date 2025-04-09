// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    date: { type: "date" }
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
  documentTypes: [Blog]
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-5YV2HDUF.mjs.map
