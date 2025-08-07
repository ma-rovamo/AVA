'use client';

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RememberDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true); // ✅ Open by default

  const handleYes = () => {
    setOpen(false);
    router.replace("/transactions");
  };

  return (
 <h1>hel</h1>
  );
}
