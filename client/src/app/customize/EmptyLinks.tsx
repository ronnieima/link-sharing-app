import { IllustrationEmpty } from "@/components/ui/Icons";
import React from "react";

export default function EmptyLinks() {
  return (
    <div>
      <IllustrationEmpty />
      <h2 className="text-heading-m">Let’s get you started</h2>
      <p className="text-body-m">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
}
