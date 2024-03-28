import { useLinkStore } from "@/stores/useLinkStore";
import PreviewItem from "./PreviewItem";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function LinkForm() {
  const preview = useLinkStore((state) => state.preview);

  const form = useForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8 rounded-lg  p-5 text-center">
        {preview.map((platform, index) => (
          <PreviewItem key={platform.value} platform={platform} index={index} />
        ))}
      </form>
    </Form>
  );
}
