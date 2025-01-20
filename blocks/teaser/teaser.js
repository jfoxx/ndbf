export default function decorate(block) {
  const main = block.querySelector('div');
  const classes = ['image', 'text'];
  classes.forEach((c, i) => {
    const section = main.children[i];
    if (section) section.classList.add(`${c}`);
  });
  const text = block.querySelector('.text');
  const paragraphs = text.querySelectorAll('p');
  const hs = text.querySelectorAll('h2, h3');
  const headlines = document.createElement('span');
  headlines.className = 'headlines';
  const textOverlay = document.createElement('span');
  textOverlay.className = 'text-overlay';
  paragraphs.forEach((i) => {
    textOverlay.append(i);
  });
  hs.forEach((i) => {
    const span = document.createElement('span');
    const htext = i.textContent;
    span.innerText = htext;
    i.textContent = '';
    i.append(span);
    headlines.append(i);
  });
  text.append(headlines, textOverlay);
}
