fetch('./assets/img/')
.then(response => response.text())
.then(data => {
    // Analyse du contenu de la réponse pour extraire les noms de fichiers
    const parser = new DOMParser();
    const htmlContent = parser.parseFromString(data, 'text/html');
    const imageElements = htmlContent.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]');

    // Création de la galerie
    const galerie = document.querySelector('#container');

    imageElements.forEach(imageElement => {
        const imageUrl = './assets/img/' + imageElement.getAttribute('href');
        const imageTitre = imageUrl.split('/').pop().split('.')[0]; // Titre basé sur le nom du fichier sans extension
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = imageTitre;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = imageTitre;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        galerie.appendChild(figure);
    });
})
.catch(error => console.error('Erreur lors de la récupération des images :', error));