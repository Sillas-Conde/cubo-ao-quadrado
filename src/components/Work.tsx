import { Link } from 'react-router-dom'

const methods = [
  {
    title: 'Método Básico',
    href: '/',
    staticImg: '/static/OLL/static/sune_invertido.png',
    dynamicImg: '/static/OLL/dynamic/sune_full.gif',
  },
  {
    title: 'Método Avançado',
    href: '/advanced',
    staticImg: '/static/OLL/static/sune_invertido.png',
    dynamicImg: '/static/OLL/dynamic/sune_full.gif',
  },
  {
    title: 'Treinamento',
    href: '/treinamento',
    staticImg: '/static/OLL/static/sune_invertido.png',
    dynamicImg: '/static/OLL/dynamic/sune_full.gif',
  },
]

export function Work() {
  return (
    <>
      <h2>Níveis</h2>
      <div id="methods">
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
