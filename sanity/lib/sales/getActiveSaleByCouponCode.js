import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

const getActiveSaleByCouponCode = async (couponCode) => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[ _type == "sales" && isActive == true && couponCode == $couponCode ] | order(validFrom desc)[0]
  `)

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: {
        couponCode
      }
    })
    return activeSale ? activeSale.data : null
  } catch (error) {
    console.error("Error fetching active sale by coupon code:", error)
    return null
  }
}

export default getActiveSaleByCouponCode