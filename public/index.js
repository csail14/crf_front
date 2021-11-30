document.addEventListener("DOMContentLoaded", () => {
  fetch("https://pmis-wp.laguildedupixel.fr/wp-json/acf/v3/options/options")
    .then((res) => res.json())
    .then(
      (resp) =>
        (document.body.innerHTML += resp && resp.acf && resp.acf.script_cookies)
    )
    .catch((err) => console.log(err));
});

function getFavIcon() {
  var script = document.createElement("link");
  fetch("https://pmis-wp.laguildedupixel.fr/wp-json/wp/v2/options/favicon")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resp) => {
      script.rel = "icon";
      script.href = resp;
    })
    .catch((err) => {
      console.log(err);
    });
  return script;
}
let favIconScript = getFavIcon();
document.head.append(favIconScript);
