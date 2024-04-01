"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/actions/auth";

export default function DemoInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon />
      </PopoverTrigger>
      <PopoverContent>
        <section>
          <h2 className="heading-s">Demo account:</h2>
          <p>Email: demo@email.com</p>
          <p>Password: 12345678</p>
        </section>
        <footer>
          <Button
            className="m-0 block p-0 text-left text-purple"
            onClick={async () => {
              await loginUser("demo@email.com", "12345678");
            }}
            title="Login to the demo account"
            variant={"link"}
          >
            or directly login here
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
