'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/components/layout/CartProvider';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCartContext();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[#0F172A]">
            <ShoppingCart className="w-5 h-5" />
            Your Cart {items.length > 0 && `(${items.length})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <ShoppingCart className="w-16 h-16 text-slate-300" />
            <p className="text-slate-500">Your cart is empty</p>
            <Button asChild variant="outline" onClick={onClose}>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={item.image || '/images/product-placeholder.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0F172A] truncate">{item.title}</p>
                    <p className="text-sm text-[#06B6D4] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.isAffiliate ? (
                      <span className="text-xs text-slate-500">Affiliate product</span>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center hover:border-[#06B6D4] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center hover:border-[#06B6D4] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Separator />
              <div className="flex justify-between text-sm font-semibold text-[#0F172A]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Affiliate items redirect to retailer. Digital products delivered via email.
              </p>
              <Button
                asChild
                className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold"
                onClick={onClose}
              >
                <Link href="/products/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
