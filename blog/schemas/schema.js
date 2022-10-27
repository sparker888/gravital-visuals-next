// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import blockContent from './blockContent'

// import the icon
import { DocumentIcon } from '@sanity/icons'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: 'Post',
      name: 'post',
      icon: DocumentIcon,
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
        },
        {
          name: 'publishedAt',
          title: 'Published at',
          type: 'datetime',
        },
        {
          name: 'body',
          title: 'Body',
          type: 'blockContent',
        },
      ],
      preview: {
        select: {
          title: 'title',
        },
      },
    },
    blockContent,
  ]),
})
