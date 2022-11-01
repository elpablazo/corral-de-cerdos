import { gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next/types";
import { client } from "../lib/apollo";

export default function Index({ autores }: any) {
  console.log(autores);

  return (
    <div className="text-center">
      <h1
        className={`font-bold tracking-tighter text-4xl md:text-5xl px-2 pt-12`}
      >
        <span className="text-mud">Corral</span>{" "}
        <span className="text-dark">de</span>{" "}
        <span className="text-pig">cerdos</span>
      </h1>
      <h2 className="text-grass font-cursive text-xl md:text-3xl font-bold">
        Eslogan de la página.
      </h2>

      {/* CERCA */}
      <div className="pt-20">
        <div className="flex md:hidden overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Image
              key={i}
              src="/icons/fence.svg"
              alt="Cerca"
              width={100}
              height={50}
            />
          ))}
        </div>
        <div className="md:flex hidden overflow-hidden space-x-reverse">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => (
            <Image
              key={i}
              src="/icons/fence.svg"
              alt="Cerca"
              width={150}
              height={75}
            />
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <div className="w-full py-20 md:py-30 h-full bg-mud text-white font-serif text-2xl md:text-4xl px-4 md:px-20 items-center justify-between flex flex-col">
        <p>
          &quot;Cerdos, cerdos, cerdos. Carne tan deliciosa que exprime nuestra
          mandíbula. ¿Será porque estos animales son tan iguales a nosotros, los
          humanos?&quot;
        </p>
        <button className="bg-pig text-xl md:text-2xl font-sans px-4 py-2 mt-8 md:mt-20 rounded font-semibold">
          ¡Oink!
        </button>
      </div>

      <div id="nosotros" className="py-8 md:py-12 space-y-8 md:space-y-12">
        <h1 className="text-gray-500 font-bold font-sans text-4xl md:text-5x tracking-tighter">
          ¿Quiénes somos?
        </h1>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:justify-evenly">
          {autores.map((autor: any) => (
            <div
              key={autor.id}
              className="w-auto flex flex-col justify-center items-center font-cursive text-3xl font-bold space-y-4"
            >
              <Image
                width={150}
                height={150}
                className="hidden md:flex rounded-full"
                src={autor.attributes.Foto.data.attributes.url}
                alt={autor.attributes.Foto.data.attributes.alternativeText}
              />
              <Image
                width={100}
                height={100}
                className="md:hidden flex rounded-full"
                src={autor.attributes.Foto.data.attributes.url}
                alt={autor.attributes.Foto.data.attributes.alternativeText}
              />
              <p>{autor.attributes.Nombre.split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const autores = await client.query({
    query: gql`
      query Autores {
        autors {
          data {
            id
            attributes {
              Foto {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              Nombre
              Slug
              TextoIntroductorio
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      autores: autores.data.autors.data,
    }, // will be passed to the page component as props
  };
};
