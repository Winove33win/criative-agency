import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationUrl: string;
  className?: string;
  loop?: boolean;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  animationUrl, 
  className = "w-full h-full", 
  loop = true 
}) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchAnimation = async () => {
      try {
        const response = await fetch(animationUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch Lottie JSON: ${response.statusText}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (contentType && !contentType.includes("application/json") && !contentType.includes("text/plain")) {
             // Some CDNs return text/plain for json
             // If it's XML or HTML, this will likely fail parsing, but we can try to catch it below.
        }

        const data = await response.json();
        if (isMounted) {
          setAnimationData(data);
        }
      } catch (error) {
        console.warn(`LottieAnimation failed to load from ${animationUrl}`, error);
      }
    };

    fetchAnimation();

    return () => {
      isMounted = false;
    };
  }, [animationUrl]);

  if (!animationData) return null;

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
};
