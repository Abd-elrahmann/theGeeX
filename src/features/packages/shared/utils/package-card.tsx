import type { PackageFeature } from "@/features/packages/constants/packages";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function renderPackageFeatureText(feature: PackageFeature) {
  if (!feature.highlightedWords?.length) {
    return feature.text;
  }

  const pattern = new RegExp(
    `(${feature.highlightedWords.map(escapeRegExp).join("|")})`,
    "gi",
  );
  const segments = feature.text.split(pattern).filter(Boolean);

  return segments.map((segment, index) => {
    const isHighlighted = feature.highlightedWords?.some(
      (word) => word.toLowerCase() === segment.toLowerCase(),
    );

    return isHighlighted ? (
      <span
        key={`${feature.text}-${index}`}
        style={{ color: "var(--color-packages-feature-highlight)" }}
      >
        {segment}
      </span>
    ) : (
      <span key={`${feature.text}-${index}`}>{segment}</span>
    );
  });
}