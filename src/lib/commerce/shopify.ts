import type { Commerce, CommerceProduct, Cart } from "./index";

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const SHOPIFY_API_VERSION = "2024-04";

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Shopify credentials not configured in environment variables.");
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }
  return json.data;
}

export const ShopifyCommerce: Commerce = {
  async getProduct(handle: string): Promise<CommerceProduct | null> {
    const query = `
      query GetProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          productType
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await shopifyFetch<{ product: any }>(query, { handle });
      if (!data.product) return null;
      return {
        id: data.product.id,
        handle: data.product.handle,
        title: data.product.title,
        description: data.product.description,
        category: data.product.productType || "Bath Hardware",
        images: data.product.images.edges.map((e: any) => e.node.url),
        variants: data.product.variants.edges.map((e: any) => ({
          id: e.node.id,
          title: e.node.title,
          price: parseFloat(e.node.price.amount),
          originalPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : undefined,
          availableForSale: e.node.availableForSale,
        })),
      };
    } catch {
      return null;
    }
  },

  async getProducts(): Promise<CommerceProduct[]> {
    return [];
  },

  async createCart(): Promise<Cart> {
    const mutation = `
      mutation CreateCart {
        cartCreate {
          cart {
            id
            checkoutUrl
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch<{ cartCreate: { cart: any } }>(mutation);
    const cart = data.cartCreate.cart;
    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      lines: [],
      subtotal: parseFloat(cart.cost.subtotalAmount.amount),
      taxIncluded: true,
      currency: cart.cost.subtotalAmount.currencyCode || "INR",
    };
  },

  async addToCart(cartId: string, lines: { variantId: string; quantity: number }[]): Promise<Cart> {
    const mutation = `
      mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost {
              subtotalAmount {
                amount
              }
            }
            lines(first: 20) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyLines = lines.map((l) => ({
      merchandiseId: l.variantId,
      quantity: l.quantity,
    }));

    const data = await shopifyFetch<{ cartLinesAdd: { cart: any } }>(mutation, {
      cartId,
      lines: shopifyLines,
    });
    const c = data.cartLinesAdd.cart;
    return {
      id: c.id,
      checkoutUrl: c.checkoutUrl,
      lines: c.lines.edges.map((e: any) => ({
        id: e.node.id,
        variantId: e.node.merchandise.id,
        title: `${e.node.merchandise.product.title} - ${e.node.merchandise.title}`,
        price: parseFloat(e.node.merchandise.price.amount),
        quantity: e.node.quantity,
      })),
      subtotal: parseFloat(c.cost.subtotalAmount.amount),
      taxIncluded: true,
      currency: "INR",
    };
  },

  async updateCart(_cartId: string, _lines: { id: string; quantity: number }[]): Promise<Cart> {
    throw new Error("Update cart method ready for Shopify Storefront token.");
  },

  async getCart(_cartId: string): Promise<Cart | null> {
    return null;
  },
};
