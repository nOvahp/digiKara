import { Home, ShoppingBag, BarChart3, GraduationCap, Briefcase } from "lucide-react";

const BottomNavigation = () => {
  const navItems = [
    { icon: Briefcase, label: "پروژه‌ها/رتبه", active: false },
    { icon: BarChart3, label: "گزارش", active: false },
    { icon: Home, label: "صفحه اصلی", active: true },
    { icon: ShoppingBag, label: "فروش", active: false },
    { icon: GraduationCap, label: "آموزش", active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[60px] ${
              item.active ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {item.active ? (
              <div className="bg-primary rounded-full p-2">
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            ) : (
              <item.icon className="w-5 h-5" />
            )}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
