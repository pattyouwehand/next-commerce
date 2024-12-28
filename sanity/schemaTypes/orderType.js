import { BasketIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from 'sanity'

export const orderType = defineType({
  title: 'Order',
  name: 'order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      title: "Order Number",
      name: "orderNumber",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Stripe Checkout Session ID",
      name: "stripeCheckoutSessionId",
      type: "string"
    }),
    defineField({
      title: "Stripe Customer ID",
      name: "stripeCustomerId",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Clerk User ID",
      name: "clerkUserId",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Customer Name",
      name: "customerName",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Email",
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      title: "Stripe Payment Intent ID",
      name: "stripePaymentIntentId",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Products",
      name: "products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              title: "Product Bought",
              name: "product",
              type: "reference",
              to: [{ type: "product" }]
            }),
            defineField({
              title: "Quantity Purchased",
              name: "quantity",
              type: "number"
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select){
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `$${select.price * select.quantity}`,
                media: select.image
              }
            }
          }
        })
      ]
    }),
    defineField({
      title: "Total Price",
      name: "totalPrice",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      title: "Currency",
      name: "currency",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Amount Discount",
      name: "amountDiscount",
      type: "number",
      validation: (Rule) => Rule.min(0)
    }),
    defineField({
      title: "Order Status",
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending"},
          { title: "Paid", value: "paid"},
          { title: "Shipped", value: "shipped"},
          { title: "Delivered", value: "delivered"},
          { title: "Cancelled", value: "cancelled"}
        ]
      }
    }),
    defineField({
      title: "Order Date",
      name: "orderDate",
      type: "datetime",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select){
      const orderIdSnippet = `${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`

      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency} ${select.email}`,
        media: BasketIcon
      }
    }
  }
})