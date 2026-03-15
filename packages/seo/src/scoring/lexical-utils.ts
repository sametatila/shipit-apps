// Lexical serialized state utilities
// Walks the Lexical JSON tree to extract content for SEO analysis

interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  tag?: string;
  url?: string;
  altText?: string;
  src?: string;
  value?: { alt?: string; url?: string };
  [key: string]: unknown;
}

interface SerializedEditorState {
  root: LexicalNode;
}

function walkNodes(
  root: LexicalNode,
  visitor: (node: LexicalNode) => void,
): void {
  visitor(root);
  if (root.children) {
    for (const child of root.children) {
      walkNodes(child, visitor);
    }
  }
}

export function extractTextFromLexical(state: SerializedEditorState): string {
  const parts: string[] = [];

  walkNodes(state.root, (node) => {
    if (node.type === "text" && node.text) {
      parts.push(node.text);
    } else if (node.type === "linebreak") {
      parts.push("\n");
    } else if (
      node.type === "paragraph" ||
      node.type === "heading" ||
      node.type === "listitem"
    ) {
      parts.push("\n");
    }
  });

  return parts.join("").trim();
}

export function extractHeadingsFromLexical(
  state: SerializedEditorState,
): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = [];

  walkNodes(state.root, (node) => {
    if (node.type === "heading" && node.tag) {
      const level = parseInt(node.tag.replace("h", ""), 10);
      const text = extractTextFromNode(node);
      if (text) headings.push({ level, text });
    }
  });

  return headings;
}

export function extractLinksFromLexical(
  state: SerializedEditorState,
  siteUrl?: string,
): { url: string; text: string; isInternal: boolean }[] {
  const links: { url: string; text: string; isInternal: boolean }[] = [];

  walkNodes(state.root, (node) => {
    if ((node.type === "link" || node.type === "autolink") && node.url) {
      const text = extractTextFromNode(node);
      const isInternal = siteUrl
        ? node.url.startsWith(siteUrl) || node.url.startsWith("/")
        : node.url.startsWith("/");
      links.push({ url: node.url, text, isInternal });
    }
  });

  return links;
}

export function extractImagesFromLexical(
  state: SerializedEditorState,
): { src: string; altText: string | null }[] {
  const images: { src: string; altText: string | null }[] = [];

  walkNodes(state.root, (node) => {
    if (node.type === "upload" || node.type === "image") {
      const src =
        node.src || (node.value as { url?: string })?.url || "";
      const altText =
        (node.altText as string) ||
        (node.value as { alt?: string })?.alt ||
        null;
      if (src) images.push({ src, altText });
    }
  });

  return images;
}

export function countParagraphs(state: SerializedEditorState): number {
  let count = 0;
  walkNodes(state.root, (node) => {
    if (node.type === "paragraph") {
      const text = extractTextFromNode(node);
      if (text.trim()) count++;
    }
  });
  return count;
}

function extractTextFromNode(node: LexicalNode): string {
  const parts: string[] = [];
  walkNodes(node, (n) => {
    if (n.type === "text" && n.text) parts.push(n.text);
  });
  return parts.join("");
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function countSentences(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.length;
}
