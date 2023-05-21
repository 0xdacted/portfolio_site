const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8">
      <div className="w-1/4">
        <a className="text-xl text-text hover:text-gray-600" href="/">
          Home
        </a>
      </div>
      <nav className="w-2/4 flex items-center justify-between">
        <a
          className="text-xl font-medium text-text hover:text-gray-800 mx-3"
          href="/about"
        >
          About
        </a>
        <a
          className="text-xl font-medium text-text hover:text-gray-800 mx-3"
          href="/movies"
        >
          Movies
        </a>
        <a
          className="text-xl font-medium text-text hover:text-gray-800 mx-3"
          href="/directors"
        >
          Directors
        </a>
        <a
          className="text-xl font-medium text-text hover:text-gray-800 mx-3"
          href="/philosophy"
        >
          Philosophy
        </a>
        <a
          className="text-xl font-medium text-text hover:text-gray-800 mx-3"
          href="/authors"
        >
          Authors
        </a>
      </nav>

      <div className="w-1/4 flex items-center justify-end">
        <div className="mr-8">
          <a
            className="text-xl font-medium text-text hover:text-gray-800"
            href="/over-under-game"
          >
            Over/Under Game
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
