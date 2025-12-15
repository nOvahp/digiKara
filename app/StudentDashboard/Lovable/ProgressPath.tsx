import { Card } from "@/components/ui/card";
import { ChartBar, Instagram, Award, Star } from "lucide-react";

const ProgressPath = () => {
  const achievements = [
    { icon: ChartBar, label: "اولین فروش", active: true },
    { icon: Instagram, label: "امتیازبالا", active: true },
    { icon: Award, label: "۱۰۰سفارش", active: false },
    { icon: Star, label: "فروشنده برتر", active: false },
  ];

  return (
    <div className="mx-4 mt-6">
      <h3 className="text-sm font-bold text-foreground mb-3">مسیر پیشرفت شما</h3>
      <Card className="p-4 bg-card border-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">امتیاز: ۵۰/۷۰٪</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">سطح ۵ : فروشنده ماجر</span>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg">🏆</span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full mb-4">
          <div className="h-full w-[70%] bg-primary rounded-full"></div>
        </div>
        
        <div className="flex justify-between">
          {achievements.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.active ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressPath;
