(() => {
  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const q = (tag, text, answer, distractors, explanation, context = '') => {
    const answers = shuffle([answer, ...distractors]);
    return { tag, text, answers, correct: answers.indexOf(answer), explanation, context };
  };
  const n = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const num = (value) => String(Number(value.toFixed ? value.toFixed(2) : value)).replace('.', ',');

  const readingThemes = [
    { title: 'Mobilite et ville', text: 'Une metropole qui reduit la place de la voiture ne transforme pas seulement les deplacements. Elle modifie aussi la maniere dont les habitants percoivent les distances, les commerces et les usages de l espace public. Pourtant, une piste cyclable ne produit pas automatiquement les memes effets dans tous les quartiers : le relief, la securite et la densite des services comptent autant que son trace.', core: 'Les effets d une infrastructure dependent aussi de son contexte local.', false: 'Une piste cyclable produit toujours les memes effets.' },
    { title: 'Innovation et travail', text: 'L automatisation supprime certaines taches repetitives mais elle ne rend pas le jugement humain superflu. Dans les organisations qui l adoptent avec succes, les outils sont associes a une rediscussion des roles, de la formation et de la responsabilite. Le probleme n est donc pas de choisir entre humain et machine, mais de definir ce que chacun fait le mieux.', core: 'La technologie est utile lorsqu elle s accompagne d une organisation adaptee.', false: 'L automatisation remplace necessairement tout jugement humain.' },
    { title: 'Alimentation et information', text: 'Les etiquettes alimentaires simplifient une decision complexe en rendant certains criteres immediatement visibles. Elles ne disent toutefois pas tout : la composition, la portion consommee et le contexte d alimentation echappent en partie a un indicateur unique. Leur interet est de guider un premier choix, non de se substituer a toute reflexion.', core: 'Un indicateur peut orienter un choix sans resumer toute la realite.', false: 'Une etiquette suffit a decrire completement un aliment.' },
    { title: 'Lecture et ecrans', text: 'La lecture sur ecran favorise la circulation rapide entre les sources, la recherche et l annotation. En revanche, ce gain de fluidite peut encourager une attention morcelee lorsque les sollicitations sont nombreuses. Opposer papier et ecran sans nuance masque donc le role decisif des conditions de lecture.', core: 'Les supports influencent la lecture mais les conditions d usage restent decisives.', false: 'Un support determine a lui seul la qualite de la lecture.' },
    { title: 'Energie et sobriete', text: 'Ameliorer le rendement d un appareil est souhaitable, mais cela ne garantit pas une baisse globale de la consommation. Un usage devenu moins couteux peut se diffuser plus largement ou augmenter en frequence. Pour evaluer une politique de sobriete, il faut donc observer les usages reels et non la seule performance technique.', core: 'Une performance technique ne permet pas a elle seule de predire la consommation totale.', false: 'Un appareil plus efficace reduit toujours la consommation totale.' },
    { title: 'Culture et patrimoine', text: 'Numeriser des archives elargit leur acces, notamment pour les personnes eloignees des lieux de conservation. Cette operation ne remplace pas l objet original : son materiau, ses dimensions et les traces de son histoire offrent des informations que l image ne restitue pas entierement. L acces numerique et la conservation physique se completent donc.', core: 'Le numerique facilite l acces sans annuler la valeur de l original.', false: 'La numerisation rend inutile la conservation des originaux.' }
  ];

  function readingQuestions() {
    return shuffle(readingThemes).slice(0, 3).flatMap((theme, i) => {
      const tag = `Comprehension - Texte ${i + 1}`;
      const context = `${theme.title}\n\n${theme.text}`;
      return [
        q(tag, 'Quelle idee resume le mieux ce texte ?', theme.core, [theme.false, 'Le sujet traite est sans importance.', 'Toute solution est inefficace.', 'Les choix individuels ne comptent jamais.'], 'Le passage developpe cette idee avec une nuance explicite.', context),
        q(tag, 'Quelle proposition contredit le texte ?', theme.false, [theme.core, 'Le contexte d application compte.', 'Le texte invite a nuancer une conclusion immediate.', 'Un facteur unique ne suffit pas toujours a expliquer un resultat.'], 'Cette proposition affirme exactement ce que le texte met en garde de ne pas conclure.', context),
        q(tag, 'L auteur cherche surtout a :', 'nuancer une conclusion qui parait evidente.', ['raconter une experience personnelle.', 'defendre une solution unique.', 'presenter un conflit sans prendre position.', 'refuser toute evolution.'], 'La construction oppose un benefice reel a une limite ou a une condition.', context),
        q(tag, 'Quel mot caracterise le mieux la posture de l auteur ?', 'Prudente', ['Triomphante', 'Indifferente', 'Dogmatique', 'Ironique'], 'Le texte insiste sur les conditions, les limites et la complementarite.', context),
        q(tag, 'Quelle inference est la plus fondee ?', 'Une bonne decision suppose de considerer plusieurs facteurs.', ['Un seul indicateur suffit toujours.', 'Le changement doit etre abandonne.', 'Les usages restent identiques dans tous les cas.', 'La technique est sans effet.'], 'Le texte rejette les explications monocausales et invite a examiner les conditions. ', context)
      ];
    });
  }

  function calcQuestions() {
    const a = n(64, 120), rate = pick([10, 15, 20, 25]); const final = a * (1 - rate / 100);
    const distance = n(150, 280), hours = pick([2.5, 3.5, 4]), speed = distance / hours;
    const total = n(120, 240), share = pick([25, 30, 35, 40]), part = total * share / 100;
    const x = n(7, 18), multiplier = pick([3, 4, 5]), constant = n(4, 11), rhs = multiplier * x + constant;
    const base = n(40, 90), increase = pick([12, 15, 20]), afterIncrease = base * (1 + increase / 100), afterBoth = afterIncrease * .9;
    const unit = n(12, 24), count = n(7, 16), revenue = unit * count;
    return [
      q('Calcul - Niveau 1', `Un article coute ${a} euros et beneficie d une remise de ${rate} %. Quel est son prix final ?`, `${num(final)} euros`, [`${num(a)} euros`, `${num(a * (1 + rate / 100))} euros`, `${num(a - rate)} euros`, `${num(a * (1 - rate / 200))} euros`], `On applique la remise au prix : ${a} x ${1 - rate / 100} = ${num(final)}.`),
      q('Calcul - Niveau 1', `Un vehicule parcourt ${distance} km en ${String(hours).replace('.', ',')} heures. Quelle est sa vitesse moyenne ?`, `${num(speed)} km/h`, [`${num(speed + 10)} km/h`, `${num(speed - 10)} km/h`, `${num(distance / (hours + 1))} km/h`, `${distance} km/h`], `Vitesse = distance / duree = ${distance} / ${hours} = ${num(speed)}.`),
      q('Calcul - Niveau 1', `Dans un groupe de ${total} personnes, ${share} % choisissent l option A. Combien de personnes ont choisi A ?`, String(part), [String(total - part), String(share), String(part + 10), String(total / 2)], `${share} % de ${total} = ${total} x ${share}/100 = ${part}.`),
      q('Calcul - Niveau 1', `Resoudre : ${multiplier}x + ${constant} = ${rhs}.`, String(x), [String(x + 1), String(x - 1), String(rhs - constant), String(rhs / multiplier)], `On soustrait ${constant}, puis on divise par ${multiplier} : x = ${x}.`),
      q('Calcul - Niveau 2', `Un prix de ${base} euros augmente de ${increase} %, puis baisse de 10 %. Quel est le prix final ?`, `${num(afterBoth)} euros`, [`${num(base)} euros`, `${num(afterIncrease)} euros`, `${num(base * 1.1)} euros`, `${num(afterBoth + 5)} euros`], `Les operations successives donnent ${base} x ${1 + increase / 100} x 0,9 = ${num(afterBoth)}.`),
      q('Calcul - Niveau 1', `Un billet coute ${unit} euros. Combien rapportent ${count} billets ?`, `${revenue} euros`, [`${unit + count} euros`, `${unit * (count - 1)} euros`, `${revenue + unit} euros`, `${count} euros`], `${unit} x ${count} = ${revenue}.`),
      q('Calcul - Niveau 2', 'Une quantite augmente de 20 %, puis diminue de 20 %. Par rapport a la valeur de depart, elle est :', 'inferieure de 4 %', ['identique', 'superieure de 4 %', 'inferieure de 20 %', 'superieure de 20 %'], '1,20 x 0,80 = 0,96 : la valeur finale est inferieure de 4 %.'),
      q('Calcul - Niveau 2', 'La moyenne de cinq nombres est 18. Quatre de ces nombres totalisent 61. Quel est le cinquieme ?', '29', ['18', '22', '25', '90'], 'Le total vaut 5 x 18 = 90. Il manque 90 - 61 = 29.'),
      q('Calcul - Niveau 2', 'Une recette pour 6 personnes utilise 450 g de farine. Quelle quantite faut-il pour 14 personnes ?', '1 050 g', ['750 g', '900 g', '1 200 g', '1 400 g'], 'Proportionnalite : 450 / 6 x 14 = 1 050.'),
      q('Calcul - Niveau 2', 'Un rectangle a un perimetre de 34 cm et une longueur de 11 cm. Quelle est sa largeur ?', '6 cm', ['5 cm', '11 cm', '12 cm', '17 cm'], '2(L + l) = 34, donc L + l = 17. l = 17 - 11 = 6.'),
      q('Calcul - Niveau 3', 'Un capital est place a interets simples de 3 % par an. Au bout de 4 ans, les interets sont 96 euros. Quel est le capital initial ?', '800 euros', ['600 euros', '768 euros', '1 000 euros', '3 200 euros'], 'Interets = capital x 0,03 x 4. Donc capital = 96 / 0,12 = 800.'),
      q('Calcul - Niveau 3', 'Un produit est vendu 72 euros apres une remise de 10 %. Quel etait son prix avant remise ?', '80 euros', ['64,80 euros', '79,20 euros', '82 euros', '90 euros'], '72 represente 90 % du prix initial. 72 / 0,9 = 80.'),
      q('Calcul - Niveau 3', 'A et B terminent ensemble une tache en 6 h. A seul la termine en 10 h. Combien de temps faut-il a B seul ?', '15 h', ['4 h', '6 h', '10 h', '16 h'], 'Taux ensemble 1/6, taux A 1/10. Taux B = 1/6 - 1/10 = 1/15.'),
      q('Calcul - Niveau 3', 'Une solution contient 30 % de sel. On ajoute de l eau pour obtenir 20 % de sel. Le volume final est :', '1,5 fois le volume initial', ['1,2 fois', '1,3 fois', '2 fois', 'le meme volume'], 'La quantite de sel reste constante : 0,30V = 0,20Vf, donc Vf = 1,5V.'),
      q('Calcul - Niveau 3', 'Dans une classe, le ratio filles/garcons est 3/5. Si la classe compte 32 eleves, combien y a-t-il de filles ?', '12', ['8', '16', '20', '24'], '3 + 5 = 8 parts. Une part vaut 32 / 8 = 4 ; 3 parts = 12.')
    ];
  }

  const argItems = [
    ['Une entreprise veut reduire ses reunions car elles seraient trop longues.', 'La duree moyenne des reunions est de 55 minutes et plusieurs decisions restent en attente.', 'Les salles de reunion ont ete renovees.', 'Ce fait soutient directement le diagnostic de lenteur.'],
    ['Une ville envisage d ouvrir une voie de bus.', 'Aux heures de pointe, les bus existants restent bloqués dans la meme circulation que les voitures.', 'Le reseau de bus utilise des vehicules recents.', 'Le fait montre que la fluidite est un enjeu pertinent.'],
    ['Une ecole veut instaurer une heure de tutorat hebdomadaire.', 'Les eleves qui demandent de l aide ne trouvent pas toujours de plage commune avec les enseignants.', 'La cour de recreation est plus frequentee le mardi.', 'Le fait met en evidence un besoin d accompagnement structure.'],
    ['Un musee souhaite elargir ses horaires le soir.', 'De nombreux visiteurs potentiels travaillent aux heures habituelles d ouverture.', 'Le musee possede une nouvelle collection.', 'Le fait renforce l interet d une ouverture decalee.'],
    ['Une entreprise veut favoriser le covoiturage.', 'Le parking est sature des 8 heures et les salaries viennent souvent des memes zones.', 'Les places de parking sont gratuites.', 'Le fait suggere un benefice concret a mutualiser les trajets.']
  ];
  function argumentQuestions() {
    const base = Array.from({ length: 15 }, (_, i) => {
      const [claim, support, distractor, explanation] = argItems[i % argItems.length];
      const variant = i % 3;
      if (variant === 0) return q('Raisonnement et argumentation', `${claim} Quel fait renforce le plus cette proposition ?`, support, [distractor, 'Le sujet est souvent evoque dans les medias.', 'Le projet couterait moins de 10 euros.', 'Certains participants preferent ne rien changer.'], explanation);
      if (variant === 1) return q('Raisonnement et argumentation', `${claim} Quel fait affaiblirait le plus cette proposition ?`, 'Un dispositif identique a deja ete teste sans modifier le probleme vise.', [support, distractor, 'Les responsables ont annonce une reunion d information.', 'Le projet serait lance a titre experimental.'], 'Un contre-exemple direct fragilise le lien entre la solution proposee et le probleme.');
      return q('Raisonnement et argumentation', `On avance l affirmation suivante : « ${claim} » Quelle conclusion est la plus prudente ?`, 'La mesure merite d etre evaluee a partir de donnees liees au probleme vise.', ['La mesure reussira certainement.', 'La mesure doit etre abandonnee sans analyse.', 'Tout changement produit les memes resultats.', 'Les donnees sont inutiles.'], 'Une conclusion rigoureuse demande de verifier le lien entre la mesure et ses effets.');
    });
    return base;
  }

  function conditionQuestions() {
    const patterns = [
      ['Quelle est la valeur de x ? (1) 3x + 2 = 20. (2) x est positif.', 'La proposition (1) suffit seule.', ['La proposition (2) suffit seule.', 'Les deux propositions ensemble sont necessaires.', 'Chaque proposition suffit seule.', 'Les informations ne suffisent pas.'], 'La premiere equation determine directement x = 6.'],
      ['Le nombre n est-il pair ? (1) n est divisible par 6. (2) n est superieur a 10.', 'La proposition (1) suffit seule.', ['La proposition (2) suffit seule.', 'Les deux propositions ensemble sont necessaires.', 'Chaque proposition suffit seule.', 'Les informations ne suffisent pas.'], 'Tout multiple de 6 est pair.'],
      ['Quel est le prix apres remise ? (1) Le prix initial est 75 euros. (2) La remise est de 20 %.', 'Les deux propositions ensemble sont necessaires.', ['La proposition (1) suffit seule.', 'La proposition (2) suffit seule.', 'Chaque proposition suffit seule.', 'Les informations ne suffisent pas.'], 'Il faut connaitre le prix et le taux pour calculer le prix final.'],
      ['Le triangle ABC est-il rectangle ? (1) Un de ses angles mesure 90 degres. (2) Ses cotes sont de longueurs differentes.', 'La proposition (1) suffit seule.', ['La proposition (2) suffit seule.', 'Les deux propositions ensemble sont necessaires.', 'Chaque proposition suffit seule.', 'Les informations ne suffisent pas.'], 'Un triangle qui possede un angle droit est rectangle.'],
      ['Paul est-il plus age que Lea ? (1) Paul a 27 ans. (2) Lea est nee en 2000.', 'Les informations ne suffisent pas.', ['La proposition (1) suffit seule.', 'La proposition (2) suffit seule.', 'Les deux propositions ensemble sont necessaires.', 'Chaque proposition suffit seule.'], 'Sans la date du jour ou l age exact de Lea, la comparaison n est pas certaine.']
    ];
    return Array.from({ length: 15 }, (_, i) => { const p = patterns[i % patterns.length]; return q('Conditions minimales', p[0], p[1], p[2], p[3]); });
  }

  const expressionItems = [
    ['Complete : « Cette action vise a ___ les retards de livraison. »', 'reduire', ['amplifier', 'observer', 'deplacer', 'ignorer'], 'Le verbe « reduire » exprime l objectif de diminution.'],
    ['Quelle phrase est correcte ?', 'Les donnees que nous avons recueillies confirment notre hypothese.', ['Les donnees que nous avons recueilli confirme notre hypothese.', 'Les donnees que nous avons recueillies confirme notre hypothese.', 'Les donnees que nous avons recueillis confirment notre hypothese.', 'Les donnees que nous avons recueillir confirment notre hypothese.'], 'Le participe s accorde avec le COD place avant, et le verbe avec le sujet pluriel.'],
    ['Complete : « Le budget est contraint ; ___, le projet reste prioritaire. »', 'pourtant', ['ainsi', 'par exemple', 'en effet', 'donc'], '« Pourtant » introduit l opposition attendue.'],
    ['Quelle formulation est la plus precise ?', 'Le temps de traitement a baisse de 18 % en trois mois.', ['Le temps a beaucoup baisse.', 'Les equipes travaillent mieux.', 'Le resultat est plutot positif.', 'Le projet semble fonctionner.'], 'La formulation donne un indicateur quantifie et une periode.'],
    ['Complete : « Les resultats sont encourageants, ___ ils doivent etre interpretes avec prudence. »', 'mais', ['donc', 'car', 'ainsi', 'puisque'], '« Mais » introduit une restriction.']
  ];
  function expressionQuestions() { return Array.from({ length: 15 }, (_, i) => { const p = expressionItems[i % expressionItems.length]; return q('Expression', p[0], p[1], p[2], p[3]); }); }

  function logicQuestions() {
    const patterns = [
      ['Complete la suite : 3, 7, 15, 31, ...', '63', ['47', '55', '61', '65'], 'Chaque terme est double puis augmente de 1.'],
      ['Cinq dossiers A, B, C, D et E sont classes. E est avant A et A est avant B. Quelle proposition est necessairement vraie ?', 'E est avant B.', ['B est avant E.', 'A est avant E.', 'C est avant D.', 'D est dernier.'], 'Par transitivite, E precede A qui precede B.'],
      ['Si chaque lettre avance de deux rangs dans l alphabet, comment code-t-on MATH ?', 'OCVJ', ['NBUI', 'OCVG', 'QCVJ', 'NBUJ'], 'M devient O, A devient C, T devient V et H devient J.'],
      ['Tous les cercles bleus sont petits. Certains objets petits sont lourds. Quelle affirmation est necessairement vraie ?', 'Les cercles bleus sont petits.', ['Tous les objets lourds sont bleus.', 'Certains cercles bleus sont lourds.', 'Aucun cercle bleu n est lourd.', 'Tous les petits objets sont bleus.'], 'Seule la premiere relation est garantie par l enonce.'],
      ['Complete la suite : 2, 6, 12, 20, 30, ...', '42', ['36', '40', '44', '48'], 'Les ecarts sont +4, +6, +8, +10, puis +12.']
    ];
    return Array.from({ length: 15 }, (_, i) => { const p = patterns[i % patterns.length]; return q('Logique', p[0], p[1], p[2], p[3]); });
  }

  const labels = ['Examen blanc 01', 'Examen blanc 02', 'Examen blanc 03', 'Examen blanc 04'];
  window.mockExamLabels = labels;
  window.createMockExam = (number) => {
    const questions = shuffle([
      ...readingQuestions(), ...calcQuestions(), ...argumentQuestions(), ...conditionQuestions(), ...expressionQuestions(), ...logicQuestions()
    ]);
    if (questions.length !== 90) throw new Error('Un examen blanc doit contenir 90 questions.');
    return { id: `exam-${number}`, title: labels[number - 1], questions, fullExam: true };
  };
})();
