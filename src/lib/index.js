import currencyJs from "currency.js";
import { formatDistanceStrict } from "date-fns";
/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */

function getDateDifference(date) {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}
/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */


function renderProductCount(page, perPageProduct, totalProduct) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }

  return `Showing ${startNumber - 1}-${endNumber} of ${totalProduct} products`;
}
/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */


function calculateDiscount(price, discount) {
  const afterDiscount = Number((price - ((discount/100)*price)).toFixed(2));
  return currency(afterDiscount);
}

function calculateCartDiscount(price, discount) {
  const afterCartDiscount = Number((price - discount).toFixed(2));
  return currency(afterCartDiscount);
}
/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */


function currency(price, fraction = 2) {
  const formatCurrency = currencyJs(price, {
    symbol: '₹',
    precision: fraction,
    pattern: '!#',
  }).format();
  
  return formatCurrency;
}

export { currency, getDateDifference, calculateDiscount, renderProductCount, calculateCartDiscount };