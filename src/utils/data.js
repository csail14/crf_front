export const data = {
  format_ressources: [
    {
      name: "Tous les formats",
      icon: "",
      id: 0,
      value: "all",
      group: "format"
    },
    {
      name: "Texte",
      icon: "bi bi-file-earmark-font",
      id: 1,
      value: "Texte",
      group: "format"
    },
    {
      name: "Tableau",
      icon: "bi bi-file-earmark-excel",
      id: 2,
      value: "Tableau",
      group: "format"
    },
    {
      name: "Image (photo, graphique, carte)",
      icon: "bi bi-file-earmark-image",
      id: 3,
      value: "Image",
      group: "format"
    },
    {
      name: "Vidéo",
      icon: "bi bi-file-earmark-play",
      id: 4,
      value: "Vidéo",
      group: "format"
    },
    {
      name: "Lien",
      icon: "bi bi-link-45deg",
      id: 5,
      value: "Lien",
    },
    {
      name: "Web",
      icon: "bi bi-file-code",
      id: 6,
      value: "Web",
      group: "format"
    },
  ],
  type_ressources: [
    { id: 0, name: "Dans tout le site", type: "all", group:"type" },
    { id: 1, name: "Document", type: "documents", group:"type" },
    { id: 2, name: "Indicateur", type: "indicateurs", group:"type" },
    { id: 3, name: "Article", type: "articles", group:"type" },
  ],
  date_ressources: [
    { id: 0, name: "N’importe quand", value: "all", group:"date" },
    { id: 1, name: "Moins de 24h", value: "1 day ago", group:"date" },
    { id: 2, name: "Moins d’une semaine", value: "1 week ago", group:"date" },
    { id: 3, name: "Moins d’un mois", value: "1 month ago", group:"date" },
    { id: 4, name: "Moins de 6 mois", value: "6 months ago", group:"date" },
    { id: 5, name: "Moins d’un an", value: "1 year ago", group:"date" },
    { id: 6, name: "Un an ou plus", value: "+1 year", group:"date" },
  ],
};
