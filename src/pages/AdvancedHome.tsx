import { Link } from 'react-router-dom'

const methods = [
  {
    title: 'Cruz',
    href: '/',
    staticImg: '/static/CROSS/Cruz.png',
    dynamicImg: '/static/CROSS/Cruz.gif',
  },
  {
    title: 'Finish 2 Layers (F2L)',
    href: '/advancedF2L',
    staticImg: '/static/F2L/static/Fish.png',
    dynamicImg: '/static/F2L/dynamic/Fish.gif',
  },
  {
    title: 'OLL (Orientation Last Layer)',
    href: '/advancedOLL',
    staticImg: '/static/OLL/static/sune_invertido.png',
    dynamicImg: '/static/OLL/dynamic/sune_full.gif',
  },
  {
    title: 'PLL (Permutation Last Layer)',
    href: '/advancedPLL',
    staticImg: '/static/PLL/static/PLL-T.png',
    dynamicImg: '/static/PLL/dynamic/PLL-T.gif',
  },
]

export function AdvancedHome() {
  return (
    <>
      <div id="main-img">
        <div id="img-div" />
        <h1>Método Avançado</h1>
      </div>
      <h2>Níveis</h2>
      <div id="methods" className="methods-advanced">
        {methods.map((method) => (
          <div key={method.title} className="method">
            <Link to={method.href}>
              <div className="dynamic-img">
                <img className="static" src={method.staticImg} alt="" />
                <img className="dynamic" src={method.dynamicImg} alt="" />
              </div>
            </Link>
            <h3>{method.title}</h3>
          </div>
        ))}
      </div>
    </>
  )
}
