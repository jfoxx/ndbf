export default function decorate(block) {
  [...block.children].forEach((row) => {
    const link = row.querySelector('.button');
    const icon = row.querySelector('.icon');
    link.prepend(icon);
    link.className = '';
    row.textContent = '';
    row.append(link);
  });
}
