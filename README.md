# water_HMI

## Création de la base de données

Créer une base de données postgresql. <br/>
Insérer des données à l'aide du fichier sql/database.sql.

## Configuration de la connexion à la base de données

Modifier le nom water_data par le nom de votre base de données dans la ligne 8 du fichier src/conf/persistence.xml :<br/>
\<property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/water_data"/>

## Déploiement

Ajouter le dossier dans le dossier webapps de votre serveur tomcat.<br/>
Accéder à l'url de votre serveur en ajoutant /water_HMI à la fin.

### Enjoy ! :D
