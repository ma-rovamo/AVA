import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  summary?: string;
  source?: string;
  page?: number;
}

const DeadLinesMain = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['effective-date']));

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const timelineItems: TimelineItem[] = [
    {
      id: 'effective-date',
      title: 'Effective Date',
      date: 'Jul 26, 2025',
      summary: 'The Effective Date of this Contract shall be the last date either SELLER or BUYER signs or initials this Contract. ALL CHANGES TO THE OFFER OR COUNTEROFFER MUST BE INITIALED AND DATED. THE LATEST DATE SET FORTH ON THIS CONTRACT BY EITHER PARTY\'S SIGNATURE OR INITIALS SHALL BE THE EFFECTIVE DATE.',
      source: 'Paragraph 2 of Purchase Agreement',
      page: 2
    },
    {
      id: 'counteroffer-expiration',
      title: 'Counteroffer Expiration Date',
      date: 'Jul 27, 2025',
      summary: 'This counteroffer shall be deemed revoked and the deposits, if any, shall be refunded to BUYER unless this counteroffer is signed by BUYER and a signed copy delivered to SELLER on or before the date and time specified.',
      source: 'Paragraph 3 of Purchase Agreement',
      page: 1
    },
    {
      id: 'initial-deposit',
      title: 'Initial Deposit Due Date',
      date: 'Jul 28, 2025',
      summary: 'Initial deposit of earnest money to be deposited within 3 business days after the Effective Date. This deposit demonstrates the buyer\'s good faith commitment to purchase the property.',
      source: 'Paragraph 5 of Purchase Agreement',
      page: 2
    },
    {
      id: 'loan-application',
      title: 'Loan Application Deadline',
      date: 'Jul 30, 2025',
      summary: 'BUYER shall make loan application within 5 days after the Effective Date and use good faith and diligent effort to obtain loan approval. Buyer must provide evidence of loan application to seller.',
      source: 'Paragraph 8 of Purchase Agreement',
      page: 3
    },
    {
      id: 'title-evidence',
      title: 'Title Evidence Delivery Deadline',
      date: 'Aug 4, 2025',
      summary: 'SELLER shall furnish to BUYER at SELLER\'s expense a commitment for owner\'s policy of title insurance or abstract of title covering the Property. Title evidence must show marketable title.',
      source: 'Paragraph 6 of Purchase Agreement',
      page: 3
    },
    {
      id: 'additional-deposit',
      title: 'Additional Deposit Due Date',
      date: 'Aug 9, 2025',
      summary: 'Additional earnest money deposit as specified in the contract terms. This deposit further secures the buyer\'s commitment and may be applied toward the purchase price at closing.',
      source: 'Paragraph 5 of Purchase Agreement',
      page: 2
    },
    {
      id: 'inspection-period',
      title: 'Inspection Period End Date',
      date: 'Aug 9, 2025',
      summary: 'BUYER shall have 15 days after the Effective Date to have the Property inspected. Buyer may cancel this Contract within the inspection period if not satisfied with the property condition.',
      source: 'Paragraph 12 of Purchase Agreement',
      page: 4
    },
    {
      id: 'examination-period',
      title: 'Examination Period End Date',
      date: 'Aug 24, 2025',
      summary: 'BUYER shall have 30 days after receipt of title evidence to examine the title evidence and survey. Any objections to title must be made in writing within this examination period.',
      source: 'Paragraph 6 of Purchase Agreement',
      page: 3
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Review Your Timeline</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Add Deadline
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Take a minute to review the dates. Please, adjust everything that doesn't look right before we move forward.
          </p>
        </div>
      </div>

      {/* Timeline Items */}
      <div className="space-y-3">
        {timelineItems.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          
          return (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                  >
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                  {isExpanded ? 
                    <ChevronUp className="w-5 h-5 text-gray-400 ml-1" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-400 ml-1" />
                  }
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                  <div className="mt-4 space-y-3">
                    {item.summary && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Summary:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.summary}</p>
                      </div>
                    )}
                    {item.source && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Source:</h4>
                        <p className="text-sm text-gray-700">{item.source}</p>
                      </div>
                    )}
                    {item.page && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Page:</h4>
                        <p className="text-sm text-gray-700">{item.page}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadLinesMain;