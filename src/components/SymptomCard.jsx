// components/SymptomCard.jsx
export const SymptomCard = ({ id, nama, isSelected, onToggle }) => (
  <div 
    onClick={() => onToggle(id)}
    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
        isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
      }`}>
        {isSelected && <span className="text-white text-xs">✓</span>}
      </div>
      <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
        [{id}] {nama}
      </span>
    </div>
  </div>
);