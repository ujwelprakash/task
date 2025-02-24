import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div>
        <Link href="/dashboard" className="mr-4">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
