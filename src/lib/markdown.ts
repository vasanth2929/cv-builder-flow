import { marked } from 'marked';

export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  // Configure marked to be more lenient
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  
  return marked.parse(markdown) as string;
}

export function markdownToPlainText(markdown: string): string {
  if (!markdown) return '';
  
  // Remove markdown syntax for PDF
  return markdown
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n+/g, '\n') // Normalize newlines
    .trim();
}