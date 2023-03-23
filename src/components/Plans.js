import './Plans.css';
import db from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { toast } from 'react-toastify';
function Plans() {
  const [plans, setPlans] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchPlans = async () => {
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

        setPlans(products);
      });
    };
    fetchPlans();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };
  const loadCheckout = async (priceId) => {
    const customersCollection = collection(db, 'customers');
    const userDocRef = await doc(customersCollection, user.uid);
    const userCheckoutCollection = collection(userDocRef, 'checkout_sessions');

    let createDoc;
    try {
      createDoc = await addDoc(userCheckoutCollection, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      return;
    }

    onSnapshot(createDoc, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        toast.error(`An error occured: ${error.message}`);
      }
      console.log(snap.data());
      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='plans'>
      {Object.entries(plans).map(([productId, productData]) => {
        return (
          <div className='plans__plans' key={productId}>
            <div className='plans__info'>
              <h5>{productData.name}</h5>
              <h6>{truncate(productData.description, 40)}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
