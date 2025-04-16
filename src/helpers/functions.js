const arabicHebrewRegex = /[\u0600-\u06FF\u0590-\u05FF]/;
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
const symbolRejex = /[a-zA-Z\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/;

function isTextStartsWithArabic(text) {
  if (typeof text !== "string" || !text) return;
  const newText = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Convert arabic numbers to english
  const a2eText = a2e(newText);

  // Get first NaN
  let firstNaN;
  a2eText.split("").map((letter) => {
    if (firstNaN) return;

    if (isNaN(letter) && symbolRejex.test(letter)) {
      firstNaN = letter;
      return;
    }
  });

  // Check if the first character in the text is Arabic
  return arabicHebrewRegex.test(firstNaN);
}

function saveToLocal(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getFromLocal(key) {
  const item = localStorage.getItem(key);
  if (item == "undefined") return null;
  const parsed = JSON.parse(item);
  return parsed;
}

function toggleSave(id, setIsBookmarked) {
  const bookmarks = getFromLocal("bookmarks");

  if (!bookmarks) {
    const newBookMarks = [];
    newBookMarks.push(id);

    saveToLocal("bookmarks", newBookMarks);
    setIsBookmarked(true);
    return;
  }

  if (getFromLocal("bookmarks")?.some((i) => i == id)) {
    const filtrd = bookmarks.filter((i) => i !== id);
    saveToLocal("bookmarks", filtrd);
    setIsBookmarked(false);
  } else {
    bookmarks.push(id);

    saveToLocal("bookmarks", bookmarks);
    setIsBookmarked(true);
  }
}

// const formatDateTime = (date) => {
//   if (!date) return;
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
// };

const getElementContent = (doc) => {
  if (!doc) return "";

  const links = doc.querySelectorAll("a"); // Get all <a> elements inside the div
  links.forEach((link) => {
    const newElement = document.createElement("span"); // Create a replacement element
    newElement.textContent = `${link.textContent} [${link.href}]`; // Transfer the text
    link.replaceWith(newElement); // Replace <a> with the new element
  });

  const imgs = doc.querySelectorAll("img");
  imgs.forEach((img) => {
    const newElement = document.createElement("span");
    newElement.textContent = `(${img.alt || "File preview"}) [${img.src}]`;
    img.replaceWith(newElement);
  });

  const spaces = doc.querySelectorAll("p");
  spaces.forEach((space) => {
    if (space.textContent === " ") {
      const newElement = document.createElement("p");
      newElement.textContent = "\n";
      space.replaceWith(newElement);
    }
  });

  const hrs = doc.querySelectorAll("hr");
  hrs.forEach((hr) => {
    const newElement = document.createElement("p");
    newElement.textContent = "---------";
    hr.replaceWith(newElement);
  });

  return doc.innerText;
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export {
  isTextStartsWithArabic,
  toggleSave,
  getFromLocal,
  getElementContent,
  getCookie,
  deleteCookie,
  // formatDateTime
};
