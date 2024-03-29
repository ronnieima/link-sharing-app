import { useLinkStore } from "@/stores/useLinkStore";
import PreviewItem from "./PreviewItem";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function LinkForm() {
  const counter = useLinkStore((state) => state.counter);

  const form = useForm();
  return (
    <Form {...form}>
      <form className="flex flex-col gap-8 rounded-lg  p-5 text-center">
        {Array.from(Array(counter).keys()).map((number) => {
          return <PreviewItem key={number} index={number} />;
        })}
      </form>
    </Form>
  );
}
