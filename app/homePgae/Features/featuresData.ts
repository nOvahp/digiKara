import featureCard1 from "../../../public/man paid online at a store.png";
import featureCard2 from "../../../public/man works behind the technological displays.png";
import featureCard3 from "../../../public/man sends statistics from his phone.png";

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: any;
}

export const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: " آموزش مهارت های بازار کار",
    description:
      "مهارت های کاربردی، موثر و مورد نیاز بازار کار به دانش آموزان آموزش داده می شود.",
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
      "مدارس‌ها فرآیندهای مالی و آموزشی خود را به‌صورت شفاف مدیریت نمایند.",
    image: featureCard1,
  },
  {
    id: 5,
    title: "پلتفرم فروش محصولات",
    description: "دانش آموزان میتوانند محصولات و خدمات خوددرا به فروش برسانند.",
    image: featureCard1,
  },
  {
    id: 6,
    title: "صندوق‌های مالی حمایتی",
    description:
      "نهادهای مالی می‌توانند از پروژه‌های تولیدی مدارس‌ها حمایت کنند.",
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
