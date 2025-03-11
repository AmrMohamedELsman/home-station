const navbar = document.querySelector(".navbar");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");



// slider

leftBtn.addEventListener("click", () => {
    navbar.scrollBy({ left: -200, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
    navbar.scrollBy({ left: 200, behavior: "smooth" });
});




// view more logec

document.querySelectorAll(".breakfastCard").forEach(ele => {
    // إذا تم الضغط على زر "View more"
    ele.addEventListener("click", function(e) {
        if (e.target.classList.contains("redBtn")) {
            let card = e.target.closest(".Card"); // الحصول على العنصر الأب (Card)
            let pinfo = card.querySelector(".pinfo");
            let CloseredBtn = card.querySelector(".CloseredBtn");
            let readMoreBtn = card.querySelector(".redBtn");

            readMoreBtn.style.display = "none";
            pinfo.style.display = "block";
            CloseredBtn.style.display = "block";
            CloseredBtn.style.backgroundColor = "red";
            CloseredBtn.style.color = "white";
            card.style.height = "330px";  // تعديل ارتفاع الكارد
        }

        // إذا تم الضغط على زر "Close"
        if (e.target.classList.contains("CloseredBtn")) {
            let card = e.target.closest(".Card"); // الحصول على العنصر الأب (Card)
            let pinfo = card.querySelector(".pinfo");
            let CloseredBtn = card.querySelector(".CloseredBtn");
            let readMoreBtn = card.querySelector(".redBtn");

            pinfo.style.display = "none";
            CloseredBtn.style.display = "none";
            readMoreBtn.style.display = "block";
            CloseredBtn.style.backgroundColor = "white";
            CloseredBtn.style.color = "black";
            card.style.height = "175px";  // تعديل ارتفاع الكارد
        }
    })
})
    




let allLinks = document.querySelectorAll("li a");

let allSections = {
    "Breakfast": "Breakfast",
    "Appetizers": "Appetizers",
    "Soup": "soup",
    "Salad": "Salad",
    "Sandwhiches": "Sandwhiches",
    "Burgers": "Burgers",
    "Hawawshi": "Hawawshi",
    "Pasta": "Pasta",
    "Pizza": "Pizza",
    "MainDishes": "MainDishes",
    "Hot Drinks": "HotDrinks",
    "Coffee": "Coffee",
    "Milkshake": "Milkshake",
    "Iced Coffee": "IcedCoffee",
    "Frappuccino": "Frappuccino",
    "fresh Juice": "freshJuice",
    "Smootheis": "Smootheis",
    "Yoghurt": "Yoghurt",
    "Cocktils": "cocbreckFast",
    "Mojito": "Mojito",
    "Desserts": "Desserts",
    "softDrinks": "softDrinks"
};


function hideAllSections() {
    Object.values(allSections).forEach(id => {
        let sec = document.getElementById(id);
        if (sec) sec.style.display = "none";
    });
}

// **إظهار قسم الفطور عند تحميل الصفحة**
document.addEventListener("DOMContentLoaded", function() {
    hideAllSections(); // إخفاء كل الأقسام
    let breakfastSec = document.getElementById("Breakfast");
    if (breakfastSec) breakfastSec.style.display = "block"; // إظهار الفطور فقط

    // تحديد رابط "الفطور" ليكون نشطًا
    allLinks.forEach(link => {
        if (link.innerHTML === "Breakfast") {
            link.style.backgroundColor = "#2C3E50";
            link.style.color = "white";
        } else {
            link.style.backgroundColor = "";
            link.style.color = "";
        }
    });
});

// **إضافة الحدث لكل رابط في القائمة**
allLinks.forEach(link => {
    link.addEventListener("click", function() {
        let sectionId = allSections[link.innerHTML]; // الحصول على معرف القسم من الكائن
        
        if (sectionId) {
            hideAllSections(); // إخفاء جميع الأقسام

            // عرض القسم الذي تم النقر عليه
            let section = document.getElementById(sectionId);
            if (section) {
                section.style.display = "block";
            }

            // إعادة تعيين ألوان جميع الروابط
            allLinks.forEach(l => {
                l.style.backgroundColor = "";
                l.style.color = "";
            });

            // تغيير لون الرابط النشط
            link.style.backgroundColor = "#2C3E50";
            link.style.color = "white";
        }
    });
});




//     // دالة علشان نحول الصورة لـ Data URL
//     function readImageFile(file, callback) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             callback(e.target.result); // بنرجع الـ Data URL
//         };
//         reader.readAsDataURL(file); // بنقرأ الملف
//     }
    





// setingIcon 

let home = document.getElementById("home");
let mainSections = document.getElementById("mainSections");
let setingpage = document.querySelector(".setingpage");

document.getElementById("setingIcon").addEventListener("click" , function(){
    home.style.display = "none";
    mainSections.style.display = "none";
    setingpage.style.display = "block";
})

document.getElementById("back").addEventListener("click", function(){
    home.style.display = "block";
    mainSections.style.display = "block";
    setingpage.style.display = "none";
})




// data base


const firebaseConfig = {
    apiKey: "AIzaSyCHHuWVHPC5ORxo9LYUIkz0QiK3XPbSmFs",
    authDomain: "home-station-3066c.firebaseapp.com",
    databaseURL: "https://home-station-3066c-default-rtdb.firebaseio.com",
    projectId: "home-station-3066c",
    storageBucket: "home-station-3066c.appspot.com",
    messagingSenderId: "662353028267",
    appId: "1:662353028267:web:7f52fa9c686aa59991c3ee"
};

// 🔥 تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("products");
const commentsDB = firebase.database().ref("comments");

document.getElementById("categorys").addEventListener("change", function () {
    const selectedCategory = this.value;
    // 🔥 تحميل المنتجات وعرضها مع زر تعديل وحذف
    db.on("value", snapshot => {
        const list = document.getElementById("productList");
        list.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            const product = childSnapshot.val();
            const productId = childSnapshot.key;
            if (product.category === selectedCategory) {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex flex-column flex-md-row align-items-center text-center my-1 gap-3";
                let pestVisibility = product.featured ? "block" : "none";
                if(product.category === "Soft Drinks"){
                    li.innerHTML = `
                        <div id="${productId}" class = "steingpageproduct">
                            <div class = "steingpageproduct">
                                <div class="pest" style="display: ${pestVisibility};"> Best seller this week </div>
                                <strong class="flex-grow-1">${product.name}</strong> 
                                <span>${product.price} EGP</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm" onclick="editProduct('${productId}')">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${productId}')">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                                <button class="btn btn-success btn-sm" onclick="addPestSaler('${productId}')">
                                    <i class="bi bi-trash"></i> add pest
                                </button>
                                <button class="btn btn-warning btn-sm" onclick="removePestSaler('${productId}')">
                                    <i class="bi bi-trash"></i> remove pest
                                </button>
                            </div>
                        </div>
                    `;
                }else{
                    li.innerHTML = `
                        <div id="${productId}" class = "steingpageproduct" >
                            <div class = "steingpageproduct">
                                <div class="pest" style="display: ${pestVisibility};"> Best seller this week </div>
                                <img src="${product.image }" class="img-fluid rounded" 
                                    style="width: 150px; height: 150px; object-fit: cover;">
                                <strong class="flex-grow-1">${product.name}</strong> 
                                <span>${product.price} EGP</span>
                                <span>${product.description}</span>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm" onclick="editProduct('${productId}')">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${productId}')">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                                <button class="btn btn-success btn-sm" onclick="addPestSaler('${productId}')">
                                    <i class="bi bi-trash"></i> add pest
                                </button>
                                <button class="btn btn-warning btn-sm" onclick="removePestSaler('${productId}')">
                                    <i class="bi bi-trash"></i> remove pest
                                </button>
                            </div>
                        </div>    
                `;
                } 
                list.appendChild(li);
            } 
        });
    });
})



db.on("value", snapshot => {
    let mainSectionss = document.querySelectorAll(".mainSection section");

    // تفريغ الأقسام قبل تحميل البيانات الجديدة
    mainSectionss.forEach(section => {
        let categoryContainer = section.querySelector(".breakfastCard");
        if (categoryContainer) {
            categoryContainer.innerHTML = ""; // حذف جميع العناصر داخل القسم
        }
    });

    snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        const productId = childSnapshot.key;
        let pestVisibility = product.featured ? "block" : "none";
        // البحث عن القسم المطابق للفئة
        mainSectionss.forEach((section) => {
            let categoryTitleElement = section.querySelector(".heading h3");
            let categoryContainer = section.querySelector(".breakfastCard");

            // **تحقق مما إذا كان عنوان الفئة موجودًا لتجنب الخطأ**
            if (!categoryTitleElement) {
                console.warn("العنصر .heading h3 غير موجود في أحد الأقسام، سيتم تخطيه.");
                return; // تخطي هذا القسم إذا لم يتم العثور على العنوان
            }

            if (!categoryContainer) {
                console.warn("العنصر .breakfastCard غير موجود في أحد الأقسام، سيتم تخطيه.");
                return; // تخطي هذا القسم إذا لم يتم العثور على الحاوية
            }

            let categoryTitle = categoryTitleElement.textContent.trim();

            if (product.category === categoryTitle) {
                const productCard = document.createElement("div");
                productCard.classList.add("breakfastCard");

                productCard.innerHTML = product.description
                    ? `
                        <div class="pest" style="display: ${pestVisibility};"> Best seller this week </div>
                        <div class="Card " id = "productId">
                            <div class="breakfastImg">
                                <img src="${product.image || 'placeholder.jpg'}" loading="lazy">
                            </div>    
                            <div class="breakfastInfo">
                                <h4>${product.name}</h4>
                                <p>${product.price} <span>EGP</span></p>
                                <p class="pinfo">${product.description}</p>
                                <button class="redBtn">View more</button>
                                <button class="CloseredBtn">Close</button>
                            </div>
                        </div>
                    `
                    : `
                        <div class="pest" style="display: ${pestVisibility};"> Best seller this week </div>
                        <div class="Card" id = "productId" >
                            <div class="breakfastImg">
                                <img src="${product.image || 'placeholder.jpg'}" loading="lazy">
                            </div>    
                            <div class="breakfastInfo">
                                <h4>${product.name}</h4>
                                <p>${product.price} <span>EGP</span></p>
                            </div>
                        </div>
                    `;
                    if (product.category === "Soft Drinks"){
                        
                        productCard.innerHTML = `
                        <div class="Card p-1">
                            <div class="breakfastInfo d-flex align-items-center justify-content-between w-100">
                                <h4>${product.name}</h4>
                                <p>${product.price} <span>EGP</span></p>
                            </div>
                        </div>
                    `;
                    }
                categoryContainer.appendChild(productCard);
            }
        });
    });
});





// 🔥 وظيفة حفظ منتج جديد أو تعديل منتج
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const imageFile = document.getElementById("image").files[0];

    if (editingProductId) {
        // 🔥 تعديل المنتج
        if (imageFile) {
            uploadImage(imageFile, imageUrl => {
                updateProduct(editingProductId, name, price, description, category, imageUrl);
            });
        } else {
            updateProduct(editingProductId, name, price, description, category, existingImage);
        }
    } else {
        // 🔥 إضافة منتج جديد
        if (imageFile) {
            uploadImage(imageFile, imageUrl => {
                saveProduct(name, price, description, category, imageUrl);
                alert("product saving");
            });
        } else {
            saveProduct(name, price, description, category, "");
        }
    }
    clearForm();
});

// 🔥 تحميل الصورة إلى imgbb
function uploadImage(file, callback) {
    const formData = new FormData();
    formData.append("image", file);

    fetch("https://api.imgbb.com/1/upload?key=e4a2c16882f89d867460844d9d69ff4e", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            callback(data.data.url);
        } else {
            alert("فشل رفع الصورة!");
        }
    })
    .catch(error => console.error("خطأ أثناء رفع الصورة:", error));
}

// 🔥 حفظ المنتج الجديد في Firebase
function saveProduct(name, price, description, category, imageUrl) {
    db.push({ name, price, description, category, image: imageUrl });
}

// 🔥 تحميل بيانات المنتج للتعديل
let editingProductId = null;
let existingImage = "";

function editProduct(id) {
    db.child(id).get().then(snapshot => {
        if (snapshot.exists()) {
            const product = snapshot.val();
            document.getElementById("name").value = product.name;
            document.getElementById("price").value = product.price;
            document.getElementById("description").value = product.description;
            document.getElementById("category").value = product.category;
            existingImage = product.image;
            document.getElementById("name").focus();
            editingProductId = id;
            document.getElementById("submitButton").textContent = " edit item";
        }
    });
}

// 🔥 تحديث بيانات المنتج
function updateProduct(id, name, price, description, category, imageUrl) {
    db.child(id).update({ name, price, description, category, image: imageUrl });
    document.getElementById("submitButton").textContent = " add item";
    clearForm();
}

// دالة لإظهار العنصر الذي يحتوي على الكلاس pest
function addPestSaler(productId) {
    let productItem = document.getElementById(productId);
    if (productItem) {
        let pestElement = productItem.querySelector(".pest");
        if (pestElement) {
            pestElement.style.display = "block"; // إظهار العنصر في الواجهة
        }
    }

    // تحديث المنتج في Firebase ليكون مميزًا
    db.child(productId).update({ featured: true })
        .then(() => alert("The product has been marked as a best seller"))
        .catch(error => alert("Error updating product:", error));
}

// دالة لإخفاء العنصر الذي يحتوي على الكلاس pest
function removePestSaler(productId) {
    let productItem = document.getElementById(productId);
    if (productItem) {
        let pestElement = productItem.querySelector(".pest");
        if (pestElement) {
            pestElement.style.display = "none"; // إخفاء العنصر في الواجهة
        }
    }

    // تحديث المنتج في Firebase لحذفه من قائمة الأفضل مبيعًا
    db.child(productId).update({ featured: false })
        .then(() => alert("The product has been removed from the best sellers"))
        .catch(error => alert("Error updating product:", error));
}



// 🔥 حذف المنتج
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this item?")){
        db.child(id).remove().then(()=> alert("item deleted successfully!"));
    }

}

// 🔥 تفريغ الحقول بعد الإضافة/التعديل
function clearForm() {
    document.getElementById("productForm").reset();
    editingProductId = null;
}






// gest comment
let gestformconteaner = document.querySelector(".gestformconteaner");

let gestcommentbtn = document.querySelector(".gestcommentbtn");
let supbtn = document.getElementById("supbtn");
let backbtngect = document.getElementById("backbtngect");
let commentpage = document.getElementById("commentpage");
let commentsList = document.getElementById("commentsList");
let cestpagecont = document.querySelector(".cestpagecont");
let backtomenu = document.getElementById("backtomenu");


gestcommentbtn.addEventListener("click" , function(){
    home.style.display = "none";
    mainSections.style.display = "none";
    gestformconteaner.style.display = "block";
})

backbtngect.addEventListener("click" , function(){
    home.style.display = "block";
    mainSections.style.display = "block";
    gestformconteaner.style.display = "none";
})


commentpage.addEventListener("click" , function(){
    commentsList.style.display = "block";
    cestpagecont.style.display = "block";
    setingpage.style.display = "none";
    loadComments();  
})


backtomenu.addEventListener("click" , function(){
    home.style.display = "block";
    mainSections.style.display = "block";
    cestpagecont.style.display = "none";
})


supbtn.addEventListener("click" , function(event){
    event.preventDefault();

    let gestname = document.getElementById("gestname").value;
    let gestnum = document.getElementById("gestnum").value;
    let comment = document.getElementById("comment").value;

    if (gestname && gestnum && comment) {
        let newCommentRef = commentsDB.push();
        newCommentRef.set({
            name: gestname,
            phone: gestnum,
            comment: comment
        }).then(() => {
            alert("تم إرسال تعليقك بنجاح!");
            document.getElementById("gestname").value = "";
            document.getElementById("gestnum").value = "";
            document.getElementById("comment").value = "";
        }).catch(error => {
            console.error("خطأ في إرسال التعليق:", error);
        });
    } else {
        alert("يرجى ملء جميع الحقول!");
    }
});

function loadComments() {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ""; // تفريغ القائمة قبل إعادة تحميلها

    commentsDB.on("value", snapshot => {
        commentsList.innerHTML = ""; // إعادة تعيين المحتوى عند التحديث
        snapshot.forEach(childSnapshot => {
            const commentData = childSnapshot.val();
            const commentId = childSnapshot.key;

            const commentCard = document.createElement("div");
            commentCard.className = "card p-3 my-2 shadow-sm";
            commentCard.innerHTML = `
                <h4>${commentData.name}</h4>
                <h5>${commentData.phone}</h5>
                <p>${commentData.comment}</p>
                <button class="btn btn-danger btn-sm" onclick="deleteComment('${commentId}')">delete</button>
            `;
            commentsList.appendChild(commentCard);
        });
    });
}

window.onload = loadComments;

function deleteComment(commentId) {
    if (confirm("Are you sure you want to delete this comment?")) {
        commentsDB.child(commentId).remove().then(() => {
            alert("Comment deleted successfully! ");
        }).catch(error => {
            console.error("خطأ أثناء حذف التعليق:", error);
        });
    }
}




// scroll bar

const scrollToTopButton = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // يجعل التمرير سلسًا
    });
});




// sign in

const dbRef = firebase.database().ref("users/admin");

const settingIcon = document.getElementById("setingIcon");
const loginModal = document.getElementById("loginModal");
const loginButton = document.getElementById("loginButton");
const closeModal = document.getElementById("closeModal");
const settingPage = document.querySelector(".setingpage");

// فتح نافذة تسجيل الدخول
settingIcon.addEventListener("click", () => {
    loginModal.style.display = "block"; // إظهار النافذة
    settingPage.style.display = "none"; // إخفاء الإعدادات
});

// إغلاق نافذة تسجيل الدخول
closeModal.addEventListener("click", () => {
    home.style.display = "block";
    mainSections.style.display = "block";
    setingpage.style.display = "none"; // إخفاء النافذة
});

// عند الضغط على زر تسجيل الدخول
loginButton.addEventListener("click", () => {
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    dbRef.once("value")
        .then((snapshot) => {
            const adminData = snapshot.val(); // جلب بيانات المسؤول

            if (!adminData) {
                alert("⚠️ No admin data found!");
                return;
            }

            if (username === adminData.username && password === adminData.password) {
                alert("✅ Login successful!");
                loginModal.style.display = "none";
                settingPage.style.display = "block";
            } else {
                alert("❌ Incorrect username or password!");
            }
        })
        .catch((error) => {
            console.error("Error fetching admin data:", error);
            alert("⚠️ Failed to retrieve data. Please try again.");
        });
});
