window.onload = () => {
  window.onresize = () => testWindow()
  testWindow()

  function testWindow() {
    // console.clear()
    update('current', 'current', null, Boobreaks.current())
    update('width', 'width', null, Boobreaks.width())
    update('is1', 'is', '<xs', Boobreaks.is('<xs'))
    update('is2', 'is', '<=xs', Boobreaks.is('<=xs'))
    update('is3', 'is', '>xs', Boobreaks.is('>xs'))
    update('is4', 'is', '>=md', Boobreaks.is('>=md'))
    update('is5', 'is', '<md', Boobreaks.is('<md'))
    update('is6', 'is', 'lg', Boobreaks.is('lg'))
    update('is7', 'is', '<lg', Boobreaks.is('<lg'))
    update('is8', 'is', '<xl', Boobreaks.is('<xl'))
    update('is9', 'is', 'xl', Boobreaks.is('xl'))
    update('is10', 'is', '>xl', Boobreaks.is('>xl'))
    update('is11', 'is', '>=xl', Boobreaks.is('>=xl'))
  }

  function update(name, func, exp, result) {
    const row = document.querySelector(`[name="log"] .${name}`)
    // console.log(`${func}(${exp ? `"${exp}"` : ''}) \t=>\t${result}`)
    row.innerHTML = `
      <td>${func}</td>
      <td class="${typeClass(exp)}">${exp ? he.encode(exp) : 'null'}</td>
      <td class="${typeClass(result)}">${result}</td>
    `
  }

  function typeClass(type) {
    let className = typeof type
    if (type === null) className = 'null'
    if (typeof type === 'boolean') className = type
    return 'typeof ' + className
  }
}
