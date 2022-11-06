import Image from "next/image";
import { GetStaticProps } from "next/types";
import { client } from "../lib/apollo";
import { useGlobalStore } from "../lib/store";
import ReactMarkdown from "react-markdown";
import Button from "../components/button";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

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

export default function Index({ autores, posts }: any) {
  // Router de nextjs
  const router = useRouter();
  // Store del modal
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
      <Head>
        <title>🐽</title>
      </Head>
      <h1
        className={`text-shadow-light px-2 pt-12 text-4xl font-bold tracking-tighter md:text-5xl`}
      >
        <span className="text-mud dark:text-pig/75">Corral</span>{" "}
        <span className="text-dark dark:text-pig/75">de</span>{" "}
        <span className="text-pig dark:text-pig/75">cerdos</span>
      </h1>
      <h2 className="font-cursive text-xl font-bold text-grass dark:text-white/75 md:text-3xl">
        Revista literaria.
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

      {/* MANIFIESTO */}
      <div
        style={{
          height: "50vh",
        }}
        className="flex h-full min-h-full w-full flex-col items-center justify-evenly space-y-8 bg-mud py-8 px-8 font-serif text-xl text-white dark:bg-mud/50 md:space-y-16 md:px-20 md:py-16 md:text-2xl lg:text-4xl"
      >
        <div className="flex flex-col space-y-4 dark:text-white/95">
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
        <Button
          className="md:text-2xl"
          onClick={() => router.push("/manifiesto")}
        >
          ¡Oink!
        </Button>
      </div>

      {/* NOSOTROS */}
      <div id="nosotros" className="space-y-8 py-8 md:space-y-12 md:py-12">
        <h1 className="font-sans text-4xl font-bold tracking-tighter text-gray-500 dark:text-white/75">
          ¿Quiénes somos?
        </h1>
        <div className="flex flex-col space-y-8 md:flex-row md:justify-evenly md:space-y-0">
          {autores.map((autor: any, i: number) => (
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.95,
              }}
              key={autor.id}
              className="flex w-auto cursor-pointer flex-col items-center justify-center space-y-4 font-cursive text-3xl font-bold"
              onClick={() => {
                setModalContent(
                  <div className="flex flex-col items-center justify-center space-y-8 p-8 pt-4 text-center">
                    {/* PERFIL */}
                    <div className="flex flex-col items-center space-y-4">
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
                      <p className="text-shadow-light font-sans text-lg font-bold tracking-tighter text-gray-500">
                        Sobre mí,{" "}
                        <span className="text-pig">
                          {autor.attributes.Nombre}
                        </span>
                        .
                      </p>
                    </div>

                    {/* TEXTO */}
                    <div
                      className="prose max-h-72 space-y-4 overflow-y-auto text-justify dark:text-white/60 md:px-16"
                      dangerouslySetInnerHTML={{
                        __html: autor.attributes.TextoIntroductorio,
                      }}
                    />

                    <Button
                      className="mt-4"
                      onClick={() => {
                        router.push(`/autores/${autor.attributes.Slug}`);
                        toggleModal();
                      }}
                    >
                      Quiero leerte
                    </Button>
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
              <motion.p
                className={`text-shadow-light ${
                  i % 3 === 0
                    ? "text-pig"
                    : i % 2 === 0
                    ? "text-grass"
                    : "text-dark"
                } dark:text-dark`}
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {autor.attributes.Nombre.split(" ")[0]}
              </motion.p>
            </motion.div>
          ))}
        </div>
        <blockquote className="px-16 text-center text-xl font-bold text-gray-700">
          Un grupo de anfitriones con tierra debajo de las uñas.
        </blockquote>
      </div>

      {/* LO QUE ESCRIBIMOS */}
      <div
        id="que-escribimos"
        className="space-y-8 bg-grass py-8 dark:bg-grass/60 md:space-y-12 md:py-12"
      >
        <div className="flex flex-col space-y-6">
          <h1 className="font-sans text-4xl font-bold tracking-tighter text-white dark:text-white/75">
            Lo que escribimos
          </h1>
          <h2 className="font-sans text-2xl font-bold tracking-tighter text-white dark:text-white/75">
            Tema del mes:{" "}
            <span className="text-shadow-light text-pig">cerdos</span>
          </h2>
        </div>

        {/* TEXTOS */}
        <div className="flex flex-col flex-wrap gap-8 px-12 md:flex-row md:justify-evenly md:space-y-0">
          {posts.map((post: any, i: number) => (
            <Link key={post.id} href={`/posts/${post.attributes.Slug}`}>
              <motion.div
                whileTap={{
                  scale: 0.95,
                }}
                className="mx-auto flex w-auto flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 text-center"
              >
                <div
                  className="h-40 w-40 rounded-lg md:h-72 md:w-72"
                  style={{
                    backgroundPosition: "center center",
                    backgroundImage: `url("${post.attributes.Portada.data.attributes.url}")`,
                  }}
                ></div>
                <h1
                  className={`flex flex-wrap truncate px-4 py-2 text-xl font-bold uppercase dark:text-white/60`}
                >
                  <span className="hidden md:flex">
                    {`${post.attributes.Titulo.slice(0, 22)}${
                      post.attributes.Titulo.length > 22 && `...`
                    }`}
                  </span>
                  <span className="md:hidden">
                    {post.attributes.Titulo.slice(0, 15)}...
                  </span>
                </h1>
                <Button
                  primary={parseInt(post.id) % 2 === 0}
                  className={`w-max`}
                >
                  Leer artículo
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>

        <h1 className="font-sans text-4xl font-bold tracking-tighter text-white dark:text-white/75">
          Nuevas temáticas, nuevos textos cada inicio de mes.
        </h1>
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

  const posts = await client.query({
    query: gql`
      query Posts {
        posts {
          data {
            id
            attributes {
              Titulo
              Slug
              Portada {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      autores: autores.data.autors.data,
      posts: posts.data.posts.data,
    }, // will be passed to the page component as props
  };
};
