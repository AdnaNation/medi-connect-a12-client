import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BlankSpace from "../../../components/BlankSpace";
import SectionTitle from "../../../components/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckOut = () => {
  return (
    <div className="min-h-screen">
      <BlankSpace></BlankSpace>
      <SectionTitle heading="Check Out"></SectionTitle>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default CheckOut;
