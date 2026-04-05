'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCartContext } from '@/components/layout/CartProvider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartContext();

  const handleAddToCart = () => {
    if (product.isAffiliate) {
      window.open(product.affiliateUrl, '_blank');
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
      isAffiliate: false,
    });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group bg-white">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
        <Image
          src={product.image || '/images/product-placeholder.jpg'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge
              className={
                product.badge === 'Bestseller'
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'New'
                  ? 'bg-[#06B6D4] text-white'
                  : 'bg-[#8B5CF6] text-white'
              }
            >
              {product.badge}
            </Badge>
          </div>
        )}
        {product.isAffiliate && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs">
              <ExternalLink className="w-3 h-3 mr-1" />
              Affiliate
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-[#0F172A] mb-1 line-clamp-2 hover:text-[#06B6D4] transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-[#64748B] line-clamp-2 mb-4 flex-1">
          {product.shortDescription}
        </p>

        {product.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            {product.reviewCount ? (
              <span className="text-xs text-[#64748B]">({product.reviewCount})</span>
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#0F172A]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#64748B] line-through">${product.originalPrice}</span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-[#06B6D4] hover:bg-[#0891B2] text-white"
          >
            {product.isAffiliate ? (
              <>
                Buy Now
                <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Add to Cart
                <ShoppingCart className="ml-1.5 w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
