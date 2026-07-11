import { cn } from "@/lib/cn";

interface PackageCardPriceProps {
  price: string;
  billingCycle: string;
  isContactSalesPackage: boolean;
}

export function PackageCardPrice({
  price,
  billingCycle,
  isContactSalesPackage,
}: PackageCardPriceProps) {
  const hasBillingCycle = Boolean(billingCycle);

  return (
    <div
      className={cn(
        "mt-(--packages-card-price-margin-top) flex min-h-(--packages-card-price-row-min-height) items-end justify-start gap-(--packages-card-price-gap)",
        isContactSalesPackage && "w-full justify-center text-center",
      )}
    >
      <p
        className={cn(
          "whitespace-pre font-poppins text-(length:--packages-card-price-size)",
          "leading-(--packages-card-price-line-height) font-medium tracking-(--packages-card-price-letter-spacing)",
          "text-(--color-packages-card-price)",
          isContactSalesPackage && "text-(length:--packages-card-contact-sales-size)",
        )}
      >
        {price}
      </p>

      {hasBillingCycle ? (
        <p
          className={cn(
            "pb-(--packages-card-billing-padding-bottom) whitespace-pre-wrap wrap-break-word font-poppins",
            "text-(length:--packages-card-billing-size) leading-(--packages-card-billing-line-height)",
            "font-medium tracking-normal text-(--color-packages-card-billing)",
          )}
        >
          {billingCycle}
        </p>
      ) : null}
    </div>
  );
}