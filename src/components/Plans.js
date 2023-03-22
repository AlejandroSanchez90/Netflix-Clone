import './Plans.css';
import db from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';

function Plans() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, where('active', '==', true));
      const querySnap = await getDocs(q);
      const products = {};

      querySnap.forEach(async (product) => {
        products[product.id] = product.data();
        const pricesCollection = collection(product.ref, 'prices');
        const pricesSnap = await getDocs(pricesCollection);

        pricesSnap.forEach((doc) => {
          products[product.id].prices = {
            priceId: doc.id,
          };
        });
      });
    };
    fetching();
  }, []);
  return <div className='plans'>Plans</div>;
}

export default Plans;
