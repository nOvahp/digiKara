import { Card } from "@/components/ui/card";

const SmartSuggestions = () => {
  const suggestions = [
    {
      title: "این محصول پرفروش است.",
      description: "«آتاگنی» دستی چوبی» در منطقه شما محبوبیت زیادی پیدا کرده است.",
      icon: "📦",
    },
    {
      title: "دوره آموزشی مناسب",
      description: "دوره «عکاسی ازمحصول» را کمک کند.",
      icon: "📚",
    },
  ];

  return (
    <div className="mx-4 mt-6">
      <h3 className="text-sm font-bold text-foreground mb-3">پیشنهادات هوشمند</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="min-w-[160px] p-3 bg-card border-0 shadow-sm">
            <div className="text-2xl mb-2">{suggestion.icon}</div>
            <h4 className="text-xs font-bold text-foreground mb-1">{suggestion.title}</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{suggestion.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
