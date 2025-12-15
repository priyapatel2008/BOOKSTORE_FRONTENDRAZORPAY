import { useEffect } from 'react';

export const useRazorpay = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (options) => {
    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        ...options,
        handler: (response) => {
          resolve(response);
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment modal dismissed'));
          },
        },
      });
      rzp.open();
    });
  };

  return { handlePayment };
};
