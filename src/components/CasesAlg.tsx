import { useCallback, useEffect, useRef, useState } from 'react'

export interface CaseItem {
  name: string
  formula: string
}

interface CasesData {
  F2L: Record<string, string>[]
  OLL: Record<string, string>[]
  PLL: Record<string, string>[]
}

function parseCases(raw: Record<string, string>[]): CaseItem[] {
  return raw.map((obj) => {
    const [name, formula] = Object.entries(obj)[0] ?? ['', '']
    return { name, formula }
  })
}

interface CasesAlgProps {
  caseKey: 'F2L' | 'OLL' | 'PLL'
}

export function CasesAlg({ caseKey }: CasesAlgProps) {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [formula, setFormula] = useState('')
  const [speed, setSpeed] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}cases.json`)
      .then((res) => res.json())
      .then((data: CasesData) => {
        const list = data[caseKey] ?? []
        setCases(parseCases(list))
      })
      .catch(console.error)
  }, [caseKey])

  // So playback SOLVES the cube: cube starts scrambled (setup = case formula), we play inverse (alg) to solve it
  const [setupAlg, setSetupAlg] = useState('')  // initial state = formula(scramble)
  // const [playAlg, setPlayAlg] = useState('')   // alg to play = inverse(formula) → solves the cube

  useEffect(() => {
    if (cases.length > 0 && !formula) {
      const first = cases[0]
      setSelectedCase(first)
      setFormula(first.formula)
      setSetupAlg(first.formula)
      //invertAlg(first.formula).then(setPlayAlg)
    }
  }, [cases])

  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null)

  const handleClick = useCallback((item: CaseItem) => {
    setSelectedCase(item)
    setFormula(item.formula)
    setSetupAlg(item.formula)
    //invertAlg(item.formula).then(setPlayAlg)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <section className="puzzle">
        <div className="puzzle-controls">
          Speed: 1{' '}
          <input
            type="range"
            min={1}
            max={5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />{' '}
          5
        </div>
        <div className="puzzle-view">
          <div ref={containerRef} className="puzzle-player-wrap">
            {setupAlg ? (
              <twisty-player
                //key={`${setupAlg}-${playAlg}`}
                className="player"
                //experimental-setup-alg={setupAlg}
                experimental-setup-anchor="end"
                alg={setupAlg}
                experimental-stickering={caseKey}
                tempo-scale={String(speed)}
              />
            ) : (
              <div className="puzzle-player-loading">Carregando…</div>
            )}
          </div>
          <div className="puzzle-formula-wrap">
            {selectedCase ? (
              <>
                <h3 className="puzzle-formula-title">{selectedCase.name}</h3>
                <p className="puzzle-formula-text">{selectedCase.formula}</p>
              </>
            ) : (
              <p className="puzzle-formula-placeholder">Clique em um caso para ver a fórmula</p>
            )}
          </div>
        </div>
      </section>
      <section className="cases-section">
        <div id="methods" className="methods-alg-grid">
          {cases.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={`method method-case ${selectedCase?.name === item.name ? 'method-case-selected' : ''}`}
              onClick={() => handleClick(item)}
            >
              {/* <h3>{item.name}</h3> */}
              <h3>Caso</h3>
              { caseKey === 'PLL' || caseKey === 'OLL' ? (
                <twisty-player
                    style={{ width: '100px', height: '100px' }}
                    alg={item.formula}
                    experimental-setup-anchor="end"
                    visualization="experimental-2D-LL"
                    background="none"
                    control-panel="none"
                  ></twisty-player>
              ) : null}
              { caseKey === 'F2L' ? (
                <twisty-player
                    style={{ width: '150px', height: '150px' }}
                    alg={item.formula}
                    experimental-setup-anchor="end"
                    experimental-drag-input="none"
                    experimental-stickering="F2L"
                    background="none"
                    control-panel="none"
                  ></twisty-player>
              ) : null}
              <p className="case-formula">{item.formula}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// async function invertAlg(algStr: string): Promise<string> {
//   try {
//     const mod = await import(
//       /* @ts-expect-error - URL import not resolved at build time */
//       'https://cdn.cubing.net/v0/js/cubing/alg.js'
//     )
//     const Alg = mod.Alg as new (s: string) => { invert: () => { toString: () => string } }
//     const alg = new Alg(algStr).invert()
//     return alg.toString()
//   } catch {
//     return ''
//   }
// }
