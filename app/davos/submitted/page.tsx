export default function DavosSubmitted() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully</h1>
          <p className="text-gray-700 mb-6">
            Thank you for fulfilling the form for Davos quotation. Our team will contact you within 24 hours.
          </p>
          <a href="/davos" className="inline-block bg-[#C6A054] hover:bg-[#B08F45] text-white font-semibold py-3 px-6 rounded-lg transition-all">
            Back to Davos
          </a>
        </div>
      </div>
    </div>
  );
}
