/* Vi lager en generisk fetch funksjon, som kan brukes å hente data.  */
const fetchFunc = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
/* Vi bruker vår fetch funksjon for å hente inn json filen som inneholder lat og long koordinater for alle byer i verden med over 500 innbyggere.  */
let cities = await fetchFunc("./cities.json");
/* for å gjøre datasettet lettere å søke i, bruker vi Object.groupBy metoden for å gruppere hver by i landet det tilhører.
Da ender vi opp med et object som ser ish sånn ut: 
{   
    ...
    NO: [alle byene som er knyttet til NO]
    SE: [alle byene knyttet til SE]}
    ...
*/
let citiesGroupedByCountry = Object.groupBy(cities, ({ country }) => country);
/* Nå blir det lett for oss, å lage selects som lar brukeren vår velge først et land, så en by i hvert land. */
const countrySelect = document.querySelector("#countrySelect");
const citySelect = document.querySelector("#citySelect");
/* Vi henter og inn en liste som vi skal outputte three day forecasten i.  */
const forecastOutput = document.querySelector(".forecastOutput");

/* Vi velger alle nøkler i citiesGroupedByCountry og lager en option i countrySelect for hver landskode. 
Hver option skal også holde sin countrycode som verdi.
For da kan vi bruke den verdien for å hente ut alle byene bruker velger senere.*/
Object.keys(citiesGroupedByCountry).forEach((country) => {
  const countryOption = document.createElement("option");
  countryOption.value = country;
  countryOption.textContent = country;
  countrySelect.appendChild(countryOption);
});
/* Vi lager så en eventlistener til countrySelect, som "lytter" etter et "change" event.
dvs at en bruker velger en ny option.
Vi henter så ut alle byene bruker velger, og lager en option for hver by i citiesSelect slik at en bruker skal kunne velge en by de vil ha forecast fra. */
countrySelect.addEventListener("change", (event) => {
  const chosenCountry = event.target.value;
  const chosenCities = citiesGroupedByCountry[chosenCountry];
  for (let i = 0; i < citySelect.childNodes.length; i++) {
    console.log(citySelect.childNodes[i]);
    citySelect.childNodes[i].remove();
  }
  chosenCities.forEach((city) => {
    const cityOption = document.createElement("option");
    /* Her lager vi et ferdig url parameter, basert på lat og lon verdiene til byen vår i cities arrayet.
    Vi setter så de ferdige url parameterene som "value" til denne optionen. */
    const searchParams = new URLSearchParams({
      type: "all",
      lat: city.lat,
      long: city.lon,
      weather: false,
    }).toString();
    cityOption.value = searchParams;
    cityOption.textContent = city.name;
    citySelect.appendChild(cityOption);
  });
});
/* Vi lager en eventlistener til citySelect, hvor vi henter ut queryparameterene for den valgte byen, og gjør et søk mot auroraapien basert på disse.
Vi henter så ut forecasten fra svaret vi får, og lager en enkel <li> for hver value og appender det til vår forecastOutput <ul> */
citySelect.addEventListener("change", async (event) => {
  console.log(event.target.value);
  const baseApiUrl = "https://api.auroras.live/v1/?";
  const searchUrl = baseApiUrl + event.target.value;
  const response = await fetchFunc(searchUrl);
  console.log(response);
  forecastOutput.childNodes.forEach((child) => child.remove());
  response.threeday.values.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      const li1 = document.createElement("li");
      li1.textContent = `${new Date(
        value[i].start
      ).toLocaleDateString()} kp value is: ${value[i].value}`;
      forecastOutput.appendChild(li1);
    }
  });
});
