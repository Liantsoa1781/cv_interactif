    function afficherCV(profil){
        const grand_div = document.createElement("div");
        grand_div.id = "grand_div";

        document.body.appendChild(grand_div);

        // EN-TÊTE
        const h1 = document.createElement("h1");
        h1.id = "title";
        h1.textContent = profil.nom;

        const h2 = document.createElement("h2");
        h2.id = "subtile";
        h2.textContent = profil.poste;

        const div_presentation = document.createElement("div");
        const presentation = document.createElement("div");
        presentation.id = "summary";
        presentation.textContent = profil.presentation;

        div_presentation.appendChild(presentation);
        div_presentation.id = "div_presentation";

        const div_haut = document.createElement("div");
        div_haut.appendChild(h1);
        div_haut.appendChild(h2);
        div_haut.appendChild(div_presentation);
        div_haut.id = "div_haut";

        grand_div.appendChild(div_haut);

        // INFORMATIONS PERSONNELLES
        const div_infos = document.createElement("div");
        const infos = document.createElement("div");
        infos.id = "infos";

        const email = document.createElement("p");
        email.textContent = "Email : " + profil.email;

        const ville = document.createElement("p");
        ville.textContent = "Ville : " + profil.ville;

        infos.appendChild(email);
        infos.appendChild(ville);

        div_infos.appendChild(infos);
        div_infos.id = "div_infos";

        // COMPÉTENCES
        const div_competences = document.createElement("div");
        div_competences.id = "div_competences";

        const ul = document.createElement("ul");
        ul.id = "skills";

        profil.competences.forEach(function(skill) {
            const li = document.createElement("li");
            li.textContent = skill;
            ul.appendChild(li);
        });

        div_competences.appendChild(ul);

        // NOUVEAU BLOC : FORMATIONS ET EXPÉRIENCES
        const div_parcours = document.createElement("div");
        div_parcours.id = "div_parcours";

        // FORMATIONS
        const titreFormations = document.createElement("h2");
        titreFormations.textContent = "Formations";
        div_parcours.appendChild(titreFormations);

        profil.formations.forEach(function(formation) {
            const blocFormation = document.createElement("div");
            blocFormation.id = "bloc_formation";

            const diplome = document.createElement("h3");
            diplome.textContent = formation.diplome;

            const etablissement = document.createElement("p");
            etablissement.textContent = formation.etablissement;

            const periode = document.createElement("p");
            periode.textContent = formation.periode;

            const description = document.createElement("p");
            description.textContent = formation.description;

            blocFormation.appendChild(diplome);
            blocFormation.appendChild(etablissement);
            blocFormation.appendChild(periode);
            blocFormation.appendChild(description);

            div_parcours.appendChild(blocFormation);
        });

        // EXPÉRIENCES PROFESSIONNELLES
        const titreExperiences = document.createElement("h2");
        titreExperiences.textContent = "Expériences professionnelles";
        div_parcours.appendChild(titreExperiences);

        profil.experiences.forEach(function(experience) {
            const blocExperience = document.createElement("div");
            blocExperience.id = "bloc_experience";

            const poste = document.createElement("h3");
            poste.textContent = experience.poste;

            const entreprise = document.createElement("p");
            entreprise.textContent =
                experience.entreprise + " - " + experience.lieu + ": ";

            const periode = document.createElement("p");
            periode.textContent = experience.periode;

            const description = document.createElement("p");
            description.textContent = experience.description;

            blocExperience.appendChild(poste);
            blocExperience.appendChild(entreprise);
            blocExperience.appendChild(periode);
            blocExperience.appendChild(description);

            div_parcours.appendChild(blocExperience);
        });

        // PARTIE BASSE : DEUX COLONNES
        const div_bas = document.createElement("div");
        div_bas.id = "div_bas";

        // COLONNE GAUCHE : INFORMATIONS ET COMPÉTENCES
        const div_gauche = document.createElement("div");
        div_gauche.id = "div_gauche";

        div_gauche.appendChild(div_infos);
        div_gauche.appendChild(div_competences);

        // COLONNE DROITE : FORMATIONS ET EXPÉRIENCES
        const div_droite = document.createElement("div");
        div_droite.id = "div_droite";

        div_droite.appendChild(div_parcours);

        div_bas.appendChild(div_gauche);
        div_bas.appendChild(div_droite);

        grand_div.appendChild(div_bas);

    }

    //Charger les données de l'API Github
    function afficherCvGithub(){
        fetch("https://api.github.com/users/Liantsoa1781")
            .then(function(reponse) {
                if (!reponse.ok) {
                    throw new Error("Impossible de charger cv.json");
                }

                return reponse.json();
            })
            //Prendre les données recu de l'API Git deja transformer en javascript
            .then(function(donnees_github){
                const blocGithub = document.createElement("div");
                blocGithub.id = "blocGithub";

                const pdp = document.createElement("img");
                pdp.src = donnees_github.avatar_url;
                pdp.id = "avatar_github";
                blocGithub.appendChild(pdp);

                const pseudo = document.createElement("p");
                pseudo.textContent = donnees_github.login;
                pseudo.id = "pseudo_github";
                blocGithub.appendChild(pseudo);

                const url = document.createElement("a");
                url.href = donnees_github.html_url;
                url.id = "url_github";
                url.textContent = "Voir mon profil GitHub";
                //Ouvre le lien dans un nouvel onglet
                url.target = "_blank";
                blocGithub.appendChild(url);

                //Mettre le boc GitHub dans le div du hmtml
                document.getElementById("div_infos").prepend(blocGithub);
            })
            .catch(function(erreur){
                console.error("Erreur :", erreur);
            })
    }

    //Charger le fichier json contenant les données
    fetch("cv.json")
        //Prends le contenu du json et le transforme en javascript
        .then(function(reponse) {
            if (!reponse.ok) {
                throw new Error("Impossible de charger cv.json");
            }

            return reponse.json();
        })
        //Appel de fonction pour utiliser les données js
        .then(function(profil) {
            afficherCV(profil);
            afficherCvGithub();
        })
        .catch(function(erreur) {
            console.error("Erreur :", erreur);
        });

    function imprimerCV() {
        window.print();
    }

    const btn_imprimer = document.getElementById("btn-imprimer");
    btn_imprimer.addEventListener("click", function(){
        imprimerCV();
    });