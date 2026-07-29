export function isIosSafari(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const { userAgent, vendor, platform, maxTouchPoints } = window.navigator;
  const isAppleDevice = /iP(ad|hone|od)/i.test(userAgent);
  const isIpadOs = platform === "MacIntel" && maxTouchPoints > 1;
  const isWebKitSafari = /Safari/i.test(userAgent) && /Apple/i.test(vendor);
  const isOtherIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

  return (isAppleDevice || isIpadOs) && isWebKitSafari && !isOtherIosBrowser;
}