import React, { useState } from 'react';

/**
 * A tabbed interface component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with label and content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.activeTabClassName - CSS classes for active tab
 * @param {string} props.inactiveTabClassName - CSS classes for inactive tab
 * @param {number} props.defaultTab - Index of default active tab
 */
const TabPanel = ({
  tabs = [],
  className = '',
  activeTabClassName = 'border-primary-500 text-primary-600',
  inactiveTabClassName = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
  defaultTab = 0,
  ...rest
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTab);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className={className} {...rest}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${index === activeTabIndex ? activeTabClassName : inactiveTabClassName}
              `}
              aria-current={index === activeTabIndex ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeTabIndex]?.content}
      </div>
    </div>
  );
};

export default TabPanel;