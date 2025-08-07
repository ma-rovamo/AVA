import React from "react";
import { Calendar, Download, Home, Users } from "lucide-react";

const TransactionTabs = () => {
  const [activeTab, setActiveTab] = React.useState("details");

  const transactionTimeline = [
    {
      label: "Effective Date",
      date: "Jul 26, 2025",
    },
    {
      label: "Counteroffer Expiration Date", 
      date: "Jul 27, 2025",
    },
    {
      label: "Initial Deposit Due Date",
      date: "Jul 28, 2025",
    },
    {
      label: "Loan Application Deadline",
      date: "Jul 30, 2025",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Transaction Details For 410 FLAGSHIP DR # 501
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Download Summary
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Transaction Details
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "timeline"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Transaction Timeline
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "details" && (
          <div className="space-y-8">
            {/* Property Details Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
              </div>
              
              <div className="grid grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Street Address</h3>
                  <p className="text-sm text-gray-900">410 FLAGSHIP DR # 501</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">City</h3>
                  <p className="text-sm text-gray-900">Naples</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">State</h3>
                  <p className="text-sm text-gray-900">FL</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Zip</h3>
                  <p className="text-sm text-gray-900">34108</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Country</h3>
                  <p className="text-sm text-gray-900">United States</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Legal Description</h3>
                  <p className="text-sm text-gray-900">REGATTA AT VANDERBILT BEACH II A CONDOMINIUM UNIT 105 Collier</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Unit Number</h3>
                  <p className="text-sm text-gray-900">501</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Included Garage Number</h3>
                  <p className="text-sm text-gray-900">153</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Included Boat Slip Number</h3>
                  <p className="text-sm text-gray-900">45</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Property Type</h3>
                  <p className="text-sm text-gray-900">Residential Improved Property (Condominium)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Community/Association</h3>
                  <p className="text-sm text-gray-900">REGATTA AT VANDERBILT BEACH II</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">County</h3>
                  <p className="text-sm text-gray-900">Collier</p>
                </div>
              </div>
            </div>

            {/* Parties Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Parties</h2>
              </div>
              
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Seller</h3>
                  <p className="text-sm text-gray-900">Jay Christopher Wagner</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Seller</h3>
                  <p className="text-sm text-gray-900">Shonda Lynn Wagner</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Buyer</h3>
                  <p className="text-sm text-gray-900">Jeff Eckert</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Buyer</h3>
                  <p className="text-sm text-gray-900">Kimberly Eckert</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Buyer Property Address</h3>
                  <p className="text-sm text-gray-900">Buyer Property Address</p>
                  <p className="text-sm text-gray-900">410 FLAGSHIP DR # 501, Naples FL 34108</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Timeline</h2>
            <div className="relative border-l-2 border-blue-600 ml-4">
              {transactionTimeline.map((item, index) => (
                <div key={index} className="relative pl-8 pb-8 last:pb-0">
                  <div className="absolute left-[-15px] top-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="font-medium text-sm text-gray-900 mb-1">
                      {item.label}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTabs;