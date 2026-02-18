'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Package, Truck, XCircle, ChevronLeft } from 'lucide-react';
import { ordersService, Order } from '@/app/services/orders/ordersService';
import { toFarsiNumber } from '@/app/services/common/utils';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{
    status: string;
  }>;
}

export default function OrdersListPage({ params }: PageProps) {
  // Unwrap params using React.use() or await in useEffect if strictly needed, 
  // but Next.js 15+ allows async params prop. 
  // For safety in client component, we can access it via hook or just treat as promise.
  const [status, setStatus] = useState<string>('processing');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Unwrap params
    params.then((p) => setStatus(p.status));
  }, [params]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await ordersService.getOrders(status);
        if (response.success && response.data) {
          setOrders(response.data);
        } else {
            console.error(response.message);
            setOrders([]);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    if (status) {
        fetchOrders();
    }
  }, [status]);


  if (loading) {
     return (
        <div className="w-full max-w-[440px] flex-1 p-4 space-y-3 overflow-y-auto">
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-32 bg-white rounded-2xl animate-pulse" />
            ))}
        </div>
     )
  }

  if (orders.length === 0) {
    return (
      <div className="w-full max-w-[440px] flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-400">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {status === 'processing' && <Truck className="w-10 h-10 text-gray-300" />}
            {status === 'complete' && <Package className="w-10 h-10 text-gray-300" />}
            {status === 'cancel' && <XCircle className="w-10 h-10 text-gray-300" />}
        </div>
        <p className="font-['PeydaWeb'] font-medium text-lg text-gray-600">
            {status === 'processing' && 'هیچ سفارش جاری ندارید'}
            {status === 'complete' && 'هیچ سفارش تحویل شده‌ای ندارید'}
            {status === 'cancel' && 'هیچ سفارش لغو شده‌ای ندارید'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] flex-1 overflow-y-auto no-scrollbar p-4 space-y-3 pb-20">
      {orders.map((order) => (
        <div 
            key={order.id} 
            className="w-full bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-3 hover:shadow-md transition-shadow cursor-default"
        >
          {/* Image */}
          <div className="w-24 h-24 bg-gray-50 rounded-xl relative overflow-hidden shrink-0">
             {order.productImage ? (
                <Image 
                    src={order.productImage} 
                    alt={order.productName || 'Order'} 
                    fill 
                    className="object-cover"
                />
             ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                    <Package className="w-8 h-8" />
                </div>
             )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
             <div className="flex justify-between items-start gap-2">
                <h3 className="text-[#0C1415] text-sm font-['PeydaWeb'] font-bold line-clamp-2 leading-6">
                    {order.productName}
                </h3>
                <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-['PeydaWeb'] font-medium shrink-0",
                    order.status === 'Completed' ? "bg-green-50 text-green-600" :
                    order.status === 'Cancelled' ? "bg-red-50 text-red-600" :
                    "bg-amber-50 text-amber-600"
                )}>
                    {order.statusText}
                </span>
             </div>

             <div className="flex flex-col gap-1 mt-auto">
                 <div className="flex items-center gap-2 text-[11px] text-gray-500 font-num-medium">
                    <span>کد سفارش: {order.id}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{order.date}</span>
                 </div>
                 <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-[#0C1415] font-num-bold text-sm">
                        <span>{toFarsiNumber(order.amount)}</span>
                        <span className="text-[10px] font-['PeydaWeb'] font-normal text-gray-500">تومان</span>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
