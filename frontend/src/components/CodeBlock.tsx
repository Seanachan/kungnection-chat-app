import { useState } from "react";
import { Play, Clipboard, Check } from "lucide-react";
import { CodeBlockProps } from "../types";
import styles from "../css/CodeBlock.module.css";
import { BASE_URL } from "../config";

const CodeBlock = ({ code }: CodeBlockProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // const token;
  // Extract code content and language from markdown-style code blocks
  const codeMatch = code.match(/```(\w+)?\n([\s\S]+?)\n```/);
  const language = codeMatch?.[1] || "javascript";
  const codeContent = codeMatch?.[2] || code;
  const judge0ApiSubmitAddress = `${BASE_URL}/api/judge0/submit`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    // 1. Send the code to a secure backend
    // 2. Execute it in a sandboxed environment
    // 3. Return the result

    setIsRunning(true);
    try {
      let languageId = 0;
      switch (language) {
        case "python":
          languageId = 38;
          break;
        case "javascript":
          languageId = 63;
          break;
        case "c":
          languageId = 110;
          break;
        case "cpp":
          languageId = 76;
          break;
        case "java":
          languageId = 62;
          break;
        default:
          languageId = -1;
          break;
      }
      if (languageId === -1) {
        setOutput("Language Not Supported");
      } else {
        const response = await fetch(judge0ApiSubmitAddress, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceCode: codeContent,
            languageId: languageId,
          }),
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        setOutput(
          result.stdout ||
            result.stderr ||
            result.compile_output ||
            result.message ||
            "No output",
        );
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setOutput(message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.codeHeader}>
        <span className={styles.languageLabel}>{language}</span>
        <div className={styles.actions}>
          <button
            onClick={copyToClipboard}
            className={styles.actionButton}
            aria-label="Copy code"
          >
            {copied ? <Check size={16} /> : <Clipboard size={16} />}
          </button>
          <button
            onClick={runCode}
            className={styles.actionButton}
            disabled={isRunning}
            aria-label="Run code"
          >
            <Play size={16} />
          </button>
        </div>
      </div>

      <pre className={styles.codeContent}>
        <code>{codeContent}</code>
      </pre>

      {output !== null && (
        <div className={styles.output}>
          <h4 className={styles.outputHeader}>Output:</h4>
          <pre className={styles.outputContent}>{output}</pre>
        </div>
      )}

      {isRunning && (
        <div className={styles.loading}>
          <p className={styles.loadingText}>Running code...</p>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
