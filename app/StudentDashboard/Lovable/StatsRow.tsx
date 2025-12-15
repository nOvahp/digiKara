import { Card } from "@/components/ui/card";

const StatsRow = () => {
  const stats = [
    { value: "۳", label: "سفارشات جدید" },
    { value: "۲۳", label: "محصولات فعال" },
    { value: "فعال", label: "وضعیت غرفه", isActive: true },
  ];

  return (
    <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="p-3 text-center bg-card shadow-sm border-0">
          <p className={`text-xl font-bold ${stat.isActive ? 'text-accent' : 'text-foreground'}`}>
            {stat.value}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};

export default StatsRow;

