import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  id,
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal>
          <p
            className={`mb-5 text-[0.7rem] font-bold tracking-[0.3em] uppercase ${
              dark ? "text-byx-mid" : "text-byx-dark"
            }`}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          id={id}
          className="font-display text-[clamp(2.25rem,7vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] uppercase"
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
              dark ? "text-byx-mid" : "text-byx-dark"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
