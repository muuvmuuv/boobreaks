window.onload = () => {
  const Breakpoint = new Boobreaks({
    /* options */
  })

  test()
  window.onresize = () => test()

  function test() {
    contextLog('current', null, Breakpoint.current())
    contextLog('width', null, Breakpoint.width())
    contextLog('is', '&lt;xs', Breakpoint.is('<xs'))
    contextLog('is', '&gt;xs', Breakpoint.is('>xs'))
    contextLog('is', '&gt;=md', Breakpoint.is('>=md'))
    contextLog('is', 'lg', Breakpoint.is('lg'))
  }

  function contextLog(func, param, result) {
    const log = document.querySelector('.log tbody')
    console.log(func, param, result)
    log.innerHTML =
      `<tr>
        <td>${func}</td>
        <td class="ele">${param}</td>
        <td class="${result ? 'yes' : 'no'}">${result}</td>
      </tr>` + log.innerHTML
  }
}
