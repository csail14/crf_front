async function addCookieScript() {
  const promise = await fetch(
    "https://pmis-wp.laguildedupixel.fr/wp-json/acf/v3/options/options"
  );
  let script = await promise.json();
  script = script.acf.script_cookies ? script.acf.script_cookies : null;
  return script;
}

addCookieScript().then((res) => (document.body.innerHTML += res));

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
