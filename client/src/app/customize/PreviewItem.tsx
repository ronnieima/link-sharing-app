import { Button } from "@/components/ui/button";
import { Platform, useLinkStore } from "@/stores/useLinkStore";

type Props = {
  platform: Platform;
  index: number;
};

export default function PreviewItem({ platform, index }: Props) {
  const handleRemoveLink = useLinkStore((state) => state.handleRemoveLink);
  return (
    <div>
      <p>#{index + 1}</p>
      {platform.platform}
      <p>{platform.link}</p>
      <Button variant={"link"} onClick={() => handleRemoveLink(index)}>
        Remove link
      </Button>
    </div>
  );
}
