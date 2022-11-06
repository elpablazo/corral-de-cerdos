import { Formik, Form, Field } from "formik";
import Button from "./button";
import * as yup from "yup";
import { newsletter } from "../lib/apollo";

export default function Newsletter() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-8 bg-white py-16 px-8 text-center text-dark"
      style={{
        height: "40vh",
      }}
    >
      <hr className="w-full" />
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-xl font-bold tracking-tighter">
          ¿Te gustaría recibir nuestras marranadas directamente en tu corral?
        </h2>
        <h3>Suscríbete y no te pierdas nada.</h3>
      </div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Ingresa un correo válido.")
            .required("Llena este campo."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          async function name() {
            const x = await newsletter({
              Correo: values.email,
            });
          }

          name();
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex w-72 flex-col items-center justify-center gap-8 px-8 md:flex-row">
            <div className="relative flex flex-col space-y-2">
              <Field
                type="email"
                name="email"
                placeholder="tucorreo@email.com"
                className="w-72 rounded-lg border-mud bg-slate-50"
              />
            </div>
            <Button className="w-34 border-0">Suscribirme</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
