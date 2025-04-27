import { useState } from "react";
import { Play, Clipboard, Check } from "lucide-react";
import { CodeBlockProps } from "../types";
import styles from "./css/CodeBlock.module.css";

const CodeBlock = ({ code }: CodeBlockProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Extract code content and language from markdown-style code blocks
  const codeMatch = code.match(/```(\w+)?\n([\s\S]+?)\n```/);
  const language = codeMatch?.[1] || "javascript";
  const codeContent = codeMatch?.[2] || code;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    /* TODO: send to run code's server*/ 
    // 1. Send the code to a secure backend
    // 2. Execute it in a sandboxed environment
    // 3. Return the result

    setIsRunning(true);

    try {
      if (language === "javascript") {
        setTimeout(() => {
          try {
            // This is just for demo purposes
            const result = new Function(`
              try {
                return String(eval(\`${codeContent}\`));
              } catch (e) {
                return "Error: " + e.message;
              }
            `)();
            setOutput(result);
          } catch (e) {
            setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
          }
          setIsRunning(false);
        }, 500);
      } else {
        setOutput(`Running ${language} code is not supported in this demo`);
        setIsRunning(false);
      }
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
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
