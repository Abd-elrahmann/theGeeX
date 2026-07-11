import { bookAMeetingContent } from "@/features/book-a-meeting/constants/book-a-meeting";

export function BookAMeetingPage() {
  const [titleFirstLine, titleSecondLine] = bookAMeetingContent.title.split("\n");
  const titleSecondLinePrefix = titleSecondLine.slice(0, -2);
  const titleSecondLineSuffix = titleSecondLine.slice(-1);

  return (
    <main
      className="relative z-(--page-main-z-index) min-h-svh pt-(--book-a-meeting-page-top-padding)"
      style={{
        backgroundColor: "var(--color-book-a-meeting-page-bg)",
      }}
    >
      <section className="px-(--book-a-meeting-padding-x) pb-(--book-a-meeting-padding-bottom)">
        <div className="mx-auto flex w-full max-w-(--book-a-meeting-container-max-width) flex-col gap-(--book-a-meeting-section-gap)">
          <div className="flex w-full flex-col items-center gap-(--book-a-meeting-copy-gap) pt-6 text-center md:items-start md:pt-10 md:text-left">
            <h1
              className="font-poppins text-(length:--book-a-meeting-title-size) leading-(--book-a-meeting-title-line-height) font-bold tracking-(--book-a-meeting-title-letter-spacing) whitespace-pre text-center md:text-left"
              style={{
                width: "auto",
                height: "auto",
                color: "var(--color-book-a-meeting-title)",
                fontFeatureSettings: "normal",
              }}
            >
              <span className="block">{titleFirstLine}</span>
              <span className="block">
                <span>{"what's "}</span>
                <span className="text-(--color-book-a-meeting-title-accent)">
                  {titleSecondLinePrefix.replace("what's ", "")}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32.891 34.524"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-[0.03em] inline-block h-(--book-a-meeting-title-icon-height) w-auto align-[-0.02em]"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      d="M27.582 0.001C30.857-0.052 33.842 2.994 32.605 6.56C31.442 9.909 26.565 15.385 21.434 13.848C19.455 13.255 17.697 12.115 16.368 10.847C17.37 10.334 18.23 8.998 18.923 8.146C19.737 7.144 20.605 6.197 21.434 5.181C22.635 3.708 23.722 1.756 25.33 0.687C25.994 0.246 26.775 0.132 27.582 0.001ZM4.505 0.215C5.825 0.204 6.768 0.413 7.579 0.901C8.86 1.672 9.945 3.101 10.87 4.245C12.594 6.379 14.853 8.341 16.238 10.761C15.506 10.624 14.658 10.26 13.684 10.418C10.473 10.94 8.899 13.338 9.874 16.977L9.701 16.977C9.051 16.334 8.402 15.691 7.752 15.048C5.44 12.759 2.649 10.534 0.825 7.803C-0.512 5.802 0.077 3.319 1.345 1.758C2.14 0.779 3.172 0.314 4.505 0.215ZM9.874 17.192C11.401 18.303 13.913 21.648 13.208 24.609C12.594 27.187 11.342 29.289 10.004 31.167C8.746 32.933 6.563 35.462 3.25 34.169C1.015 33.296-0.979 30.325 0.522 27.395C1.675 25.145 4.893 21.877 6.843 20.322C7.883 19.492 9.246 18.398 9.874 17.192ZM26.5 22.765C30.793 22.699 34.192 26.437 32.344 30.696C31.518 32.602 29.882 33.823 27.495 34.126C23.556 34.624 20.284 30.308 21.607 26.58C22.157 25.03 23.388 23.753 24.898 23.151C25.403 22.926 25.946 22.795 26.5 22.765Z"
                      fill="var(--color-book-a-meeting-title-accent)"
                    />
                  </svg>
                  {titleSecondLineSuffix}
                </span>
              </span>
            </h1>

            <p
              className="w-full max-w-(--book-a-meeting-copy-max-width) whitespace-pre-wrap text-center font-poppins text-(length:--book-a-meeting-description-size) leading-(--book-a-meeting-description-line-height) font-normal tracking-normal text-(--color-book-a-meeting-description) md:text-left lg:max-w-none"
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                fontFeatureSettings: "normal",
              }}
            >
              {bookAMeetingContent.description}
            </p>
          </div>

          <div
            className="rounded-(--book-a-meeting-embed-radius) border"
            style={{
              borderColor: "var(--color-book-a-meeting-embed-border)",
              backgroundColor: "var(--color-book-a-meeting-embed-surface)",
              boxShadow: "var(--book-a-meeting-embed-shadow)",
              height: "var(--book-a-meeting-embed-height)",
              overflow: "visible",
            }}
          >
            <iframe
              title="Book a meeting"
              src={bookAMeetingContent.embedUrl}
              className="block w-full border-0"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                zoom: 1,
                transformOrigin: "top center",
                touchAction: "auto",
                WebkitOverflowScrolling: "touch",
              }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write"
            />
          </div>
        </div>
      </section>
    </main>
  );
}