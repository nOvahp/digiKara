const PerformanceBanner = () => {
  return (
    <div className="mx-4 mt-2">
      <p className="text-xs text-muted-foreground text-left mb-2">۱۰ مهر ۱۴۰۴</p>
      <div className="gradient-primary rounded-2xl p-4 flex items-center justify-between">
        <div className="w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="white" fillOpacity="0.2"/>
            <path d="M32 8 L36 20 L48 20 L38 28 L42 40 L32 32 L22 40 L26 28 L16 20 L28 20 Z" fill="white"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-primary-foreground">عملکرد این ماهت عالیه!</h3>
      </div>
    </div>
  );
};

export default PerformanceBanner;
