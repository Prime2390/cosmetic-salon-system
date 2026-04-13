import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

import logowanieImg from './img/logowanie.png';
import znajdzImg from './img/Znajdz.png';
import rezerwacjaImg from './img/Rezerwacja.png';
import opiniaImg from './img/Opinia.png';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar expand="lg" className="homepage-navbar">
        <Container>
          <Navbar.Brand className="homepage-logo">
            Beauty<span>Finder</span>
          </Navbar.Brand>

          <Nav className="ms-auto d-flex flex-row gap-2">
            <Button
              as={Link}
              to="/logowanie"
              variant="light"
              className="homepage-btn-secondary"
            >
              Logowanie
            </Button>
            <Button
              as={Link}
              to="/rejestracja"
              variant="primary"
              className="homepage-btn-primary"
            >
              Rejestracja
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <main>
        <section className="homepage-hero">
          <Container>
            <Row className="align-items-center g-4">
              <Col lg={7}>
                <span className="homepage-badge">
                  Platforma do wyszukiwania salonów kosmetycznych
                </span>

                <h1 className="homepage-title">
                  Znajdź salon kosmetyczny w swojej okolicy szybko i wygodnie
                </h1>

                <p className="homepage-description">
                  Nasza platforma pozwala użytkownikowi wyszukiwać salony kosmetyczne
                  w pobliżu, przeglądać dostępne usługi, porównywać oferty oraz
                  wygodnie rezerwować wizyty.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Button
                    as={Link}
                    to="/rejestracja"
                    className="homepage-btn-primary homepage-btn-lg"
                  >
                    Załóż konto
                  </Button>

                  <Button
                    as={Link}
                    to="/logowanie"
                    variant="light"
                    className="homepage-btn-secondary homepage-btn-lg"
                  >
                    Zaloguj się
                  </Button>
                </div>
              </Col>

              <Col lg={5}>
                <Card className="homepage-card border-0">
                  <Card.Body className="p-4">
                    <Card.Title className="homepage-card-title">
                      Co umożliwia platforma?
                    </Card.Title>

                    <ul className="homepage-list mb-0">
                      <li>Wyszukiwanie salonów w okolicy</li>
                      <li>Przeglądanie podstawowych informacji o salonach</li>
                      <li>Porównywanie ofert i usług</li>
                      <li>Rezerwacja wizyt online</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="homepage-section">
          <Container fluid className="px-0">
            <div className="text-center mb-5 px-3">
              <span className="homepage-badge">Jak działa system?</span>
              <h2 className="homepage-section-title">
                Prosty sposób korzystania z platformy
              </h2>
            </div>

            <div className="homepage-steps-wrapper">
              <section className="homepage-step-section">
                <Container>
                  <Row className="align-items-center g-4 g-lg-5">
                    <Col lg={6}>
                      <div className="homepage-step-content">
                        <div className="homepage-number">01</div>
                        <h3 className="homepage-step-title">Logowanie</h3>
                        <p className="homepage-step-text">
                          Zaloguj się do swojego konta, aby szybciej rezerwować
                          wizyty, zapisywać swoje dane oraz wygodnie zarządzać
                          rezerwacjami w jednym miejscu.
                        </p>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="homepage-step-image-box">
                        <img
                          src={logowanieImg}
                          alt="Logowanie do platformy"
                          className="homepage-step-image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

              <section className="homepage-step-section">
                <Container>
                  <Row className="align-items-center g-4 g-lg-5 flex-lg-row-reverse">
                    <Col lg={6}>
                      <div className="homepage-step-content">
                        <div className="homepage-number">02</div>
                        <h3 className="homepage-step-title">
                          Wyszukiwanie salonu
                        </h3>
                        <p className="homepage-step-text">
                          Wyszukaj salon kosmetyczny w swojej okolicy, sprawdź
                          dostępne miejsca i wybierz ofertę najlepiej dopasowaną do
                          swoich potrzeb.
                        </p>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="homepage-step-image-box">
                        <img
                          src={znajdzImg}
                          alt="Wyszukiwanie salonu kosmetycznego"
                          className="homepage-step-image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

              <section className="homepage-step-section">
                <Container>
                  <Row className="align-items-center g-4 g-lg-5">
                    <Col lg={6}>
                      <div className="homepage-step-content">
                        <div className="homepage-number">03</div>
                        <h3 className="homepage-step-title">Rezerwacja</h3>
                        <p className="homepage-step-text">
                          Wybierz usługę, termin oraz godzinę wizyty, a następnie
                          potwierdź rezerwację online w prosty i wygodny sposób.
                        </p>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="homepage-step-image-box">
                        <img
                          src={rezerwacjaImg}
                          alt="Rezerwacja wizyty"
                          className="homepage-step-image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

              <section className="homepage-step-section">
                <Container>
                  <Row className="align-items-center g-4 g-lg-5 flex-lg-row-reverse">
                    <Col lg={6}>
                      <div className="homepage-step-content">
                        <div className="homepage-number">04</div>
                        <h3 className="homepage-step-title">Opinia</h3>
                        <p className="homepage-step-text">
                          Po zakończonej wizycie dodaj swoją opinię, aby pomóc innym
                          użytkownikom w wyborze odpowiedniego salonu i usługi.
                        </p>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="homepage-step-image-box">
                        <img
                          src={opiniaImg}
                          alt="Dodawanie opinii po wizycie"
                          className="homepage-step-image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            </div>
          </Container>
        </section>

        <section className="homepage-owner">
          <Container>
            <Card className="homepage-owner-box border-0">
              <Card.Body className="p-4 p-md-5 text-center text-lg-start">
                <span className="homepage-badge">Dla właścicieli salonów</span>
                <h2 className="homepage-section-title mb-3">
                  Chcesz dodać swój salon do platformy?
                </h2>
                <p className="homepage-card-text mb-4">
                  Dołącz do platformy i pokaż swój salon nowym klientom. Dodaj swoją
                  ofertę, prezentuj usługi i ułatw użytkownikom rezerwację wizyt
                  online.
                </p>

                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                  <Button
                    as={Link}
                    to="/rejestracja"
                    className="homepage-btn-primary"
                  >
                    Dodaj swój salon
                  </Button>

                  <Button
                    as={Link}
                    to="/logowanie"
                    variant="light"
                    className="homepage-btn-secondary"
                  >
                    Mam już konto
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </section>

        <section className="homepage-about">
          <Container>
            <Card className="homepage-about-box border-0">
              <Card.Body className="p-4 p-md-5">
                <span className="homepage-badge">O projekcie</span>
                <h2 className="homepage-section-title mb-3">
                  Nowoczesna platforma dla klientów szukających usług beauty
                </h2>
                <p className="homepage-card-text mb-0">
                  Celem projektu jest stworzenie intuicyjnej platformy internetowej,
                  która ułatwi użytkownikom odnalezienie salonów kosmetycznych w
                  pobliżu oraz szybkie zapoznanie się z ich ofertą i zabookowanie
                  wizyty.
                </p>
              </Card.Body>
            </Card>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default HomePage;