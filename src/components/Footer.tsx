const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Hanog Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;