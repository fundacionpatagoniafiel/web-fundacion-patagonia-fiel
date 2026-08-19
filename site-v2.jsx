/* Fundación Patagonia Fiel — v2: photo-driven, immersive  */
const { useState, useEffect, useRef } = React;

const PHOTOS = {
  hero: "assets/hero-san-antonio-oeste.jpg",
  // Coastal Patagonia / sea
  coast1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
  // Patagonia landscape
  mesa: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1600&q=80&auto=format&fit=crop",
  steppe: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80&auto=format&fit=crop",
  // Wildlife
  bird: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=1600&q=80&auto=format&fit=crop",
  // Education / community
  classroom: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80&auto=format&fit=crop",
  workshop: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80&auto=format&fit=crop",
  research: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=80&auto=format&fit=crop",
  // Beach / tide
  tide: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
  rocks: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&q=80&auto=format&fit=crop",
  // Hands / community
  hands: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop",
  // Wide horizon
  horizon: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80&auto=format&fit=crop",
  // Team avatars (placeholder portraits)
  p1: "assets/maxi-bertini.jpg",
  p2: "assets/dennis-landete.jpg",
  p3: "assets/juan-saad.jpg",
  p4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces",
  p5: "assets/marianela-gastaldi.jpg",
  p6: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&crop=faces",
  p7: "assets/agustina-tievas.jpg",
};

const PROYECTOS = [
  {
    slug: "proyecto-charlas",
    title: "Educación Ambiental",
    img: "assets/proyecto-educacion-ambiental.jpg",
    alt: "Charla en el aula",
    short: "La educación ambiental es la herramienta clave para formar una ciudadanía responsable y comprometida con su cuidado.",
    full: "Promover la conciencia ambiental en estudiantes de nivel medio a partir del conocimiento de la Bahía San Antonio como sistema socioambiental. Mediante charlas-taller con contenido científico accesible, se busca formar ciudadanía responsable y comprometida con el cuidado de uno de los ecosistemas costeros más relevantes del Golfo San Matías.",
    bulletsHead: "Contenidos de la charla-taller",
    bullets: [
      "Biodiversidad de la bahía: especies clave y su rol ecológico.",
      "Dinámica de mareas extremas y su importancia ecosistémica.",
      "Impactos de las actividades humanas sobre el ambiente costero.",
      "Estrategias de conservación y prácticas sustentables.",
      "Espacio de participación e intercambio con los estudiantes.",
    ],
  },
  {
    slug: "proyecto-biodiversidad",
    title: "Canal del Indio",
    img: "assets/proyecto-canal-del-indio.jpg",
    alt: "Vista satelital del Canal del Indio",
    short: "Cuidar a nuestro territorio es la mejor bienvenida a quienes nos visitan.",
    full: "Transformar el margen norte del Canal del Indio —hoy degradado por acumulación de residuos— en un paseo de salud activo y verde, de acceso libre para toda la comunidad. La acción de limpieza y puesta en valor se realizará cada año en noviembre–diciembre, y se consolidará como el gesto colectivo de la localidad hacia su territorio, como bienvenida a la temporada de aire libre y como símbolo de identidad y orgullo patagónico.",
    bulletsHead: "Pilares del proyecto",
    bullets: [
      "Puesta en valor ambiental: limpieza y recuperación paisajística del canal.",
      "Paseo de salud: espacio para caminatas, deporte y contacto con la naturaleza.",
      "Articulación comunitaria: vecinos, empresas e instituciones juntas.",
      "Continuidad: acción anual que se renueva antes de cada temporada.",
    ],
  },
  {
    slug: "proyecto-mareas",
    title: "Estación experimental de Biofiltración",
    img: "assets/proyecto-biofiltracion.jpg",
    alt: "Trabajo de laboratorio con esponjas marinas",
    short: "Dejar que la naturaleza nos enseñe es la forma más sabia de proteger nuestro mar.",
    full: "Evaluar el potencial de las esponjas marinas como biofiltros naturales, capaces de mejorar la calidad del agua en ambientes costeros eutrofizados. El experimento se desarrollará en el Lago Artificial de la ciudad, conectado al canal de marea mediante una compuerta regulable, bajo condiciones controladas y sin interferir con las actividades recreativas y educativas del espacio.",
    bulletsHead: "Objetivos específicos",
    bullets: [
      "Cultivar fragmentos de las especies de esponjas más abundantes de la bahía.",
      "Medir la capacidad de filtración de esponjas marinas sobre partículas y nutrientes disueltos.",
      "Evaluar el rol de los simbiontes de las esponjas en la transformación de nutrientes.",
      "Analizar la supervivencia, crecimiento y eficiencia de adhesión a distintos sustratos.",
      "Generar información científica local aplicable a estrategias de manejo ambiental.",
    ],
  },
  {
    slug: "proyecto-pensamiento",
    title: "Arroyo Valcheta",
    img: "assets/proyecto-arroyo-valcheta.jpg",
    alt: "Monitoreo del arroyo Valcheta con estudiantes",
    short: "Cuidar el arroyo Valcheta es cuidar el ambiente, la producción y la calidad de vida de toda la comunidad.",
    full: "Contribuir al conocimiento y la valoración del arroyo Valcheta como un recurso socio-ambiental estratégico, mediante el trabajo articulado entre la universidad y la comunidad local. El proyecto integra investigación científica, monitoreo participativo y educación ambiental, generando información clave para el uso sustentable del recurso.",
    bulletsHead: "Objetivos específicos",
    bullets: [
      "Monitoreo físico-químico y biológico del agua (temperatura, pH, oxígeno disuelto, nutrientes).",
      "Participación activa de estudiantes secundarios, universitarios y productores locales en el monitoreo ambiental.",
      "Educación ambiental: fortalecer el vínculo entre la ciencia y la comunidad.",
      "Promover el uso responsable y la conservación del arroyo Valcheta.",
    ],
  },
  {
    slug: "proyecto-observatorio",
    title: "Observatorio Oceanográfico Costero",
    img: "assets/proyecto-observatorio.jpg",
    alt: "Monitoreo costero en la Bahía San Antonio",
    short: "Observar el mar de forma sostenida es la única manera de entender cómo cambia.",
    full: "Relevar datos ambientales a largo plazo, proporcionando una base sólida para la investigación y la gestión de recursos marinos costeros. Los nodos operan con frecuencia mensual registrando variables físicas, químicas y biológicas en tres sitios de alto interés científico y de gestión.",
    contextHead: "Contexto regional",
    context: "La costa atlántica de Río Negro (40–42°S) presenta dos regímenes oceanográficos: el frente estuarial del Río Negro al noreste y aguas de plataforma subantártica al sur. Marca la transición entre las provincias biogeográficas Argentina y Magallánica, con cinco áreas naturales marinas protegidas y notable biodiversidad. El conocimiento actual es escaso y fragmentado, limitando la evaluación de tendencias y pronósticos a corto y mediano plazo.",
    bullets: [],
  },
];

// Poné esto en true cuando tengamos noticias reales para mostrar.
const SHOW_NOVEDADES = false;

const NOVEDADES = [
  {
    slug: "noticia-1",
    title: "Noticia 1",
    img: PHOTOS.workshop,
    alt: "Noticia 1",
    short: "Contá acá en una línea de qué trató esta novedad.",
    full: "Contá acá cuándo se hizo este evento, qué pasó y quiénes participaron. Este es un texto de relleno: reemplazalo por la crónica real de la novedad.",
  },
  {
    slug: "noticia-2",
    title: "Noticia 2",
    img: PHOTOS.hands,
    alt: "Noticia 2",
    short: "Contá acá en una línea de qué trató esta novedad.",
    full: "Contá acá cuándo se hizo este evento, qué pasó y quiénes participaron. Este es un texto de relleno: reemplazalo por la crónica real de la novedad.",
  },
  {
    slug: "noticia-3",
    title: "Noticia 3",
    img: PHOTOS.classroom,
    alt: "Noticia 3",
    short: "Contá acá en una línea de qué trató esta novedad.",
    full: "Contá acá cuándo se hizo este evento, qué pasó y quiénes participaron. Este es un texto de relleno: reemplazalo por la crónica real de la novedad.",
  },
  {
    slug: "noticia-4",
    title: "Noticia 4",
    img: PHOTOS.bird,
    alt: "Noticia 4",
    short: "Contá acá en una línea de qué trató esta novedad.",
    full: "Contá acá cuándo se hizo este evento, qué pasó y quiénes participaron. Este es un texto de relleno: reemplazalo por la crónica real de la novedad.",
  },
  {
    slug: "noticia-5",
    title: "Noticia 5",
    img: PHOTOS.coast1,
    alt: "Noticia 5",
    short: "Contá acá en una línea de qué trató esta novedad.",
    full: "Contá acá cuándo se hizo este evento, qué pasó y quiénes participaron. Este es un texto de relleno: reemplazalo por la crónica real de la novedad.",
  },
];

// ─────────────────────────────────────────────────────────────
// Photo-led hero
// ─────────────────────────────────────────────────────────────
function PhotoHero() {
  return (
    <header className="v2-hero">
      <video
        className="v2-hero__img"
        src="assets/hero-video.mp4"
        poster={PHOTOS.hero}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="v2-hero__veil" />
      <div className="v2-hero__inner">
        <div className="v2-hero__eyebrow">
          <span className="v2-hero__dot" />
          San Antonio Oeste · Río Negro · Patagonia Argentina
        </div>
        <h1 className="v2-hero__title">
          Cuidar el lugar<br/>
          <em>donde nos encontramos.</em>
        </h1>
        <p className="v2-hero__lede">
          Trabajamos por el vínculo entre las personas y los territorios que
          habitan, en la costa del Golfo San Matías.
        </p>
        <div className="v2-hero__actions">
          <a className="v2-btn v2-btn--primary" href="#contacto">Trabajemos juntos</a>
          <a className="v2-btn v2-btn--ghost" href="#programa">Conocer el programa →</a>
        </div>
      </div>
      <div className="v2-hero__meta">
        <div><span>Constituida</span><b>15·12·2025</b></div>
        <div><span>Sede</span><b>San Antonio Oeste</b></div>
        <div><span>Plan</span><b>Trienal 2026—2028</b></div>
      </div>
    </header>
  );
}

function V2Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"v2-nav" + (scrolled ? " v2-nav--scrolled" : "")}>
      <a className="v2-nav__brand" href="#top">
        <img src="assets/logo-nuevo.png" alt="" />
        <span>
          <small>Fundación</small>
          <b>Patagonia Fiel</b>
        </span>
      </a>
      <button className="v2-nav__burger" onClick={() => setOpen(!open)} aria-label="Menú">
        <span/><span/><span/>
      </button>
      <ul className={"v2-nav__links" + (open ? " v2-nav__links--open" : "")}>
        <li><a href="#top" onClick={() => setOpen(false)}>Inicio</a></li>
        <li className="v2-nav__item--dropdown">
          <a href="#quienes" onClick={() => setOpen(false)}>Quiénes somos</a>
          <ul className="v2-nav__submenu">
            <li><a href="#proposito" onClick={() => setOpen(false)}>Propósito</a></li>
            <li><a href="#manifiesto" onClick={() => setOpen(false)}>Ubicación</a></li>
            <li><a href="#equipo" onClick={() => setOpen(false)}>Equipo</a></li>
          </ul>
        </li>
        <li className="v2-nav__item--dropdown">
          <a href="#programa" onClick={() => setOpen(false)}>Proyectos</a>
          <ul className="v2-nav__submenu">
            {PROYECTOS.map((p) => (
              <li key={p.slug}><a href={`#${p.slug}`} onClick={() => setOpen(false)}>{p.title}</a></li>
            ))}
          </ul>
        </li>
        {SHOW_NOVEDADES && <li><a href="#plan" onClick={() => setOpen(false)}>Novedades</a></li>}
        <li><a href="#galeria" onClick={() => setOpen(false)}>Galería</a></li>
        <li><a className="v2-nav__cta" href="#contacto" onClick={() => setOpen(false)}>Contacto</a></li>
      </ul>
    </nav>
  );
}

// Reveals an element by sliding it in from off-screen the first time it
// scrolls into view; stays in place afterwards (no re-hide on scroll back).
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

// Quote between sections, full-bleed photo
function PhotoQuote({ src, quote, source, align = "left", id }) {
  return (
    <section id={id} className={"v2-quote v2-quote--" + align}>
      <img src={src} alt="" className="v2-quote__img" />
      <div className="v2-quote__veil" />
      <div className="v2-quote__inner">
        <blockquote>
          <span className="v2-quote__mark">“</span>
          {quote}
        </blockquote>
        {source && <cite>{source}</cite>}
      </div>
    </section>
  );
}

function Manifiesto() {
  const [photosRef, photosVisible] = useReveal();
  const [copyRef, copyVisible] = useReveal();
  return (
    <section className="v2-section v2-section--manifiesto" id="manifiesto">
      <div className="v2-grid v2-grid--manifiesto">
        <div
          ref={photosRef}
          className={"v2-mani__photos v2-reveal v2-reveal--left" + (photosVisible ? " v2-reveal--visible" : "")}
        >
          <iframe
            className="v2-mani__photo v2-mani__photo--1 v2-mani__map"
            src="https://maps.google.com/maps?q=San+Antonio+Oeste,+R%C3%ADo+Negro,+Argentina&z=12&t=k&output=embed"
            title="Mapa de San Antonio Oeste"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <img src="assets/hero-san-antonio-oeste.jpg" alt="Vista aérea de la Bahía San Antonio" className="v2-mani__photo v2-mani__photo--2" />
        </div>
        <div
          ref={copyRef}
          className={"v2-mani__copy v2-reveal v2-reveal--right" + (copyVisible ? " v2-reveal--visible" : "")}
        >
          <span className="v2-label">Ubicación</span>
          <h2 className="v2-h2">
            ¿Dónde nos <em>encontramos?</em>
          </h2>
          <p className="v2-lede">
            Estamos ubicados en San Antonio Oeste, Río Negro, dentro de la
            Bahía San Antonio.
          </p>
          <p>
            La Bahía San Antonio es uno de los ecosistemas costeros más
            relevantes del Golfo San Matías por su biodiversidad y su dinámica
            de mareas extremas. Declarada Área Natural Protegida en 1993 y
            reconocida como sitio de importancia hemisférica para aves
            playeras migratorias, su cuidado constituye un desafío ambiental
            y social.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuienesCover() {
  return (
    <section className="v2-qcover" id="quienes">
      <img src="assets/quienes-buceo.jpg" alt="" className="v2-qcover__img" />
      <div className="v2-qcover__veil" />
      <div className="v2-qcover__inner">
        <span className="v2-label v2-label--light">01 — Quiénes somos</span>
        <h2 className="v2-h2 v2-h2--light">
          Una fundación que <em>escucha el territorio.</em>
        </h2>
      </div>
    </section>
  );
}

function Quienes() {
  const fines = [
    "Promover la educación ambiental en la comunidad en todos sus niveles.",
    "Fomentar la comunicación, sensibilización y difusión de problemáticas y soluciones socioambientales.",
    "Impulsar iniciativas de desarrollo local sostenible que contribuyan al bienestar social y económico de la comunidad.",
    "Colaborar en el mejoramiento y preservación del patrimonio socio-comunitario, cultural y natural.",
    "Realizar investigaciones y acciones para la preservación de la biodiversidad y los ecosistemas.",
    "Promover prácticas y proyectos de manejo sostenible del ambiente y de los recursos naturales.",
    "Favorecer la participación comunitaria en la toma de decisiones ambientales y en la gestión del territorio.",
    "Establecer vínculos y acuerdos de cooperación con instituciones educativas, científicas y organizaciones de la sociedad civil, locales, provinciales, nacionales e internacionales.",
    "Contribuir al diseño e implementación de políticas públicas orientadas a la sostenibilidad ambiental y social.",
  ];

  return (
    <section className="v2-section" id="proposito">
      <div className="v2-section__head">
        <span className="v2-label">Propósito</span>
        <h2 className="v2-h2">
          Quiénes somos <em>y por qué existimos.</em>
        </h2>
        <p className="v2-lede">
          La Fundación Patagonia Fiel es una organización sin fines de lucro
          constituida el 15 de diciembre de 2025 en la ciudad de San Antonio
          Oeste, provincia de Río Negro. Surge de la iniciativa de un grupo de
          profesionales vinculados al ambiente, la educación, la investigación
          y la conservación, que decidieron articular su experiencia en un
          trabajo colectivo orientado al cuidado del entorno natural y al
          fortalecimiento comunitario en la costa marítima rionegrina.
        </p>
      </div>

      <div className="v2-objetivo">
        <span className="v2-label">Nuestro objetivo</span>
        <p>
          “Generar espacios que fortalezcan el vínculo entre las personas y
          los territorios que habitan, promoviendo la revalorización de la
          naturaleza y su integración con la vida comunitaria.”
        </p>
      </div>

      <div className="v2-fines-wrap">
        <div className="v2-fines">
          <div className="v2-fines__head">Fines de la Fundación</div>
          <ol className="v2-fines__list">
            {fines.map((f, i) => (
              <li key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{f}</p>
              </li>
            ))}
          </ol>
        </div>
        <video
          className="v2-fines__photo"
          src="assets/fines-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}

function Equipo() {
  const team = [
    {
      name: "Maximiliano Bertini",
      role: "Presidente",
      img: PHOTOS.p1,
      bio: "Preside la Fundación Patagonia Fiel y lidera su vínculo con la comunidad de San Antonio Oeste.",
    },
    {
      name: "Dennis N. Landete",
      role: "Secretario",
      img: PHOTOS.p2,
      bio: "Licenciado en Ciencias Biológicas y profesional de apoyo del CONICET, con especialización y experiencia en el trabajo de campo vinculado a la biodiversidad y la conservación de los ambientes marinos y costeros.",
    },
    {
      name: "Juan Francisco Saad",
      role: "Tesorero · Dr. en Cs. Biológicas",
      img: PHOTOS.p3,
      bio: "Investigador del CONICET, profesor de la Facultad de Ciencias Marinas de la Universidad Nacional del Comahue y responsable del Laboratorio de Biodiversidad y Servicios Ecosistémicos. Especialista en oceanografía costera y ecología del plancton.",
    },
    {
      name: "María Libertad Chibli",
      role: "Vocal Titular",
      img: null,
      bio: "Licenciada en Realización Audiovisual y se encuentra finalizando la Licenciatura en Bibliotecología y Documentación.",
    },
    {
      name: "Marianela Gastaldi",
      role: "Colaboradora",
      img: PHOTOS.p5,
      bio: "Bióloga y Doctora en Ciencias Biológicas, investigadora del CONICET y docente de la Universidad Nacional del Comahue.",
    },
    {
      name: "Camilo Juárez",
      role: "Estudiante · Colaborador",
      img: PHOTOS.p6,
      bio: "Estudiante avanzado de la Licenciatura en Biología Marina.",
    },
    {
      name: "Agustina Tievas",
      role: "Estudiante · Colaboradora",
      img: PHOTOS.p7,
      bio: "Estudiante avanzada de la Licenciatura en Biología Marina.",
    },
  ];
  return (
    <section className="v2-section" id="equipo">
      <div className="v2-team">
        <div className="v2-team__head">
          <span className="v2-label">Consejo de Administración</span>
          <h3 className="v2-h3">Las personas detrás del proyecto.</h3>
        </div>
        <div className="v2-team__grid">
          {team.map((p) => (
            <figure key={p.name} className="v2-team__card">
              <div className="v2-team__photo">
                <div className="v2-team__flip">
                  <div className="v2-team__face v2-team__face--front">
                    {p.img ? <img src={p.img} alt={p.name} /> : <div className="v2-team__placeholder" />}
                  </div>
                  <div className="v2-team__face v2-team__face--back">
                    <p>{p.bio}</p>
                  </div>
                </div>
              </div>
              <figcaption>
                <b>{p.name}</b>
                <span>{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programa() {
  return (
    <section className="v2-section v2-section--programa" id="programa">
      <div className="v2-prog__hero">
        <img src="assets/proyecto-observacion-costera.jpg" alt="Observación costera en la Bahía San Antonio" />
        <div className="v2-prog__hero-veil" />
        <div className="v2-prog__hero-copy">
          <span className="v2-label v2-label--light">02 — Proyectos</span>
          <h2 className="v2-h2 v2-h2--light">
            Proyectos que <em>cuidan el territorio.</em>
          </h2>
          <p className="v2-prog__sub">Bahía San Antonio bajo la lupa.</p>
        </div>
      </div>

      <div className="v2-prog__body">
        <div className="v2-prog__intro">
          <p className="v2-lede">
            Un programa de educación ambiental para estudiantes de nivel medio,
            centrado en el ecosistema costero más singular del Golfo San Matías —
            Área Natural Protegida desde 1993. Elegí un proyecto para ver el detalle.
          </p>
        </div>

        <div className="v2-prog__grid">
          {PROYECTOS.map((p, i) => (
            <a key={p.slug} href={`#${p.slug}`} className="v2-prog__cell">
              <div className="v2-prog__cell-photo">
                <img src={p.img} alt={p.alt} />
                <span className="v2-prog__cell-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h4>{p.title}</h4>
                <p>{p.short}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProyectoDetalle({ p, index }) {
  return (
    <section className={"v2-section v2-proydet" + (index % 2 === 1 ? " v2-proydet--rev" : "")} id={p.slug}>
      <div className="v2-proydet__card">
        <div className="v2-proydet__photo">
          <img src={p.img} alt={p.alt} />
          <span className="v2-proydet__num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="v2-proydet__body">
          <span className="v2-label">Proyecto {index + 1} de {PROYECTOS.length}</span>
          <h3>{p.title}</h3>
          <p className="v2-lede">{p.full}</p>
          {p.context && (
            <>
              <b className="v2-proydet__bhead">{p.contextHead}</b>
              <p className="v2-lede">{p.context}</p>
            </>
          )}
          {p.bulletsHead && <b className="v2-proydet__bhead">{p.bulletsHead}</b>}
          {p.bullets.length > 0 && <ul>{p.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>}
          <a className="v2-proydet__back" href="#programa">← Volver a proyectos</a>
        </div>
      </div>
    </section>
  );
}

function Plan() {
  return (
    <section className="v2-section v2-section--plan" id="plan">
      <div className="v2-section__head">
        <span className="v2-label">03 — Novedades</span>
        <h2 className="v2-h2">
          Lo último de <em>la fundación.</em>
        </h2>
        <p className="v2-h2-sub">
          Eventos, jornadas y avances que vamos sumando en el territorio.
        </p>
      </div>

      <div className="v2-news">
        {NOVEDADES.map((n) => (
          <article key={n.slug} className="v2-news__card">
            <div className="v2-news__photo">
              <img src={n.img} alt={n.alt} />
            </div>
            <h3>{n.title}</h3>
            <p>{n.short}</p>
            <a className="v2-news__btn" href={`#${n.slug}`}>Ver más</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function NoticiaDetalle({ n, index }) {
  return (
    <section className={"v2-section v2-newsdet" + (index % 2 === 1 ? " v2-newsdet--rev" : "")} id={n.slug}>
      <div className="v2-newsdet__card">
        <div className="v2-newsdet__photo">
          <img src={n.img} alt={n.alt} />
        </div>
        <div className="v2-newsdet__body">
          <span className="v2-label">Noticia {index + 1} de {NOVEDADES.length}</span>
          <h3>{n.title}</h3>
          <p className="v2-lede">{n.full}</p>
          <a className="v2-newsdet__back" href="#plan">← Volver a novedades</a>
        </div>
      </div>
    </section>
  );
}

function Colaborar() {
  const ways = [
    { h: "Aportes de empresas", p: "Sumate como aliado estratégico al plan trienal: tu aporte financia educación, saneamiento costero y monitoreo ambiental." },
    { h: "Donaciones particulares", p: "Aportes de personas que quieren cooperar. Cada contribución se destina íntegramente al objeto fundacional." },
    { h: "Cooperación institucional", p: "Vínculos con universidades, escuelas, organismos públicos y ONGs locales o internacionales para proyectos compartidos." },
  ];
  return (
    <section className="v2-section v2-section--colab" id="colaborar">
      <img className="v2-colab__bg" src={PHOTOS.mesa} alt="" />
      <div className="v2-colab__veil" />
      <div className="v2-colab__inner">
        <div className="v2-section__head v2-section__head--light">
          <span className="v2-label v2-label--light">04 — Cómo colaborar</span>
          <h2 className="v2-h2 v2-h2--light">
            La Patagonia se cuida <em>en comunidad.</em>
          </h2>
        </div>
        <div className="v2-ways">
          {ways.map((w) => (
            <div key={w.h} className="v2-ways__card">
              <h3>{w.h}</h3>
              <p>{w.p}</p>
              <a href="#contacto">Contactar →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Galeria() {
  const photos = [
    {
      src: "assets/galeria-gaviotas-vuelo.jpg",
      alt: "Gaviotas en vuelo",
      credit: { name: "Agustina Tievas", url: "https://www.instagram.com/agus_tievas/" },
    },
    { src: "assets/galeria-lobos-marinos-familia.jpg", alt: "Familia de lobos marinos en la playa" },
    { src: "assets/galeria-pichon-pinguino.jpg", alt: "Pichón de pingüino" },
    { src: "assets/galeria-pinguinos-marea.jpg", alt: "Pingüinos en la marea" },
    { src: "assets/galeria-pinguino-magallanico.jpg", alt: "Pingüino magallánico" },
    { src: "assets/galeria-lobo-marino-submarino.jpg", alt: "Lobo marino bajo el agua" },
    { src: "assets/galeria-ballena-submarina.jpg", alt: "Ballena bajo el agua" },
    { src: "assets/galeria-observacion-aves.jpg", alt: "Observación de aves en la costa" },
    { src: "assets/galeria-avistaje-binoculares.jpg", alt: "Avistaje con binoculares" },
    { src: "assets/galeria-lobos-marinos-ola.jpg", alt: "Lobos marinos junto al oleaje" },
    { src: "assets/galeria-pinguinos-pareja.jpg", alt: "Pareja de pingüinos" },
    { src: "assets/galeria-caracara.jpg", alt: "Caracara en la estepa" },
    {
      src: "assets/galeria-bosque-algas-1.jpg",
      alt: "Bosque de algas bajo el agua",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-anemonas-colonia.jpg",
      alt: "Colonia de anémonas marinas",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-anemona-detalle.jpg",
      alt: "Detalle de una anémona marina",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-bosque-algas-2.jpg",
      alt: "Algas costeras bajo el agua",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-estrella-mar-1.jpg",
      alt: "Estrella de mar entre rocas",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-estrella-mar-2.jpg",
      alt: "Estrella de mar entre rocas",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
    {
      src: "assets/galeria-estrella-mar-3.jpg",
      alt: "Estrella de mar entre rocas",
      credit: { name: "Camilo Juárez", url: "https://www.instagram.com/camilojuarezviecho22/" },
    },
  ];
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <section className="v2-section" id="galeria">
      <div className="v2-section__head">
        <span className="v2-label">Galería</span>
        <h2 className="v2-h2">Momentos <em>en el territorio.</em></h2>
      </div>
      <div className="v2-gallery">
        <button className="v2-gallery__arrow v2-gallery__arrow--prev" onClick={prev} aria-label="Foto anterior">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="v2-gallery__frame">
          <img src={photos[index].src} alt={photos[index].alt} className="v2-gallery__img" />
        </div>
        <button className="v2-gallery__arrow v2-gallery__arrow--next" onClick={next} aria-label="Foto siguiente">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {photos[index].credit && (
        <div className="v2-gallery__credit">
          Foto: <a href={photos[index].credit.url} target="_blank" rel="noopener noreferrer">{photos[index].credit.name}</a>
        </div>
      )}
      <div className="v2-gallery__dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={"v2-gallery__dot" + (i === index ? " v2-gallery__dot--active" : "")}
            onClick={() => setIndex(i)}
            aria-label={`Ir a la foto ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section className="v2-section v2-section--contact" id="contacto">
      <div className="v2-contact">
        <div className="v2-contact__copy">
          <span className="v2-label">05 — Contacto</span>
          <h2 className="v2-h2">Trabajemos juntos.</h2>
          <p className="v2-lede">
            Si querés sumar tu organización, escuela, empresa o esfuerzo personal,
            escribinos. Respondemos cada mensaje.
          </p>
          <dl className="v2-contact__data">
            <div><dt>Sede</dt><dd>Gerónimo "Tinga" González 425<br/>San Antonio Oeste · Río Negro</dd></div>
            <div><dt>Email</dt><dd><a href="mailto:fundacionpatagoniafiel@gmail.com">fundacionpatagoniafiel@gmail.com</a></dd></div>
            <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/fundacionpatagoniafiel/" target="_blank" rel="noopener noreferrer">@fundacionpatagoniafiel</a></dd></div>
            <div><dt>Personería</dt><dd>En trámite · Constituida 15·12·2025</dd></div>
          </dl>
        </div>
        <form className="v2-contact__form" onSubmit={(e) => e.preventDefault()}>
          <label><span>Nombre</span><input type="text" placeholder="Tu nombre" /></label>
          <label><span>Email</span><input type="email" placeholder="vos@ejemplo.com" /></label>
          <label><span>Organización <i>(opcional)</i></span><input type="text" placeholder="Empresa, escuela, ONG…" /></label>
          <label><span>Mensaje</span><textarea rows="4" placeholder="Contanos en qué podemos colaborar."></textarea></label>
          <button type="submit" className="v2-btn v2-btn--primary v2-btn--block">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}

function V2Footer() {
  return (
    <footer className="v2-footer">
      <img className="v2-footer__bg" src={PHOTOS.horizon} alt="" />
      <div className="v2-footer__veil" />
      <div className="v2-footer__inner">
        <div className="v2-footer__brand">
          <img src="assets/logo-nuevo.png" alt="" />
          <div>
            <small>Fundación</small>
            <b>Patagonia Fiel</b>
          </div>
        </div>
        <p className="v2-footer__obj">
          "Generar espacios que fortalezcan el vínculo entre las personas y los
          territorios que habitan, promoviendo la revalorización de la naturaleza
          y su integración con la vida comunitaria."
        </p>
        <div className="v2-footer__bot">
          <span>© 2026 Fundación Patagonia Fiel</span>
          <span>San Antonio Oeste · Río Negro · Argentina</span>
        </div>
      </div>
    </footer>
  );
}

function Splash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={"v2-splash" + (fading ? " v2-splash--fading" : "")}>
      <img src="assets/logo-nuevo.png" alt="" className="v2-splash__logo" />
      <div className="v2-splash__word">
        <small>Fundación</small>
        <b>Patagonia Fiel</b>
      </div>
    </div>
  );
}

function SiteV2({ tweaks }) {
  const styleVars = {
    "--accent": tweaks.accent,
    "--font-display": tweaks.displayFont,
    "--font-body": tweaks.bodyFont,
    "--density": tweaks.density,
  };
  return (
    <div className="v2-site" id="top" style={styleVars}>
      <Splash />
      <V2Nav />
      <PhotoHero />
      <QuienesCover />
      <Quienes />
      <Manifiesto />
      <Equipo />
      <Programa />
      {PROYECTOS.map((p, i) => (
        <ProyectoDetalle key={p.slug} p={p} index={i} />
      ))}
      <PhotoQuote
        src="assets/manifiesto-lobos-marinos-bn.jpg"
        quote="Cada generación que crece comprendiendo su territorio aprende a cuidarlo. La educación ambiental no es un curso: es una forma de habitar el lugar."
        source="Programa Bahía San Antonio bajo la lupa"
      />
      {SHOW_NOVEDADES && <Plan />}
      {SHOW_NOVEDADES && NOVEDADES.map((n, i) => (
        <NoticiaDetalle key={n.slug} n={n} index={i} />
      ))}
      <Colaborar />
      <Galeria />
      <Contacto />
      <V2Footer />
    </div>
  );
}

window.SiteV2 = SiteV2;
