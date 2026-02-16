import React, { useState } from 'react';
import { X, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
  statusText: string;
  paymentMethod: string;
  amount: string;
}

interface ExportPopUpProps {
  onClose: () => void;
  ordersData: Order[];
}

export default function ExportPopUp({ onClose, ordersData }: ExportPopUpProps) {
  // Dropdown States
  const [isFormatOpen, setIsFormatOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);

  // Selection States
  const [format, setFormat] = useState('CSV');
  const [statusFilter, setStatusFilter] = useState('همه مشتریان');
  const [columnsFilter, setColumnsFilter] = useState('همه ستون ها');

  // Mappings
  const columnMap: Record<string, string[]> = {
    'همه ستون ها': ['Order ID', 'Customer', 'Date', 'Status', 'Payment Method', 'Amount'],
    'اطلاعات ضروری': ['Order ID', 'Customer', 'Status', 'Amount'], // Essential
    'اطلاعات مالی': ['Date', 'Payment Method', 'Amount'], // Financial
  };

  const statusMap: Record<string, string> = {
    'همه مشتریان': 'All',
    'تکمیل شده': 'Completed',
    'در انتظار': 'Pending',
    'لغو شده': 'Cancelled',
  };

  const getFilteredData = () => {
    let filtered = [...ordersData];
    const statusKey = statusMap[statusFilter];

    // Filter by Status
    if (statusKey && statusKey !== 'All') {
      filtered = filtered.filter((o) => o.status === statusKey);
    }

    // Map Columns
    const activeColumns = columnMap[columnsFilter] || columnMap['همه ستون ها'];

    const mappedData = filtered.map((order) => {
      const row: string[] = [];
      activeColumns.forEach((col) => {
        switch (col) {
          case 'Order ID':
            row.push(order.id);
            break;
          case 'Customer':
            row.push(order.customer);
            break;
          case 'Date':
            row.push(order.date);
            break;
          case 'Status':
            row.push(order.statusText);
            break;
          case 'Payment Method':
            row.push(order.paymentMethod);
            break;
          case 'Amount':
            row.push(order.amount);
            break;
        }
      });
      return row;
    });

    return { headers: activeColumns, rows: mappedData };
  };

  const handleExport = () => {
    const { headers, rows } = getFilteredData();

    if (format === 'PDF') {
      // Print Window Strategy for PDF
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const htmlContent = `
                    <html dir="rtl">
                    <head>
                        <title>گزارش سفارشات</title>
                        <style>
                            body { font-family: 'Tahoma', sans-serif; padding: 20px; }
                            table { w-full; border-collapse: collapse; width: 100%; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                            th { background-color: #f2f2f2; }
                            h1 { text-align: center; }
                        </style>
                    </head>
                    <body>
                        <h1>گزارش خروجی سفارشات</h1>
                        <p>تعداد رکورد: ${rows.length}</p>
                        <p>تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
                        <table>
                            <thead>
                                <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>
                            </thead>
                            <tbody>
                                ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                            </tbody>
                        </table>
                        <script>
                            window.onload = function() { window.print(); }
                        </script>
                    </body>
                    </html>
                `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
      }
    } else if (format === 'Excel') {
      // HTML Table export for Excel
      const tableContent = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <meta charset="utf-8" />
                    <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Orders</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
                            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `;
      const blob = new Blob([tableContent], {
        type: 'application/vnd.ms-excel',
      });
      downloadFile(blob, 'orders_export.xls');
    } else {
      // CSV Default
      const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
      const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
        type: 'text/csv;charset=utf-8;',
      });
      downloadFile(blob, 'orders_export.csv');
    }

    onClose();
  };

  const downloadFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      dir="rtl"
    >
      {/* Modal Container */}
      <div className="w-full max-w-[400px] bg-white rounded-xl flex flex-col overflow-visible animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="w-full h-20 px-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white rounded-t-xl">
          <span className="text-[#0D0D12] text-lg font-num-medium">خروجی از سفارشات</span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#DFE1E7] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <X size={20} className="text-[#0D0D12]" />
          </button>
        </div>

        {/* Content */}
        <div className="w-full p-5 flex flex-col gap-4 relative">
          {/* Format Dropdown */}
          <div className="w-full flex flex-col gap-2 relative z-30">
            <span className="text-right text-[#818898] text-sm font-semibold">فرمت خروجی</span>
            <div
              onClick={() => {
                setIsFormatOpen(!isFormatOpen);
                setIsStatusOpen(false);
                setIsColumnsOpen(false);
              }}
              className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors"
            >
              <span className="text-[#0D0D12] text-base font-num-medium">{format}</span>
              {isFormatOpen ? (
                <ChevronUp size={20} className="text-[#818898]" />
              ) : (
                <ChevronDown size={20} className="text-[#818898]" />
              )}
            </div>
            {isFormatOpen && (
              <div className="absolute top-[80px] w-full bg-white border border-[#DFE1E7] rounded-xl shadow-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {['CSV', 'Excel', 'PDF'].map((fmt) => (
                  <div
                    key={fmt}
                    onClick={() => {
                      setFormat(fmt);
                      setIsFormatOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-[#0D0D12] text-sm font-num-medium"
                  >
                    {fmt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Range - Static */}
          <div className="w-full flex flex-col gap-2 relative z-0">
            <span className="text-right text-[#818898] text-sm font-semibold">محدوده تاریخ</span>
            <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors">
              <span className="text-[#0D0D12] text-base font-num-medium">
                ۱۰ مرداد - ۱۷ مرداد ۱۴۰۴
              </span>
              <Calendar size={20} className="text-[#818898]" />
            </div>
          </div>

          {/* Customer Status Dropdown */}
          <div className="w-full flex flex-col gap-2 relative z-20">
            <span className="text-right text-[#818898] text-sm font-semibold">وضعیت مشتری</span>
            <div
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsFormatOpen(false);
                setIsColumnsOpen(false);
              }}
              className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors"
            >
              <span className="text-[#0D0D12] text-base font-num-medium">{statusFilter}</span>
              {isStatusOpen ? (
                <ChevronUp size={20} className="text-[#818898]" />
              ) : (
                <ChevronDown size={20} className="text-[#818898]" />
              )}
            </div>
            {isStatusOpen && (
              <div className="absolute top-[80px] w-full bg-white border border-[#DFE1E7] rounded-xl shadow-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {Object.keys(statusMap).map((st) => (
                  <div
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setIsStatusOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-[#0D0D12] text-sm font-num-medium"
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columns Dropdown */}
          <div className="w-full flex flex-col gap-2 relative z-10">
            <span className="text-right text-[#818898] text-sm font-semibold">شامل ستون ها</span>
            <div
              onClick={() => {
                setIsColumnsOpen(!isColumnsOpen);
                setIsFormatOpen(false);
                setIsStatusOpen(false);
              }}
              className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors"
            >
              <span className="text-[#0D0D12] text-base font-num-medium">{columnsFilter}</span>
              {isColumnsOpen ? (
                <ChevronUp size={20} className="text-[#818898]" />
              ) : (
                <ChevronDown size={20} className="text-[#818898]" />
              )}
            </div>
            {isColumnsOpen && (
              <div className="absolute top-[80px] w-full bg-white border border-[#DFE1E7] rounded-xl shadow-lg mb-10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {Object.keys(columnMap).map((col) => (
                  <div
                    key={col}
                    onClick={() => {
                      setColumnsFilter(col);
                      setIsColumnsOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-[#0D0D12] text-sm font-num-medium"
                  >
                    {col}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full p-5 border-t border-[#DFE1E7] flex justify-center items-center bg-white rounded-b-xl z-0">
          <button
            onClick={handleExport}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-sm"
          >
            <span className="text-[#1A1C1E] text-lg font-semibold">دانلود فایل سفارشات</span>
          </button>
        </div>
      </div>
    </div>
  );
}
