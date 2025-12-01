const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-xs">&copy; {currentYear} Hanog Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;