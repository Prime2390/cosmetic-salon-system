import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import './css/RegisterPage.css';
import {
  getRegisterErrorMessage,
  getRegisterSuccessMessage,
} from '../utils/errorMessages';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Uzupełnij wszystkie pola.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są takie same.');
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(getRegisterSuccessMessage());

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/logowanie');
      }, 1500);
    } catch (err) {
      setError(getRegisterErrorMessage(err.message));
      console.log('Błąd z backendu:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Container className="py-5 min-vh-100 d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="register-card border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="register-badge">Nowe konto</span>
                  <h1 className="register-title">Rejestracja</h1>
                  <p className="register-description mb-0">
                    Utwórz konto i rozpocznij korzystanie z platformy BeautyFinder
                  </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="register-label">Imię</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Wpisz imię"
                          className="register-input"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="register-label">Nazwisko</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Wpisz nazwisko"
                          className="register-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="register-label">Adres e-mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Wpisz adres e-mail"
                      className="register-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="register-label">Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Wpisz hasło"
                      className="register-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="register-label">Powtórz hasło</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Powtórz hasło"
                      className="register-input"
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      className="register-btn border-0"
                      disabled={loading}
                    >
                      {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
                    </Button>
                  </div>

                  <div className="text-center">
                    <span className="register-text-muted">Masz już konto? </span>
                    <Link to="/logowanie" className="register-link">
                      Zaloguj się
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

export default RegisterPage;