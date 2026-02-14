import { useEffect, useRef, useState } from 'react'

export interface Algorithm {
  id: number
  name: string
  formula: string[]
  staticImage: string
  dynamicImage: string
}

interface AdvancedAlgProps {
  algFile: string
}

export function AdvancedAlg({ algFile }: AdvancedAlgProps) {
  const [algs, setAlgs] = useState<Algorithm[]>([])
  const [formula, setFormula] = useState('')
  const [setup, setSetup] = useState('')
  const [speed, setSpeed] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(algFile)
      .then((res) => res.json())
      .then((data: Algorithm[]) => setAlgs(data))
      .catch(console.error)
  }, [algFile])

  useEffect(() => {
    if (algs.length > 0 && !formula) {
      const first = algs[0].formula[0]
      setFormula(first)
      invertAlg(first).then(setSetup)
    }
  }, [algs])

  useEffect(() => {
    const el = containerRef.current?.querySelector('twisty-player')
    if (!el || !formula) return
    el.setAttribute('experimental-setup-alg', setup)
    el.setAttribute('alg', formula)
    el.setAttribute('tempo-scale', String(speed))
  }, [formula, setup, speed])

  async function handleClick(item: Algorithm) {
    const f = item.formula[0]
    setFormula(f)
    const s = await invertAlg(f)
    setSetup(s)
  }

  return (
    <>
      <section className="puzzle">
        Speed: 1{' '}
        <input
          type="range"
          min={1}
          max={5}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />{' '}
        5
        <div ref={containerRef}>
          <twisty-player
            className="player"
            experimental-setup-alg={setup}
            alg={formula}
            tempo-scale={String(speed)}
          />
        </div>
      </section>
      <br />
      <br />
      <br />
      <section>
        <div id="methods" className="methods-alg-grid">
          {algs.map((item) => (
            <div key={item.id} className="method" onClick={() => handleClick(item)}>
              <div>
                <h3>{item.name}</h3>
                <div className="dynamic-img">
                  <img className="static" src={item.staticImage} alt="" />
                  <img className="dynamic" src={item.dynamicImage} alt="" />
                </div>
                <h3>{item.formula[0]}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

async function invertAlg(algStr: string): Promise<string> {
  try {
    // Load Alg from cubing.net CDN at runtime
    const mod = await import(
      /* @ts-expect-error - URL import not resolved at build time */
      'https://cdn.cubing.net/v0/js/cubing/alg.js'
    )
    const Alg = mod.Alg as new (s: string) => { invert: () => { toString: () => string } }
    const alg = new Alg(algStr).invert()
    return alg.toString()
  } catch {
    return ''
  }
}
