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
import { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { toast } from 'react-toastify';

function Plans() {
  const [plans, setPlans] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSub = async () => {
      const customersCollection = collection(db, 'customers');
      const userDoc = await doc(customersCollection, user.uid);
      const subscriptionsCollection = collection(userDoc, 'subscriptions');
      const subscriptionsSnapshot = await getDocs(subscriptionsCollection);

      subscriptionsSnapshot.forEach((snapshot) => {
        const subData = snapshot.data();
        setSubscription({
          role: subData.role,
          current_period_end: subData.current_period_end.seconds,
          current_period_start: subData.current_period_start.seconds,
        });
      });
    };

    fetchSub();
  }, [user.uid]);

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

      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='plans'>
      {subscription && (
        <p>Renewal date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>
      )}
      {Object.entries(plans).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        console.log(isCurrentPackage);
        return (
          <div
            className={`${isCurrentPackage && 'plans__plans--disabled'} plans__plans`}
            key={productId}>
            <div className='plans__info'>
              <h5>{productData.name}</h5>
              <h6>{truncate(productData.description, 40)}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
