import { gql } from "@apollo/client";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { GetStaticProps } from "next/types";
import { client } from "../lib/apollo";

export default function Page({ manifiesto }: any) {
  return (
    <div className="flex flex-col pt-16 text-center">
      <NextSeo title="Manifiesto" />
      <motion.h1
        key="text"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-shadow-light py-12 px-2 text-2xl font-bold tracking-tighter text-dark md:text-4xl lg:text-5xl"
      >
        <span className="text-mud">Nuestro</span>{" "}
        <span className="text-pig">manifiesto</span>
      </motion.h1>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose mx-auto justify-center space-y-4 p-8 pb-16 text-justify md:px-20 md:text-lg lg:px-32 dark:text-white/60"
        dangerouslySetInnerHTML={{ __html: manifiesto }}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await client.query({
    query: gql`
      query Manifiesto {
        manifiesto {
          data {
            attributes {
              Texto
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      manifiesto: response.data.manifiesto.data.attributes.Texto,
    }, // will be passed to the page component as props
  };
};
