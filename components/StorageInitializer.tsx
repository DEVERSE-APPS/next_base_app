"use client";

import { useEffect } from "react";
import { initializeStorage } from "@/data/mockData";

export function StorageInitializer() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return null;
}
