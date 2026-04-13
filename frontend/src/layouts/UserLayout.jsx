import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './UserLayout.css';

function UserLayout() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : 'Użytkowniku';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/logowanie');
  };

  return (
    <div className="user-layout">
      <Navbar expand="lg" className="user-navbar">
        <Container className="user-navbar-content">
          <Navbar.Brand as={Link} to="/panel" className="user-logo">
            Beauty<span>Finder</span>
          </Navbar.Brand>

          <div className="user-welcome">
            Witaj, <span>{fullName}</span>
          </div>

          <Nav className="d-flex flex-row align-items-center gap-2">
            <Button variant="light" className="user-notification-btn">
              Powiadomienia
            </Button>

            <Button
              variant="light"
              className="user-logout-btn"
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <main className="user-main">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>

      <footer className="user-footer">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <div className="fw-bold user-footer-logo">
              Beauty<span>Finder</span>
            </div>
            <div className="text-muted small">© 2026 Dominik Bernaś</div>
            <div className="text-muted small">
              Platforma do wyszukiwania salonów kosmetycznych
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default UserLayout;