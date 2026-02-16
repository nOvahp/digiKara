import React from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Store, Wallet, Receipt } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Transaction } from './wallet-data';

// Helper to convert to Farsi digits
const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const router = useRouter();
  const isWithdrawal = transaction.type === 'withdrawal';
  const borderColor = isWithdrawal ? 'border-[#D54141]' : 'border-[#688E83]';
  const iconBgColor = isWithdrawal ? 'bg-[#D54141]' : 'bg-[#688E83]';
  const Icon = isWithdrawal ? ArrowUpFromLine : ArrowDownToLine;

  return (
    <div
      className={`w-full bg-white border-2 ${borderColor} rounded-xl p-3 flex items-center justify-between shadow-sm`}
    >
      {/* Icon Box */}
      <div
        className={`${iconBgColor} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-start pr-3 gap-1">
        {/* Top Row: Amount & Currency */}
        <div className="flex items-center gap-1">
          <span className="text-[#0D0D12] text-base font-num-medium font-semibold">
            {toFarsiNumber(transaction.amount)}
          </span>
          <span className="text-[#0D0D12] text-sm font-num-medium font-light">ریال</span>
        </div>

        {/* Middle Row: Title (Store Name / Description) */}
        <div className="w-full flex justify-between items-center text-[10px] text-[#818898] font-['PeydaWeb'] font-semibold">
          <div className="flex items-center gap-1">
            {isWithdrawal ? <Wallet className="w-3 h-3" /> : <Store className="w-3 h-3" />}
            <span>{isWithdrawal ? transaction.description : transaction.storeName}</span>
          </div>
          {!isWithdrawal && (
            <div className="flex items-center gap-1">
              <span>{transaction.description}</span>
            </div>
          )}
        </div>

        {/* Bottom Row: Details */}
        <div className="w-full flex justify-between items-center mt-1 border-t border-dashed border-gray-200 pt-1">
          {isWithdrawal ? (
            // Withdrawal Details
            <>
              <div className="flex items-center gap-1 text-[10px] text-[#818898] font-['PeydaWeb'] font-semibold">
                <span>وضعیت:</span>
                <span className="text-[#D54141]">{transaction.status}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#818898] font-['PeydaWeb'] font-semibold">
                <span>تاریخ:</span>
                <span className="font-num-medium font-semibold text-[#0D0D12]">
                  {toFarsiNumber(transaction.date)}
                </span>
              </div>
            </>
          ) : (
            // Deposit Details
            <>
              <div className="flex items-center gap-1 text-[10px] text-[#818898] font-['PeydaWeb'] font-semibold">
                <span>سهم مدرسه:</span>
                <span className="font-num-medium">{toFarsiNumber(transaction.sharePercent)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#818898] font-['PeydaWeb'] font-semibold">
                  {transaction.codeLabel}:
                </span>
                <span className="text-[10px] text-[#818898] font-['Poppins'] font-medium">
                  {transaction.code}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Receipt Icon (Left side in RTL) */}
      <div
        onClick={() => router.push(`/SchoolPanel/Wallet/Transaction/${transaction.id}`)}
        className="bg-[#DFE1E7] rounded-lg p-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 mr-4 transition-colors"
      >
        <Receipt className="w-5 h-5 text-[#818898]" />
      </div>
    </div>
  );
};

export default TransactionCard;
