import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  isActive?: boolean;
  onClick: () => void;
}

const CategoryPill = ({ name, isActive = false, onClick }: CategoryPillProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full font-['Poppins'] text-sm font-medium transition-colors",
        isActive 
          ? "bg-[#5E8B3F] text-white" 
          : "bg-white hover:bg-[#5E8B3F] hover:text-white"
      )}
    >
      {name}
    </button>
  );
};

export default CategoryPill;
