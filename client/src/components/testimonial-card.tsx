import { Testimonial } from "@shared/schema";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-[#F8F5F1] rounded-lg p-8 relative">
      <div className="text-[#D4A55C] text-5xl absolute -top-4 left-4 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.32.315-.682.85-1.32 1.622-1.913.153-.106.3-.22.443-.336.143-.115.277-.237.402-.367l.244-.27c.118-.134.182-.275.185-.38.003-.133-.04-.232-.123-.292-.083-.06-.17-.09-.26-.09-.357 0-.596.07-.755.14-.067.028-.19.086-.373.17-.182.086-.4.17-.654.26-.253.09-.53.165-.83.224-.3.06-.613.09-.94.09-.665 0-1.304-.12-1.92-.362-.62-.24-1.167-.585-1.645-1.035-.478-.45-.854-.995-1.133-1.638-.28-.642-.418-1.342-.418-2.1 0-.665.123-1.304.368-1.92.246-.614.596-1.158 1.05-1.63.455-.477 1.01-.854 1.662-1.133.653-.28 1.376-.418 2.17-.418.486 0 .97.05 1.45.156.477.106.936.263 1.382.473.446.21.863.47 1.255.777.392.31.744.673 1.06 1.09.316.42.572.89.763 1.416.19.525.286 1.103.286 1.74 0 .724-.096 1.414-.287 2.065-.19.65-.457 1.263-.798 1.84-.34.578-.74 1.12-1.2 1.63-.458.51-.94.956-1.443 1.338-.503.382-1.01.705-1.52.97l-.238.06c-.304.05-.578.08-.82.08-.24 0-.442-.028-.603-.084-.162-.056-.296-.142-.405-.255-.107-.114-.16-.26-.16-.44zm-5.956.948c-.076.502-.25.93-.513 1.302-.264.372-.606.686-.974.936-.37.252-.785.443-1.235.569-.447.126-.904.19-1.347.19-.482 0-.918-.044-1.277-.12-.36-.08-.67-.203-.918-.366-.25-.163-.456-.377-.598-.615-.143-.24-.214-.52-.214-.838 0-.267.055-.52.166-.757.11-.238.292-.453.548-.646.257-.193.59-.346.986-.456.398-.11.836-.166 1.318-.166.972 0 1.612.129 1.94.387.327.258.49.724.49 1.384 0 .058 0 .117-.004.176-.004.06-.015.147-.03.262z" />
        </svg>
      </div>
      <p className="text-gray-600 italic mb-6 relative z-10">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold font-['Poppins']">{testimonial.name}</h4>
          <div className="flex text-[#D4A55C] text-sm">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={index} size={16} fill="#D4A55C" strokeWidth={0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
