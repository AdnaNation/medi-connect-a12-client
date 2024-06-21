import SectionTitle from "../../components/SectionTitle";
import usePayment from "../../hooks/usePayment";

const Invoice = () => {
  const [payments] = usePayment();
  return (
    <div>
      <SectionTitle heading="My Invoice"></SectionTitle>
      {payments.length}
    </div>
  );
};

export default Invoice;
