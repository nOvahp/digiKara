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

      <div className="flex w-full items-center justify-center mt-8">
        <Button
          variant="destructive"
          onClick={onNext}
          className="w-full bg-[#FDD00A] hover:bg-zinc-800 text-lg text-black font-bold py-8 rounded-xl"
        >
          {buttonText || 'بعدی'}
        </Button>
      </div>
    </div>
  );
}
