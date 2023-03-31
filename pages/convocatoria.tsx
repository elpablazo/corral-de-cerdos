import router from "next/router";
import Button from "../components/button";

export default function Page() {
  // En esta página se muestra la convocatoria para los nuevos escritores
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-shadow-light px-4 pt-12 text-center text-5xl font-bold tracking-tighter text-dark lg:text-4xl">
        Así que quieres ser parte del{" "}
        <span className="text-pig dark:text-pig/75">corral</span>.
      </h1>
      <div className="flex flex-col gap-8 pt-16 text-justify">
        <h2 className="text-center text-xl font-bold">¿Qué somos?</h2>
        <div className="prose mx-auto w-full justify-center gap-8 text-justify text-dark dark:text-white/75">
          <p>
            Corral de cerdos es una revista que busca desenterrar la{" "}
            <span className="text-mud">mugre</span> de entre el lodazal humano.
          </p>
          <p>
            Creemos que dentro de todos aquellos que se declaran puros, impíos y
            mártires se enconde una horrible capa de cerdos, cerdos y más
            cerdos. De esta forma, nuestro corral es el agua: un líquido fresco,
            transparente, que revitaliza a la par que deshace la mugre del
            exterior para revelar la esencia de{" "}
            <span className="text-pig">cada uno</span>.
          </p>

          <p>
            Nuestras herramientas son la{" "}
            <span className="text-pig">literatura</span> y la{" "}
            <span className="text-pig">tecnología</span>. Confiamos en que el
            arte puede apoyarse de los avances científicos para lograr nuevas
            formas narrativas y de expresión artística, y no para limitarnos.
          </p>
          <p className="text-center font-bold">
            Dejemos a los humanos ser humanos, y que los robots se encarguen del
            resto.
          </p>
          <p>
            <span className="font-bold">Subversión</span> es el motto de la
            revista. Un buen escritor necesita estar a la altura de la época en
            la que vive y, por esa razón, nuestro compromiso es involucrarnos en
            actualidad. (Incluso cuando la sociedad requiera recordar el
            pasado). Para ser breves: Hay que ser{" "}
            <span className="text-pig">extrañamente refrescantes</span>.
          </p>
          <p>
            Si quieres conocer un poco más sobre esto, lee nuestro manifiesto
            aquí:
          </p>
          <div className="mx-auto flex justify-center text-center">
            <Button onClick={() => router.push("/manifiesto")}>Oink</Button>
          </div>
        </div>

        <h2 className="pt-16 text-center text-xl font-bold">¿Cómo entrar?</h2>
        <div className="prose mx-auto w-full justify-center gap-8 text-justify text-dark dark:text-white/75">
          <p>
            Sí estás listo para afrontar realidad animal que nos rodea, y
            quieres unirte al corral, solo tienes que enviarnos tu mejor texto
            al siguiente correo:{" "}
          </p>
          <div className="flex justify-center">
            <a
              href="mailto:contacto@corraldecerdos.com"
              className="justify-center text-center font-bold text-pig"
            >
              contacto@corraldecerdos.com
            </a>
          </div>
          <p>
            NO discriminamos a ninguna persona por su edad, raza, género, origen
            o posición social o económica. Al fin y al cabo, todos somos cerdos.
          </p>
          <p>
            El tema y el formato del texto son completamente libres; buscamos
            algo que nos deje atónitos. Lo único que no permitiremos son los
            discursos de odio. De eso ya hay suficiente en internet. La
            condición es que el texto sea propio y no exceda las 5 páginas de
            longitud.
          </p>
          <p>
            No hay límite de tiempo (pero pssst, hey, entre más rápido lo
            envíes, más rápido lo leeremos ;). Y no olvides poner tu nombre o
            pseudónimo, queremos conocerte.
          </p>
          <p>
            Si fuiste seleccionado, recibirás nuestra respuesta un par de días,
            así como las instrucciones para los próximos pasos.
          </p>
          <p className="text-center text-xl font-bold">
            ¿Qué dices? ¿Listo para ser uno más del corral?
          </p>
          <a
            className="decoration-none mx-auto flex justify-center text-center no-underline"
            href="mailto:contacto@corraldecerdos.com"
          >
            <Button>Quiero participar</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
