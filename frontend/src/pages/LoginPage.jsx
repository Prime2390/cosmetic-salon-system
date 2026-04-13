import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import {
  getLoginErrorMessage,
  getLoginSuccessMessage,
} from '../utils/errorMessages';
import './css/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Uzupełnij adres e-mail i hasło.');
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setSuccess(getLoginSuccessMessage());

      setTimeout(() => {
        navigate('/panel');
      }, 1500);
    } catch (err) {
      setError(getLoginErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="py-5 min-vh-100 d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={5} xl={4}>
            <Card className="login-card border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="login-badge">Witaj ponownie</span>
                  <h1 className="login-title">Logowanie</h1>
                  <p className="login-description mb-0">
                    Zaloguj się, aby korzystać z platformy BeautyFinder
                  </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="login-label">Adres e-mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Wpisz adres e-mail"
                      className="login-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="login-label">Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Wpisz hasło"
                      className="login-input"
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      className="login-btn border-0"
                      disabled={loading}
                    >
                      {loading ? 'Logowanie...' : 'Zaloguj się'}
                    </Button>
                  </div>

                  <div className="text-center mb-2">
                    <Link to="/" className="login-link">
                      Wróć na stronę główną
                    </Link>
                  </div>

                  <div className="text-center">
                    <span className="login-text-muted">Nie masz jeszcze konta? </span>
                    <Link to="/rejestracja" className="login-link">
                      Zarejestruj się
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;