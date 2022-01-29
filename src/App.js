import React from 'react';

const { useRef, useState, useEffect } = React;
const imgixAPI = "https://tom.imgix.net/butterfly_0";
const imgixImages = new Array(24).fill(imgixAPI).map((e, i) => e + (i + 1) + ".jpeg?'auto=format,compress&cs=tinysrgb&fit=crop&crop=entropy&ar=3:2");

function App() {
  return (
    <div className="mt-6 grid grid-cols-1 gapy-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-2">
    { imgixImages.map((item, key) =>
        <LazyImage src={item} key={key} className="w-full h-full object-center object-cover"
        />
  )}
  </div>
  );
}

const LazyImage = ({src}) => {
  const rootRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const loading = 'https://tom.imgix.net/butterfly_021.jpeg?auto=format,compress&w=20&q=1';

  useEffect(() => {
    const defaultIntersectionOptions = {
      threshold: 0,
      rootMargin: '500px',
    };
    
    const checkIntersections = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    if (!isVisible) {
      const newIO = new IntersectionObserver(checkIntersections, defaultIntersectionOptions);
      newIO.observe(rootRef.current);
      return () => newIO.disconnect();
    }
  }, [isVisible]);

	return (
     <img alt="house image" src={isVisible ? src : loading} className="w-full h-full object-center object-cover p-4" ref={rootRef} srcset={isVisible ? src + '&w=1000 1000w, ' + src + '&w=1200 1200w, ' + src + '&w=1400 1400w': ''} sizes="(min-width: 768px) 40vw, 90vw" />
	);
};

export default App;
