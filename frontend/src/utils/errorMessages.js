export const getRegisterErrorMessage = (message) => {
  if (
    message === 'First name, last name, email and passowrd are required'
  ) {
    return 'Wszystkie pola są wymagane.';
  }

  if (message.includes('User with this email already exists')) {
    return 'Użytkownik z takim adresem e-mail już istnieje.';
  }

  if (message.includes('email')) {
    return 'Podano nieprawidłowy adres e-mail.';
  }

  return 'Nie udało się zarejestrować użytkownika.';
};

export const getRegisterSuccessMessage = () => {
  return 'Konto zostało utworzone pomyślnie.';
};

export const getLoginErrorMessage = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('email and password are required')) {
    return 'Adres e-mail i hasło są wymagane.';
  }

  if (lowerMessage.includes('invalid email')) {
    return 'Użytkownik o podanym adresie e-mail nie istnieje.';
  }


  if (lowerMessage.includes('invalid password')) {
    return 'Nieprawidłowe hasło.';
  }

  return 'Nie udało się zalogować.';
};

export const getLoginSuccessMessage = () => {
  return 'Logowanie zakończone pomyślnie.';
};