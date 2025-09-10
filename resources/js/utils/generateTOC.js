export function generateTOC(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll("h1, h2, h3");
  const toc = [];

  headings.forEach((el, index) => {
    if (!el.id) {
      el.id = `heading-${index}`;
    }
    toc.push({
      id: el.id,
      text: el.textContent,
      level: el.tagName.toLowerCase(),
    });
  });

  return { html: doc.body.innerHTML, toc };
}
