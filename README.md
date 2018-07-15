# Ruby

L'objectif est de coder une API permettant la gestion des utilisateurs d'un service SaaS
Le rendu se fait via un repo git, chaque étape correspondant à un commit dans la branche *master*. Les itérations de dev se font dans la branche *develop*

## Premiere etape: CRUD

Un utilisateur est défini par les champs:

* First name
* Last name
* Login
* Email
* Job Title

La route est /users, et il y a unicité sur les champs "login" et "email"

## Deuxieme étape: Authentication Basic

A partir de maintenant, toutes les routes doivent être protégées par une Basic Auth.

Documentation:

* https://apidock.com/rails/ActiveModel/SecurePassword/ClassMethods/has_secure_password
* http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html

Attention: La création d'un utilisateur doit integrer la définition du mot de passe. 
Astuce: Il peut être interessant de faire hériter le UserController d'un APIController dans lequel on trouvera la surcouche d'authentication

## Troisieme étape: Authentication Bearer

En plus de la Basic Auth, les routes doivent pouvoir être accédées avec un token JWT.
Le token doit pouvoir être generé en requetant la route GET /users/:id/access_token.
Le jeton expire au bout d'une heure et contient le nom/prénom et id de l'utilisateur dans son payload

Documentation:

* http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token.html
* https://jwt.io/

## Quatrieme Etape: Authorisation

Certaines routes doivent être authorisées.
Chaque utilisateur a maintenant une charactéristique is_admin (true ou false).
La route destroy ne peut être utilisée que par les admins

Documentation:

* Exemple d'authorization: https://github.com/varvet/pundit

## Cinquieme Etape: Container

Dockeriser l'application




