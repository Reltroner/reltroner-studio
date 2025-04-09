// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    date: { type: "date", required: false },
    slug: { type: "string", required: false },
    image: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false }
  }
}));
var Character = defineDocumentType(() => ({
  name: "Character",
  filePathPattern: `characters/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    type: { type: "string", required: false },
    role: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Culture = defineDocumentType(() => ({
  name: "Culture",
  filePathPattern: `cultures/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Event = defineDocumentType(() => ({
  name: "Event",
  filePathPattern: `events/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Organization = defineDocumentType(() => ({
  name: "Organization",
  filePathPattern: `organizations/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Place = defineDocumentType(() => ({
  name: "Place",
  filePathPattern: `places/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    type: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Series = defineDocumentType(() => ({
  name: "Series",
  filePathPattern: `series/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var Statistic = defineDocumentType(() => ({
  name: "Statistic",
  filePathPattern: `statistics/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    author: { type: "string", required: false },
    published: { type: "boolean", required: false },
    image: { type: "string", required: false },
    date: { type: "date", required: false }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [
    Blog,
    Character,
    Culture,
    Event,
    Organization,
    Place,
    Series,
    Statistic
  ],
  markdown: {
    remarkPlugins: [remarkGfm]
    //rehypePlugins: [rehypePrettyCode],
  },
  disableImportAliasWarning: true
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-O7LPZNBH.mjs.map
