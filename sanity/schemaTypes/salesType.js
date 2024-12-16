import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from 'sanity'

export const salesType = defineType({
  title: 'Sales',
  name: 'sales',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      title: "Sale Title",
      name: "title",
      type: "string"
    }),
    defineField({
      title: "Sale Description",
      name: "description",
      type: "text"
    }),
    defineField({
      title: "Discount Amount",
      name: "discountAmount",
      type: "number",
      description: "Amount off in percentages or fixed value"
    }),
    defineField({
      title: "Coupon Code",
      name: "couponCode",
      type: "string"
    }),
    defineField({
      title: "Valid From",
      name: "validFrom",
      type: "datetime"
    }),
    defineField({
      title: "Valid Until",
      name: "validUntil",
      type: "datetime"
    }),
    defineField({
      title: "Is Active",
      name: "isActive",
      type: "boolean",
      initialValue: true,
      description: "Toggle to active or deactivate the sale"
    })
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive"
    },
    prepare(select){
      const { title, discountAmount, couponCode, isActive } = select
      const status = isActive ? "Active" : "Inactive"

      return {
        title,
        subtitle: `${discountAmount} off - code: ${couponCode} - ${status}`
      }
    }
  }
})