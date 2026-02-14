import { useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { LoginModal } from './LoginModal'

export function Header() {
  // const { user, logout } = useAuth()
  // const [showLogin, setShowLogin] = useState(false)
  // const [loginRedirectTo, setLoginRedirectTo] = useState('/treinamento')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = location.state as { openLogin?: boolean; redirectTo?: string } | undefined
    if (state?.openLogin) {
      // setShowLogin(true)
      // setLoginRedirectTo(state.redirectTo ?? '/treinamento')
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

  return (
    <>
      <section className="nav-bar">
        <div className="nav-bar-header">
          <Link to="/" id="nav-bar-logo" className="nav-bar-text">
            Cubo²
          </Link>
          {/* <div id="nav-bar-name" className="nav-bar-text">
            Nome
          </div> */}
        </div>
        <div id="nav-bar-routes">
          <Link to="/" className="nav-bar-text nav-bar-link">Básico</Link>
          <Link to="/advanced" className="nav-bar-text nav-bar-link">Avançado</Link>
          <Link to="/treinamento" className="nav-bar-text nav-bar-link">Treinamento</Link>
          {/* {user ? (
            <Link to="/treinamento" className="nav-bar-text nav-bar-link">Treinamento</Link>
          ) : (
            // <button
            //   type="button"
            //   className="nav-bar-text nav-bar-link nav-bar-btn"
            //   onClick={() => {
            //     setLoginRedirectTo('/treinamento')
            //     setShowLogin(true)
            //   }}
            // >
            //   Treinamento
            // </button>
          )} */}
          {/* {user ? (
            <span className="nav-bar-user">
              <span className="nav-bar-email">{user.email}</span>
              <button
                type="button"
                className="nav-bar-text nav-bar-link nav-bar-btn nav-bar-logout"
                onClick={logout}
              >
                Sair
              </button>
            </span>
          ) : (
            <button
              type="button"
              className="nav-bar-text nav-bar-link nav-bar-btn nav-bar-login"
              onClick={() => {
                setLoginRedirectTo('/treinamento')
                setShowLogin(true)
              }}
            >
              Login / Entrar
            </button>
          )} */}
        </div>
      </section>
      {/* {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          redirectTo={loginRedirectTo}
        />
      )} */}
    </>
  )
}
