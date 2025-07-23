import React from "react";

const Avatar = ({
  src,
  name,
  size = "md",
  className = "",
}) => {
  const getInitials = (name) => {
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClass} ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="bg-primary-600 h-full w-full flex items-center justify-center text-white font-medium">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;