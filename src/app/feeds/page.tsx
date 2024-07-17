import type { Metadata } from "next";
import { Feeds } from "./_components/feeds";
import { Browser } from "@/components/browser/browser";

export const metadata: Metadata = {
  title: 'Hireme | Community Feeds',
  description: 'Connect with a network of job seekers, share experiences, and learn valuable tips to land your next interview.',
}

export default function FeedPage() {
  return (
    <Browser >
      <Feeds />
    </Browser>
  )
}
