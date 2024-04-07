"use client";

import { logoutUser } from "@/actions/auth";
import { Button } from "./button";

export default function LogoutButton() {
  return (
    <Button
      type="button"
      className="bg-red hover:bg-red/60 md:w-[91px]"
      onClick={(e) => {
        e.preventDefault();
        logoutUser();
      }}
    >
      Log out
    </Button>
  );
}
