import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { client } from "../../lib/apollo";
import Image from "next/image";

export default function Page({ perfil, posts }: any) {
  console.log(perfil);

  return (
    <div className="flex flex-col items-center justify-center pt-16 text-center">
      <div className="container">
        {/* BANNER */}
        <div className="flex-col md:flex-row">
          {/* FOTO Y NOMBRE */}
          <div className="flex w-full flex-col items-center justify-center space-y-4 px-16 md:flex-row md:items-end md:justify-start md:space-y-0 md:space-x-8">
            <Image
              width={125}
              height={125}
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
            <p className="text-shadow-light font-sans text-xl font-bold tracking-tighter text-gray-500 md:text-3xl">
              Sobre mí, <span className="text-pig">{perfil.Nombre}</span>.
            </p>
          </div>
          <div className="hidden h-full w-full items-end justify-end">
            redes sociales
          </div>
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
            attributes {
              Titulo
              Slug
              Portada {
                data {
                  attributes {
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
