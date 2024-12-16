import { TrolleyIcon } from "@sanity/icons"
import {defineField, defineType} from 'sanity'

export const productType = defineType({
  title: 'Products',
  name: 'product',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      title: "Product name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Product Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "blockContent"
    }),
    defineField({
      title: "Price",
      name: "price",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      title: "Categories",
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category"}}]
    }),
    defineField({
      title: "Stock",
      name: "stock",
      type: "number",
      validation: (Rule) => Rule.min(0)
    })
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price"
    },
    prepare(select){
      return {
        title: select.title,
        subtitle: `$${select.subtitle}`,
        media: select.media
      }
    }
  }
})