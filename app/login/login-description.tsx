import { Button } from '@/components/ui/button';

interface LoginDescriptionProps {
  title?: string;
  description?: string;
  onNext?: () => void;
  onSkip?: () => void;
  buttonText?: string;
}

export function LoginDescription({
  title,
  description,
  onNext,
  onSkip,
  buttonText,
}: LoginDescriptionProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center p-4">
      <h2 className="text-[25px] font-bold text-foreground">{title}</h2>
      <p className="text-[16px] text-[#6C7278] font-medium px-4">{description}</p>

      <div className="flex w-full items-center justify-between gap-2 mt-8">
        <Button
          variant="ghost"
          onClick={onSkip}
          className="text-[#4A4A4A] bg-[#F3F6FC] px-16 py-8 text-lg font-bold "
        >
          رد شدن
        </Button>
        <Button
          variant="destructive"
          onClick={onNext}
          className=" px-16 bg-[#FDD00A] hover:bg-zinc-800 text-lg text-black font-bold py-8"
        >
          {buttonText || 'بعدی'}
        </Button>
      </div>
    </div>
  );
}
