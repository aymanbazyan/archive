import Link from "antd/es/typography/Link";
import { useState } from "react";

function TextExpander({
  collapsedNumLetters = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  className,
  expanded,
  children = null,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className={`box ${className}`}>
      {isExpanded
        ? children
        : `${children?.slice(0, collapsedNumLetters)}${
            children.length > collapsedNumLetters ? "..." : ""
          }`}
      {children.length > collapsedNumLetters && (
        <>
          <br />
          <Link onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? collapseButtonText : expandButtonText}
          </Link>
        </>
      )}
    </div>
  );
}

export default TextExpander;
