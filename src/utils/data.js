export const data = {
  format_ressources: [
    {
      name: "Tous les formats",
      icon: "",
      id: 0,
      value: "all",
    },
    {
      name: "Texte",
      icon: "bi bi-file-earmark-font",
      id: 1,
      value: "text",
    },
    {
      name: "Tableau",
      icon: "bi bi-file-earmark-excel",
      id: 2,
      value: "tableau",
    },
    {
      name: "Image (photo, graphique, carte)",
      icon: "bi bi-file-earmark-image",
      id: 3,
      value: "image",
    },
    {
      name: "Vidéo",
      icon: "bi bi-file-earmark-play",
      id: 4,
      value: "video",
    },
    {
      name: "Lien",
      icon: "bi bi-link-45deg",
      id: 5,
      value: "lien",
    },
  ],
  type_ressources: [
    { id: 0, name: "Dans tous le site", type: "all" },
    { id: 1, name: "Document", type: "documents" },
    { id: 2, name: "Indicateur", type: "indicateurs" },
    { id: 3, name: "Article", type: "post" },
  ],
  date_ressources: [
    { id: 0, name: "N’importe quand", value: "all" },
    { id: 1, name: "Moins de 24h", value: "1 day ago" },
    { id: 2, name: "Moins d’une semaine", value: "1 week ago" },
    { id: 3, name: "Moins d’un mois", value: "1 month ago" },
    { id: 4, name: "Moins de 6 mois", value: "6 months ago" },
    { id: 5, name: "Moins d’un an", value: "1 year ago" },
    { id: 6, name: "Un an ou plus", value: "+1 year" },
  ],
};
