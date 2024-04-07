import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LinkFormLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <Skeleton className="h-10 w-full  rounded-lg" />
      <Skeleton height={248} count={2} className="w-full rounded-lg" />
    </div>
  );
}
