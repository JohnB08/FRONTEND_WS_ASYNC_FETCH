### Gjennomgang for uthenting av data fra aurora apien.

Her kommer et eksempel på å hente ut data fra aurora apien [http://auroraslive.io/#/api/v1].<br>
I workshoppen så vi at auroraapien, egentlig kun kan ta imot latitude og longitude parametere for å hente data fra en lokasjon<br>
Vi så også at apiet vårt kun tar i mot parametere fra URLSearchParams.<br>
Vi så vi måtte definere hvilke api modul vi skulle hente data fra via URLSearchParams parameteret

```bash
type
```

<br>
Vi så at vi må lage et gyldig searchparameter som oppfylgte kravene gitt på dokumentasjonen over "required parameters".<br>

Vi bruker derfor data fra [https://raw.githubusercontent.com/lmfmaier/cities-json/refs/heads/master/cities500.json] for å gi bruker<br>
mulighet å velge en by fra sitt land. <br>
Vi ser på å definere vår js fil som en module for å gi oss tilgang til nye måter å kode på, blandt annet at vi kan bruke top level await <br>
vi så at vi kan bruke fetch for å hente inn data fra en json fil, og bruke den videre nedover i koden vår. <br>
Vi så på hvordan vi kan gruppere og samle data rundt et spesifikt datapunkt via Object.groupBy<br>
Vi la til eventlisteners på en select for å kunne hente input fra brukeren hva land og by han ville hente data fra. <br>
