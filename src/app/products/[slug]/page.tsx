import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, ExternalLink, ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PayPalButton } from '@/components/ecommerce/PayPalButton';
import { getProductBySlug, products } from '@/data/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.title} | First-Choice Cyber`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#06B6D4] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-200">
              <Image
                src={product.image || '/images/product-placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge className={product.badge === 'Bestseller' ? 'bg-amber-500 text-white' : product.badge === 'New' ? 'bg-[#06B6D4] text-white' : 'bg-[#8B5CF6] text-white'}>
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-2 capitalize">
                {product.category}
              </p>
              <h1 className="text-3xl font-extrabold text-[#0F172A] mb-3">{product.title}</h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  {product.reviewCount ? <span className="text-sm text-[#64748B]">{product.reviewCount} reviews</span> : null}
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-extrabold text-[#0F172A]">${product.price}</span>
                {product.originalPrice && <span className="text-lg text-[#64748B] line-through">${product.originalPrice}</span>}
                {product.originalPrice && (
                  <Badge className="bg-green-100 text-green-700">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              <p className="text-[#64748B] leading-relaxed mb-6">{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#0F172A] mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#64748B]">
                      <Check className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase */}
              {product.isAffiliate ? (
                <div>
                  <p className="text-xs text-[#64748B] mb-3">This may be an affiliate product. Clicking Buy Now will open the retailer&apos;s site.</p>
                  <Button asChild className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold py-6 text-base">
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      Buy Now
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#64748B] mb-3 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#06B6D4]" />
                    Digital product — instant delivery to your email
                  </p>
                  <PayPalButton
                    amount={product.price}
                    productName={product.title}
                    productSlug={product.slug}
                  />
                </div>
              )}
            </div>
          </div>

          {/* What's included */}
          {product.whatsIncluded && (
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.whatsIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#64748B]">
                    <Check className="w-4 h-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-[#F8FAFC]">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <p className="font-semibold text-[#0F172A] group-hover:text-[#06B6D4] transition-colors mb-1">{p.title}</p>
                  <p className="text-sm text-[#64748B] line-clamp-2 mb-3">{p.shortDescription}</p>
                  <span className="text-[#06B6D4] font-bold">${p.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
