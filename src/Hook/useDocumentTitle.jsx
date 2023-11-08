import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const baseTitle = 'PHero';

function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname.split("/")[1]; // Assuming your route is like "/all-products"
    const title = pathName ? `${baseTitle} | ${pathName.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}` : baseTitle;
    document.title = title;
  }, [location]);
}

export default useDocumentTitle;
