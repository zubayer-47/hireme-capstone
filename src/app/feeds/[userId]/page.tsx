import { Feeds } from "./_components/feeds";
import { Browser } from "@/components/browser/browser";

export default function FeedPage({ params }: { params: { userId: string }}) {
  return (
    <Browser userId={params.userId}>
      <Feeds />
    </Browser>
  )
}
