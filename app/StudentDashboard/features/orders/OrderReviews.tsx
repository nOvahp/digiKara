"use client"

import React, { useState, useEffect } from "react"
import { PopUpProduct } from "../products/PopUpProduct"
import { ordersService, Order } from "@/app/services/orders/ordersService"
import { toFarsiNumber } from "@/app/services/common/utils"
import { OrderTable } from "./OrderTable"

export function OrderReviews() {
  const [activeTab, setActiveTab] = useState("active_orders")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Bulk Selection State
  const [selectedOrderIds, setSelectedOrderIds] = useState<(string | number)[]>([])

  // Toggle Single Row Selection
  const handleSelectRow = (id: string | number) => {
      setSelectedOrderIds(prev => {
          if (prev.includes(id)) {
              return prev.filter(item => item !== id)
          } else {
              return [...prev, id]
          }
      })
  }

  // Toggle Select All (current visible page)
  const handleSelectAll = () => {
      // This will be called from OrderTable which knows about its current page
      // For now, we'll select all loaded orders (OrderTable manages its own pagination)
      const allIds = orders.map(item => item.id)
      const allSelected = allIds.every(id => selectedOrderIds.includes(id))
      
      if (allSelected) {
          setSelectedOrderIds([])
      } else {
          setSelectedOrderIds(allIds)
      }
  }

  // Bulk Delivery Action
  const handleBulkDeliver = async () => {
      if (selectedOrderIds.length === 0) return;

      if (!confirm("آیا از تحویل سفارش‌های انتخاب شده به مدرسه اطمینان دارید؟")) return;

      setIsLoading(true);
      try {
          await Promise.all(selectedOrderIds.map(id => 
              ordersService.updateOrderStatus(id, "تحویل به مدرسه ")
          ));
          
          const response = await ordersService.getOrders();
          if (response.success && response.data) {
              setOrders(response.data);
          }
          setSelectedOrderIds([]);
      } catch (error) {
          console.error("Bulk update failed", error);
          alert("خطا در بروزرسانی وضعیت سفارش‌ها");
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        const response = await ordersService.getOrders();
        if (response.success && response.data) {
            setOrders(response.data);
        } else {
            setError(response.message || "خطا در دریافت سفارشات");
        }
        setIsLoading(false);
    };

    if (activeTab === 'active_orders') {
        fetchOrders();
    }
  }, [activeTab]);

  // Reset selection on tab change
  useEffect(() => {
      setSelectedOrderIds([])
  }, [activeTab])

  // Handle row click
  const handleRowClick = (item: Order) => {
    setSelectedOrder(item)
  }

  return (
    <div className="w-full flex-col justify-start items-end gap-6 inline-flex mb-8 relative" dir="rtl">
      {selectedOrder && (
          <PopUpProduct 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
      )}

      {/* Header */}
      <div className="self-stretch justify-start items-center px-1 inline-flex w-full">
         <div className="text-[#222831] text-lg font-num-medium leading-relaxed">
            {activeTab === 'active_orders' ? 'سفارش ها' : 'پروژه ها'}
         </div>
      </div>

      {/* Tabs */}
      <div className="self-stretch h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] justify-center items-center inline-flex">
         <div 
             onClick={() => setActiveTab("active_orders")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold leading-tight">سفارش های فعال</div>
         </div>
      </div>

      {/* Error Message */}
      {error && (
          <div className="w-full p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
               <span className="text-red-600 text-sm font-medium">{error}</span>
          </div>
      )}

      {/* Order Table */}
      <OrderTable 
          orders={orders}
          loading={isLoading}
          onRowClick={handleRowClick}
          showCheckboxes={true}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          selectedOrderIds={selectedOrderIds}
      />

       {/* Bottom Sheet Action Bar */}
       <div className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#DFE1E7] p-4 z-[100] transition-all duration-300 ease-in-out transform ${selectedOrderIds.length > 0 ? 'translate-y-0 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]' : 'translate-y-full opacity-0 pointer-events-none shadow-none'}`}>
            <div className="max-w-[1120px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F7C61A] rounded-full flex items-center justify-center text-[#0D0D12] font-bold text-sm">
                        {toFarsiNumber(selectedOrderIds.length)}
                    </div>
                    <span className="text-[#0D0D12] text-sm font-medium">سفارش انتخاب شده</span>
                </div>
                <button 
                    onClick={handleBulkDeliver}
                    disabled={isLoading}
                    className="h-10 px-6 bg-[#F7C61A] rounded-lg text-[#0D0D12] text-sm font-semibold hover:bg-[#E5B50F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    تحویل سفارش به مدرسه
                </button>
            </div>
       </div>
    </div>
  )
}

export default OrderReviews;
