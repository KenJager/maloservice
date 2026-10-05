import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "compact";
  theme?: "light" | "dark";
}

export default function Logo({
  className = "",
  variant = "full",
  theme = "light",
}: LogoProps) {
  const textColor = theme === "dark" ? "text-white" : "text-base-content";
  const subColor = theme === "dark" ? "text-primary" : "text-primary";

  if (variant === "compact") {
    return (
      <Image
        src="/logo-malo-services.png"
        alt="Malo Services SARL"
        width={40}
        height={40}
        className={`object-contain ${className}`}
        priority
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo-malo.svg"
        alt="Malo Services SARL"
        width={48}
        height={48}
        className="w-11 h-11 object-contain flex-shrink-0"
        priority
      />
      <div className="leading-tight">
        <span className={`block font-extrabold tracking-tight text-base ${textColor}`}>
          MALO SERVICES
        </span>
        <span className={`block ${subColor} text-[10px] font-semibold tracking-[0.2em]`}>
          SARL · DEPUIS 1990
        </span>
      </div>
    </div>
  );
}