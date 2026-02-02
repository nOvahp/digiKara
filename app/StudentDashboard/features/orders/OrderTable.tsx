import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Order } from "@/app/services/studentService"
import { toFarsiNumber } from "@/app/services/common/utils"

export interface OrderTableProps {
  orders: Order[]
  isLoading: boolean
  selectedOrderIds?: (string | number)[]
  onSelectRow?: (id: string | number) => void
  onSelectAll?: () => void
  onRowClick?: (order: Order) => void
  showCheckboxes?: boolean
}

export const getStatusStyles = (status: string) => {
  switch (status) {
      case 'Completed': return { bg: 'bg-[#ECFDF3]', text: 'text-[#027A48]', dot: 'bg-[#12B76A]' };
      case 'Pending': return { bg: 'bg-[#FFFAEB]', text: 'text-[#B54708]', dot: 'bg-[#F79009]' };
      case 'Cancelled': return { bg: 'bg-[#FEF3F2]', text: 'text-[#B42318]', dot: 'bg-[#F04438]' };
      default: return { bg: 'bg-[#F2F4F7]', text: 'text-[#344054]', dot: 'bg-[#667085]' };
  }
}

export function OrderTable({ 
    orders, 
    isLoading, 
    selectedOrderIds = [], 
    onSelectRow, 
    onSelectAll, 
    onRowClick,
    showCheckboxes = false
}: OrderTableProps) {
    
    const isAllSelected = orders.length > 0 && orders.every(item => selectedOrderIds.includes(item.id))

    return (
        <div className="w-full bg-white overflow-hidden">
             
             <table className="w-full border-collapse table-fixed">
                <colgroup>
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '5%' }} />
                </colgroup>
                <thead>
                    <tr className="h-10 bg-[#F6F8FA] border-b border-[#DFE1E7]">
                        {/* ID Column */}
                        <th className="px-4 text-right align-middle">
                            <div className="flex items-center gap-2.5">
                                {showCheckboxes && (
                                    <div 
                                        className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isAllSelected ? 'bg-[#F7C61A] border-[#F7C61A]' : 'bg-white border-[#DFE1E7]'}`}
                                        onClick={onSelectAll}
                                    >
                                        {isAllSelected && (
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                )}
                                <span className="text-[#666D80] text-sm font-semibold whitespace-nowrap">شناسه سفارش</span>
                            </div>
                        </th>

                        {/* Product */}
                        <th className="px-4 text-right align-middle">
                            <span className="text-[#666D80] text-sm font-semibold">محصول</span>
                        </th>

                         {/* Count */}
                         <th className="px-4 text-center align-middle">
                            <span className="text-[#666D80] text-sm font-semibold">تعداد</span>
                        </th>

                        {/* Amount */}
                        <th className="px-4 text-center align-middle">
                            <span className="text-[#666D80] text-sm font-semibold">مبلغ</span>
                        </th>

                        {/* Status */}
                        <th className="px-4 text-center align-middle">
                            <span className="text-[#666D80] text-sm font-semibold">وضعیت</span>
                        </th>

                        {/* Actions */}
                        <th className="px-4 text-left align-middle">
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading && orders.length > 0 && orders.map((item) => {
                        const styles = getStatusStyles(item.status);
                        const isSelected = selectedOrderIds.includes(item.id);

                        return (
                            <tr 
                                key={item.id} 
                                className={`h-16 border-b border-[#DFE1E7] transition-colors hover:bg-gray-50 ${isSelected ? 'bg-amber-50' : 'bg-white'}`}
                                onClick={() => onRowClick && onRowClick(item)}
                            >
                                {/* ID */}
                                <td className="px-4 align-middle">
                                    <div className="flex items-center gap-2.5">
                                        {showCheckboxes && (
                                            <div 
                                                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isSelected ? 'bg-[#F7C61A] border-[#F7C61A]' : 'bg-white border-[#DFE1E7]'}`}
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    onSelectRow && onSelectRow(item.id); 
                                                }}
                                            >
                                                {isSelected && (
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </div>
                                        )}
                                        <span className="text-[#0D0D12] text-sm font-num-medium truncate block">{toFarsiNumber(item.id)}</span>
                                    </div>
                                </td>

                                {/* Product */}
                                <td className="px-4 align-middle">
                                    <div className="flex items-center gap-3 w-full">
                                        {item.productImage ? (
                                            <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-lg object-cover border border-[#DFE1E7] flex-shrink-0" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-[#DFE1E7] flex-shrink-0">
                                                <span className="text-xs text-gray-400">بدون تصویر</span>
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[#0D0D12] text-sm font-semibold truncate block w-full" title={item.productName}>{item.productName}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Count */}
                                <td className="px-4 text-center align-middle">
                                    <span className="text-[#0D0D12] text-sm font-num-medium truncate block">{toFarsiNumber(item.count || 0)}</span>
                                </td>

                                {/* Amount */}
                                <td className="px-4 text-center align-middle">
                                    <span className="text-[#0D0D12] text-sm font-num-medium truncate block">{toFarsiNumber(item.amount)} ریال</span>
                                </td>

                                {/* Status */}
                                <td className="px-4 text-center align-middle">
                                    <div className="flex justify-center">
                                        <div className={`h-5 px-2 py-0.5 rounded-2xl flex items-center gap-1 max-w-full ${styles.bg}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
                                            <span className={`text-xs font-['PeydaFaNum'] font-normal truncate ${styles.text}`}>{item.statusText}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 text-left align-middle">
                                    <div className="flex justify-end">
                                        <div 
                                            className="w-5 h-5 flex items-center justify-center text-[#666D80] cursor-pointer" 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                if (onRowClick) onRowClick(item);
                                            }}
                                        >
                                            <MoreHorizontal size={20} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
             </table>

            {/* Loading State */}
            {isLoading && (
               <div className="w-full h-24 flex items-center justify-center border-t border-[#DFE1E7]">
                    <span className="text-[#818898] text-sm">در حال دریافت اطلاعات...</span>
               </div>
            )}

            {/* Empty State */}
            {!isLoading && orders.length === 0 && (
                <div className="w-full h-24 flex items-center justify-center border-t border-[#DFE1E7]">
                    <span className="text-[#818898] text-sm">سفارشی یافت نشد</span>
                </div>
            )}
        </div>
    )
}
