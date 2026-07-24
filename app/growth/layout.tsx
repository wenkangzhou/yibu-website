import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "周翌步的成长记录 | Yibu's Growth Record",
  description: "基于中班上学期与下学期评估报告的家庭内部成长记录。A private family growth record based on the K1 first and second semester assessment reports.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
