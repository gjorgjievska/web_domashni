
const modal = document.getElementById("destinationModal");
const closeButton = document.getElementById("closeModal");
const modalCityName = document.getElementById("modalCityName");
const modalGallery = document.getElementById("modalGallery");
const likeButton = document.getElementById("like-btn");
const dislikeButton = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");


const destinations = {

    santorini: {
        images: [
            "santorini.jpg",
            "santorini2.jpg",
            "santorini3.jpg"
        ],
        likes: 0,
        dislikes: 0,
        vote: null,
        comments: []
    },

    venice: {
        images: [
            "venice.jpg",
            "venice2.jpg",
            "venice3.jpg"
        ],
        likes: 0,
        dislikes: 0,
        vote: null,
        comments: []
    },

    seoul: {
    images: [
        "seul.jpg",
        "seul2.jpg",
        "seul3.jpg"
    ],
    likes: 0,
    dislikes: 0,
    vote: null,
    comments: []
},

    bali: {
        images: [
            "bali.jpg",
            "bali2.jpg",
            "bali3.jpg"
        ],
        likes: 0,
        dislikes: 0,
        vote: null,
        comments: []
    },

    kyoto: {
        images: [
            "kyoto.jpg",
            "kyoto2.jpg",
            "kyoto3.jpg"
        ],
        likes: 0,
        dislikes: 0,
        vote: null,
        comments: []
    },

    amalfi: {
        images: [
            "amalfi.jpg",
            "amalfi2.jpg",
            "amalfi3.jpg"
        ],
        likes: 0,
        dislikes: 0,
        vote: null,
        comments: []
    }

};


let currentCity = null;

function showDestinationData() {

    const city = destinations[currentCity];

    likeCount.textContent = city.likes;
    dislikeCount.textContent = city.dislikes;

    commentsList.innerHTML = "";

    city.comments.forEach(function(comment) {

        const commentDiv = document.createElement("div");
        commentDiv.className = "comment-item";

        const commentText = document.createElement("p");
        commentText.textContent = comment;

        commentDiv.appendChild(commentText);

        commentsList.appendChild(commentDiv);

    });

}


const galleryItems = document.querySelectorAll(".gallery-item");


galleryItems.forEach(function(item) {

    item.addEventListener("click", function() {

        currentCity = item.dataset.city;

        const title = item.querySelector("h3");

        modalCityName.textContent = title.textContent;

        modalGallery.innerHTML = "";

        const city = destinations[currentCity];


        city.images.forEach(function(imagePath) {

            const image = document.createElement("img");

            image.src = imagePath;
            image.alt = title.textContent;

            modalGallery.appendChild(image);

        });


        commentInput.value = "";

        showDestinationData();

        modal.style.display = "flex";

    });

});


closeButton.addEventListener("click", function() {

    modal.style.display = "none";

});



modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


likeButton.addEventListener("click", function() {

    const city = destinations[currentCity];

    if (city.vote === "like") {

        city.likes--;
        city.vote = null;

    } else {

        if (city.vote === "dislike") {

            city.dislikes--;

        }

        city.likes++;
        city.vote = "like";

    }

    showDestinationData();

});



dislikeButton.addEventListener("click", function() {

    const city = destinations[currentCity];

    if (city.vote === "dislike") {

        city.dislikes--;
        city.vote = null;

    } else {

        if (city.vote === "like") {

            city.likes--;

        }

        city.dislikes++;
        city.vote = "dislike";

    }

    showDestinationData();

});


commentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const comment = commentInput.value.trim();

    if (comment === "") {

        return;

    }

    destinations[currentCity].comments.push(comment);

    commentInput.value = "";

    showDestinationData();

});
const surveyForm = document.getElementById("survey-form");

surveyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("survey-message").textContent =
        "Ви благодариме за пополнувањето на анкетата!";
});
let tripDestinations = [
    {
        id: 1,
        name: "Париз",
        price: 250,
        category: "Градски одмор"
    },
    {
        id: 2,
        name: "Рим",
        price: 220,
        category: "Култура и историја"
    },
    {
        id: 3,
        name: "Лондон",
        price: 300,
        category: "Градски одмор"
    }
];

let nextId = 4;



const destinationForm = document.getElementById("destination-form");
const destinationList = document.getElementById("destination-list");

const budgetFilter = document.getElementById("budget-filter");
const categoryFilter = document.getElementById("category-filter");

const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");

const calculatorCity = document.getElementById("calculator-city");
const travelerCount = document.getElementById("traveler-count");
const calculateButton = document.getElementById("calculate-button");
const totalCost = document.getElementById("total-cost");



function showDestinations(list) {

    destinationList.innerHTML = "";

    list.forEach(function(city) {

        destinationList.innerHTML += `
            <div class="destination-plan">

                <h4>${city.name}</h4>

                <p>Цена по лице: ${city.price} €</p>

                <p>Категорија: ${city.category}</p>

                <button class="delete-button" data-id="${city.id}">
                    Избриши
                </button>

            </div>
        `;

    });

}



function updateCalculator() {

    calculatorCity.innerHTML =
        '<option value="">Избери дестинација</option>';

    tripDestinations.forEach(function(city) {

        calculatorCity.innerHTML += `
            <option value="${city.id}">
                ${city.name} - ${city.price} €
            </option>
        `;

    });

}


destinationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("city-name").value;
    const price = Number(document.getElementById("city-price").value);
    const category = document.getElementById("city-category").value;

    const newCity = {
        id: nextId,
        name: name,
        price: price,
        category: category
    };

    tripDestinations.push(newCity);

    nextId++;

    destinationForm.reset();

    showDestinations(tripDestinations);
    updateCalculator();

});



destinationList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-button")) {

        const id = Number(event.target.dataset.id);

        tripDestinations = tripDestinations.filter(function(city) {
            return city.id !== id;
        });

        showDestinations(tripDestinations);
        updateCalculator();

    }

});



filterButton.addEventListener("click", function() {

    const budget = budgetFilter.value;
    const category = categoryFilter.value;

    const filteredDestinations = tripDestinations.filter(function(city) {

        return (budget === "" || city.price <= Number(budget)) &&
               (category === "" || city.category === category);

    });

    showDestinations(filteredDestinations);

});



resetButton.addEventListener("click", function() {

    budgetFilter.value = "";
    categoryFilter.value = "";

    showDestinations(tripDestinations);

});




calculateButton.addEventListener("click", function() {

    const selectedId = Number(calculatorCity.value);
    const travelers = Number(travelerCount.value);

    const selectedCity = tripDestinations.find(function(city) {
        return city.id === selectedId;
    });

    if (selectedCity && travelers > 0) {

        const result = selectedCity.price * travelers;

        totalCost.textContent = "Вкупна цена: " + result + " €";

    } else {

        totalCost.textContent = "Избери дестинација и број на патници!";

    }

});



showDestinations(tripDestinations);
updateCalculator();

const guideData = {

    paris: [
        "Ајфеловата кула",
        "Музејот Лувр",
        "Катедралата Нотр Дам",
        "Триумфалната порта",
        "Шанзелизе",
        "Базиликата Сакре Кер",
        "Музејот Орсеј",
        "Луксембуршките градини",
        "Плоштадот Конкорд",
        "Реката Сена"
    ],

    rome: [
        "Колосеумот",
        "Римскиот форум",
        "Фонтаната Треви",
        "Пантеонот",
        "Шпанските скали",
        "Ватиканот",
        "Базиликата Свети Петар",
        "Плоштадот Навона",
        "Замокот Сант Анџело",
        "Вилата Боргезе"
    ],

    london: [
        "Биг Бен",
        "Лондонскиот мост",
        "Бакингемската палата",
        "Лондонското око",
        "Британскиот музеј",
        "Тауер оф Лондон",
        "Вестминстерската опатија",
        "Хајд паркот",
        "Пикадили циркус",
        "Природонаучниот музеј"
    ],

    santorini: [
        "Селото Оја",
        "Фира",
        "Црвената плажа",
        "Плажата Камари",
        "Селото Имеровигли",
        "Светилникот Акротири",
        "Археолошкиот локалитет Акротири",
        "Манастирот Профитис Илиас",
        "Винариите на Санторини",
        "Заливот Амуди"
    ],

    venice: [
        "Плоштадот Свети Марко",
        "Базиликата Свети Марко",
        "Дуждовата палата",
        "Мостот Риалто",
        "Големиот канал",
        "Мостот на воздишките",
        "Островот Мурано",
        "Островот Бурано",
        "Галеријата Академија",
        "Театарот Ла Фениче"
    ],

    seoul: [
    "Палатата Ѓонгбокгунг",
    "Селото Букчон Ханок",
    "Кулата N Seoul Tower",
    "Улицата Мендонг",
    "Палатата Чангдокгунг",
    "Улицата Инсадонг",
    "Населбата Хонгде",
    "Dongdaemun Design Plaza",
    "Потокот Чонгјечон",
    "Кулата Lotte World Tower"
],

    bali: [
        "Храмот Танах Лот",
        "Шумата на мајмуните во Убуд",
        "Терасите со ориз Тегалаланг",
        "Храмот Улун Дану Бератан",
        "Плажата Кута",
        "Плажата Нуса Дуа",
        "Водопадот Тегенунган",
        "Портата Хандара",
        "Планината Батур",
        "Храмот Улувату"
    ],

    kyoto: [
        "Храмот Фушими Инари",
        "Бамбусовата шума Арашияма",
        "Златниот павилјон Кинкакуџи",
        "Храмот Кијомизу-дера",
        "Населбата Гион",
        "Замокот Ниџо",
        "Патеката на филозофите",
        "Пазарот Нишики",
        "Храмот Гинкакуџи",
        "Паркот Марујама"
    ],

    amalfi: [
        "Градот Амалфи",
        "Катедралата Свети Андреј",
        "Плажата Амалфи",
        "Позитано",
        "Равело",
        "Вилата Руфоло",
        "Вилата Чимброне",
        "Патеката на боговите",
        "Прајано",
        "Фјордо ди Фуроре"
    ]

};



const tickets = document.querySelectorAll(".guide-ticket");

const guideModal = document.getElementById("guide-modal");

const guideTitle = document.getElementById("guide-title");

const guideList = document.getElementById("guide-list");

const closeGuide = document.getElementById("close-guide");


tickets.forEach(function(ticket) {

    ticket.addEventListener("click", function() {

        const city = ticket.dataset.city;

        const name = ticket.querySelector("h3").textContent;

        guideTitle.textContent = name;

        guideList.innerHTML = "";

        guideData[city].forEach(function(place) {

            guideList.innerHTML += "<li>" + place + "</li>";

        });

        guideModal.style.display = "flex";

    });

});


closeGuide.addEventListener("click", function() {

    guideModal.style.display = "none";

});

guideModal.addEventListener("click", function(event) {

    if (event.target === guideModal) {

        guideModal.style.display = "none";

    }

});