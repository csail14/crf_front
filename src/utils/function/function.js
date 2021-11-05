import { getAllRessources } from "../api/RessourcesApi";
export const checkAllRessources = (allRessources, loadFunction) => {
  if (allRessources.length === 0) {
    getAllRessources().then((res) => {
      loadFunction(res);
    });
  }
};
