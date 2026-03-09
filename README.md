# Cosmetic Salon System

System rezerwacji i zarządzania salonami kosmetycznymi w architekturze multi-salon.  
Projekt edukacyjny z możliwością dalszego rozwoju, tworzony jako pełnoprawna aplikacja webowa z częścią publiczną, panelem klienta, panelem pracownika oraz panelem właściciela salonu.

---

## Opis projektu

Celem projektu jest stworzenie nowoczesnej aplikacji do obsługi wielu salonów kosmetycznych w jednym systemie.  
Aplikacja umożliwia klientom rezerwację wizyt online, przeglądanie salonów i usług, a właścicielom zarządzanie personelem, grafikiem, usługami, galerią, opiniami oraz statystykami.

Projekt jest rozwijany jako aplikacja edukacyjna i portfolio, z naciskiem na:
- architekturę fullstack,
- testowanie manualne i automatyczne,
- dobrą organizację kodu,
- dokumentację techniczną,
- możliwość dalszej rozbudowy.

---

## Główne funkcjonalności

### Część publiczna
- strona główna
- lista salonów
- widok szczegółów salonu
- lista usług
- galeria zdjęć
- opinie klientów
- logowanie
- rejestracja

### Panel klienta
- rejestracja i logowanie
- rezerwacja wizyty
- anulowanie wizyty
- zmiana terminu wizyty
- historia wizyt
- dodawanie opinii po zakończonej wizycie

### Panel pracownika
- podgląd własnego grafiku
- podgląd przypisanych wizyt
- aktualizacja statusu wizyt

### Panel właściciela salonu
- zarządzanie salonem
- zarządzanie pracownikami
- zarządzanie grafikiem
- zarządzanie usługami
- zarządzanie rezerwacjami
- zarządzanie galerią
- podgląd opinii
- dashboard ze statystykami

### System powiadomień
- email potwierdzający rezerwację
- email o anulowaniu lub zmianie terminu
- przypomnienia SMS i email

---

## Stack technologiczny

### Frontend
- React
- JavaScript

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

### Baza danych
- PostgreSQL
- Prisma ORM

### Testowanie
- testy manualne
- Postman
- testy E2E
- testy bazy danych

### DevOps
- Docker
- Docker Compose

---

## Architektura projektu

Projekt rozwijany jest w architekturze klient-serwer.

```text
Frontend (React)
        ↓
Backend API (Node.js + Express)
        ↓
PostgreSQL (Prisma ORM)
