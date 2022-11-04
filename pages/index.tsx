import { gql } from "@apollo/client";
import Image from "next/image";
import { GetStaticProps } from "next/types";
import { client } from "../lib/apollo";
import { useGlobalStore } from "../lib/store";
import ReactMarkdown from "react-markdown";
import Button from "../components/button";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const animationTexts = [
  {
    a: "Cerdos, cerdos, cerdos. Carne tan deliciosa que exprime nuestra mandíbula",
    b: "¿Será porque estos animales son tan iguales a nosotros, los humanos?",
  },
  {
    a: "Quizá cuando miramos a un cerdo nos encontramos a nosotros mismos: clavamos los colmillos",
    b: "¿Será porque estos animales son tan iguales a nosotros, los humanos?",
  },
  {
    a: "Quizá cuando miramos a un cerdo nos encontramos a nosotros mismos:",
    b: "el olor de la sangre y las excreciones ajenas nos hacen vibrar hasta la locura.",
  },
  {
    a: "Declaremos la guerra.",
  },
  {
    a: "Bienvenidos.",
  },
  {
    a: "Revista corral de cerdos.",
  },
];

export default function Index({ autores }: any) {
  const { toggleModal, setModalContent } = useGlobalStore((state) => ({
    toggleModal: state.toggleModal,
    setModalContent: state.setModalContent,
  }));

  // Hook para controlar de forma manual las animaciones de framer
  const controlsA = useAnimation();
  const controlsB = useAnimation();

  // State para guardar el texto actual del manifesto
  const [texto, setTexto] = useState({ textos: animationTexts[0], indice: 0 });

  // FUnción que rota el texto una vez que la animación termine
  function rotateText() {
    // Si ya es el último texto, regresamos al primero; si no, vamos al siguiente
    setTexto(
      texto.indice < animationTexts.length - 1
        ? {
            indice: texto.indice + 1,
            textos: animationTexts[texto.indice + 1],
          }
        : { indice: 0, textos: animationTexts[0] }
    );
  }

  // Cada vez que el texto rote, se vuelve a poner play a la animación
  useEffect(() => {
    controlsA.start({
      opacity: [0, 1, 1, 0],
      y: [-20, 0, 0, -20],
    });

    controlsB.start({
      opacity: [0, 1, 1, 0],
      y: [20, 0, 0, 20],
    });
  }, [texto, controlsA, controlsB]);

  // Transición de los textos
  const transiton = {
    duration: 4,
    times: [0, 0.05, 0.95, 1],
    stiffness: 300,
    damping: 24,
  };

  return (
    <div className="text-center">
      <h1
        className={`px-2 pt-12 text-4xl font-bold tracking-tighter md:text-5xl`}
      >
        <span className="text-mud">Corral</span>{" "}
        <span className="text-dark">de</span>{" "}
        <span className="text-pig">cerdos</span>
      </h1>
      <h2 className="font-cursive text-xl font-bold text-grass md:text-3xl">
        Eslogan de la página.
      </h2>

      {/* CERCA */}
      <div className="pt-20">
        <div className="flex overflow-hidden md:hidden">
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
        <div className="hidden space-x-reverse overflow-hidden md:flex">
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
      <div
        style={{
          height: "50vh",
        }}
        className="flex h-full min-h-full w-full flex-col items-center justify-evenly space-y-8 bg-mud py-8 px-8 font-serif text-xl text-white md:space-y-16 md:px-20 md:py-16 md:text-2xl lg:text-4xl"
      >
        <div className="flex flex-col space-y-4">
          <AnimatePresence>
            <motion.p
              animate={controlsA}
              transition={transiton}
              onAnimationComplete={() => rotateText()}
            >
              &quot;{texto.textos.a}
              {!texto.textos.b && <span>&quot;</span>}
            </motion.p>
          </AnimatePresence>
          {texto.textos.b && (
            <AnimatePresence>
              <motion.p animate={controlsB} transition={transiton}>
                {texto.textos.b}&quot;
              </motion.p>
            </AnimatePresence>
          )}
        </div>
        <Button className="md:text-2xl" onClick={(e) => console.log(e)}>
          ¡Oink!
        </Button>
      </div>

      <div id="nosotros" className="space-y-8 py-8 md:space-y-12 md:py-12">
        <h1 className="md:text-5x font-sans text-4xl font-bold tracking-tighter text-gray-500">
          ¿Quiénes somos?
        </h1>
        <div className="flex flex-col space-y-8 md:flex-row md:justify-evenly md:space-y-0">
          {autores.map((autor: any) => (
            <div
              key={autor.id}
              className="flex w-auto cursor-pointer flex-col items-center justify-center space-y-4 font-cursive text-3xl font-bold"
              onClick={() => {
                setModalContent(
                  <div className="flex flex-col items-center justify-center text-center">
                    <Image
                      width={150}
                      height={150}
                      className="hidden rounded-full md:flex"
                      src={autor.attributes.Foto.data.attributes.url}
                      alt={
                        autor.attributes.Foto.data.attributes.alternativeText
                      }
                    />
                    <Image
                      width={100}
                      height={100}
                      className="flex rounded-full md:hidden"
                      src={autor.attributes.Foto.data.attributes.url}
                      alt={
                        autor.attributes.Foto.data.attributes.alternativeText
                      }
                    />
                    <p className="font-sans text-lg font-bold tracking-tighter text-gray-500">
                      Sobre mí,{" "}
                      <span className="text-pig">
                        {autor.attributes.Nombre}
                      </span>
                      .
                    </p>
                    <div className="max-h-72 overflow-y-auto pt-8 md:px-16">
                      <ReactMarkdown>
                        {autor.attributes.TextoIntroductorio}
                      </ReactMarkdown>
                    </div>
                    <Button>Quiero leerte</Button>
                  </div>
                );
                toggleModal();
              }}
            >
              <Image
                width={150}
                height={150}
                className="hidden rounded-full md:flex"
                src={autor.attributes.Foto.data.attributes.url}
                alt={autor.attributes.Foto.data.attributes.alternativeText}
              />
              <Image
                width={100}
                height={100}
                className="flex rounded-full md:hidden"
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
