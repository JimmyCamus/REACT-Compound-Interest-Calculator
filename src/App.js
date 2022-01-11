import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "./components/Container.js";
import Section from "./components/Section.js";
import Input from "./components/Input.js";
import Button from "./components/Button.js";
import Balance from "./components/Balance.js";

const compoundInterest = (initialDeposit, contribution, years, rate) => {
  let total = initialDeposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const App = () => {
  const [balance, setBalance] = useState("");

  const handleSubmit = ({ initialDeposit, contribution, years, rate }) => {
    const value = compoundInterest(
      Number(initialDeposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setBalance(formatter.format(value));
  };

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            initialDeposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            initialDeposit: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un número"),
            contribution: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un número"),
            years: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El año mínimo es 0"),
            rate: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo es 0")
              .max(1, "El valor máximo es 1"),
          })}
        >
          <Form>
            <Input name="initialDeposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Porcentaje" />
            <Button type="submit">CALCULAR</Button>
          </Form>
        </Formik>
        {balance !== "" ? <Balance>Balance: {balance}</Balance> : null}
      </Section>
    </Container>
  );
};

export default App;
