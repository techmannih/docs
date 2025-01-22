import { useEffect } from 'react';

export default function Home() {
  // Redirect to Quickstart page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/docs/quickstart');
    }
  }, []);

  return null;
}
