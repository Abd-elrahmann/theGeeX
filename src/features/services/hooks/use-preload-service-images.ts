"use client";

import { useEffect } from "react";

import { type Service } from "@/features/services/constants/services";

export function usePreloadServiceImages(services: Service[]): void {
  useEffect(() => {
    services.forEach(({ image }) => {
      const img = new window.Image();
      img.src = image;
    });
  }, [services]);
}
