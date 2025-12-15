import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarImage src="/placeholder.svg" alt="پروفایل" />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">ا</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
        </div>
      </div>
      
      <div className="flex-1 text-right mr-3">
        <div className="flex items-center gap-2 justify-end">
          <Badge className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full">
            حمایت شده
          </Badge>
          <h2 className="text-sm font-bold text-foreground">امیرحسین محمحدی</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">طراح سطح ۲گرافیک - مدرسه آلبرز</p>
      </div>
      
      <button className="relative p-2">
        <Bell className="w-6 h-6 text-foreground" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
      </button>
    </div>
  );
};

export default Header;
