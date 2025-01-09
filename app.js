const button = document.getElementById("plus-button");
const gray_box = document.querySelector(".gray-box");

// Ajouter un écouteur d'événement sur le bouton
button.addEventListener("click", function() {
    // Créer un nouveau div
    const newDiv = document.createElement("div");

    // Ajouter du contenu au nouveau div (par exemple, du texte)
    // newDiv.textContent = "Nouveau div ajouté!";

    // Ajouter une classe à ce nouveau div
    newDiv.classList.add("idee-box");

    // Ajouter le nouveau div au conteneur
    gray_box.appendChild(newDiv);
});