export const customHTMLParser = (node: string) => {
    if (!node || typeof node !== 'string') {
        console.error('Invalid input. Please provide a non-empty string.');
        return [];
    }
    const regex = /<ul class="([^"]+)">\s*<li><p>([^<]+)<\/p><\/li>\s*<\/ul>/g;
    const matches = Array.from(node.matchAll(regex));
    const textArray = matches.map(match => match[2]?.trim()).filter(Boolean);
  
    return textArray;
  };
  