import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { lounge } from "./content.js";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${lounge.address} (${lounge.plusCode})`,
)}`;
const phoneUrl = `tel:${lounge.phoneLink}`;
const siteBase = import.meta.env.BASE_URL;
const mediaUrl = (filename) => `${siteBase}media/${filename}`;

function Mark({ small = false }) {
  return (
    <span className={`brand-mark${small ? " brand-mark--small" : ""}`} aria-hidden="true">
      <span>S</span>
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Stendal Lounge Bar – Startseite">
          <Mark />
          <span className="brand-copy">
            <strong>STENDAL</strong>
            <span>LOUNGE BAR</span>
          </span>
        </Link>

        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Hauptnavigation"
        >
          {lounge.navigation.map((item) =>
            isHome ? (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} to={`/${item.href}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ),
          )}
          <a
            className="nav-reserve"
            href={isHome ? "#reservation" : `${siteBase}#reservation`}
            onClick={() => setMenuOpen(false)}
          >
            Reservierung anfragen <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-heading section-heading--${align} reveal`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const prefersLessMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isPlaying, setIsPlaying] = useState(!prefersLessMotion.current);

  useEffect(() => {
    if (isPlaying) videoRef.current?.play().catch(() => setIsPlaying(false));
    else videoRef.current?.pause();
  }, [isPlaying]);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay={isPlaying}
        muted
        loop
        playsInline
        preload="metadata"
        poster={lounge.poster}
        aria-hidden="true"
      >
        <source src={lounge.video} type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-smoke" aria-hidden="true" />
      <div className="hero-content page-shell">
        <p className="hero-kicker"><span className="live-dot" /> STENDAL · SHISHA-BAR</p>
        <h1 id="hero-title">STENDAL<br /><em>LOUNGE BAR</em></h1>
        <p className="hero-tagline">Your Place. Your Vibe. Your Moment.</p>
        <p className="hero-description">
          Shisha und Getränke vor Ort.
        </p>
        <div className="hero-actions">
          <a className="button button--gold" href="#about">Lounge ansehen <span>↗</span></a>
          <a className="button button--outline" href="#reservation">Tisch anfragen</a>
        </div>
      </div>
      <div className="hero-bottom page-shell">
        <div className="hero-meta">
          <span className="meta-icon" aria-hidden="true">⌖</span>
          <span><small>ADRESSE</small>{lounge.address}</span>
        </div>
        <div className="hero-meta hero-meta--hours">
          <span className="meta-icon" aria-hidden="true">◷</span>
          <span><small>ÖFFNUNGSZEITEN</small>{lounge.hours}</span>
        </div>
        <button
          className="video-toggle"
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? "Hintergrundvideo pausieren" : "Hintergrundvideo abspielen"}
        >
          <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          {isPlaying ? "VIDEO PAUSIEREN" : "VIDEO ABSPIELEN"}
        </button>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Nach unten zum Inhalt">
        <span />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="page-shell about-grid">
        <div className="about-photo-wrap reveal">
          <img
            className="about-photo"
            src={mediaUrl("lounge-02.jpg")}
            alt="Gesamtansicht des Gastraums der Stendal Lounge Bar"
            loading="lazy"
          />
          <span className="photo-frame" aria-hidden="true" />
          <div className="photo-caption"><Mark small /><span>STENDAL<br /><small>LOUNGE BAR</small></span></div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow"><span />DIE LOUNGE IN STENDAL</p>
          <h2>Licht, Sitzplätze<br />und <em>Barbereich.</em></h2>
          <p>
            Farbige Beleuchtung, Musik, gemütliche Sitzplätze und ein eigener
            Barbereich prägen unsere Räume. Bei uns kannst du Shisha und Getränke
            vor Ort genießen.
          </p>
          <p>
            Die aktuelle Auswahl an Shisha-Sorten und Getränken erfährst du direkt
            im Lokal.
          </p>
          <a className="text-link" href="#experience">Räume und Angebot <span>↗</span></a>
          <div className="about-facts" aria-label="Angebot und Service">
            <span><small>ANGEBOT</small>Shisha & Getränke</span>
            <span><small>SERVICE</small>Verzehr vor Ort</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section section-pad" id="experience">
      <div className="page-shell">
        <SectionHeading
          eyebrow="RÄUME & ANGEBOT"
          title={<>Einblicke in <em>die Lounge.</em></>}
          text="Sitzbereiche, farbige Lichtakzente und Barbereich – fotografiert in der Stendal Lounge Bar. Details zur aktuellen Auswahl an Shisha-Sorten und Getränken erhältst du vor Ort."
        />
        <div className="experience-grid">
          {lounge.experiences.map((item) => (
            <article className="experience-card reveal" key={item.number}>
              <span className="experience-number">{item.number}</span>
              <span className="experience-rule" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="experience-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <div className="experience-image reveal">
          <img
            src={mediaUrl("lounge-07.jpg")}
            alt="Tresen und Barhocker der Stendal Lounge bei farbiger Beleuchtung"
            loading="lazy"
          />
          <div className="experience-image-label">
            <span>BARBEREICH & SITZPLÄTZE</span>
            <strong>Ein Blick in unsere Räume.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section className="menu-section section-pad" id="menu">
      <div className="page-shell">
        <SectionHeading
          eyebrow="GETRÄNKE & SHISHA"
          title={<>Unsere <em>Karte.</em></>}
          text="Shisha-Sorten, Getränke, Mixgetränke und Cocktails – eine Auswahl aus der Stendal Lounge Bar."
          align="center"
        />
        <div className="menu-grid">
          {lounge.menu.map((category, index) => (
            <article
              className={`menu-card reveal${index === 0 ? " menu-card--featured" : ""}`}
              key={category.id}
            >
              <div className="menu-card-media">
                <img src={category.image} alt={category.imageAlt} loading="lazy" />
                <span className="menu-card-scrim" aria-hidden="true" />
                <div className="menu-card-overlay">
                  <span className="menu-icon" aria-hidden="true">{category.icon}</span>
                  <h3>{category.title}</h3>
                  {category.price && <span className="menu-card-price">{category.price}</span>}
                </div>
              </div>
              <div className="menu-card-body">
                <ul className="menu-list">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <span className="menu-item-top">
                        <span className="menu-item-name">{item.name}</span>
                        {item.price && <span className="menu-item-dots" aria-hidden="true" />}
                        {item.price && <span className="menu-item-price">{item.price}</span>}
                      </span>
                      {item.description && (
                        <span className="menu-item-desc">{item.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {category.note && <p className="menu-note">{category.note}</p>}
              </div>
            </article>
          ))}
        </div>
        <p className="menu-disclaimer reveal">
          Alle Preise inklusive der gesetzlichen Umsatzsteuer. Änderungen und Irrtümer vorbehalten.
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((index) => (index + 1) % lounge.gallery.length);
      if (event.key === "ArrowLeft") setActiveImage((index) => (index - 1 + lounge.gallery.length) % lounge.gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="page-shell">
        <SectionHeading
          eyebrow="FOTOS AUS DEM LOKAL"
          title={<>Unsere Räume im <em>Abendlicht.</em></>}
          text="Innenraum, Sitzplätze und Barbereich der Stendal Lounge Bar."
          align="center"
        />
        <div className="gallery-grid">
          {lounge.gallery.map((image, index) => (
            <button
              className="gallery-item reveal"
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Bild vergrößern: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ objectPosition: image.position }}
              />
              <span className="gallery-zoom" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galeriebild"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Galerie schließen">×</button>
          <button
            className="lightbox-arrow lightbox-arrow--left"
            type="button"
            onClick={() => setActiveImage((activeImage - 1 + lounge.gallery.length) % lounge.gallery.length)}
            aria-label="Vorheriges Bild"
          >←</button>
          <figure>
            <img src={lounge.gallery[activeImage].src} alt={lounge.gallery[activeImage].alt} />
            <figcaption>{String(activeImage + 1).padStart(2, "0")} / {String(lounge.gallery.length).padStart(2, "0")} · {lounge.gallery[activeImage].alt}</figcaption>
          </figure>
          <button
            className="lightbox-arrow lightbox-arrow--right"
            type="button"
            onClick={() => setActiveImage((activeImage + 1) % lounge.gallery.length)}
            aria-label="Nächstes Bild"
          >→</button>
        </div>
      )}
    </section>
  );
}

function parseGermanDate(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return "";

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const parsed = new Date(0);
  parsed.setFullYear(year, month - 1, day);
  parsed.setHours(0, 0, 0, 0);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return "";
  }

  return `${yearText}-${monthText}-${dayText}`;
}

function getGermanDateError(value, minDate) {
  if (!value) return "";
  const parsedDate = parseGermanDate(value);
  if (!parsedDate) return "Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein.";
  if (parsedDate <= minDate) return "Bitte wähle einen zukünftigen Tag.";
  return "";
}

function Reservation() {
  const [status, setStatus] = useState("");
  const [dateValue, setDateValue] = useState("");
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().slice(0, 10);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: form.get("name"),
      phone: form.get("phone"),
      date: form.get("date"),
      time: form.get("time"),
      guests: form.get("guests"),
      message: form.get("message"),
    };
    const message = [
      "Guten Tag Stendal Lounge Bar, ich möchte eine Tischreservierung anfragen.",
      "",
      `Name: ${values.name}`,
      `Telefon: ${values.phone}`,
      `Datum: ${values.date}`,
      `Uhrzeit: ${values.time}`,
      `Personen: ${values.guests}`,
      values.message ? `Nachricht: ${values.message}` : "",
      "",
      "Ich weiß, dass die Reservierung erst nach Bestätigung gilt.",
    ].filter(Boolean).join("\n");

    setStatus("WhatsApp wird mit deiner Anfrage geöffnet. Bitte warte auf unsere Bestätigung.");
    window.open(
      `https://wa.me/${lounge.phoneLink.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="reservation-section section-pad" id="reservation">
      <div className="page-shell reservation-grid">
        <div className="reservation-copy reveal">
          <p className="eyebrow"><span />RESERVIERUNG</p>
          <h2>Wunschtermin<br />per <em>WhatsApp anfragen.</em></h2>
          <p>Trag Datum, Ankunftszeit und Gästezahl ein. WhatsApp öffnet sich anschließend mit deiner vorbereiteten Nachricht.</p>
          <a className="reservation-phone" href={phoneUrl}>
            <span className="phone-icon" aria-hidden="true">↗</span>
            <span><small>TELEFONISCH ERREICHBAR</small>{lounge.phone}</span>
          </a>
        </div>

        <form className="reservation-form reveal" onSubmit={handleSubmit}>
          <div className="form-topline"><span>ANFRAGE PER WHATSAPP</span><span>NOCH NICHT BESTÄTIGT</span></div>
          <p className="form-note">
            Beim Absenden wird WhatsApp geöffnet. Deine Reservierung ist erst nach
            einer Rückmeldung des Lokals bestätigt.
          </p>
          <div className="form-grid">
            <label className="form-field">
              <span>Dein Name *</span>
              <input autoComplete="name" name="name" placeholder="Vor- und Nachname" required />
            </label>
            <label className="form-field">
              <span>Telefonnummer *</span>
              <input
                autoComplete="tel"
                inputMode="tel"
                name="phone"
                type="tel"
                placeholder="Mit Ländervorwahl"
                pattern="(?=.*\d)[0-9+() -]{6,}"
                title="Bitte gib eine gültige Telefonnummer ein."
                required
              />
            </label>
            <label className="form-field">
              <span>Wunschtag *</span>
              <input
                autoComplete="off"
                inputMode="numeric"
                maxLength="10"
                name="date"
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setDateValue(value);
                  event.currentTarget.setCustomValidity(getGermanDateError(value, minDate));
                }}
                placeholder="TT.MM.JJJJ"
                required
                type="text"
                value={dateValue}
                title="Bitte gib ein zukünftiges Datum im Format TT.MM.JJJJ ein."
              />
              <small className="field-hint">Format: TT.MM.JJJJ · nur zukünftige Tage.</small>
            </label>
            <label className="form-field">
              <span>Ankunftszeit *</span>
              <input name="time" type="time" required />
              <small className="field-hint">Gewünschte Uhrzeit deines Besuchs.</small>
            </label>
            <label className="form-field form-field--full">
              <span>Anzahl der Gäste *</span>
              <input name="guests" type="number" min="1" step="1" inputMode="numeric" placeholder="Personenzahl" required />
              <small className="field-hint">Wie viele Personen kommen mit?</small>
            </label>
            <label className="form-field form-field--full">
              <span>Nachricht <small>(optional)</small></span>
              <textarea name="message" rows="3" placeholder="Weitere Informationen oder Rückfragen" />
            </label>
          </div>
          <button className="button button--gold form-submit" type="submit">
            Anfrage über WhatsApp senden <span aria-hidden="true">↗</span>
          </button>
          <p className="form-privacy">Deine Angaben werden nicht auf dieser Website gespeichert.</p>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

function Location() {
  const [mapAllowed, setMapAllowed] = useState(false);
  const embedQuery = encodeURIComponent(`${lounge.address} ${lounge.plusCode}`);

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="page-shell">
        <SectionHeading
          eyebrow="HIER FINDEST DU UNS"
          title={<>Anfahrt &amp; <em>Kontakt.</em></>}
          text="Adresse, Telefonnummer und Öffnungszeiten."
        />
        <div className="contact-grid">
          <div className="contact-details reveal">
            <div className="contact-detail">
              <span className="detail-index">01</span>
              <div><small>ADRESSE</small><p>{lounge.address}</p><p className="muted-detail">{lounge.plusCode}</p></div>
            </div>
            <div className="contact-detail">
              <span className="detail-index">02</span>
              <div><small>TELEFON</small><a href={phoneUrl}>{lounge.phone}</a></div>
            </div>
            <div className="contact-detail">
              <span className="detail-index">03</span>
              <div><small>ÖFFNUNGSZEITEN</small><p>{lounge.hours}</p><p className="muted-detail">{lounge.hoursNote}</p></div>
            </div>
            <div className="contact-detail">
              <span className="detail-index">04</span>
              <div><small>SERVICE</small><p>Verzehr vor Ort · kein Lieferservice</p></div>
            </div>
            <a className="button button--gold directions-button" href={directionsUrl} target="_blank" rel="noreferrer">
              Route planen <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="map-card reveal">
            {mapAllowed ? (
              <iframe
                title="Google Maps: Stendal Lounge Bar, Scharnhorststraße 80"
                src={`https://www.google.com/maps?q=${embedQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-consent">
                <span className="map-pin" aria-hidden="true">⌖</span>
                <p className="eyebrow"><span />STENDAL · ALTSTADT</p>
                <strong>Dein Weg zu uns.</strong>
                <span>{lounge.address}</span>
                <button type="button" className="button button--outline" onClick={() => setMapAllowed(true)}>
                  Google Maps laden <span aria-hidden="true">↗</span>
                </button>
                <small>Beim Laden wird eine Verbindung zu Google Maps hergestellt.</small>
              </div>
            )}
            <div className="map-card-label"><Mark small /><span>STENDAL<br /><small>LOUNGE BAR</small></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand-block">
          <Link className="brand" to="/" aria-label="Stendal Lounge Bar – Startseite">
            <Mark />
            <span className="brand-copy"><strong>STENDAL</strong><span>LOUNGE BAR</span></span>
          </Link>
          <p>Your Place. Your Vibe. Your Moment.</p>
        </div>
        <div className="footer-column">
          <small>ÜBERBLICK</small>
          <a href={`${siteBase}#about`}>Die Lounge</a>
          <a href={`${siteBase}#experience`}>Räume & Angebot</a>
          <a href={`${siteBase}#menu`}>Menü</a>
          <a href={`${siteBase}#gallery`}>Galerie</a>
          <a href={`${siteBase}#reservation`}>Reservierung</a>
        </div>
        <div className="footer-column footer-address">
          <small>ADRESSE & ÖFFNUNGSZEITEN</small>
          <span>{lounge.address}</span>
          <a href={phoneUrl}>{lounge.phone}</a>
          <span>{lounge.hours}</span>
          <span className="footer-note">{lounge.hoursNote}</span>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} Stendal Lounge Bar</span>
        <span className="footer-legal">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </span>
        <a href="#top">Zurück nach oben ↑</a>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Menu />
      <Gallery />
      <Reservation />
      <Location />
    </>
  );
}

function LegalPage({ type }) {
  const isImpressum = type === "impressum";

  useEffect(() => {
    document.title = isImpressum
      ? "Impressum | Stendal Lounge Bar"
      : "Datenschutzerklärung | Stendal Lounge Bar";
  }, [isImpressum]);

  return (
    <main className="legal-page">
      <div className="page-shell legal-inner">
        <p className="eyebrow"><span />STENDAL LOUNGE BAR</p>
        <h1>{isImpressum ? "Impressum" : "Datenschutzerklärung"}</h1>
        <p className="legal-lead">
          {isImpressum
            ? "Angaben gemäß § 5 DDG"
            : "Informationen zum Umgang mit personenbezogenen Daten auf dieser Website."}
        </p>

        {isImpressum ? (
          <div className="legal-content">
            <section>
              <h2>Diensteanbieter</h2>
              <p><strong>[Vollständigen Namen oder Firmennamen ergänzen]</strong><br />Stendal Lounge Bar<br />Scharnhorststraße 80<br />39576 Stendal<br />Deutschland</p>
            </section>
            <section>
              <h2>Kontakt</h2>
              <p>Telefon: <a href={phoneUrl}>{lounge.phone}</a><br />E-Mail: [E-Mail-Adresse ergänzen]</p>
            </section>
            <section>
              <h2>Vertretungsberechtigte Person</h2>
              <p>[Vollständigen Namen der verantwortlichen Person ergänzen]</p>
            </section>
            <section>
              <h2>Verantwortlich für den Inhalt</h2>
              <p>[Name und ladungsfähige Anschrift gemäß § 18 Abs. 2 MStV ergänzen]</p>
            </section>
            <p className="legal-warning">Bitte ergänze vor Veröffentlichung die markierten rechtlichen Angaben und lass das Impressum auf Vollständigkeit prüfen.</p>
          </div>
        ) : (
          <div className="legal-content">
            <section>
              <h2>1. Verantwortliche Stelle</h2>
              <p>Verantwortlich für diese Website ist der Betreiber der Stendal Lounge Bar, Scharnhorststraße 80, 39576 Stendal. Vollständiger Name/Firmenname und Kontakt-E-Mail-Adresse müssen vor Veröffentlichung ergänzt werden.</p>
            </section>
            <section>
              <h2>2. Aufruf der Website</h2>
              <p>Beim Aufruf einer Website können durch den Hosting-Anbieter technisch erforderliche Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt und angeforderte Datei) verarbeitet werden. Der konkrete Hosting-Anbieter und dessen Speicherfristen sind vor Veröffentlichung hier zu ergänzen.</p>
            </section>
            <section>
              <h2>3. Reservierungsanfragen über WhatsApp</h2>
              <p>Das Anfrageformular übermittelt deine Eingaben nicht an unseren Webserver. Beim Absenden wird WhatsApp mit einer vorausgefüllten Nachricht geöffnet. Die Verarbeitung erfolgt anschließend durch WhatsApp bzw. Meta gemäß deren Datenschutzinformationen. Du kannst uns alternativ telefonisch kontaktieren.</p>
            </section>
            <section>
              <h2>4. Google Maps</h2>
              <p>Die Karte wird erst geladen, nachdem du auf „Google Maps laden“ klickst. Dabei wird eine Verbindung zu Google hergestellt und es können personenbezogene Daten, insbesondere deine IP-Adresse, übertragen werden. Für die weitere Verarbeitung gelten die Datenschutzbestimmungen von Google.</p>
            </section>
            <section>
              <h2>5. Schriftarten</h2>
              <p>Diese Website lädt Schriftarten über Google Fonts. Dabei kann eine Verbindung zu Servern von Google hergestellt und deine IP-Adresse übertragen werden. Für die weitere Verarbeitung gelten die Datenschutzbestimmungen von Google.</p>
            </section>
            <section>
              <h2>6. Deine Rechte</h2>
              <p>Du hast im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Beschwerde bei einer Datenschutzaufsichtsbehörde. Für die Ausübung deiner Rechte ergänze bitte eine gültige Kontakt-E-Mail-Adresse.</p>
            </section>
            <p className="legal-warning">Diese Datenschutzhinweise sind ein Projektentwurf. Hosting-Anbieter, Verantwortliche und konkrete Verarbeitungsvorgänge müssen vor Veröffentlichung geprüft und vervollständigt werden.</p>
          </div>
        )}
        <Link className="text-link legal-back" to="/">← Zurück zur Startseite</Link>
      </div>
    </main>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Stendal Lounge Bar | Shisha & Lounge in Stendal";
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<LegalPage type="impressum" />} />
        <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
