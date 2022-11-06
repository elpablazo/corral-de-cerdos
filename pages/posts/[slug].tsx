import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { client } from "../../lib/apollo";
import Image from "next/image";
import { DateTime } from "luxon";
import Link from "next/link";
import Head from "next/head";

export default function Page({ post }: any) {
  const fecha = DateTime.fromISO(post.publishedAt).toLocaleString(
    DateTime.DATE_FULL
  );

  return (
    <div className="flex flex-col items-center justify-center pt-12 text-center">
      <Head>
        <title>🐽 - {post.Titulo}</title>
      </Head>
      <div className="container flex flex-col items-center justify-center space-y-4">
        {/* PORTADA */}
        <div className="relative flex aspect-[3/2] h-auto w-full items-center justify-center self-center overflow-hidden rounded md:aspect-[3/1]">
          <Image
            quality={100}
            fill={true}
            className="mx-auto w-full max-w-3xl self-center md:rounded-lg"
            src={post.Portada.data.attributes.url}
            alt={post.Portada.data.attributes.alternativeText}
          />
        </div>
        {/* FECHA */}
        <p>{fecha}</p>

        {/* TITULO */}
        <h1 className="text-xl font-bold uppercase md:text-2xl lg:text-4xl">
          {post.Titulo}
        </h1>

        {/* AUTORES */}
        <Link href={`/autores/${post.autors.data[0].attributes.Slug}`}>
          <div className="flex items-center space-x-4">
            <Image
              quality={100}
              width={50}
              height={50}
              className="self-center rounded-full"
              src={post.autors.data[0].attributes.Foto.data.attributes.url}
              alt={
                post.autors.data[0].attributes.Foto.data.attributes
                  .alternativeText
              }
            />
            <p className="text-shadow-light font-semibold text-pig">
              {post.autors.data[0].attributes.Nombre}
            </p>
          </div>
        </Link>

        <div
          className="prose space-y-4 px-8 pt-8 pb-16 text-justify  dark:text-white/60"
          dangerouslySetInnerHTML={{
            __html: post.Contenido,
          }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.query({
    query: gql`
      query RutasDePosts {
        posts {
          data {
            attributes {
              Slug
            }
          }
        }
      }
    `,
  });

  const paths = response.data.posts.data.map((ruta: any) => ({
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
      query Post($slug: String) {
        posts(filters: { Slug: { eq: $slug } }) {
          data {
            attributes {
              publishedAt
              autors {
                data {
                  attributes {
                    Slug
                    Nombre
                    Foto {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
              Portada {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              Titulo
              Contenido
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
      post: response.data.posts.data[0].attributes,
    }, // will be passed to the page component as props
  };
};
