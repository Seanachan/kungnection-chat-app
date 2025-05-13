import  { JSX } from "react";
import { SpoilerSpan } from "./Spoiler";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parseMarkdown = (text: string): (string | JSX.Element)[] => {
    // Escape markdown special characters using temp tokens
    const ESCAPE_MAP: [RegExp, string][] = [
      [/\\\*/g, "ESC_ASTERISK"],
      [/\\_/g, "ESC_UNDERSCORE"],
      [/\\~/g, "ESC_TILDE"],
      [/\\\|/g, "ESC_PIPE"],
      [/\\`/g, "ESC_BACKTICK"],
      [/\\\+/g, "ESC_PLUS"],
    ];
    ESCAPE_MAP.forEach(([regex, replacement]) => {
      text = text.replace(regex, replacement);
    });

    // Split spoilers into separate JSX elements
    const parts: (string | JSX.Element)[] = [];
    const spoilerRegex = /\|\|([^|]+)\|\|/g;
    let lastIndex = 0;
    let match;
    while ((match = spoilerRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(<SpoilerSpan key={match.index}>{match[1]}</SpoilerSpan>);
      lastIndex = spoilerRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Parse formatting for plain string segments
    const formatted = parts.flatMap((part ) => {
      if (typeof part !== "string") return part;

      let t = part;

      t = t.replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-700 px-1 rounded text-sm">$1</code>'
      );
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
      t = t.replace(/(?<!_)_([^_]+)_(?!_)/g, "<u>$1</u>");
      t = t.replace(/~~([^~]+)~~/g, "<del>$1</del>");

      // Unescape
      const UNESCAPE_MAP: [string, string][] = [
        ["ESC_ASTERISK", "*"],
        ["ESC_UNDERSCORE", "_"],
        ["ESC_TILDE", "~"],
        ["ESC_PIPE", "|"],
        ["ESC_BACKTICK", "`"],
        ["ESC_PLUS", "+"],
      ];
      /*The code loops through each pair in UNESCAPE_MAP using forEach
      For each pair, it:
      
      Creates a new RegExp object with the token string as the pattern
      Adds the "g" flag to make the replacement global (replace all instances)
      Replaces all occurrences of that token in the string t with the corresponding character
       */
      UNESCAPE_MAP.forEach(([token, char]) => {
        t = t.replace(new RegExp(token, "g"), char);
      });

      return <span dangerouslySetInnerHTML={{ __html: t }} />;
    });

    return formatted;
  };

  return <p className="text-gray-300">{parseMarkdown(content)}</p>;
}
