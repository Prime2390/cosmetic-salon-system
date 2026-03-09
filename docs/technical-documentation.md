Dokumentacja techniczna projektu

System rezerwacji i zarządzania salonami kosmetycznymi

1. Informacje ogólne

Nazwa robocza projektu: BeautyBook / Cosmetic Salon System
Typ projektu: aplikacja webowa typu SaaS (multi-salon)
Cel projektu: stworzenie edukacyjnego, skalowalnego systemu do zarządzania salonami kosmetycznymi, rezerwacjami wizyt, personelem, usługami oraz podstawową analityką biznesową.

Projekt zakłada istnienie wielu salonów w jednym systemie. Każdy salon posiada własnego właściciela, własnych pracowników, usługi, galerię, opinie oraz kalendarz wizyt. Klient po rejestracji i zalogowaniu może przeglądać salony, wybierać usługi i rezerwować wizyty.

2. Cele systemu

2.1 Cele biznesowe

-umożliwienie klientom rezerwacji wizyt online,

-uproszczenie zarządzania harmonogramem salonu,

-umożliwienie właścicielowi zarządzania personelem i usługami,

-zapewnienie centralnego systemu dla wielu salonów,

-dostarczenie dashboardu z podstawowymi statystykami.

2.2 Cele techniczne

-stworzenie architektury umożliwiającej rozwój projektu,

-rozdzielenie warstwy frontendowej i backendowej,

-zapewnienie bezpiecznej autoryzacji użytkowników,

-wdrożenie testów manualnych, API, E2E i testów bazy danych,

-uruchamianie projektu w kontenerach Docker.

3. Zakres funkcjonalny systemu

3.1 Część publiczna

strona główna,

lista salonów,

szczegóły salonu,

lista usług salonu,

galeria zdjęć,

opinie klientów,

logowanie,

rejestracja.

3.2 Panel klienta

podgląd profilu,

podgląd historii wizyt,

rezerwacja wizyty,

anulowanie wizyty,

przełożenie wizyty,

dodawanie opinii po zakończonej wizycie.

3.3 Panel pracownika

podgląd własnego grafiku,

podgląd przypisanych wizyt,

zmiana statusu wizyty,

wgląd wyłącznie do własnych danych operacyjnych.

3.4 Panel właściciela / administratora salonu

zarządzanie salonem,

zarządzanie godzinami pracy salonu,

dodawanie i edycja pracowników,

przypisywanie usług do pracowników,

zarządzanie grafikiem pracowników,

zarządzanie usługami,

zarządzanie rezerwacjami,

zarządzanie galerią,

podgląd opinii,

dashboard ze statystykami.

4. Architektura technologiczna

4.1 Frontend

Technologia: React + JavaScript

Typ aplikacji: aplikacja webowa responsywna

Komunikacja z backendem: REST API

Obsługiwane widoki: desktop + mobile

4.2 Backend

Środowisko: Node.js

Framework: Express.js

Styl architektury API: REST

Autoryzacja: JWT (access token + refresh token)

4.3 Baza danych

Silnik: PostgreSQL

Model: relacyjny

Dostęp do danych: ORM 

4.4 Dodatkowe komponenty

Docker / Docker Compose,

system powiadomień email,

system powiadomień SMS(mock na start),

raportowanie testów,

dokumentacja API.

5. Uzasadnienie wyboru technologii

React

Wybrany ze względu na popularność, łatwość budowy interfejsów komponentowych oraz dobre wsparcie dla aplikacji frontendowych z panelem administracyjnym i częścią publiczną.

Express.js

Wybrany z uwagi na prostotę, elastyczność oraz dużą kontrolę nad strukturą projektu. Dobrze nadaje się do projektu edukacyjnego i pozwala rozwinąć architekturę krok po kroku.

REST API

REST będzie najlepszym wyborem dla tego projektu ze względu na prostotę implementacji, łatwość testowania oraz czytelny podział endpointów. Ułatwi przygotowanie testów Postman i automatyzacji E2E.

PostgreSQL

Relacyjna baza danych dobrze odpowiada strukturze domenowej projektu: użytkownicy, salony, pracownicy, usługi, wizyty, płatności, opinie i galerie są ze sobą silnie powiązane.

Prisma

Prisma ułatwia pracę z bazą, migracjami i modelami danych. Jest dobrym kompromisem między wygodą programowania a czytelnością warstwy danych.

6. Role i uprawnienia

6.1 Klient (CLIENT)

Uprawnienia:

rejestracja i logowanie,

przeglądanie salonów,

przeglądanie usług,

tworzenie rezerwacji,

anulowanie rezerwacji,

przełożenie terminu,

wgląd do historii wizyt,

wystawianie opinii po zakończonej wizycie.

Ograniczenia:

brak dostępu do panelu pracownika,

brak dostępu do panelu właściciela,

brak możliwości zarządzania usługami i personelem.

6.2 Pracownik (EMPLOYEE)

Uprawnienia:

wgląd do własnego grafiku,

wgląd do przypisanych wizyt,

aktualizacja statusu wizyty,

wgląd do podstawowych danych klienta wymaganych do realizacji usługi.

Ograniczenia:

brak dostępu do grafiku innych pracowników,

brak możliwości zarządzania salonem,

brak możliwości tworzenia usług.

6.3 Właściciel salonu (OWNER)

Uprawnienia:

pełne zarządzanie własnym salonem,

zarządzanie pracownikami,

zarządzanie usługami,

zarządzanie godzinami pracy salonu,

zarządzanie grafikiem pracowników,

edycja rezerwacji,

dostęp do historii wizyt,

dostęp do statystyk i dashboardu,

zarządzanie galerią i opiniami.

Ograniczenia:

zarządzanie wyłącznie salonem, którego jest właścicielem.

7. Model domenowy systemu

Główne encje:

User

Salon

EmployeeProfile

ServiceCategory

Service

EmployeeService

SalonWorkingHours

EmployeeSchedule

Appointment

Payment

Review

GalleryImage

AuditLog

Notification

Relacje biznesowe:

jeden użytkownik może być klientem, pracownikiem lub właścicielem,

jeden salon ma jednego właściciela,

jeden salon ma wielu pracowników,

jeden salon ma wiele usług,

jedna usługa należy do jednej kategorii,

wielu pracowników może wykonywać jedną usługę,

klient może mieć wiele wizyt, ale nie może mieć kilku wizyt w tym samym czasie,

jedna wizyta dotyczy jednego salonu, jednej usługi i jednego pracownika,

po zakończonej wizycie klient może wystawić opinię,

salon może posiadać wiele zdjęć w galerii.

8. Logika biznesowa

8.1 Rejestracja i logowanie

użytkownik zakłada konto przez formularz rejestracyjny,

hasło jest haszowane,

po zalogowaniu system zwraca access token i refresh token,

uprawnienia użytkownika są odczytywane na podstawie roli.

8.2 Rezerwacja wizyty

Proces rezerwacji:

klient loguje się do systemu,

wybiera salon,

wybiera usługę,

system sprawdza dostępność terminów i pracowników,

klient widzi dostępne możliwości rezerwacji,

klient wybiera konkretnego pracownika lub opcję automatycznego przydziału,

klient wybiera termin,

system ponownie waliduje dostępność wybranego slotu,

system tworzy rezerwację,

system wysyła potwierdzenie email i zapisuje zdarzenie do logów.

8.3 Warunki utworzenia rezerwacji

Rezerwacja może zostać utworzona tylko wtedy, gdy:

klient jest zalogowany,

wybrany salon istnieje,

wybrana usługa należy do salonu,

wybrany pracownik może wykonać daną usługę,

salon jest otwarty w danym czasie,

pracownik jest dostępny,

wskazany termin nie koliduje z inną wizytą pracownika,

klient nie ma innej wizyty pokrywającej się w czasie.

8.4 Zmiana terminu wizyty

klient lub właściciel może zmienić termin wizyty,

nowy termin jest walidowany według tych samych reguł co nowa rezerwacja,

zmiana jest zapisywana w audit logach.

8.5 Anulowanie wizyty

klient może anulować własną wizytę,

właściciel może anulować wizytę w swoim salonie,

anulowanie zmienia status wizyty,

system wysyła powiadomienie email/SMS.

8.6 Obsługa opinii

opinia może być dodana wyłącznie po zakończonej wizycie,

jedna wizyta może mieć maksymalnie jedną opinię,

opinia zawiera ocenę liczbową i komentarz tekstowy.

8.7 Dashboard

Dashboard właściciela prezentuje:

liczbę wizyt,

liczbę klientów,

przychód,

najpopularniejsze usługi,

dane filtrowane po zakresie czasu.

9. Wymagania funkcjonalne

9.1 Moduł użytkowników

system musi umożliwiać rejestrację użytkownika,

system musi umożliwiać logowanie użytkownika,

system musi umożliwiać reset hasła,

system musi obsługiwać role użytkowników,

system musi ograniczać dostęp do zasobów według roli.

9.2 Moduł salonów

system musi prezentować listę salonów,

system musi udostępniać widok szczegółów salonu,

system musi obsługiwać przypisanie właściciela do salonu,

system musi umożliwiać zarządzanie danymi salonu.

9.3 Moduł usług

właściciel musi móc tworzyć, edytować i ukrywać usługi,

usługa musi mieć nazwę, opis, cenę, czas trwania, kategorię i zdjęcie,

system musi umożliwiać przypisanie usługi do jednego lub wielu pracowników.

9.4 Moduł grafiku

właściciel musi móc definiować godziny pracy salonu,

właściciel musi móc definiować grafik pracowników,

pracownik musi widzieć wyłącznie własny grafik,

system musi uwzględniać grafik przy wyznaczaniu wolnych terminów.

9.5 Moduł rezerwacji

klient musi móc utworzyć rezerwację,

klient musi móc anulować rezerwację,

klient musi móc przełożyć rezerwację,

właściciel musi móc edytować rezerwacje,

system musi blokować terminy kolidujące.

9.6 Moduł powiadomień

system musi wysłać potwierdzenie rezerwacji,

system musi wysłać informację o anulowaniu,

system powinien wysyłać przypomnienie przed wizytą,

system powinien obsługiwać email i SMS.

9.7 Moduł opinii i galerii

klient musi móc wystawić opinię po zakończonej wizycie,

salon musi mieć galerię zdjęć,

właściciel musi móc dodawać i usuwać zdjęcia.

9.8 Moduł statystyk

system musi wyliczać liczbę wizyt,

system musi wyliczać przychód,

system musi wskazywać najpopularniejsze usługi,

dane muszą być dostępne w panelu właściciela.

10. Wymagania niefunkcjonalne

10.1 Bezpieczeństwo

hasła muszą być przechowywane w formie haszy,

API musi być chronione tokenami JWT,

system musi posiadać walidację danych wejściowych,

system powinien posiadać rate limiting,

system powinien logować działania administracyjne,

system powinien chronić zasoby przed nieautoryzowanym dostępem.

10.2 Wydajność

lista salonów i usług powinna ładować się szybko,

system powinien efektywnie obsługiwać filtrowanie terminów,

zapytania do kalendarza powinny być zoptymalizowane pod kątem konfliktów czasowych.

10.3 Skalowalność

architektura powinna umożliwiać rozwój o kolejne moduły,

system powinien umożliwiać dodawanie kolejnych salonów bez przebudowy logiki,

system powinien pozwalać na integrację z realnym operatorem płatności w przyszłości.

10.4 Użyteczność

interfejs ma być responsywny,

aplikacja ma działać poprawnie na desktopie i telefonach,

najważniejsze ścieżki użytkownika mają być intuicyjne.

10.5 Utrzymywalność

kod powinien być modularny,

projekt powinien posiadać czytelną strukturę katalogów,

powinny istnieć testy dla kluczowych funkcji.

11. Architektura logiczna backendu

Proponowana struktura:

backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── salons/
│   │   ├── employees/
│   │   ├── services/
│   │   ├── appointments/
│   │   ├── reviews/
│   │   ├── gallery/
│   │   ├── notifications/
│   │   └── dashboard/
│   ├── middleware/
│   ├── utils/
│   ├── common/
│   └── database/
├── prisma/
├── tests/
└── package.json

Warstwy backendu

routes – definicja endpointów,

controller – odbiór żądania i zwrot odpowiedzi,

service – logika biznesowa,

repository / prisma access – operacje na bazie danych,

middleware – autoryzacja, walidacja, obsługa błędów,

utils – funkcje pomocnicze.

12. Architektura logiczna frontendu

Proponowana struktura:

frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── salons/
│   │   ├── appointments/
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── reviews/
│   │   └── gallery/
│   ├── pages/
│   ├── layouts/
│   ├── routes/
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   └── styles/
└── package.json

Główne widoki

HomePage

LoginPage

RegisterPage

SalonsPage

SalonDetailsPage

BookingPage

MyAppointmentsPage

EmployeeCalendarPage

OwnerDashboardPage

ServicesManagementPage

EmployeesManagementPage

GalleryManagementPage

SettingsPage

13. Projekt bazy danych

13.1 Tabela users

Najważniejsze pola:

id

first_name

last_name

email

phone

password_hash

role

is_active

created_at

updated_at

13.2 Tabela salons

id

owner_id

name

description

address

city

postal_code

phone

email

created_at

updated_at

13.3 Tabela employee_profiles

id

user_id

salon_id

position

bio

photo_url

is_active

13.4 Tabela service_categories

id

salon_id

name

description

13.5 Tabela services

id

salon_id

category_id

name

description

image_url

price

duration_minutes

is_active

created_at

updated_at

13.6 Tabela employee_services

id

employee_id

service_id

13.7 Tabela salon_working_hours

id

salon_id

day_of_week

open_time

close_time

is_closed

13.8 Tabela employee_schedules

id

employee_id

day_of_week

start_time

end_time

is_working

13.9 Tabela appointments

id

salon_id

client_id

employee_id

service_id

start_time

end_time

status

booking_source

notes

created_at

updated_at

13.10 Tabela payments

id

appointment_id

amount

type

status

paid_at

13.11 Tabela reviews

id

appointment_id

client_id

salon_id

rating

comment

created_at

13.12 Tabela gallery_images

id

salon_id

image_url

title

description

created_at

13.13 Tabela audit_logs

id

actor_user_id

action

entity_type

entity_id

old_values

new_values

created_at

13.14 Tabela notifications

id

user_id

appointment_id

channel

type

status

sent_at

14. Reguły integralności danych

email użytkownika musi być unikalny,

właściciel salonu musi istnieć w tabeli users,

usługa musi należeć do jednego salonu,

pracownik może być przypisany tylko do jednego salonu w ramach pojedynczego profilu,

appointment musi posiadać poprawne relacje do klienta, pracownika, usługi i salonu,

end_time wizyty musi wynikać z czasu trwania usługi,

review może powstać tylko dla zakończonej wizyty,

klient nie może mieć nakładających się wizyt,

pracownik nie może mieć nakładających się wizyt.

15. Statusy systemowe

15.1 Status wizyty

BOOKED

CONFIRMED

CANCELLED

COMPLETED

NO_SHOW

15.2 Status płatności

PENDING

PARTIAL

PAID

CANCELLED

REFUNDED

15.3 Kanały powiadomień

EMAIL

SMS

16. Endpointy REST API – zarys

16.1 Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

POST /api/auth/logout

POST /api/auth/forgot-password

POST /api/auth/reset-password

16.2 Users

GET /api/users/me

PATCH /api/users/me

16.3 Salons

GET /api/salons

GET /api/salons/:id

POST /api/salons

PATCH /api/salons/:id

16.4 Employees

GET /api/salons/:salonId/employees

POST /api/salons/:salonId/employees

PATCH /api/employees/:id

GET /api/employees/me/schedule

16.5 Services

GET /api/salons/:salonId/services

POST /api/salons/:salonId/services

PATCH /api/services/:id

DELETE /api/services/:id

16.6 Appointments

GET /api/appointments/me

POST /api/appointments

PATCH /api/appointments/:id/reschedule

PATCH /api/appointments/:id/cancel

PATCH /api/appointments/:id/status

16.7 Reviews

POST /api/reviews

GET /api/salons/:salonId/reviews

16.8 Gallery

GET /api/salons/:salonId/gallery

POST /api/salons/:salonId/gallery

DELETE /api/gallery/:id

16.9 Dashboard

GET /api/dashboard/summary

GET /api/dashboard/revenue

GET /api/dashboard/popular-services

17. Mechanizmy bezpieczeństwa

haszowanie haseł,

JWT access + refresh,

kontrola dostępu oparta o role,

walidacja requestów,

centralna obsługa błędów,

rate limiting,

CORS,

logowanie działań administracyjnych,

soft delete dla wybranych danych.

18. Mechanizmy jakościowe i QA features

Audit logs

Rejestrowanie działań administracyjnych i zmian w newralgicznych obszarach systemu.

Soft delete

Zamiast trwałego usuwania rekordów część danych będzie oznaczana jako nieaktywna.

API documentation

Dokumentacja endpointów udostępniona przez Swagger/OpenAPI.

Validation layer

Walidacja danych wejściowych przed wykonaniem logiki biznesowej.

Error handling standard

Ujednolicony format odpowiedzi błędów API.

Monitoring gotowości aplikacji

Podstawowe endpointy healthcheck, np. /health.

19. Testowanie

19.1 Testy manualne

Zakres:

scenariusze testowe,

przypadki testowe,

testy eksploracyjne,

raporty błędów.

19.2 Testy API

Zakres:

autoryzacja,

rejestracja,

logowanie,

zarządzanie salonami,

zarządzanie usługami,

tworzenie i anulowanie wizyt,

walidacja błędnych danych,

kontrola uprawnień.

19.3 Testy E2E

Zakres:

pełny przepływ rejestracji,

logowanie,

utworzenie rezerwacji,

zmiana terminu,

anulowanie,

dodanie opinii.

19.4 Testy bazy danych

Zakres:

integralność relacji,

poprawność migracji,

poprawność zapisu statusów,

walidacja konfliktów terminów.

19.5 Raportowanie testów

Rekomendacja:

podstawowe raportowanie testów automatycznych,

możliwość integracji z Allure w dalszym etapie.

20. Docker i uruchamianie projektu

20.1 Kontenery

frontend,

backend,

postgres.

20.2 Cel konteneryzacji

łatwe uruchamianie środowiska lokalnego,

spójność środowisk,

uproszczenie deployu na serwerze.

20.3 Główne pliki

Dockerfile dla frontendu,

Dockerfile dla backendu,

docker-compose.yml,

.env.example.

21. Założenia dotyczące wdrożenia

aplikacja ma być wdrażana na serwer,

środowisko produkcyjne będzie odseparowane od deweloperskiego,

konfiguracja powinna wykorzystywać zmienne środowiskowe,

płatności online na obecnym etapie nie będą zintegrowane z zewnętrznym operatorem.

22. Ograniczenia aktualnego zakresu

brak integracji z realnym operatorem płatności,

brak natywnej aplikacji mobilnej,

brak rozbudowanej wielopoziomowej administracji globalnej,

SMS może być początkowo realizowany jako mock lub lokalny adapter.

23. Możliwości dalszego rozwoju

integracja z realnym operatorem płatności,

integracja z kalendarzami zewnętrznymi,

system kuponów i promocji,

program lojalnościowy,

czat klient–salon,

panel super-admina dla całej platformy,

zaawansowane raporty biznesowe,

wielojęzyczność.

24. Wstępna struktura repozytorium

cosmetic-salon-system/
├── frontend/
├── backend/
├── tests/
│   ├── manual/
│   ├── api/
│   ├── e2e/
│   └── database/
├── docs/
├── docker/
├── .env.example
├── docker-compose.yml
└── README.md

25. Podsumowanie

Projekt stanowi pełny system rezerwacji i zarządzania salonami kosmetycznymi w architekturze klient–serwer. Zakłada obsługę wielu salonów, rejestrację użytkowników, role i uprawnienia, zarządzanie personelem, usługami, kalendarzem wizyt, galerią, opiniami i dashboardem właściciela. Zastosowanie React, Express i PostgreSQL pozwala stworzyć nowoczesny, skalowalny i dobrze testowalny projekt edukacyjny z dużym potencjałem dalszego rozwoju.

