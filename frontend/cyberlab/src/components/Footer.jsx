import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center py-3 fixed bottom-0 w-full rounded-lg">
      <p>&copy; {currentYear} Cybersecurity Learning Platform</p>
    </footer>
  );
};

export default Footer;
