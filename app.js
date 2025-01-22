// === PARTIE SPÉCIFIQUE À "IDEES" ===

const buttonIdee = document.getElementById("plus-button");
const gray_box = document.querySelector(".gray-box");

// Vérifier si les éléments existent avant d'ajouter des écouteurs
if (buttonIdee && gray_box) {
    buttonIdee.addEventListener("click", function() {
        // Créer un nouveau div
        const newDiv = document.createElement("div");

        // Ajouter une classe à ce nouveau div
        newDiv.classList.add("idee-box");

        // Ajouter le nouveau div au conteneur
        gray_box.appendChild(newDiv);
    });
}

// === GESTION DES TO-DOS ===

// Fonction pour sauvegarder les tâches dans localStorage
function saveTasks(sectionId, tasks) {
    localStorage.setItem(sectionId, JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis localStorage
function loadTasks(sectionId) {
    const tasks = localStorage.getItem(sectionId);
    return tasks ? JSON.parse(tasks) : [];
}

// Charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".gray-box.to-dos-box");
    sections.forEach(section => {
        const sectionId = section.querySelector("h3").textContent.trim(); // Utilise le titre comme ID
        const tasks = loadTasks(sectionId);
        const whiteBoxUl = section.querySelector(".white-box ul");

        if (whiteBoxUl) {
            tasks.forEach(task => {
                const newLi = createTaskElement(task);
                whiteBoxUl.appendChild(newLi);
            });
        }
    });
});

// Fonction pour créer un élément de tâche
function createTaskElement(taskText) {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
        <label class="container">
            <input type="checkbox">
            <svg viewBox="0 0 64 64">
                <path 
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938" 
                    class="path">
                </path>
            </svg>
        </label>
        <p>${taskText}</p>
        <button class="trash-button"><i class="fa-solid fa-trash-can"></i></button>
    `;

    // Ajouter un écouteur d'événement pour la poubelle
    const trashButton = newLi.querySelector(".trash-button");
    trashButton.addEventListener("click", function() {
        newLi.remove();
        updateTasksInStorage(newLi.closest(".gray-box"));
    });

    // Ajouter un écouteur d'événement pour modifier le texte
    const taskTextElement = newLi.querySelector("p");
    taskTextElement.addEventListener("dblclick", function() {
        const currentText = taskTextElement.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;

        taskTextElement.replaceWith(input);
        input.focus();

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                saveText();
            }
        });

        input.addEventListener("blur", saveText);

        function saveText() {
            const newText = input.value.trim();
            taskTextElement.textContent = newText || "Nouvelle tâche ajoutée !";
            input.replaceWith(taskTextElement);
            updateTasksInStorage(newLi.closest(".gray-box"));
        }
    });

    return newLi;
}

// Fonction pour mettre à jour les tâches dans localStorage
function updateTasksInStorage(section) {
    const sectionId = section.querySelector("h3").textContent.trim();
    const tasks = [];
    section.querySelectorAll(".white-box ul li p").forEach(p => {
        tasks.push(p.textContent);
    });
    saveTasks(sectionId, tasks);
}

// Sélectionner TOUS les boutons "Ajouter"
const addButtons = document.querySelectorAll(".add-button");

// Pour chaque bouton "Ajouter" trouvé
addButtons.forEach(button => {
    button.addEventListener("click", function() {
        const parentSection = this.closest(".gray-box");
        const whiteBoxUl = parentSection.querySelector(".white-box ul");

        if (whiteBoxUl) {
            const newLi = createTaskElement("Nouvelle tâche ajoutée !");
            whiteBoxUl.appendChild(newLi);
            updateTasksInStorage(parentSection);
        } else {
            console.warn("Aucune liste (<ul>) trouvée dans cette section. Ajoutez-en une dans le HTML.");
        }
    });
});

// Tableau pour les weekdays
let tasksByDay = {
    lundi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    mardi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    mercredi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    jeudi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    vendredi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    samedi: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] },
    dimanche: { "A faire": [], "Sport": [], "Routine": [], "Apprentissage": [] }
};