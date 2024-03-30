"use client";
import { Button } from "@/components/ui/button";
import { useLinkStore } from "@/stores/useLinkStore";
import EmptyLinks from "./EmptyLinks";
import LinkForm from "./LinkForm";

export default function Links() {
  const counter = useLinkStore((state) => state.counter);
  const incCounter = useLinkStore((state) => state.incCounter);

  return (
    <>
      <Button
        onClick={incCounter}
        variant={"outline"}
        className="heading-s  mb-8 text-purple"
      >
        + Add new link
      </Button>

      {counter === 0 ? <EmptyLinks /> : <LinkForm />}
    </>
  );
}
