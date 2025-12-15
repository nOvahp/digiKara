import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'projects'>('orders');
  
  const orders = [
    { id: 1, product: "عسل آویشن ارگانیک | ۵۰۰ گرم" },
    { id: 2, product: "عسل آویشن ارگانیک | ۵۰۰ گرم" },
    { id: 3, product: "عسل آویشن ارگانیک | ۲۰۰ گرم" },
    { id: 4, product: "عسل زعفران ارگانیک | ۲۰۰ گرم" },
    { id: 5, product: "موم عسل طبیعی | بسته بندی ۵ادونی" },
    { id: 6, product: "عسل زعفران ارگانیک | ۲۰۰ گرم" },
    { id: 7, product: "گرده گل |ارگانیک| ۲۰ گرم" },
    { id: 8, product: "عسل طبیعی | ۵۰ گرم" },
    { id: 9, product: "چای سبز ارگانیک | ۱۰۰ گرم" },
    { id: 10, product: "زعفران خالص | ۱۰ گرم" },
    { id: 11, product: "مربای توت فرنگی | ۲۵۰ گرم" },
  ];

  const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱'];

  return (
    <div className="mx-4 mt-6 mb-24">
      <h3 className="text-sm font-bold text-foreground mb-3">سفارش ها</h3>
      
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'orders' ? 'default' : 'secondary'}
          className={`flex-1 rounded-full text-sm ${activeTab === 'orders' ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          onClick={() => setActiveTab('orders')}
        >
          سفارش های فعال
        </Button>
        <Button
          variant={activeTab === 'projects' ? 'default' : 'secondary'}
          className={`flex-1 rounded-full text-sm ${activeTab === 'projects' ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          onClick={() => setActiveTab('projects')}
        >
          پروژه های فعال
        </Button>
      </div>
      
      <Card className="p-4 bg-card border-0 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-foreground">سفارش های فعال</h4>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-muted">
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg bg-muted">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-right font-medium text-muted-foreground">محصول</th>
                <th className="p-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2 text-foreground">{order.product}</td>
                  <td className="p-2 text-center text-muted-foreground">{persianNumbers[index]}</td>
                  <td className="p-2 w-8">
                    <Checkbox className="rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-muted-foreground">صفحه ۱ از ۱۵</span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded bg-muted">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-xs text-muted-foreground">۱/۱۵</span>
            <button className="p-1 rounded bg-muted">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrdersSection;
