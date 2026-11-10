const mediaUrl = `${import.meta.env.BASE_URL}media/`;

export const lounge = {
  name: "Stendal Lounge Bar",
  address: "Scharnhorststraße 80, 39576 Stendal, Germany",
  phone: "+49 176 41233347",
  phoneLink: "+4917641233347",
  plusCode: "JR3P+VP Stendal",
  hours: "Täglich 18:00–01:00 Uhr",
  hoursNote: "Am Wochenende gelegentlich länger geöffnet.",
  video: `${mediaUrl}lounge-hero.mp4`,
  poster: `${mediaUrl}lounge-02.jpg`,
  navigation: [
    { label: "Die Lounge", href: "#about" },
    { label: "Räume & Angebot", href: "#experience" },
    { label: "Galerie", href: "#gallery" },
    { label: "Kontakt", href: "#contact" },
  ],
  experiences: [
    {
      number: "01",
      title: "Shisha",
      description: "Informationen zu den aktuell verfügbaren Sorten erhältst du direkt im Lokal.",
    },
    {
      number: "02",
      title: "Lounge-Ambiente",
      description: "Farbige Lichtakzente und gemütliche Sitzbereiche prägen den Innenraum.",
    },
    {
      number: "03",
      title: "Musik & Aufenthalt",
      description: "Musik gehört zur Atmosphäre während deines Besuchs.",
    },
    {
      number: "04",
      title: "Getränke",
      description: "Das aktuelle Getränkeangebot erfährst du direkt bei deinem Besuch.",
    },
  ],
  gallery: [
    {
      src: `${mediaUrl}lounge-02.jpg`,
      alt: "Gesamtansicht des Gastraums mit Sitzplätzen und Barbereich",
      position: "50% 57%",
    },
    {
      src: `${mediaUrl}lounge-03.jpg`,
      alt: "Sitzplätze und Tische im Innenraum",
      position: "50% 59%",
    },
    {
      src: `${mediaUrl}lounge-07.jpg`,
      alt: "Tresen mit Barhockern und farbiger Beleuchtung",
      position: "50% 65%",
    },
    {
      src: `${mediaUrl}lounge-06.jpg`,
      alt: "Blick entlang eines Sitzbereichs in der Lounge",
      position: "50% 58%",
    },
    {
      src: `${mediaUrl}lounge-01.jpg`,
      alt: "Farbige Lichtakzente und Sitzbereich im Innenraum",
      position: "50% 60%",
    },
  ],
};
