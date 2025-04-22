import React from 'react';

interface ActivityGraphProps {
  data: {
    [key: string]: number;
  };
  months: string[];
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ data, months }) => {
  // Find the max value to normalize heights
  const maxValue = Math.max(...Object.values(data));
  
  // Define gradient colors
  const colors = [
    'bg-gradient-to-t from-pink-300 to-pink-200',
    'bg-gradient-to-t from-orange-300 to-orange-200',
    'bg-gradient-to-t from-emerald-300 to-emerald-200',
    'bg-gradient-to-t from-teal-300 to-teal-200',
    'bg-gradient-to-t from-blue-300 to-blue-200',
    'bg-gradient-to-t from-indigo-300 to-indigo-200',
    'bg-gradient-to-t from-violet-300 to-violet-200',
    'bg-gradient-to-t from-purple-300 to-purple-200',
    'bg-gradient-to-t from-pink-300 to-pink-200',
    'bg-gradient-to-t from-orange-300 to-orange-200',
    'bg-gradient-to-t from-emerald-300 to-emerald-200',
    'bg-gradient-to-t from-blue-300 to-blue-200',
  ];
  
  return (
    <div className="w-full h-20 flex items-end justify-between">
      {months.map((month, index) => {
        const value = data[month] || 0;
        const height = `${(value / maxValue) * 100}%`;
        
        return (
          <div key={month} className="flex flex-col items-center">
            <div 
              className={`w-5 rounded-t-full ${colors[index % colors.length]}`}
              style={{ height }}
            />
            <span className="text-xs mt-1 text-gray-500">{month}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityGraph;