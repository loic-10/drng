import React from "react";

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?(): void;
  type: "button" | "submit";
  disabled: boolean;
  className?: string;
}

Button.defaultProps = {
  type: "button",
  disabled: false,
  className: "btn btn-primary",
};
