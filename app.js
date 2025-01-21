const buttonIdee = document.getElementById("plus-button");
const gray_box = document.querySelector(".gray-box");

// Ajouter un écouteur d'événement sur le bouton
buttonIdee.addEventListener("click", function() {
    // Créer un nouveau div
    const newDiv = document.createElement("div");

    // Ajouter du contenu au nouveau div (par exemple, du texte)
    // newDiv.textContent = "Nouveau div ajouté!";

    // Ajouter une classe à ce nouveau div
    newDiv.classList.add("idee-box");

    // Ajouter le nouveau div au conteneur
    gray_box.appendChild(newDiv);
});

const buttonToDos = document.getElementById("add-button");
const whiteBox = document.querySelector(".white-box ul");
console.log(document.getElementById("add-button")); // Devrait afficher l'élément ou `null`
console.log(document.querySelector(".white-box")); // Devrait afficher l'élément ou `null`

// Ajouter un écouteur d'événement sur le bouton
buttonToDos.addEventListener("click", function() {
    // Créer un nouvel élément li
    const newLi = document.createElement("li");

    // Créer l'élément label pour la checkbox et l'icône SVG
    const newLabel = document.createElement("label");
    newLabel.classList.add("container");

    // Ajouter une checkbox
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";

    // Ajouter le SVG
    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("viewBox", "0 0 64 64");
    newSvg.innerHTML = `
        <path 
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938" 
            class="path">
        </path>
    `;

    // Ajouter la checkbox et le SVG au label
    newLabel.appendChild(newCheckBox);
    newLabel.appendChild(newSvg);

    // Ajouter un texte descriptif
    const newText = document.createElement("p");
    newText.textContent = "Nouveau div ajouté!";

    // Ajouter le label et le texte au li
    newLi.appendChild(newLabel);
    newLi.appendChild(newText);

    // Ajouter le nouveau li au conteneur ul
    whiteBox.appendChild(newLi);
});