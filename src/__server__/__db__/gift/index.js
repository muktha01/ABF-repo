// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import * as db from "./data";
export const GiftEndpoints = Mock => {
  Mock.onGet("/api/gift-shop/main-carousel").reply(() => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/gift-shop/service-list").reply(() => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/gift-shop/top-categories").reply(() => {
    try {
      return [200, db.categories];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/gift-shop-navigation").reply(() => {
    try {
      return [200, db.catgoryNavigation];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });

  const getProducts = type => db.products.filter(item => item.for.type === type);

  const allProducts = getProducts("all-products");
  const popularProducts = getProducts("popular-items");
  const topSailedProducts = getProducts("top-saled-items");
  Mock.onGet("/api/gift-shop/products?tag=popular").reply(() => {
    try {
      return [200, popularProducts];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/gift-shop/products?tag=top-sailed").reply(() => {
    try {
      return [200, topSailedProducts];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/gift-shop/products").reply(() => {
    try {
      return [200, allProducts];
    } catch (err) {
      return [500, {
        message: "Internal server error"
      }];
    }
  });
};