"use client";

import * as React from "react";
import { BoardGrid } from "@/components/BoardGrid";

export default function DashboardPage() {
  return (
    <div data-dev-id="03wl3xk" className="py-6">
      <React.Suspense data-dev-id="03wl36v" fallback={null}>
        <BoardGrid data-dev-id="03wl36u" />
      </React.Suspense>
    </div>
  );
}

