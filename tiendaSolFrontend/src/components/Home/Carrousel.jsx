import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

const slides = [
  {
    id: 1,
    url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/0d3394e2-9607-4c49-8ea3-852d3b378cfe___c371b54789fcfd0fdd9453d12e72434a.jpg",
    alt: "Nueva Colección de Primavera",
    caption: "¡Descubre lo último en moda!",
  },
  {
    id: 2,
    url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/fe6cd522-3f5b-41ee-9f92-6fbd4ec7d70a___31258077e5fa85bfa076f7a2cbf201ab.jpg",
    alt: "Oferta Especial de la Semana",
    caption: "30% OFF en todos los zapatos.",
  },
  {
    id: 3,
    url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/38ce55c1-9da4-4c70-a4a2-95f54853148c___7b05be09fea495e68dc81a98a634a09b.jpg",
    alt: "Envío Gratis en Compras Mayores",
    caption: "No te pierdas el envío gratuito.",
  },
];

export default function CarruselAutomatico({ intervalo = 4000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
    }, intervalo);

    return () => clearInterval(timer);
  }, [totalSlides, intervalo]);


  const prevSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 relative">
      <div className="overflow-hidden rounded-xl shadow-2xl relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative">
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8">
                <p className="text-white text-3xl font-bold">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-10"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-10"
          aria-label="Diapositiva siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-gray-400 opacity-70'
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}