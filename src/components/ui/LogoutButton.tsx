"use client";

import { logoutUser } from "@/app/actions";
import { Button } from "./button";

export default function LogoutButton() {
  return (
    <Button className="bg-red hover:bg-red/60" onClick={() => logoutUser()}>
      Log out
    </Button>
  );
}
