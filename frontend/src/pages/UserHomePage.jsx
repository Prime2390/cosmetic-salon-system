

function UserHomePage() {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  const firstName = user?.firstName || 'Użytkowniku';

  return (
    <h1>UserHomePage</h1>
  );
}

export default UserHomePage;