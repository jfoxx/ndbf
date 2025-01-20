export default function decorate(block) {
  const largeDiv = document.createElement('div');
  largeDiv.className = 'large';
  const smallDiv = document.createElement('div');
  smallDiv.className = 'small';
  [...block.children].forEach((row) => {
    const classRow = row.querySelector('div:first-of-type');
    const classes = classRow.textContent.toLowerCase();
    row.className = classes;
    classRow.remove();
    if (classes.includes('large')) {
      largeDiv.append(row);
      row.classList.remove('large');
    } else {
      smallDiv.append(row);
      row.classList.remove('small');
    }
  });

  block.append(largeDiv, smallDiv);
}
