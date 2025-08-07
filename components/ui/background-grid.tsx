"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-background",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff20,transparent)]" />
      {children}
    </div>
  );
}

export function BackgroundGridSmall({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-background",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />
      {children}
    </div>
  );
}
