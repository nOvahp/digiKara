import featureCard1 from "../../public/featureCard1.png";
import featureCard2 from "../../public/featureCard2.png";
import featureCard3 from "../../public/featureCard3.png";

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: any;
}

export const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: "خدمات باکیفیت و به‌صرفه",
    description:
      "خریداران به محصولات و خدمات باکیفیت و مقرون‌به‌صرفه دسترسی پیدا می‌کنند.",
    image: featureCard1,
  },
  {
    id: 2,
    title: "داده‌های شفاف",
    description: "مدیران آموزشی با داده‌های شفاف، تصمیمات دقیق تری می گیرند.",
    image: featureCard2,
  },
  {
    id: 3,
    title: "نیروی کار ماهر و با تجربه",
    description:
      "کارفرمایان به نیروی کار ماهر و آموزش‌دیده دسترسی پیدا می‌کنند",
    image: featureCard3,
  },
  {
    id: 4,
    title: "فروشگاه اختصاصی",
    description:
      "هنرستان‌ها می‌توانند درآمدزایی کنند و فرآیندهای مالی و آموزشی خود را به‌صورت شفاف مدیریت نمایند.",
    image: featureCard1,
  },
  {
    id: 5,
    title: "پلتفرم فروش محصولات",
    description: "هنرجویان میتوانند محصولات و خدمات خوددرا به فروش برسانند.",
    image: featureCard1,
  },
  {
    id: 6,
    title: "صندوق‌های مالی حمایتی",
    description:
      "نهادهای مالی می‌توانند از پروژه‌های تولیدی هنرستان‌ها حمایت کنند.",
    image: featureCard1,
  },
  {
    id: 7,
    title: "بخش لجستیک",
    description:
      "شرکت‌های حمل‌ونقل و توزیع می‌توانند در این سیستم به حمل و نقل محصولات کمک کنند.",
    image: featureCard1,
  },
];
