# vehicle-report
 Site de signalement de véhicule troopy

# Introduction

Ce readme décrit le fonctionnement du formulaire de signalement de véhicule troopy. Vous y trouverez la Stack, les dependencies et les API interne et externe utilisés dans ce projet.

Ce formulaire a pour but de recevoir les signalements des riverains lorsqu'ils rencontrent des véhicules troopy qui bloquent la circulation, mettent en danger des personnes, etc.

Pour ce faire, nous utiliserons l'API Slack pour recevoir les réclamations, et un formulaire permettant aux personnes de soumettre des réclamations.

# API du formulaire

Ce projet implique la création de trois chemins API (New, Picture, Update). On utilise la date “JSON” pour identifier les signalements dans MongoDB.

##  New

- Permet la création d'un nouveau signalement à partir d'une {immatriculation} enregistré par l’utilisateur. Cette action soumet aussi automatiquement :
    - {date} la date au format JSON (ex : 2012-04-23T18:25:43.511Z)
    - {dateFormat} la date au format STRING (ex : jeudi 18 août 2022 à 9h33)
    - {idTicket} l’id du ticket (ex : 20220818_093312_XXXXXXX)
- Request : http://… /api/signal/new
- Type : Post

```javascript
{
	imatriculation: {
    type: String,
    required: true,
    length: 9
  },
	dateFormat: {
    type: String,
    required: true
  },
  date: {
	  type: String,
	  required: true
  },
  idTicket : {
    type: String,
    required: true
  }
}
```

## Picture

- Permet la mise à jour d’un ticket par l’affect de soumettre une {picture} de la situation
- http://… /api/signal/picture
- Type : Post

```javascript
{
	picture: {
    type: String,
  },
  date: {
	  type: String,
	  required: true
  }
}
```

## Update

- Permet la mise à jour d’un ticket par l’affect de soumettre ou non une {situation}
- http://… /api/signal/update
- Type : Post

```javascript
{
	situation: {
    type: String,
    default: 'Pas de situation transmise'
  },
  date: {
	  type: String,
	  required: true
  }
}
```

# Dependencies

## React.JS

```JSON
"browser-image-compression": "^2.0.0",
"node-sass": "^7.0.1",
"react": "^18.2.0",
```

## Node.JS

```JSON
"@slack/web-api": "^6.7.2",
"body-parser": "^1.20.0",
"cors": "^2.8.5",
"dotenv": "^16.0.1",
"express": "^4.18.1",
"mongoose": "^6.5.0",
"multer": "^1.4.5-lts.1",
"node-cron": "^3.0.1"
```

# Documentation complète (Notion)

[***Lien documentation***](https://worried-daughter-935.notion.site/Documentation-du-site-de-signalement-de-v-hicule-troopy-90f1ae42eb514265be7c6d3ce413e623)
