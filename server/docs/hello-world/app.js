console.log('hello world')
window.setTimeout(() => {
  const headers = [...document.getElementsByTagName('h1')]
  headers.forEach((el) => {
    el.classList.add('blue');
  })
}, 1000);
