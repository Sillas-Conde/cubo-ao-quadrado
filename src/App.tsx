import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
// import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { AdvancedHome } from './pages/AdvancedHome'
import { AdvancedF2L } from './pages/AdvancedF2L'
import { AdvancedOLL } from './pages/AdvancedOLL'
import { AdvancedPLL } from './pages/AdvancedPLL'
import { Treinamento } from './pages/Treinamento'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advanced" element={<AdvancedHome />} />
          <Route path="/advancedF2L" element={<AdvancedF2L />} />
          <Route path="/advancedOLL" element={<AdvancedOLL />} />
          <Route path="/advancedPLL" element={<AdvancedPLL />} />
          <Route path="/treinamento" element={<Treinamento />} />
          {/* <Route
            path="/treinamento"
            element={
              <ProtectedRoute>
                <Treinamento />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
