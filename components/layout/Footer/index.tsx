export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const yearText = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;

  return (
    <footer data-layout="footer" className="bg-green-50 py-8">
      <div className="max-w-4xl mx-auto w-full px-6 text-center">
        <p className="text-sm text-gray-500">© {yearText} @smile. All rights reserved.</p>
      </div>
    </footer>
  );
}
