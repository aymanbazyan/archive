const arabicHebrewRegex = /[\u0600-\u06FF\u0590-\u05FF]/;
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
const symbolRejex = /[a-zA-Z\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/;

function isTextStartsWithArabic(text) {
  if (!text) return;

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

function aCode(string, encryptFlag = true) {
  if (!string) return;

  if (encryptFlag) return btoa(unescape(encodeURIComponent(string)));
  else return decodeURIComponent(escape(atob(string)));
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
    const newBookMarks = {};
    newBookMarks[id] = id;

    saveToLocal("bookmarks", newBookMarks);
    setIsBookmarked(true);
    return;
  }

  if (getFromLocal("bookmarks")?.[id]) {
    delete bookmarks[id];
    saveToLocal("bookmarks", bookmarks);
    setIsBookmarked(false);
  } else {
    bookmarks[id] = id;

    saveToLocal("bookmarks", bookmarks);
    setIsBookmarked(true);
  }
}

const copyPost = () => {
  let doc = document.querySelector(".ck-content");

  const links = doc.querySelectorAll("a"); // Get all <a> elements inside the div
  links.forEach((link) => {
    const newElement = document.createElement("span"); // Create a replacement element
    newElement.textContent = `${link.textContent} [${link.href}]`; // Transfer the text
    link.replaceWith(newElement); // Replace <a> with the new element
  });

  const toCopy = `${window.location.origin}${window.location.pathname} \n ${doc.innerText}`;

  // console.log(toCopy);

  navigator.clipboard.writeText(toCopy);
};

export {
  copyPost,
  aCode,
  saveToLocal,
  getFromLocal,
  toggleSave,
  isTextStartsWithArabic,
};
