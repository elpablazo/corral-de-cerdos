import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { client } from "../../lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../../components/button";
import { useState } from "react";

export default function Page({ perfil, posts }: any) {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center pt-12 text-center">
      <div className="container flex flex-col px-4 md:flex-row md:space-x-8">
        {/* FOTO Y NOMBRE */}
        <div className="flex flex-col items-center space-y-2 bg-white pb-2 transition-all ease-in dark:bg-dark">
          <Image
            width={150}
            height={150}
            className="hidden rounded-full md:flex"
            src={perfil.Foto.data.attributes.url}
            alt={perfil.Foto.data.attributes.alternativeText}
          />
          <Image
            width={100}
            height={100}
            className="flex rounded-full md:hidden"
            src={perfil.Foto.data.attributes.url}
            alt={perfil.Foto.data.attributes.alternativeText}
          />
          <p className="text-shadow-light font-sans text-xl font-bold tracking-tighter text-pig md:text-3xl">
            {perfil.Nombre}
          </p>
        </div>
        <hr className="w-full px-4 md:hidden" />

        {/* POSTS */}
        <div className="flex w-full flex-col space-y-8 p-4">
          <div className="flex flex-col space-y-4">
            <div
              className={`prose space-y-4 text-justify dark:text-white/60 md:px-16 ${
                !showFullText && `max-h-32 overflow-hidden`
              }`}
              dangerouslySetInnerHTML={{
                __html: perfil.TextoIntroductorio,
              }}
            />

            <Button
              primary={false}
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? "Menos" : "Leer más"}
            </Button>
          </div>

          <hr className="w-full px-4 md:hidden" />

          <p className="text-shadow-light font-sans text-xl font-bold tracking-tighter text-dark md:text-3xl">
            Mis posts
          </p>
          {/* SEPARADOR */}
          {posts.map((post: any, i: number) => (
            <Link
              key={post.id}
              href={`/posts/${post.attributes.Slug}`}
              className="flex w-full justify-between space-y-2"
            >
              <Button
                primary={parseInt(post.id) % 2 === 0}
                className={`w-max ${
                  parseInt(post.id) % 2 === 0
                    ? "md:order-1 md:justify-end"
                    : "md:order-2 md:justify-start"
                }`}
              >
                {showFullText ? "Menos" : "Leer más"}
              </Button>
              <h1
                className={`text-xl font-bold uppercase dark:text-white/60 md:self-start ${
                  parseInt(post.id) % 2 === 0
                    ? "pr-8 md:order-2 md:justify-end"
                    : "md:order-1 md:justify-start"
                }`}
              >
                {i + 1}: {post.attributes.Titulo}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.query({
    query: gql`
      query RutasDeAutores {
        autors {
          data {
            attributes {
              Slug
            }
          }
        }
      }
    `,
  });

  const paths = response.data.autors.data.map((ruta: any) => ({
    params: {
      slug: ruta.attributes.Slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Si el slug no existe, redirigimos a la página de error
  if (!context.params?.slug) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Identificamos si el slug es un array o un string
  let slug;
  // Si es array, obtenemos el primer elemento
  if (Array.isArray(context.params?.slug)) {
    slug = context.params.slug[0];
  }
  // Si no es array, obtenemos el slug
  else {
    slug = context.params.slug;
  }

  const response = await client.query({
    query: gql`
      query PerfilDelAutor($slug: String) {
        autors(filters: { Slug: { eq: $slug } }) {
          data {
            attributes {
              Foto {
                data {
                  attributes {
                    url
                  }
                }
              }
              TextoIntroductorio
              Nombre
            }
          }
        }
        posts(filters: { autors: { Slug: { eq: $slug } } }) {
          data {
            id
            attributes {
              Titulo
              Slug
              Portada {
                data {
                  attributes {
                    width
                    height
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return {
    props: {
      perfil: response.data.autors.data[0].attributes,
      posts: response.data.posts.data,
    }, // will be passed to the page component as props
  };
};
