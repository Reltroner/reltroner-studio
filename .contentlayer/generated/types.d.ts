// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Blog = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Blog'
  title: string
  description?: string | undefined
  date?: IsoDateTimeString | undefined
  slug?: string | undefined
  image?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  /** Markdown file body */
  body: Markdown

}

export type Character = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Character'
  title: string
  description?: string | undefined
  role?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Culture = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Culture'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Event = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Event'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Organization = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Organization'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Place = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Place'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Series = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Series'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}

export type Statistic = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Statistic'
  title: string
  description?: string | undefined
  author?: string | undefined
  published?: boolean | undefined
  image?: string | undefined
  date?: IsoDateTimeString | undefined
  /** Markdown file body */
  body: Markdown

}  

/** Nested types */
  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Blog | Character | Culture | Event | Organization | Place | Series | Statistic
export type DocumentTypeNames = 'Blog' | 'Character' | 'Culture' | 'Event' | 'Organization' | 'Place' | 'Series' | 'Statistic'

export type NestedTypes = never
export type NestedTypeNames = never

export type DataExports = {
  allDocuments: DocumentTypes[]
  allBlogs: Blog[]
  allCharacters: Character[]
  allCultures: Culture[]
  allEvents: Event[]
  allOrganizations: Organization[]
  allPlaces: Place[]
  allSeries: Series[]
  allStatistics: Statistic[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Blog: Blog
  Character: Character
  Culture: Culture
  Event: Event
  Organization: Organization
  Place: Place
  Series: Series
  Statistic: Statistic
}

export type NestedTypeMap = {

}

 