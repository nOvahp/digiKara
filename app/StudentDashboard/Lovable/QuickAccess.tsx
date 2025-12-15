import { Plus, Edit, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickAccess = () => {
  const actions = [
    { icon: Plus, label: "افزودن محصول جدید" },
    { icon: Edit, label: "ویرایش اطلاعات غرفه" },
    { icon: UserCog, label: "به روزرسانی پروفایل مهارت" },
  ];

  return (
    <div className="mx-4 mt-6">
      <h3 className="text-sm font-bold text-foreground mb-3">دسترسی سریع</h3>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="default"
            className="w-full justify-between h-12 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm"
          >
            <action.icon className="w-5 h-5" />
            <span className="flex-1 text-right mr-3">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
