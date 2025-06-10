import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardTitle } from '~components/ui/card';
import { Spinner } from '~components/ui/spinner/spinner';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { navigationRoutes } from '~config/navigation';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { BadgeCondition } from '~features/fetch-products/components/product-elements/badgeCondition';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { getEnumAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { normalizeError } from '~utils/normalizeError';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { useCart } from '~/features/cart/hooks/useCart';
import { postProductToCart } from '~/features/cart/utils/postProductToCart';
import { PriceElement } from '~/features/fetch-products/components/product-elements/price-element/priceElement';

type ProductItemProps = {
  product: ProductProjection;
};

const CATALOG_CART_BUTTON_TEXTS = {
  ADD_TO_CART: 'Add to cart',
  ADDING: 'Adding...',
  ERROR: 'Failed to add product to cart',
  ADDED_TO_CART: (productName: string) => `Hurray! You've successfully added "${productName}" to cart`,
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, refresh } = useCart();

  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const condition = getEnumAttribute(product.masterVariant.attributes, 'condition');
  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];

  const handleAddToCart = async () => {
    if (!cart || isAdding) return;

    try {
      setIsAdding(true);
      await postProductToCart({
        cartId: cart.id,
        cartVersion: cart.version,
        productId: product.id,
        quantity: 1,
      });

      await refresh();
      toast.success(CATALOG_CART_BUTTON_TEXTS.ADDED_TO_CART(product.name[DEFAULT_STORE_LANGUAGE]));
    } catch (error: unknown) {
      toast.error(`${CATALOG_CART_BUTTON_TEXTS.ERROR}: ${normalizeError(error).message}`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <li key={identifier} {...withDataTestId(identifier)} className="flex flex-col gap-2">
      <Link to={`${navigationRoutes.product.path}/${identifier}`} className="flex-grow">
        <Card className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:bg-main relative flex h-full max-w-[300px] flex-col justify-start gap-2 rounded-lg p-2.5 shadow-none transition-all hover:shadow-none">
          <PriceElement
            className="absolute top-6 left-0 z-1 py-1 pr-4 pl-5"
            id={identifier}
            originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
            discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
          />
          <ImgElement
            imageUrl={product.masterVariant.images?.[0]?.url ?? ''}
            alt={identifier}
            aspectRatio="aspect-square"
          ></ImgElement>
          <CardContent className="flex grow flex-col justify-between gap-3 p-2.5">
            <div>
              <CardTitle className="line-clamp-2 text-lg leading-tight" {...withDataTestId(`${identifier}-name`)}>
                {product.name[DEFAULT_STORE_LANGUAGE]}
              </CardTitle>
              <AuthorElement author={author} id={identifier} />
            </div>
            <div className="line-clamp-2" {...withDataTestId(`${identifier}-description`)}>
              {product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}
            </div>
            <div className="flex flex-row flex-wrap gap-2 self-start">
              <BadgeCondition
                label={condition.label}
                conditionKey={condition.key}
                id={identifier}
                className="bg-chart-5"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
      <Button
        onClick={() => void handleAddToCart()}
        disabled={isAdding || !cart}
        {...withDataTestId(`${identifier}-add-to-cart`)}
      >
        {isAdding ? <Spinner /> : CATALOG_CART_BUTTON_TEXTS.ADD_TO_CART}
      </Button>
    </li>
  );
};
