export function isIosSafari(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const { userAgent, vendor, platform, maxTouchPoints } = window.navigator;
  const isAppleDevice = /iP(ad|hone|od)/i.test(userAgent);
  const isIpadOs = platform === "MacIntel" && maxTouchPoints > 1;
  const isAppleWebKit = /AppleWebKit/i.test(userAgent) && /Apple/i.test(vendor);

  return (isAppleDevice || isIpadOs) && isAppleWebKit;
}

export function isIOSDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const { userAgent, platform, maxTouchPoints } = window.navigator;

  return /iPad|iPhone|iPod/i.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
}