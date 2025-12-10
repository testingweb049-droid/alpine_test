export default function Impressum() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IMPRESSUM</h1>
      <p className="text-sm text-gray-600 mb-8">Legal Information</p>

      <div className="prose max-w-none space-y-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Company Information</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Company Name:</strong>Nate Solutions GmbH</p>
            <p><strong>Managing Director:</strong> Natanael Santos da Silveira</p>
            <p><strong>Address:</strong> Spitalstrasse 31, 8952 Schlieren, Switzerland</p>
            <p><strong>Email:</strong> info@alpine-prestige-rides.ch</p>
            <p><strong>Phone:</strong> +41 76 318 08 82</p>
            <p><strong>Shareholder:</strong> Natanael Santos da Silveira</p>
            <p><strong>Commercial Register & Number:</strong> Zurich CHE-112.173.501</p>
            <p><strong>VAT Identification Number:</strong> CHE-112.173.501</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Person Responsible for Content</h2>
          <p className="text-gray-700">Natanael Santos da Silveira</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Online Dispute Resolution</h2>
          <p className="mb-4 text-gray-700">
            Platform of the European Commission for Online Dispute Resolution (ODR) for consumers:
          </p>
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          <p className="mt-4 text-gray-700">
            We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </section>

        
      </div>
    </div>
  );
}